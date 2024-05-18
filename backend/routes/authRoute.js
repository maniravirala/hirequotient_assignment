import { login, register } from "../controllers/authController.js";
import express from "express";
import rateLimit from "express-rate-limit";

const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attempts from this IP, please try again later.",
  standardHeaders: true,
});

const signupRateLimiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 5,
  message:
    "Too many accounts created from this IP, please try again after an hour",
});


const authRoute = express.Router();

authRoute.post("/register", signupRateLimiter ,  register);

authRoute.post("/login", loginRateLimiter,   login);

export { authRoute };
