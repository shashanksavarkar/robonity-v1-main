import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [3, 'Name must be at least 3 characters long']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please fill a valid email address'
        ]
    },
    password: {
        type: String,
        minlength: [6, 'Password must be at least 6 characters long']
    },
    avatar: { type: String, default: "/default-avatar.png" },
    provider: { type: String, default: "local" },
}, { timestamps: true });

export default mongoose.model("User", userSchema);
