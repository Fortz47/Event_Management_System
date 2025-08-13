import {
  Model,
  Sequelize,
  DataTypes,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyAddAssociationMixin,
  BelongsToGetAssociationMixin,
  BelongsToCreateAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManyRemoveAssociationsMixin,
} from "sequelize";
import {
  EventAttributes,
  EventCreationAttributes,
} from "../../../interfaces/event.interface";
import { EventParticipant } from "./event-participant.model";
import { EventOrganizer } from "./event-organizer.model";

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
  declare startDate: Date;
  declare endDate: Date;
  declare mode: "virtual" | "Hybrid" | "in-person";
  declare location?: string;
  declare isPublic?: boolean;
  declare isCancelled?: boolean;
  declare isCompleted?: boolean;
  declare isDisabled?: boolean;
  declare isDeleted?: boolean;
  declare readonly createdAt: Date;
  declare readonly upDateTimedAt: Date;

  declare getAttendees: BelongsToManyGetAssociationsMixin<EventParticipant>;
  declare addAttendee: BelongsToManyAddAssociationMixin<
    EventParticipant,
    string
  >;
  declare addAttendees: BelongsToManyAddAssociationsMixin<
    EventParticipant,
    string
  >;
  declare removeAttendee: BelongsToManyRemoveAssociationMixin<
    EventParticipant,
    string
  >;
  declare removeAttendees: BelongsToManyRemoveAssociationsMixin<
    EventParticipant,
    string
  >;

  declare getOrganizer: BelongsToGetAssociationMixin<EventOrganizer>;
  declare createOrganizer: BelongsToCreateAssociationMixin<EventOrganizer>;
  declare setOrganizer: BelongsToSetAssociationMixin<EventOrganizer, string>;

  declare getCo_organizers: BelongsToManyGetAssociationsMixin<EventOrganizer>;
  declare addCo_organizer: BelongsToManyAddAssociationMixin<
    EventOrganizer,
    string
  >;
  declare addCo_organizers: BelongsToManyAddAssociationsMixin<
    EventOrganizer,
    string
  >;
  declare removeCo_organizer: BelongsToManyRemoveAssociationMixin<
    EventOrganizer,
    string
  >;
  declare removeCo_organizers: BelongsToManyRemoveAssociationsMixin<
    EventOrganizer,
    string
  >;

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
        // organizerId: {
        //   type: DataTypes.INTEGER.UNSIGNED,
        //   allowNull: false,
        // },
        // coOrganizers: {
        //   type: DataTypes.JSON,
        //   allowNull: true,
        // },
        // participants: {
        //   type: DataTypes.JSON, // Assuming participants is an array of objects
        //   allowNull: true,
        // },
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
        isDisabled: {
          type: DataTypes.BOOLEAN,
          defaultValue: false, // Default to not disabled
        },
        isDeleted: {
          type: DataTypes.BOOLEAN,
          defaultValue: false, // Default to not deleted
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
