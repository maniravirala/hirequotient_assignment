import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { authRoute } from "./routes/authRoute.js";
import dbConnection from "./config/dbConfig.js";
import { inviationRoute } from "./routes/invitationRoute.js";
import { messageRoute } from "./routes/messageRoute.js";
import contactRouter from "./routes/contactsRoute.js";
import { io } from "./socketInstance.js";
import userRouter from "./routes/userRoute.js";
import { logger } from "./config/Logger.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
dotenv.config();

app.use("/api/auth", authRoute);
app.use("/api/invitaions", inviationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/contacts", contactRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  logger.info("Server is active : health checked");
  res.send("Server is active");
});

const PORT = 3000;
const server = app.listen(PORT, () => {
  dbConnection();
  logger.info(`Server is active on port ${PORT}`);
  console.log(`Server is active on port ${PORT}`);
});

io.attach(server);
