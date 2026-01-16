import mongoose from 'mongoose';

const roboshareSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    rollNo: { type: String, required: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    otp: { type: String },
    isVerified: { type: Boolean, default: false },
    registeredAt: { type: Date, default: Date.now }
});

export default mongoose.model('RoboshareUser', roboshareSchema);