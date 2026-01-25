import twilio from 'twilio';
import RoboshareUser from '../models/RoboshareUser.js';

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendOTP = async (req, res) => {
    const { mobile, email, rollNo } = req.body;
    const emailOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const mobileOtp = Math.floor(100000 + Math.random() * 900000).toString();

    try {
        if (!email.toLowerCase().endsWith("@gsv.ac.in")) {
            return res.status(403).json({ message: "Access restricted to @gsv.ac.in emails" });
        }

        await RoboshareUser.findOneAndUpdate(
            { email: email.toLowerCase() },
            {
                mobile,
                rollNo,
                emailOtp,
                mobileOtp,
                isVerified: false
            },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        console.log(`>>> [MOCK EMAIL] OTP for ${email}: ${emailOtp} <<<`);
        console.log(`>>> [MOBILE] Sending OTP to ${mobile}: ${mobileOtp} <<<`);

        // Send Mobile OTP via Twilio
        await client.messages.create({
            body: `RoboShare Verificaton.\nMobile OTP: ${mobileOtp}\nEmail OTP: ${emailOtp} (Sent to email)`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: mobile
        });

        res.status(200).json({ message: "OTPs sent to Email and Mobile" });
    } catch (error) {
        console.error("OTP Send Error:", error);
        res.status(200).json({ message: "Check backend terminal for OTPs (Dev Mode)" });
    }
};

export const verifyOTP = async (req, res) => {
    const { email, emailOtp, mobileOtp } = req.body;
    try {
        const user = await RoboshareUser.findOne({ email: email.toLowerCase() });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isEmailValid = user.emailOtp && user.emailOtp === emailOtp.toString();
        const isMobileValid = user.mobileOtp && user.mobileOtp === mobileOtp.toString();

        if (isEmailValid && isMobileValid) {
            user.isVerified = true;
            user.emailOtp = null;
            user.mobileOtp = null;
            await user.save();
            return res.status(200).json({ message: "Verification Successful", user });
        }

        if (!isEmailValid && !isMobileValid) return res.status(400).json({ message: "Both OTPs are invalid" });
        if (!isEmailValid) return res.status(400).json({ message: "Invalid Email OTP" });
        if (!isMobileValid) return res.status(400).json({ message: "Invalid Mobile OTP" });

    } catch (error) {
        res.status(500).json({ message: "Verification error" });
    }
};