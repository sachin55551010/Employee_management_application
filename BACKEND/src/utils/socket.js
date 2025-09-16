import express from "express";
import { Server } from "socket.io";
import http from "http";
import { config } from "dotenv";
config();
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://employee-management-application-vert.vercel.app",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

export { app, server, io };
