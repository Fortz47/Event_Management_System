import { Optional } from "sequelize";

interface EventParticipantAttributes {
  id?: string;
  eventId: string;
  userId: number;
  status: "registered" | "attended" | "cancelled";
  ticketNumber?: string;
  paymentStatus: "pending" | "paid" | "refunded";
  paymentAmount?: number; // Assuming monetary values
  additionalInfo?: any; // For flexible additional data
  createdAt?: Date;
  updatedAt?: Date;
}

type EventParticipantCreationAttributes = Optional<
  EventParticipantAttributes,
  | "id"
  | "ticketNumber"
  | "paymentAmount"
  | "additionalInfo"
  | "createdAt"
  | "updatedAt"
>;

export { EventParticipantAttributes, EventParticipantCreationAttributes };
