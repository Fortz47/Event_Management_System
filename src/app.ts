import express from "express";
import { connectDB } from "./configs/db.config";
import UserRouter from "./modules/UserManagement/routes/UserRoutes";

const app = express();
app.use(express.json());

// Set up routes
app.use("/api/users", UserRouter);

(async () => await connectDB())();

export default app;
