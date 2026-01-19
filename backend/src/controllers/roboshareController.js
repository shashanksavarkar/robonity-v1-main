import twilio from 'twilio';
import RoboshareUser from '../models/RoboshareUser.js';

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendOTP = async (req, res) => {
    const { mobile, email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    try {
        if (!email.toLowerCase().endsWith("@gsv.ac.in")) return res.status(403).json({ message: "Use @gsv.ac.in email only" });
        await RoboshareUser.findOneAndUpdate({ email: email.toLowerCase() }, { mobile, otp, isVerified: false }, { upsert: true, new: true, setDefaultsOnInsert: true });
        console.log(`>>> OTP for ${email}: ${otp} <<<`);
        await client.messages.create({ body: `Your RoboShare code is: ${otp}`, from: process.env.TWILIO_PHONE_NUMBER, to: mobile });
        res.status(200).json({ message: "OTP sent" });
    } catch (error) {
        res.status(200).json({ message: "Check terminal for OTP (Twilio Trial)" });
    }
};

export const verifyOTP = async (req, res) => {
    const { email, otp, rollNo } = req.body;
    try {
        const user = await RoboshareUser.findOne({ email: email.toLowerCase() });
        if (!user) return res.status(400).json({ message: "User not found" });
        if (user.otp && user.otp.toString() === otp.toString()) {
            user.rollNo = rollNo; user.isVerified = true; user.otp = null;
            await user.save();
            return res.status(200).json({ message: "Success" });
        }
        res.status(400).json({ message: "Invalid OTP" });
    } catch (error) {
        res.status(500).json({ message: "Verification error" });
    }
};