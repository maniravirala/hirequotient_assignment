import Contact from "../model/contacts.js";
import User from "../model/user.js";
import { logger } from "../config/Logger.js";


// Gets the contacts of the user : GET /contacts
export const getContacts = async (req, res) => {
  try {
    const userId = req.userId;

    const contacts = await Contact.find({
      $or: [{ userA: userId }, { userB: userId }],
    }).populate([
      { path: "userA", select: "-password -createdAt -updatedAt -__v" },
      { path: "userB", select: "-password -createdAt -updatedAt -__v" },
    ]);

    const userIdMap = new Map();

    contacts.forEach((contact) => {
      const userAId = contact.userA._id.toString();
      const userBId = contact.userB._id.toString();
      if (userAId !== userId) userIdMap.set(userAId, contact.userA);
      if (userBId !== userId) userIdMap.set(userBId, contact.userB);
    });

    const filteredContacts = Array.from(userIdMap.values());

    res.status(200).json(filteredContacts);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: error.message });
  }
};

