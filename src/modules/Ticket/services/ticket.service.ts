import { TicketCreationAttribute } from "../../../interfaces/ticket.interface";
import Ticket from "../models/ticket.model";
import User from "../../User/models/UserModel";
import TicketType from "../models/ticket-type.model";

class TicketService {
  static async generateTicket(ticketData: TicketCreationAttribute) {
    const ticket = await Ticket.create(ticketData);
    return ticket;
  }

  static async getTicketsByEventIdAndUserId(eventId: string, userId: number) {
    const tickets = await Ticket.findAll({
      where: {
        eventId,
        userId,
      },
    });
  }

  static async getTicketByUserId(userId: number) {
    const tickets = await Ticket.findAll({
      where: {
        // @ts-ignore
        userId,
      },
    });
  }

  static async getTicketById(ticketId: string) {
    const ticket = await Ticket.findByPk(ticketId);
    return ticket;
  }

  static async getTicketsByEventId(eventId: string) {
    const tickets = await Ticket.findAll({
      where: {
        eventId,
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email"],
        },
      ],
    });
    return tickets;
  }

  static async getAllTickets() {
    const tickets = await Ticket.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email"],
        },
        {
          model: TicketType,
          as: "type",
          attributes: ["id", "name", "price"],
        },
      ],
    });
    return tickets;
  }

  static async getAllUserTickets(userId: number) {
    const tickets = await Ticket.findAll({
      where: {
        userId,
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email"],
        },
        {
          model: TicketType,
          as: "type",
          attributes: ["id", "name", "price"],
        },
      ],
    });
    return tickets;
  }

  static async updateTicket(
    ticketId: string,
    ticketData: Partial<TicketCreationAttribute>
  ) {
    const [updated] = await Ticket.update(ticketData, {
      where: { id: ticketId },
    });
    return updated ? Ticket.findByPk(ticketId) : null;
  }

  static async deleteTicket(ticketId: string) {
    const deleted = await Ticket.destroy({
      where: { id: ticketId },
    });
    return deleted;
  }
}

export default TicketService;
