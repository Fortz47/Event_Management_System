import { Router } from "express";
import TicketTypeController from "../controllers/ticket-type.controller";

class TicketType extends TicketTypeController {
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
    this.router.post("/", this.createTicketType);
    this.router.get("/:id", this.getTicketTypeById);
    this.router.get("/events/:eventId", this.getAllTicketTypesByEventId);
  }
}

const ticketTypeRouter = new TicketType().router;
export default ticketTypeRouter;
