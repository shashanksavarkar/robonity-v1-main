import mongoose from 'mongoose';

const roboshareResourceSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
    category: { type: String, required: true, default: 'Other', trim: true },
    uploadedBy: {
        rollNo: { type: String, required: true },
        email: { type: String, required: true },
    },
}, { timestamps: true });

export default mongoose.model('RoboshareResource', roboshareResourceSchema);
