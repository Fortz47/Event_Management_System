import { EventOrganizerCreationAttributes } from "../../../interfaces/event-organizer.interface";
import { EventOrganizer } from "../models/event-organizer.model";
// import { EventOrganizerCreationAttributes } from "../../../interfaces/event-organizer.interface";
import Event from "../models/event.model";

class EventOrganizerService {
  static async getOrganizerByEventId(eventId: string) {
    const event = await Event.findByPk(eventId);
    if (!event) {
      throw new Error("Event not found");
    }
    const organizer = await event.getOrganizer();
    return organizer;
  }

  static async getCoOrganizersByEventId(eventId: string) {
    const event = await Event.findByPk(eventId);
    if (!event) {
      throw new Error("Event not found");
    }
    const coOrganizers = await event.getCo_organizers();
    return coOrganizers;
  }

  static async createEventOrganizer(
    organizerData: EventOrganizerCreationAttributes
  ) {
    const organizer = await EventOrganizer.create(organizerData);
    return organizer;
  }

  static async addOrganizerToEvent(organizer: EventOrganizer, eventId: string) {
    const event = await Event.findByPk(eventId);
    if (!event) {
      throw new Error("Event not found");
    }
    await event.setOrganizer(organizer);
  }

  static async addCoOrganizerToEvent(
    organizer: EventOrganizer | string,
    eventId: string
  ) {
    const event = await Event.findByPk(eventId);
    if (!event) {
      throw new Error("Event not found");
    }
    await event.addCo_organizer(organizer);
  }

  static async addCoOrganizersToEvent(
    organizers: EventOrganizer[] | string[],
    eventId: string
  ) {
    const event = await Event.findByPk(eventId);
    if (!event) {
      throw new Error("Event not found");
    }
    await event.addCo_organizers(organizers);
  }

  static async removeCoOrganizerFromEvent(
    co_organizerId: string,
    eventId: string
  ) {
    const event = await Event.findByPk(eventId);
    if (!event) {
      throw new Error("Event not found");
    }
    await event.removeCo_organizer(co_organizerId);
  }
  static async removeCoOrganizersFromEvent(
    organizerIds: string[],
    eventId: string
  ) {
    const event = await Event.findByPk(eventId);
    if (!event) {
      throw new Error("Event not found");
    }
    await event.removeCo_organizers(organizerIds);
  }
}

export default EventOrganizerService;
