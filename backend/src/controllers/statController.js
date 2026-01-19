import Stat from '../models/Stat.js';

export const getStats = async (req, res) => {
    try {
        const stats = await Stat.find();
        res.status(200).json(stats);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
