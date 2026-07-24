import express from 'express';
import { sendOTP, verifyOTP } from '../controllers/roboshareController.js';
import { getResources, createResource } from '../controllers/roboshareResourceController.js';
import { protectRoboshare } from '../middlewares/authMiddleware.js';

const router = express.Router();
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);

router.route('/resources')
    .get(protectRoboshare, getResources)
    .post(protectRoboshare, createResource);

export default router;