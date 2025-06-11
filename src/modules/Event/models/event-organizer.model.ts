import { DataTypes, Model, Sequelize } from "sequelize";

export class EventOrganizer extends Model {
  declare eventId: string;
  declare userId: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  static initialize(sequelize: Sequelize) {
    EventOrganizer.init(
      {
        // eventId: {
        //   type: DataTypes.UUID,
        //   primaryKey: true,
        // },
        // userId: {
        //   type: DataTypes.INTEGER.UNSIGNED,
        //   primaryKey: true,
        // },
      },
      {
        sequelize,
        modelName: "EventOrganizer",
        tableName: "event_organizers",
        timestamps: true,
      }
    );
  }
}
