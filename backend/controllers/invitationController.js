import Invitation from "../model/invitations.js";
import Contact from "../model/contacts.js";
import User from "../model/user.js";
import { logger } from "../config/Logger.js";

// sends an invite to other user : 
export const createInvitation = async (req, res) => {
  const { recipientUser, senderId } = req.body;
  // todo : collect the senderId from the req.userId ( after middle ware auth_) : 
    if (!recipientUser || !senderId) {
    res.status(400)
      .json({ message: "recipientUser and senderId are required" });
  }
  if (recipientUser === senderId) {
    logger.error("You can't send invitation to yourself");
    res.status(400).json({ message: "You can't send invitation to yourself" });
  }

  try {
    const invitationExists = await Invitation.findOne({
      recipientUser,
      senderId,
    });
    if (invitationExists) {
      res.status(400).json({ message: "Invitation already sent" });
    }
    const addContact = await Contact.findOne({}).or([
      { userA: recipientUser, userB: senderId },
    ]);

    const invitation = new Invitation({
      recipientUser,
      senderId,
    });

    await invitation.save();
    logger.info(`Invitation sent to ${recipientUser}`);
    res.status(201).json({ invitation });
    // todo : send notification to recipientUser
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// accepts the invitation : 
export const acceptInvitation = async (req, res) => {
  const { userId  } = req.body;
  if (!userId) {
    res.status(400).json({ message: "userId is required" });
    return;
  }
  try {
    const invitation = await Invitation.findOne({ senderId: userId });
    if (!invitation) {
      res.status(404).json({ message: "Invitation not found" });
      return;
    }
    const newContact = new Contact({
      userA: invitation.senderId,
      userB: invitation.recipientUser,
    });
    await newContact.save();
    await Invitation.findByIdAndDelete(invitation._id);
    logger.info("Invitation accepted" , invitation.senderId, invitation.recipientUser)
    res.status(200).json({ message: "Invitation accepted" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};



// search user by name or email : to send invite mainly ;
export const searchUsers = async (req, res) => {
  let searchQuery = req.params.searchQuery;
  if (!searchQuery) {
    res.status(400).json({ message: "searchQuery is required" });
  }
  searchQuery = searchQuery.trim();
  try {
    const users = await User.find({
      $or: [
        { name: { $regex: searchQuery, $options: "i" } },
        { email: { $regex: searchQuery, $options: "i" } },
      ],
    });
    return res.status(200).json({ users });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Internal server error...." });
  }
};


// get all invitations of a user : 
export const getInvitations = async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    logger.error("userId is required" , userId);
    return res.status(400).json({ message: "userId is required" });
  }
  try {
    const invitations = await Invitation.find({
      recipientUser: userId,
    }).populate({
      path: "senderId",
      select: "username email profile",
    });
    const senderIds = invitations.map((invitation) => invitation.senderId);
    res.status(200).json({ senderIds });
  } catch (error) {
    logger.error("Error fetching invitations:", error);
    console.error("Error fetching invitations:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
