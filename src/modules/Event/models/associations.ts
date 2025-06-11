import { EventOrganizer } from "./event-organizer.model";
import { EventParticipant } from "./event-participant.model";
import Event from "./event.model";
import User from "../../User/models/UserModel";

export function setupEventAssociations() {
  // Event has many participants through EventParticipant
  Event.belongsToMany(User, {
    through: EventParticipant,
    // foreignKey: "eventId",
    // otherKey: "userId",
    as: "attendees",
  });

  // User has many events through EventParticipant
  User.belongsToMany(Event, {
    through: EventParticipant,
    // foreignKey: "userId",
    // otherKey: "eventId",
    as: "events_attended",
  });

  // An Event has one main Organizer (User)
  Event.belongsTo(User, {
    as: "organizer",
    // foreignKey: "organizerId",
  });

  // Event has many organizers through EventOrganizer
  Event.belongsToMany(User, {
    through: EventOrganizer,
    // foreignKey: "eventId",
    // otherKey: "userId",
    as: "co_organizers",
  });

  // User has many events organized through EventOrganizer
  User.belongsToMany(Event, {
    through: EventOrganizer,
    // foreignKey: "userId",
    // otherKey: "eventId",
    as: "events_organized",
  });
}
