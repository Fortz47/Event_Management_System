import Event from "../models/event.model";
import { Op } from "sequelize";
import { DateTime } from "luxon";
import { EventCreationAttributes } from "../../../interfaces/event.interface";

class EventService {
  static async getEventById(eventId: string): Promise<Event | null> {
    return Event.findByPk(eventId);
  }

  static async getAllEvents(): Promise<Event[]> {
    return Event.findAll();
  }

  static async getEventsByDateRange(
    startDate: DateTime,
    endDate: DateTime
  ): Promise<Event[]> {
    return Event.findAll({
      where: {
        startDate: {
          [Op.gte]: startDate.toJSDate(),
        },
        endDate: {
          [Op.lte]: endDate.toJSDate(),
        },
      },
    });
  }

  static async createEvent(eventData: EventCreationAttributes): Promise<Event> {
    const event = await Event.create(eventData);
    return event;
  }

  static async updateEvent(
    eventId: string,
    eventData: Partial<EventCreationAttributes>
  ): Promise<Event | null> {
    const event = await Event.findByPk(eventId);
    if (!event) {
      throw new Error("Event not found");
    }
    return event.update(eventData);
  }

  static async deleteEvent(
    eventId: string,
    isSoftDelete: boolean = true
  ): Promise<void> {
    const event = await Event.findByPk(eventId);
    if (!event) {
      throw new Error("Event not found");
    }
    if (event && !isSoftDelete) {
      await event.destroy();
    } else {
      await event.update({ isDeleted: true });
    }
  }
}

export default EventService;
