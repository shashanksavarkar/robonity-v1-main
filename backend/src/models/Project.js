import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    category: { type: String, required: true },
    status: { type: String, required: true },
    author: { type: String, required: true },
    color: { type: String, required: true },
    featured: { type: Boolean, default: false }
});

export default mongoose.model('Project', projectSchema);
