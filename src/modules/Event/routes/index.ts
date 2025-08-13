import { Router } from "express";
import eventRouter from "./event.route";
import eventOrganizerRouter from "./event-organizer.route";
import eventParticipantRouter from "./event-participant.route";

const router = Router();

router.use("/", eventRouter);
router.use("/:eventId/organizers", eventOrganizerRouter);
router.use("/:eventId/participants", eventParticipantRouter);

export { router as eventRouter };
