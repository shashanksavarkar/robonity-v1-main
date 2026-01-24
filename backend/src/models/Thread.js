import mongoose from "mongoose";

const replySchema = mongoose.Schema({
    text: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now }
});

const threadSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }, // Added content field explicitly
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    replies: [replySchema],
    views: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Thread", threadSchema);
