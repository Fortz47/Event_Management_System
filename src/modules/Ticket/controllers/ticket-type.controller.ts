import { Request, Response } from "express";
import TicketTypeService from "../services/ticket-type.service";

class TicketTypeController {
  async createTicketType(req: Request, res: Response) {
    try {
      const ticketTypeData = req.body;
      const ticketType =
        await TicketTypeService.createTicketType(ticketTypeData);
      res.status(201).json(ticketType);
    } catch (error) {
      res.status(500).json({ error: "Failed to create ticket type" });
    }
  }

  async getTicketTypeById(req: Request, res: Response) {
    try {
      const { ticketTypeId } = req.params;
      const ticketType =
        await TicketTypeService.getTicketTypeById(ticketTypeId);
      if (!ticketType) {
        res.status(404).json({ error: "Ticket type not found" });
        return;
      }
      res.status(200).json(ticketType);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to retrieve ticket type", error });
    }
  }

  async getAllTicketTypesByEventId(req: Request, res: Response) {
    try {
      let { eventId } = req.params;
      //   if (!eventId) {
      //     res.status(400).json({ error: "Event ID is required" });
      //     return;
      //   }
      //   eventId = eventId.toString();
      const ticketTypes =
        await TicketTypeService.getAllTicketTypesByEventId(eventId);
      res.status(200).json(ticketTypes);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to retrieve ticket types", error });
    }
  }
}

export default TicketTypeController;
