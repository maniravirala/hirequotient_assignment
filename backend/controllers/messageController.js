import Message from "../model/message.js";
import { io, userSocketMap } from "../socketInstance.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import {logger} from "../config/Logger.js";
dotenv.config();

export const createMessage = async (req, res) => {
  const { recipientId, content, contentType, senderId, busy  } = req.body;
  try {
    if (!recipientId || !senderId) {
      return res.status(400).json({
        message: "recipientId, content, contentType, and senderId are required",
      });
    }

    const message = await Message.create({
      recipientId,
      content,
      contentType,
      senderId,
    });
    await message.save();
    const recipientSocketId = userSocketMap.get(recipientId);

    if (busy) {
      const response = await getGeminiResponse(content, content);
      const message = await Message.create({
        recipientId: senderId,
        content: response,
        contentType: "text",
        senderId: recipientId,
      });
      await message.save();  
      const senderSocketId = userSocketMap.get(senderId);
      io.to(senderSocketId).emit("new-message", message);
      markMessagesAsDelivered(recipientId, senderId);
      logger.info(`Message sent to ${recipientId} by bot`);
    }
    io.to(recipientSocketId).emit("new-message", message);
    logger.info(`Message sent to ${recipientId} from ${senderId}`);
    return res.status(201).json({ message });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const getMessagesBetweenUsers = async (req, res) => {
  const { senderId, recipientId } = req.params;
  const messages = await Message.find({
    $or: [
      { senderId, recipientId },
      { senderId: recipientId, recipientId: senderId },
    ],
  });
  res.status(200).json({ messages });
};

const markMessagesAsDelivered = async (recipientId, senderId) => {
  try {
    await Message.updateMany(
      {
        recipientId,
        senderId,
        "status.delivered": false,
      },
      {
        $set: {
          "status.delivered": true,
          "status.deliveredAt": new Date(),
        },
      }
    );
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const markMessagesAsRead = async (req, res) => {
  const { recipientId, senderId } = req.params;

  if (!recipientId || !senderId) {
    console.error("recipientId and senderId are required");
    return res.status(400).json({
      message: "recipientId and senderId are required",
    });
  }

  try {
    await Message.updateMany(
      {
        recipientId,
        senderId,
        "status.delivered": true || false,
        "status.read": false,
      },
      {
        $set: {
          "status.read": true,
          "status.readAt": new Date(),
        },
      }
    );

    res.status(200).json({
      message: "messages marked as read",
    });
    logger.info(`Messages marked as read between ${recipientId} and ${senderId}`);
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export async function getGeminiResponse(message, username) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const prompt = `
  "${message}":
  you are responding instead of ${username}
  you are a chat bot assintant , you are responding instead of user ${username}
  you should give relevant response to the user
  response should be relevant to the user
  it should be short and precise
  if you dont know the answer say i will get back to you soon i am away that kind of response .
  `;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}

export const botMessage = async (req, res) => {
  const { content, recipientId, senderId } = req.body;
  if (!content || !recipientId || !senderId) {
    return res.status(400).json({
      message: "content, username, recipientId, and senderId are required",
    });
  }
  await markMessagesAsDelivered(recipientId, senderId);
  await new Message({
    recipientId,
    content,
    contentType: "text",
    senderId,
  }).save();
  const response = await getGeminiResponse(content, content);
  const newmessage = await new Message({
    recipientId: senderId,
    content: response,
    contentType: "text",
    senderId: recipientId,
  });
  await newmessage.save();
  const recipientSocketId = userSocketMap.get("senderId");
  io.to(recipientSocketId).emit("new-message", newmessage);
  res.status(200).json({ response });
};
