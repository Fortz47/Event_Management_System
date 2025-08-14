import Ticket from "../../Ticket/models/ticket.model";
import TicketType from "../../Ticket/models/ticket-type.model";
import TicketService from "../../Ticket/services/ticket.service";

export class MockPaymentService {
  private static successRate = 0.8; // 80% success rate for realistic testing

  static async initializePayment(
    userId: number,
    ticketType: TicketType
  ): Promise<{
    paymentUrl: string;
    reference: string;
    accessCode: string;
  }> {
    const reference = `MOCK-${ticketType.id}-${userId}-${Date.now()}`;
    const accessCode = Math.random().toString(36).substring(2, 10);

    const ticketData = {
      eventId: ticketType.eventId,
      userId,
      reference,
      ticketTypeId: ticketType.id!,
      accessCode,
    };

    // Store payment intent in database
    await TicketService.generateTicket(ticketData);

    return {
      paymentUrl: `${process.env.API_BASE_URL}/payments/mock/verify?reference=${reference}`,
      reference,
      accessCode,
    };
  }

  static async verifyPayment(reference: string): Promise<{
    status: "success" | "failed";
    reference: string;
    purchasedAt: string;
    metadata: {
      eventId: string;
      userId: number;
    };
  }> {
    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const isSuccess = Math.random() < this.successRate;
    const ticket = await Ticket.findOne({ where: { reference } });

    if (!ticket) {
      throw new Error("Payment reference not found");
    }

    // Update ticket status
    ticket.status = isSuccess ? "paid" : "failed";
    if (ticket.status === "paid") {
      ticket.purchasedAt = new Date();
    }
    await ticket.save();

    return {
      status: isSuccess ? "success" : "failed",
      reference,
      purchasedAt: ticket.purchasedAt?.toISOString() || "",
      metadata: {
        eventId: ticket.eventId,
        userId: ticket.userId!,
      },
    };
  }

  static async listPayments(userId: number) {
    return Ticket.findAll({
      where: { userId, status: "paid" },
      order: [["createdAt", "DESC"]],
    });
  }
}
