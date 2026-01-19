import Resource from '../models/Resource.js';

export const getResources = async (req, res) => {
    try {
        const resources = await Resource.find();
        res.status(200).json(resources);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
