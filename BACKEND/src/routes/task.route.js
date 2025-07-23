import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import {
  createTask,
  deleteTask,
  getAllTask,
  updateTask,
  updateTaskCount,
  updateTaskStatus,
} from "../controllers/task.controller.js";

export const taskRoute = express.Router();

taskRoute.post("/create", isAuth, createTask);
taskRoute.get("/all-task", isAuth, getAllTask);
taskRoute.delete("/delete/:id", isAuth, deleteTask);
taskRoute.put("/update/:id", isAuth, updateTask);
taskRoute.get("/count", isAuth, updateTaskCount);
taskRoute.put("/update-status/:id", isAuth, updateTaskStatus);
