import { Optional } from "sequelize";

interface EventAttributes {
  id?: string;
  title: string;
  description?: string;
  maxParticipants?: number;
  startDate: Date;
  endDate: Date;
  mode: "virtual" | "Hybrid" | "in-person";
  location?: string;
  isPublic?: boolean;
  isCancelled?: boolean;
  isCompleted?: boolean;
  isDisabled?: boolean;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
type EventCreationAttributes = Optional<
  EventAttributes,
  | "id"
  | "description"
  | "location"
  | "createdAt"
  | "updatedAt"
  | "maxParticipants"
  | "isPublic"
  | "isCancelled"
  | "isCompleted"
  | "isDisabled"
  | "isDeleted"
>;
export { EventAttributes, EventCreationAttributes };
