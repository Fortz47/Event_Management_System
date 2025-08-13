import Event from "../models/event.model";
import { EventParticipant } from "../models/event-participant.model";
import { Op } from "sequelize";
import { EventParticipantCreationAttributes } from "../../../interfaces/event-participant.interface";

class EventParticipantService {
  static async getEventParticipantById(participantId: string) {
    const participant = await EventParticipant.findByPk(participantId);
    if (!participant) {
      throw new Error("Participant not found");
    }
    return participant;
  }

  static async getAllParticipantsByEventId(eventId: string) {
    const participants = await EventParticipant.findAll({
      where: {
        eventId,
      },
      order: [["createdAt", "DESC"]],
    });
    return participants;
  }

  static async getAllEventParticipantsByEventTitle(
    eventTitle: string,
    limit: number = 10,
    offset: number = 0
  ) {
    const participants = await EventParticipant.findAll({
      include: [
        {
          model: Event,
          where: {
            title: {
              [Op.like]: `%${eventTitle}%`, // Case-insensitive search
            },
          },
          attributes: ["id", "title"],
        },
      ],
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });
    return participants;
  }

  static async createEventParticipant(
    data: EventParticipantCreationAttributes
  ) {
    const participant = await EventParticipant.create(data);
    return participant;
  }

  static async addParticipantToEvent(
    participant: EventParticipant,
    eventId: string
  ) {
    const event = await Event.findByPk(eventId);
    if (!event) {
      throw new Error("Event not found");
    }
    await event.addAttendee(participant);
  }

  static async updateParticipantData(
    participantId: string,
    participantData: Partial<EventParticipantCreationAttributes>
  ) {
    const participant = await EventParticipant.findByPk(participantId);
    if (!participant) {
      throw new Error("Participant not found");
    }
    return participant.update(participantData);
  }

  static async removeParticipantFromEvent(
    participantId: string,
    eventId: string
  ) {
    const event = await Event.findByPk(eventId);
    if (!event) {
      throw new Error("Event not found");
    }
    const participant = await EventParticipant.findByPk(participantId);
    if (!participant) {
      throw new Error("Participant not found");
    }
    await event.removeAttendee(participant);
  }

  static async removeParticipantsFromEvent(
    participantIds: string[],
    eventId: string
  ) {
    const event = await Event.findByPk(eventId);
    if (!event) {
      throw new Error("Event not found");
    }
    await event.removeAttendees(participantIds);
  }
}

export default EventParticipantService;
