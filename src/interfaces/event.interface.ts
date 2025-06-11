import { Optional } from "sequelize";
import { DateTime } from "luxon";

interface EventAttributes {
  id?: string;
  title: string;
  description?: string;
  organizerId: number;
  coOrganizers?: any[];
  participants?: any[];
  maxParticipants?: number;
  startDate: DateTime;
  endDate: DateTime;
  mode: "virtual" | "Hybrid" | "in-person";
  location?: string;
  isPublic?: boolean;
  isCancelled?: boolean;
  isCompleted?: boolean;
  isActive?: boolean;
  createdAt?: DateTime;
  updatedAt?: DateTime;
}
type EventCreationAttributes = Optional<
  EventAttributes,
  | "id"
  | "description"
  | "location"
  | "createdAt"
  | "updatedAt"
  | "coOrganizers"
  | "participants"
  | "maxParticipants"
  | "isPublic"
  | "isCancelled"
  | "isCompleted"
  | "isActive"
>;
export { EventAttributes, EventCreationAttributes };
