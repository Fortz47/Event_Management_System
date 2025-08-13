import { Request, Response } from "express";
import TicketService from "../services/ticket.service";

class TicketController {
  async createTicket(req: Request, res: Response) {
    try {
      const ticketData = req.body;
      const ticket = await TicketService.generateTicket(ticketData);
      res.status(201).json(ticket);
    } catch (error) {
      res.status(500).json({ error: "Failed to create ticket" });
    }
  }

  async getTicketById(req: Request, res: Response) {
    try {
      const { ticketId } = req.params;
      const ticket = await TicketService.getTicketById(ticketId);
      if (!ticket) {
        res.status(404).json({ error: "Ticket not found" });
        return;
      }
      res.status(200).json(ticket);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve ticket", error });
    }
  }

  async getTicketsByUserId(req: Request, res: Response) {
    try {
      let { userId } = req.query;
      if (!userId) {
        res.status(400).json({ error: "invalid user Id" });
        return;
      }
      const tickets = await TicketService.getTicketByUserId(+userId);
      res.status(200).json(tickets);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve tickets", error });
    }
  }

  async getTicketsByEventIdAndUserId(req: Request, res: Response) {
    try {
      const { eventId } = req.params;
      const { userId } = req.query;

      if (userId) {
        const tickets = await TicketService.getTicketsByEventIdAndUserId(
          eventId,
          +userId
        );
        res.status(200).json(tickets);
        return;
      }
      res.status(400).json({ error: "invalid user Id" });
    } catch (error) {
      res.status(400).json({ message: "failed to retrieve tickets", error });
    }
  }

  async getAllTickets(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: "Login required" });
        return;
      }
      const tickets = await TicketService.getAllUserTickets(userId);
      res.status(200).json(tickets);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve tickets", error });
    }
  }

  async updateTicket(req: Request, res: Response) {
    try {
      const { ticketId } = req.params;
      const ticketData = req.body;
      const updatedTicket = await TicketService.updateTicket(
        ticketId,
        ticketData
      );
      if (!updatedTicket) {
        res.status(404).json({ error: "Ticket not found" });
        return;
      }
      res.status(200).json(updatedTicket);
    } catch (error) {
      res.status(500).json({ message: "Failed to update ticket", error });
    }
  }

  async deleteTicket(req: Request, res: Response) {
    try {
      const { ticketId } = req.params;
      const deleted = await TicketService.deleteTicket(ticketId);
      if (!deleted) {
        res.status(404).json({ error: "Ticket not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete ticket", error });
    }
  }
}

export default TicketController;
