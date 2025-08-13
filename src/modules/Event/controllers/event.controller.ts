import { Request, Response } from "express";
import EventService from "../services/event.service";
import { createEventDto, updateEventDto } from "../../../schemas/event.schema";

class EventController {
  async create(req: Request, res: Response) {
    const data: createEventDto = req.body;
    try {
      const newEvent = await EventService.createEvent(data);
      res
        .status(201)
        .json({ message: "Event created successfully.", event: newEvent });
    } catch (error) {
      res.status(400).json({ message: "Failed to create event", error });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const events = await EventService.getAllEvents();
      res
        .status(200)
        .json({ message: "Events retrieved successfully.", events });
    } catch (error) {
      res.status(400).json({ message: "Failed to retrieve events", error });
    }
  }

  async getById(req: Request, res: Response) {
    const { eventId } = req.params;
    try {
      const event = await EventService.getEventById(eventId);
      if (event) {
        res
          .status(200)
          .json({ message: "Event retrieved successfully.", event });
      } else {
        res.status(404).json({ message: "Event not found." });
      }
    } catch (error) {
      res.status(400).json({ message: "Failed to retrieve event", error });
    }
  }

  async update(req: Request, res: Response) {
    const { eventId } = req.params;
    const data: updateEventDto = req.body;
    try {
      const updatedEvent = await EventService.updateEvent(eventId, data);
      if (updatedEvent) {
        res.status(200).json({
          message: "Event updated successfully.",
          event: updatedEvent,
        });
      } else {
        res.status(404).json({ message: "Event not found." });
      }
    } catch (error) {
      res.status(400).json({ message: "Failed to update event", error });
    }
  }

  async delete(req: Request, res: Response) {
    const { eventId } = req.params;
    try {
      await EventService.deleteEvent(eventId);
      res.status(200).json({ message: "Event deleted successfully." });
    } catch (error) {
      res.status(400).json({ message: "Failed to delete event", error });
    }
  }
}

export default EventController;
