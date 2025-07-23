import express from "express";
import env from "dotenv";
import cookieParser from "cookie-parser";
import { userRoute } from "./routes/user.route.js";
import { errorHandler } from "./utils/errorHandler.js";
import cors from "cors";
import { taskRoute } from "./routes/task.route.js";
env.config({});

export const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
//routes

app.use("/api/v1/user", userRoute);
app.use("/api/v1/task", taskRoute);

app.use(errorHandler);
