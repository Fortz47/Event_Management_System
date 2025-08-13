import { Router } from "express";
import TicketController from "../controllers/ticket.controller";

class TicketRouter extends TicketController {
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
    this.router.post("/", this.createTicket);
    this.router.get("/:id", this.getTicketById);
    this.router.get("/", this.getTicketsByUserId);
    this.router.get("/events/:eventId", this.getTicketsByEventIdAndUserId);
    this.router.put("/:id", this.updateTicket);
    this.router.delete("/:id", this.deleteTicket);
    // this.router.get("/", this.getAllTickets);
  }
}

const ticketRouter = new TicketRouter().router;
export default ticketRouter;
