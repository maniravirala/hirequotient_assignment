import express from "express";
import { createInvitation , acceptInvitation, searchUsers, getInvitations } from "../controllers/invitationController.js";

const inviationRoute = express.Router();

inviationRoute.post("/send", createInvitation);

inviationRoute.post("/accept" , acceptInvitation)

inviationRoute.get("/search/:searchQuery" , searchUsers)

inviationRoute.get("/get/:userId" , getInvitations )

export { inviationRoute };
