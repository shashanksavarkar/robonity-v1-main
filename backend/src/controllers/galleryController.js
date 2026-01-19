import GalleryItem from '../models/GalleryItem.js';

export const getGallery = async (req, res) => {
    try {
        const gallery = await GalleryItem.find();
        res.status(200).json(gallery);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
