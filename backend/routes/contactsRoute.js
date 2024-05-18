import express from "express"
import {getContacts} from "../controllers/contactsController.js"
import verifyToken from "../middleware/verify.js";

const contactRouter = express.Router()

contactRouter.get("/get/:id" ,verifyToken ,   getContacts );



export default contactRouter