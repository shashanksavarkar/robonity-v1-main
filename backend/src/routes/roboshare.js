import express from 'express';
import User from '../models/User.js';
const router = express.Router();

router.post('/register', async (req, res) => {
    const { email, name, password } = req.body;
    if (!email.endsWith('@gsv.ac.in')) return res.status(400).json({ message: "Only GSV emails allowed" });
    try {
        await new User({ email, name, password }).save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;