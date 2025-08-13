import express from "express";
import { connectDB } from "./configs/db.config";
import userRouter from "./modules/User/routes/UserRoutes";
import authRouter from "./modules/Auth/routes/AuthRoutes";
import { eventRouter } from "./modules/Event/routes";
import paymentRouter from "./modules/Payment/route/payment.route";
import ticketRouter from "./modules/Ticket/routes/ticket.route";
import redisClient from "./configs/redis.config";
import { jwtGuard } from "./middleware/jwt.middleware";
import ticketTypeRouter from "./modules/Ticket/routes/ticket-type.route";

const app = express();
app.use(express.json());

// Set up routers
app.use("/api/auth", authRouter);
app.use("/api/users", jwtGuard, userRouter);
app.use("/api/events", jwtGuard, eventRouter);
app.use("/api/tickets", jwtGuard, ticketRouter);
app.use("/api/ticket-types", jwtGuard, ticketTypeRouter);
app.use("/api/payments", jwtGuard, paymentRouter);

(async () => {
  await connectDB();
  await redisClient.connectRedis();
})();

export default app;
