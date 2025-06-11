import { DateTime } from "luxon";
import { Model, Sequelize, DataTypes } from "sequelize";
import {
  EventAttributes,
  EventCreationAttributes,
} from "../../../interfaces/event.interface";

class Event
  extends Model<EventAttributes, EventCreationAttributes>
  implements EventAttributes
{
  declare id: string;
  declare title: string;
  declare description?: string;
  declare organizerId: number;
  declare coOrganizers?: any[];
  declare participants?: any[];
  declare maxParticipants?: number;
  declare startDate: DateTime;
  declare endDate: DateTime;
  declare mode: "virtual" | "Hybrid" | "in-person";
  declare location?: string;
  declare isPublic?: boolean;
  declare isCancelled?: boolean;
  declare isCompleted?: boolean;
  declare isActive?: boolean;
  declare readonly createdAt: DateTime;
  declare readonly upDateTimedAt: DateTime;

  static initialize(sequelize: Sequelize) {
    Event.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        organizerId: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
        coOrganizers: {
          type: DataTypes.JSON,
          allowNull: true,
        },
        participants: {
          type: DataTypes.JSON, // Assuming participants is an array of objects
          allowNull: true,
        },
        maxParticipants: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: true,
        },
        startDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        endDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        mode: {
          type: DataTypes.ENUM("virtual", "Hybrid", "in-person"),
          allowNull: false,
        },
        location: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        isPublic: {
          type: DataTypes.BOOLEAN,
          defaultValue: true, // Default to public
        },
        isCancelled: {
          type: DataTypes.BOOLEAN,
          defaultValue: false, // Default to not cancelled
        },
        isCompleted: {
          type: DataTypes.BOOLEAN,
          defaultValue: false, // Default to not completed
        },
        isActive: {
          type: DataTypes.BOOLEAN,
          defaultValue: true, // Default to active
        },
      },
      {
        sequelize,
        modelName: "Event",
        tableName: "events",
        timestamps: true,
      }
    );
  }
}

export default Event;
