import AboutItem from '../models/AboutItem.js';
import Developer from '../models/Developer.js';

export const getAboutItems = async (req, res) => {
    try {
        const items = await AboutItem.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getDevelopers = async (req, res) => {
    try {
        const devs = await Developer.find();
        res.status(200).json(devs);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
