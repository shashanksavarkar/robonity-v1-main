import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true }, // Keeping existing ID for compatibility with seed data
    title: { type: String, required: true },
    desc: { type: String, required: true },
    category: { type: String, required: true },
    status: { type: String, required: true },
    author: { type: String, required: true },
    color: { type: String, required: true }
});

export default mongoose.model('Project', projectSchema);
