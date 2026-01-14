import generateToken from "../utils/generateToken.js";

export const oauthSuccess = (req, res) => {
  const user = req.user;

  const token = generateToken(user._id);

  const redirectUrl = `${process.env.FRONTEND_URL}/oauth-success?token=${token}&name=${encodeURIComponent(
      user.name
  )}&avatar=${encodeURIComponent(user.avatar)}`;

  res.redirect(redirectUrl);
};
