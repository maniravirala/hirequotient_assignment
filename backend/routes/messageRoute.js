import express from "express";
import {
  botMessage,
  createMessage,
  getMessagesBetweenUsers,
  markMessagesAsRead,
} from "../controllers/messageController.js";

const messageRoute = express.Router();

messageRoute.post("/create-message", createMessage);
messageRoute.get("/gm/:senderId/:recipientId", getMessagesBetweenUsers);
messageRoute.patch("/markasread/:recipientId/:senderId", markMessagesAsRead);

messageRoute.post("/bot-message", botMessage );
export { messageRoute };
