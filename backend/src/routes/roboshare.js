// routes/roboshare.js (Node/Express)
router.post('/register', async (req, res) => {
    const { email, name, password } = req.body;

    // Strict Backend Validation
    if (!email.endsWith('@gsv.ac.in')) {
        return res.status(400).json({ message: "Only GSV emails allowed" });
    }

    try {
        const newUser = new User({ email, name, password });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});