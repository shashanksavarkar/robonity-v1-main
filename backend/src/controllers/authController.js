import generateToken from "../utils/generateToken.js";

export const oauthSuccess = (req, res) => {
  const { _id, name, avatar } = req.user;
  res.redirect(`${process.env.FRONTEND_URL}/oauth-success?token=${generateToken(_id)}&name=${encodeURIComponent(name)}&avatar=${encodeURIComponent(avatar)}`);
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "All fields are required" });
    res.status(201).json({ id: Date.now(), name, email });
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
};

export const loginUser = async (req, res) => res.status(200).json({ message: "Login OK" });
