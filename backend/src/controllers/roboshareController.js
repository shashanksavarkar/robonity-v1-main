import twilio from 'twilio';
import RoboshareUser from '../models/RoboshareUser.js';

// Initialize Twilio client
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

export const sendOTP = async (req, res) => {
    const { mobile, email } = req.body;
    // Generate 6-digit OTP
    const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();

    try {
        // 1. Strict Domain Validation
        if (!email.toLowerCase().endsWith("@gsv.ac.in")) {
            return res.status(403).json({ message: "Registration restricted to @gsv.ac.in domain." });
        }

        // 2. Database Update: Save OTP temporarily
        // We use upsert so it creates a new record if the email doesn't exist
        await RoboshareUser.findOneAndUpdate(
            { email },
            { mobile, otp: generatedOTP },
            { upsert: true, new: true }
        );

        // 3. Terminal Fallback (Crucial for testing)
        console.log(`-----------------------------------------`);
        console.log(`OTP for ${email} (${mobile}): ${generatedOTP}`);
        console.log(`-----------------------------------------`);

        // 4. Send SMS via Twilio
        await client.messages.create({
            body: `Your RoboShare verification code is: ${generatedOTP}`,
            from: twilioNumber,
            to: mobile // Ensure frontend sends this with country code (e.g., +91)
        });

        res.status(200).json({ message: "OTP sent successfully!" });

    } catch (error) {
        // Detailed error logging to debug the "Failed to send" issue
        console.error("Twilio Error Detail:", error.message);
        
        // If Twilio fails (e.g., unverified number), we still return a 200 during testing
        // so you can use the OTP from your terminal to proceed.
        res.status(500).json({ 
            message: `Twilio Error: ${error.message}. Check if your mobile number is verified in Twilio Console.` 
        });
    }
};

export const verifyOTP = async (req, res) => {
    const { email, otp, rollNo, password, mobile } = req.body;

    try {
        // Find user by email
        const user = await RoboshareUser.findOne({ email });

        // Check if user exists and OTP matches
        if (user && user.otp === otp) {
            user.rollNo = rollNo;
            user.password = password; // Note: Use bcrypt to hash this in production!
            user.mobile = mobile;
            user.isVerified = true;
            user.otp = null; // Clear OTP after successful verification
            
            await user.save();
            
            res.status(200).json({ message: "Verification successful! Welcome to RoboShare." });
        } else {
            res.status(400).json({ message: "Invalid or expired OTP. Please try again." });
        }
    } catch (error) {
        console.error("Verification Error:", error.message);
        res.status(500).json({ message: "Server error during verification." });
    }
};