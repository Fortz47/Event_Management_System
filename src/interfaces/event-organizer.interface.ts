import { Optional } from "sequelize";

interface EventOrganizerAttributes {
  eventId: string;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type EventOrganizerCreationAttributes = Optional<
  EventOrganizerAttributes,
  "createdAt" | "updatedAt"
>;

export { EventOrganizerAttributes, EventOrganizerCreationAttributes };
