import express from "express";
import { connectDB } from "./configs/db.config";
import userRouter from "./modules/UserManagement/routes/UserRoutes";
import authRouter from "./modules/Auth/routes/AuthRoutes";
import redisClient from "./configs/redis.config";

const app = express();
app.use(express.json());

// Set up routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

(async () => {
  await connectDB();
  await redisClient.connectRedis();
})();

export default app;
