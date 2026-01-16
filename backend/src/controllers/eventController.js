import Event from "../models/Event.js";

export const getEvents = async (req, res) => res.json(await Event.find());
