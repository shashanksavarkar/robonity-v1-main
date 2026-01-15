import twilio from 'twilio';
import RoboshareUser from '../models/RoboshareUser.js';

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendOTP = async (req, res) => {
    const { mobile, email } = req.body;
    // Force OTP to be a string immediately
    const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();

    try {
        if (!email.toLowerCase().endsWith("@gsv.ac.in")) {
            return res.status(403).json({ message: "Use @gsv.ac.in email only" });
        }

        // SAVE/UPDATE: Using findOneAndUpdate with upsert:true is the most reliable way 
        // to ensure the user exists in the DB before they try to verify.
        await RoboshareUser.findOneAndUpdate(
            { email: email.toLowerCase() },
            { 
                mobile, 
                otp: generatedOTP,
                isVerified: false // Reset verification status if they are re-requesting
            },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        console.log(`-----------------------------------------`);
        console.log(`>>> TEST OTP for ${email}: ${generatedOTP} <<<`);
        console.log(`-----------------------------------------`);

        await client.messages.create({
            body: `Your RoboShare code is: ${generatedOTP}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: mobile
        });

        res.status(200).json({ message: "OTP sent" });
    } catch (error) {
        console.error("Twilio/DB Error:", error.message);
        // Still return 200 during testing if you can see OTP in terminal
        res.status(200).json({ message: "Check terminal for OTP (Twilio Trial restriction)" });
    }
};

export const verifyOTP = async (req, res) => {
    const { email, otp, rollNo} = req.body; // removed password for trial

    try {
        const user = await RoboshareUser.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(400).json({ message: "User not found. Please register again." });
        }

        // DEBUG: See exactly what the DB has vs what you typed
        console.log(`Verifying: ${email} | DB_OTP: "${user.otp}" | Sent_OTP: "${otp}"`);

        // FORCE STRING COMPARISON: user.otp and otp must both be strings
        if (user.otp && user.otp.toString() === otp.toString()) {
            user.rollNo = rollNo;
            // user.password = password; 
            user.isVerified = true;
            user.otp = null; // Clear OTP so it can't be used again
            
            await user.save();
            return res.status(200).json({ message: "Success" });
        } else {
            return res.status(400).json({ message: "Invalid or expired OTP code." });
        }
    } catch (error) {
        console.error("Verification Error:", error.message);
        return res.status(500).json({ message: "Server error during verification" });
    }
};