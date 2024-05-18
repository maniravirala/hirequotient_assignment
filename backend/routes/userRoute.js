import express from "express"
import { getStatus, updateStatus } from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.get("/get/status/:id" , getStatus );

userRouter.post("/update/status" ,updateStatus);

export default userRouter; 