import Ticket from "./ticket.model";
import TicketType from "./ticket-type.model";
import User from "../../User/models/UserModel";

export function setupTicketAssociations() {
  // TicketType has many Tickets
  TicketType.hasMany(Ticket, {
    foreignKey: "ticketTypeId",
    as: "tickets",
  });

  // Ticket belongs to TicketType
  Ticket.belongsTo(TicketType, {
    foreignKey: "ticketTypeId",
    as: "ticketType",
  });

  // Ticket has a user
  Ticket.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });
}
