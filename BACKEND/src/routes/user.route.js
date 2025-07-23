import express from "express";
import {
  getAllUsers,
  login,
  logout,
  profile,
  signup,
} from "../controllers/user.controller.js";
import { isAuth } from "../middlewares/isAuth.js";

export const userRoute = express.Router();

userRoute.post("/signup", signup);
userRoute.post("/login", login);
userRoute.post("/logout", logout);
userRoute.get("/profile", isAuth, profile);
userRoute.get("/all-users", getAllUsers);
