import express from "express";
import { connectDB } from "./configs/db.config";
import userRouter from "./modules/User/routes/UserRoutes";
import authRouter from "./modules/Auth/routes/AuthRoutes";
import redisClient from "./configs/redis.config";
import { jwtGuard } from "./middleware/jwt.middleware";

const app = express();
app.use(express.json());

// Set up routes
app.use("/api/auth", authRouter);
app.use("/api/users", jwtGuard, userRouter);

(async () => {
  await connectDB();
  await redisClient.connectRedis();
})();

export default app;
