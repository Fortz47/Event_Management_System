import { Request, Response } from "express";
import EventOrganizerService from "../services/event-organizer.service";
import { createEventOrganizerDto } from "../../../schemas/event.schema";

class EventOrganizerController {
  async create(req: Request, res: Response) {
    const organizerData: createEventOrganizerDto = req.body;
    try {
      const organizer =
        await EventOrganizerService.createEventOrganizer(organizerData);
      res.status(201).json({
        message: "Organizer created successfully.",
        organizer,
      });
    } catch (error) {
      res.status(400).json({ message: "Failed to create organizer", error });
    }
  }

  async getOrganizerByEventId(req: Request, res: Response) {
    const { eventId } = req.params;
    try {
      const organizer =
        await EventOrganizerService.getOrganizerByEventId(eventId);
      res.status(200).json({
        message: "Organizer retrieved successfully.",
        organizer,
      });
    } catch (error) {
      res.status(400).json({ message: "Failed to retrieve organizer", error });
    }
  }

  async getCoOrganizersByEventId(req: Request, res: Response) {
    const { eventId } = req.params;
    try {
      const coOrganizers =
        await EventOrganizerService.getCoOrganizersByEventId(eventId);
      res.status(200).json({
        message: "Co-organizers retrieved successfully.",
        coOrganizers,
      });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Failed to retrieve co-organizers", error });
    }
  }

  async addOrganizerToEvent(req: Request, res: Response) {
    const { eventId } = req.params;
    const { userId } = req.body;
    try {
      await EventOrganizerService.addOrganizerToEvent(userId, eventId);
      res
        .status(200)
        .json({ message: "Organizer added to event successfully." });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Failed to add organizer to event", error });
    }
  }

  async addCoOrganizerToEvent(req: Request, res: Response) {
    const { eventId } = req.params;
    const { userId } = req.body;

    try {
      await EventOrganizerService.addCoOrganizerToEvent(
        userId.toString(),
        eventId
      );
      res
        .status(200)
        .json({ message: "Co-organizer added to event successfully." });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Failed to add co-organizer to event", error });
    }
  }

  async removeCoOrganizerFromEvent(req: Request, res: Response) {
    const { eventId } = req.params;
    const { userId } = req.query;

    if (!userId) {
      res.status(400).json({ message: "User ID is required." });
      return;
    }

    try {
      await EventOrganizerService.removeCoOrganizerFromEvent(
        userId.toString(),
        eventId
      );
      res
        .status(200)
        .json({ message: "Co-organizer removed from event successfully." });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Failed to remove co-organizer from event", error });
    }
  }
}

export default EventOrganizerController;
