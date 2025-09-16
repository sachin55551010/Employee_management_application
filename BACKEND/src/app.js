import express from "express";
import { app, io, server } from "./utils/socket.js";
import cookieParser from "cookie-parser";
import { userRoute } from "./routes/user.route.js";
import { errorHandler } from "./utils/errorHandler.js";
import cors from "cors";
import { taskRoute } from "./routes/task.route.js";
import { connectMongoDB } from "./utils/connectMongoDB.js";

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.PRODUCTION_FRONTEND_URL],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors()); // <-- handle preflight globally

//routes
app.get("/", (_, res) => {
  return res.status(200).send("App working fine !");
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/task", taskRoute);
export const getReceiverSocketId = (userId) => {
  return userSocketMap[userId];
};
app.use(errorHandler);
const userSocketMap = {};
io.on("connection", (socket) => {
  console.log("User connected : ", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;
  console.log(userSocketMap);

  socket.on("disconnect", () => {
    console.log("User disconncted", socket.id);
  });
});
connectMongoDB();
const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`App server running on port : ${PORT}`);
});
