import { Router } from "express";
import EventController from "../controllers/event.controller";
import { validateRequest } from "../../../middleware/validate-req.middleware";
import {
  createEventSchema,
  updateEventSchema,
} from "../../../schemas/event.schema";

class EventRoute extends EventController {
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
    this.router.post("/", validateRequest(createEventSchema), this.create);
    this.router.get("/", this.getAll);
    this.router.get("/:eventId", this.getById);
    this.router.patch(
      "/:eventId",
      validateRequest(updateEventSchema),
      this.update
    );
    this.router.delete("/:eventId", this.delete);
  }
}

const eventRouter = new EventRoute().router;
export default eventRouter;
