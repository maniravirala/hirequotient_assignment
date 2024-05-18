import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: {
      type: String,
      enum: ["availble", "offline", "busy"],
      default: "offline",
    },
    bio: { type: String },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
