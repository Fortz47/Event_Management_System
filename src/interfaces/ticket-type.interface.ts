import { Optional } from "sequelize";

interface TicketTypeAttributes {
  id?: string;
  name: string;
  description: string;
  eventId: string;
  quantity: number;
  sale_start?: Date;
  sale_end?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

type TicketTypeCreationAttributes = Optional<
  TicketTypeAttributes,
  "id" | "sale_start" | "sale_end" | "createdAt" | "updatedAt"
>;

export { TicketTypeAttributes, TicketTypeCreationAttributes };
