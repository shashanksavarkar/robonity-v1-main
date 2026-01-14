import Registration from "../models/Registration.js";

export const createRegistration = async (req, res) => {
  const registration = await Registration.create(req.body);
  res.status(201).json(registration);
};