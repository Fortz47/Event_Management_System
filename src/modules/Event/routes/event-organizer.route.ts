import { Router } from "express";
import EventOrganizerController from "../controllers/event-organizer.controller";
import { validateRequest } from "../../../middleware/validate-req.middleware";
import { addEventOrganizerSchema } from "../../../schemas/event.schema";

class EventOrganizerRoute extends EventOrganizerController {
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
    this.router.get("/", this.getOrganizerByEventId);
    this.router.post(
      "/",
      validateRequest(addEventOrganizerSchema),
      this.addOrganizerToEvent
    );

    this.router.get("/co-organizers", this.getCoOrganizersByEventId);
    this.router.post(
      "/co-organizers",
      validateRequest(addEventOrganizerSchema),
      this.addCoOrganizerToEvent
    );
    this.router.delete("/co-organizers", this.removeCoOrganizerFromEvent);
  }
}

const eventOrganizerRouter = new EventOrganizerRoute().router;
export default eventOrganizerRouter;
