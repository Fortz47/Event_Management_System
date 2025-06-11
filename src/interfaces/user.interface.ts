import { Optional } from "sequelize";
import { DateTime } from "luxon";

interface UserAttributes {
  id?: number;
  name?: string;
  email: string;
  password: string;
  role: string;
  profilePicture?: string;
  eventsOrganized?: any[];
  eventsParticipated?: any[];
  createdAt?: DateTime;
  updatedAt?: DateTime;
}

type UserCreationAttributes = Optional<
  UserAttributes,
  | "id"
  | "name"
  | "role"
  | "createdAt"
  | "updatedAt"
  | "profilePicture"
  | "eventsOrganized"
  | "eventsParticipated"
>;

export { UserAttributes, UserCreationAttributes };
