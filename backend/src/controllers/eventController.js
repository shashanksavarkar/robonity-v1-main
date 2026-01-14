import Event from "../models/Event.js";

export const getEvents = async (req, res) => {
  const events = await Event.find();
  res.json(events);
};
