import { Sequelize } from "sequelize";
import User from "../modules/User/models/UserModel";
import Event from "../modules/Event/models/event.model";
import { EventParticipant } from "../modules/Event/models/event-participant.model";
import { EventOrganizer } from "../modules/Event/models/event-organizer.model";

function initializeModels(sequelize: Sequelize) {
  User.initialize(sequelize);
  Event.initialize(sequelize);
  EventParticipant.initialize(sequelize);
  EventOrganizer.initialize(sequelize);
}

export default initializeModels;
