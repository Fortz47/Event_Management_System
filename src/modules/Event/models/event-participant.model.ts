import { DataTypes, Sequelize, Model } from "sequelize";
import { EventParticipantAttributes } from "../../../interfaces/event-participant.interface";

export class EventParticipant
  extends Model
  implements EventParticipantAttributes
{
  declare id?: string;
  declare eventId: string;
  declare userId: number;
  declare status: "registered" | "attended" | "cancelled";
  declare ticketNumber?: string;
  declare paymentStatus: "pending" | "paid" | "refunded";
  declare paymentAmount?: number; // Assuming monetary values
  declare additionalInfo?: any; // For flexible additional data
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  static initialize(sequelize: Sequelize) {
    EventParticipant.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        status: {
          type: DataTypes.ENUM("registered", "attended", "cancelled"),
          defaultValue: "registered",
        },
        ticketNumber: {
          type: DataTypes.STRING(20),
          unique: true,
        },
        paymentStatus: {
          type: DataTypes.ENUM("pending", "paid", "refunded"),
          defaultValue: "pending",
        },
        paymentAmount: {
          type: DataTypes.DECIMAL(10, 2), // For monetary values
        },
        additionalInfo: {
          type: DataTypes.JSON, // For flexible additional data
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "EventParticipant",
        tableName: "event_participants",
        timestamps: true,
      }
    );
  }
}
