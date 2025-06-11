import { DataTypes, Sequelize, Model } from "sequelize";
import { DateTime } from "luxon";

export class EventParticipant extends Model {
  declare eventId: string;
  declare userId: number;
  declare status: "registered" | "attended" | "cancelled";
  declare ticketNumber?: string;
  declare paymentStatus: "pending" | "paid" | "refunded";
  declare paymentAmount?: number; // Assuming monetary values
  declare additionalInfo?: any; // For flexible additional data
  declare readonly createdAt: DateTime;
  declare readonly updatedAt: DateTime;

  static initialize(sequelize: Sequelize) {
    EventParticipant.init(
      {
        // eventId: {
        //   type: DataTypes.UUID,
        //   allowNull: false,
        //   primaryKey: true,
        // },
        // userId: {
        //   type: DataTypes.INTEGER.UNSIGNED,
        //   allowNull: false,
        //   primaryKey: true,
        // },
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
