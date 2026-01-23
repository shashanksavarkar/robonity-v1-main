import mongoose from 'mongoose';

const galleryItemSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    color: { type: String, required: true },
    image: { type: String, required: true }
});

export default mongoose.model('GalleryItem', galleryItemSchema);
