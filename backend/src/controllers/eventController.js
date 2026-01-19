import Event from "../models/Event.js";

export const getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
