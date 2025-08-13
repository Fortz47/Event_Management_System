import { Router } from "express";
import EventParticipantController from "../controllers/event-participant.controller";
import { validateRequest } from "../../../middleware/validate-req.middleware";
import {
  addEventParticipantSchema,
  updateEventParticipantSchema,
} from "../../../schemas/event.schema";

class EventParticipantRoute extends EventParticipantController {
  private _router: Router;

  constructor() {
    super();
    this._router = Router();
    this.initializeRoutes();
  }

  get router() {
    return this._router;
  }

  private initializeRoutes() {
    this.router.post(
      "/",
      validateRequest(addEventParticipantSchema),
      this.addParticipantToEvent
    );
    this.router.get("/", this.getAllParticipantsByEventId);
    this.router.get("/:participantId", this.getEventParticipantById);
    this.router.patch(
      "/",
      validateRequest(updateEventParticipantSchema),
      this.updateParticipantData
    );
    this.router.delete("/", this.removeParticipantFromEvent);
  }
}

const eventParticipantRouter = new EventParticipantRoute().router;
export default eventParticipantRouter;
