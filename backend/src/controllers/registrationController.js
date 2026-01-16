import Registration from "../models/Registration.js";

export const createRegistration = async (req, res) => res.status(201).json(await Registration.create(req.body));