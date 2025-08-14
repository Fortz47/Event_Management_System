import { Optional } from "sequelize";

interface TicketAttributes {
  id?: string;
  eventId: string;
  userId: number;
  ticketTypeId: string;
  // price: number;
  reference: string;
  accessCode: string;
  status: "pending" | "paid" | "failed";
  purchasedAt?: Date;
  isRefunded?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

type TicketCreationAttribute = Optional<
  TicketAttributes,
  "id" | "purchasedAt" | "isRefunded" | "createdAt" | "updatedAt" | "status"
>;

export { TicketAttributes, TicketCreationAttribute };
