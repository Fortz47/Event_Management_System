import { TicketTypeCreationAttributes } from "../../../interfaces/ticket-type.interface";
import TicketType from "../models/ticket-type.model";

class TicketTypeService {
  static async createTicketType(ticketTypeData: TicketTypeCreationAttributes) {
    const ticketType = await TicketType.create(ticketTypeData);
    return ticketType;
  }

  static async getAllTicketTypes() {
    const ticketTypes = await TicketType.findAll();
    return ticketTypes;
  }

  static async getTicketTypeById(ticketTypeId: string) {
    const ticketType = await TicketType.findByPk(ticketTypeId);
    return ticketType;
  }

  static async getAllTicketTypesByEventId(eventId: string) {
    const ticketTypes = await TicketType.findAll({
      where: { eventId },
    });
    return ticketTypes;
  }
}

export default TicketTypeService;
