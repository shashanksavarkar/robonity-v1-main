import mongoose from 'mongoose';

const aboutItemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    icon: { type: String, required: true }
});

export default mongoose.model('AboutItem', aboutItemSchema);
