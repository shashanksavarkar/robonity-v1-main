import express from 'express';
const router = express.Router();
// Import the actual functions defined in your controller
import { sendOTP, verifyOTP } from '../controllers/roboshareController.js';

// Define the two-step verification routes
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);

export default router;