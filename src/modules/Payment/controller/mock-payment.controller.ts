import { Request, Response } from "express";
import { MockPaymentService } from "../service/mock-payment.service";
import TicketTypeService from "../../Ticket/services/ticket-type.service";

export class MockPaymentController {
  async initializePayment(req: Request, res: Response) {
    try {
      const user = req.user!;
      const { ticketTypeId } = req.body;

      const ticketType =
        await TicketTypeService.getTicketTypeById(ticketTypeId);

      if (!ticketType) {
        res.status(404).json({ error: "Ticket type not found" });
        return;
      }

      const paymentData = await MockPaymentService.initializePayment(
        user.id,
        ticketType
      );

      res.json({
        success: true,
        data: {
          authorization_url: paymentData.paymentUrl,
          reference: paymentData.reference,
          access_code: paymentData.accessCode,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({
          success: false,
          error: error.message,
        });
      }
    }
  }

  async verifyPayment(req: Request, res: Response) {
    try {
      const { reference } = req.query;
      const result = await MockPaymentService.verifyPayment(
        reference as string
      );

      res.json({
        success: result.status === "success",
        data: result,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({
          success: false,
          error: error.message,
        });
      }
    }
  }

  async paymentHistory(req: Request, res: Response) {
    try {
      const user = req.user!;
      const payments = await MockPaymentService.listPayments(user.id);

      res.json({
        success: true,
        data: payments,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({
          success: false,
          error: error.message,
        });
      }
    }
  }
}
