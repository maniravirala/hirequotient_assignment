import User from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { logger } from "../config/Logger.js";

export const register = async (req, res, next) => {
  const { email, password, username } = req.body;
  logger.info("ip address: ", req.ip);
  logger.info("Registering user");
  if (!email || !password || !username) {
    logger.error("All fields are required");
    return res
      .status(400)
      .json({ email, password, username, message: "All fields are required" });
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      email,
      password: hashedPassword,
      username,
    });
    logger.info(`User ${user.name} registered successfully`);
    res.status(201).json({ user: { ...user._doc, password: null } });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};



export const login = async (req, res) => {
  const { email, password } = req.body;
  logger.info("ip address: ", req.ip);
  logger.info("Logging in user");
  if (!email || !password) {
    logger.error("Email and password are required");
    return res
      .status(400)
      .json({ email, password, message: "Email and password are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign({ email: user.email, id: user._id }, "bankai_salt", {
      expiresIn: "1h",
    });
    logger.info(`User ${user.name} logged in successfully`);
    res.status(200).json({ user: { ...user._doc, password: null }, token });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: "Logged out" });
};
