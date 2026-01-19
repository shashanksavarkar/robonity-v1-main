import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    url: { type: String, required: true },
    icon: { type: String, required: true }
});

export default mongoose.model('Resource', resourceSchema);
