import { Model, Sequelize, DataTypes } from "sequelize";
import {
  TicketAttributes,
  TicketCreationAttribute,
} from "../../../interfaces/ticket.interface";

class Ticket extends Model<TicketAttributes, TicketCreationAttribute> {
  declare id: string;
  declare eventId: string;
  declare userId?: number;
  declare ticketTypeId: string;
  declare price: number;
  declare reference?: string;
  declare accessCode?: string;
  declare status: "pending" | "paid" | "failed";
  declare purchasedAt?: Date;
  declare isRefunded?: boolean;
  declare createdAt?: Date;
  declare updatedAt?: Date;

  static initialize(sequelize: Sequelize) {
    Ticket.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        eventId: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        ticketTypeId: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        reference: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        status: {
          type: DataTypes.ENUM("pending", "paid", "failed"),
          allowNull: false,
        },
        accessCode: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        purchasedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        isRefunded: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
      },
      {
        sequelize,
        tableName: "tickets",
        modelName: "Ticket",
        timestamps: true,
      }
    );
  }
}

export default Ticket;
