import User from "../model/user.js";
import {logger} from "../config/Logger.js";

export const getStatus = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select("status");
    res.status(200).json(user);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: error.message });
  }
};



export const updateStatus = async (req, res) => {
  try {
    const { status, userId } = req.body;
    const user = await User.findByIdAndUpdate
    (userId, { status }, { new: true });
    logger.info(`Status updated for user ${userId}`);
    res.status(200).json(user);
  }
  catch (error) {
    logger.error(error);
    res.status(500).json({ message: error.message });
  }
}