import mongoose from "mongoose";
import { defaultAdmin } from "../controllers/user.controller.js";

export const connectMongoDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_SERVER_URL);
    console.log(`Mongo connected at : ${conn.connection.host}`);
    defaultAdmin();
  } catch (error) {
    console.log("MongoDB error : ", error);
  }
};
