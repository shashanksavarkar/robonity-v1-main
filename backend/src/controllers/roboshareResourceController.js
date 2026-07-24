import RoboshareResource from '../models/RoboshareResource.js';

// @desc    List all shared resources
// @route   GET /api/roboshare/resources
// @access  Private (RoboShare)
export const getResources = async (req, res) => {
    try {
        const resources = await RoboshareResource.find().sort({ createdAt: -1 });
        res.json(resources);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Share a new resource
// @route   POST /api/roboshare/resources
// @access  Private (RoboShare)
export const createResource = async (req, res) => {
    const { title, description, url, category } = req.body;

    if (!title || !description || !url) {
        return res.status(400).json({ message: 'Title, description, and URL are required.' });
    }

    try {
        const resource = await RoboshareResource.create({
            title,
            description,
            url,
            category: category || 'Other',
            uploadedBy: {
                rollNo: req.roboshareUser.rollNo,
                email: req.roboshareUser.email,
            },
        });
        res.status(201).json(resource);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
