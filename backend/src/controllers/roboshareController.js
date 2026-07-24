import jwt from 'jsonwebtoken';
import RoboshareUser from '../models/RoboshareUser.js';
import { sendEmail } from '../services/mailerService.js';
import { otpEmailTemplate } from '../utils/emailTemplates.js';
import logger from '../config/logger.js';

export const sendOTP = async (req, res) => {
    const { email, rollNo } = req.body;
    const emailOtp = Math.floor(100000 + Math.random() * 900000).toString();

    try {
        if (!email.toLowerCase().endsWith("@gsv.ac.in")) {
            return res.status(403).json({ message: "Access restricted to @gsv.ac.in emails" });
        }

        await RoboshareUser.findOneAndUpdate(
            { email: email.toLowerCase() },
            {
                rollNo,
                emailOtp,
                isVerified: false
            },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        // Email is the only verification channel, so a failed send must be
        // surfaced to the user — there's no other way for them to get the code.
        try {
            await sendEmail({
                to: email,
                subject: "Your RoboShare Verification Code",
                text: `Your RoboShare verification code is: ${emailOtp}\n\nThis code expires in 10 minutes. If you didn't request this, you can ignore this email.`,
                html: otpEmailTemplate(emailOtp),
            });
        } catch (emailError) {
            logger.error('Failed to send email OTP: ' + (emailError.response?.data ? JSON.stringify(emailError.response.data) : emailError.message));
            return res.status(502).json({ message: "Failed to send verification email. Please try again." });
        }

        res.status(200).json({ message: "OTP sent to your email" });
    } catch (error) {
        logger.error("OTP Send Error: " + error.message);
        res.status(500).json({ message: "Failed to send OTP. Please try again." });
    }
};

export const verifyOTP = async (req, res) => {
    const { email, emailOtp } = req.body;
    try {
        const user = await RoboshareUser.findOne({ email: email.toLowerCase() });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isEmailValid = user.emailOtp && user.emailOtp === emailOtp.toString();
        if (!isEmailValid) return res.status(400).json({ message: "Invalid OTP" });

        user.isVerified = true;
        user.emailOtp = null;
        await user.save();

        const token = jwt.sign({ id: user._id, type: 'roboshare' }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({ message: "Verification Successful", user, token });
    } catch (error) {
        res.status(500).json({ message: "Verification error" });
    }
};
