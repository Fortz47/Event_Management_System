import { Request, Response } from "express";
import EventParticipantService from "../services/event-participant.service";
import {
  createEventParticipantDto,
  updateEventParticipantDto,
} from "../../../schemas/event.schema";

class EventParticipantController {
  async create(req: Request, res: Response) {
    const participantData: createEventParticipantDto = req.body;
    try {
      const participant =
        await EventParticipantService.createEventParticipant(participantData);
      res.status(201).json({
        message: "Participant created successfully.",
        participant,
      });
    } catch (error) {
      res.status(400).json({ message: "Failed to create participant", error });
    }
  }

  async getEventParticipantById(req: Request, res: Response) {
    const { participantId } = req.query;

    if (!participantId) {
      res.status(400).json({ message: "Participant ID is required" });
      return;
    }
    try {
      const participant = await EventParticipantService.getEventParticipantById(
        participantId.toString()
      );
      if (!participant) {
        res.status(404).json({ message: "Participant not found" });
        return;
      }
      res.status(200).json({
        message: "Participant retrieved successfully.",
        participant,
      });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Failed to retrieve participant", error });
    }
  }

  async getAllParticipantsByEventId(req: Request, res: Response) {
    const { eventId } = req.params;
    try {
      const participants =
        await EventParticipantService.getAllParticipantsByEventId(eventId);
      res.status(200).json({
        message: "Participants retrieved successfully.",
        participants,
      });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Failed to retrieve participants", error });
    }
  }

  async addParticipantToEvent(req: Request, res: Response) {
    const { eventId } = req.params;
    const { userId } = req.body;
    try {
      await EventParticipantService.addParticipantToEvent(userId, eventId);
      res
        .status(200)
        .json({ message: "Participant added to event successfully." });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Failed to add participant to event", error });
    }
  }

  async updateParticipantData(req: Request, res: Response) {
    const { participantId } = req.query;
    const participantData: updateEventParticipantDto = req.body;

    if (!participantId) {
      res.status(400).json({ message: "Participant ID is required" });
      return;
    }
    try {
      const updatedParticipant =
        await EventParticipantService.updateParticipantData(
          participantId.toString(),
          participantData
        );
      res.status(200).json({
        message: "Participant data updated successfully.",
        participant: updatedParticipant,
      });
    } catch (error) {
      res.status(400).json({ message: "Failed to update participant", error });
    }
  }

  async removeParticipantFromEvent(req: Request, res: Response) {
    const { eventId } = req.params;
    const { userId } = req.query;

    if (!userId) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }
    try {
      await EventParticipantService.removeParticipantFromEvent(
        userId.toString(),
        eventId
      );
      res
        .status(200)
        .json({ message: "Participant removed from event successfully." });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Failed to remove participant from event", error });
    }
  }

  async removeParticipantsFromEvent(req: Request, res: Response) {
    const { eventId } = req.params;
    const { userIds } = req.body;
    try {
      await EventParticipantService.removeParticipantsFromEvent(
        userIds,
        eventId
      );
      res
        .status(200)
        .json({ message: "Participants removed from event successfully." });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Failed to remove participants from event", error });
    }
  }
}

export default EventParticipantController;
