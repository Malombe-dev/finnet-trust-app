import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    role: { type: String, default: "Member", trim: true },
    company: { type: String, default: "", trim: true },
    avatarColor: { type: String, default: "#1B3A4B" },
    bio: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
