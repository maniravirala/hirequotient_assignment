import mongoose from "mongoose";

const invitationSchema = new mongoose.Schema({
  recipientUser: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  }, 
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, 
  sentAt: { type: Date, default: Date.now },
});

export default mongoose.model("Invitation", invitationSchema);
