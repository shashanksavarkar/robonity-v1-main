import generateToken from "../utils/generateToken.js";

export const oauthSuccess = (req, res) => {
  const user = req.user;

  const token = generateToken(user._id);

  const redirectUrl = `${process.env.FRONTEND_URL}/oauth-success?token=${token}&name=${encodeURIComponent(
      user.name
  )}&avatar=${encodeURIComponent(user.avatar)}`;

  res.redirect(redirectUrl);
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // TEMP response (until DB logic)
    res.status(201).json({
      id: Date.now(),
      name,
      email,
    });
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
};

export const loginUser = async (req, res) => {
  res.status(200).json({ message: "Login OK (dummy)" });
};
