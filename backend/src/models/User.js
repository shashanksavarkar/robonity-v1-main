import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: String,
    avatar: { type: String, default: "/default-avatar.png" },
    provider: { type: String, default: "local" },
}, { timestamps: true });

export default mongoose.model("User", userSchema);
