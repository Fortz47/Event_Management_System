import { Sequelize, Model, DataTypes } from "sequelize";
import {
  TicketTypeAttributes,
  TicketTypeCreationAttributes,
} from "../../../interfaces/ticket-type.interface";

class TicketType extends Model<
  TicketTypeAttributes,
  TicketTypeCreationAttributes
> {
  declare id?: string;
  declare name: string;
  declare description: string;
  declare eventId: string;
  declare quantity: number;
  declare sale_start?: Date;
  declare sale_end?: Date;
  declare createdAt?: Date;
  declare updatedAt?: Date;

  static initialize(sequelize: Sequelize) {
    TicketType.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: false },
        eventId: { type: DataTypes.STRING, allowNull: false },
        quantity: { type: DataTypes.INTEGER, allowNull: false },
        sale_start: { type: DataTypes.DATE, allowNull: true },
        sale_end: { type: DataTypes.DATE, allowNull: true },
      },
      {
        sequelize,
        tableName: "ticket_types",
        modelName: "TicketType",
        timestamps: true,
      }
    );
  }
}

export default TicketType;
