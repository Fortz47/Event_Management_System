import { Model, Sequelize } from "sequelize";

export class EventOrganizer extends Model {
  declare eventId: string;
  declare userId: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  static initialize(sequelize: Sequelize) {
    EventOrganizer.init(
      {},
      {
        sequelize,
        modelName: "EventOrganizer",
        tableName: "event_organizers",
        timestamps: true,
      }
    );
  }
}
