import express from "express";
import connectDB from "./configs/db";


const app = express();
app.use(express.json());

(async () => await connectDB())();

export default app;