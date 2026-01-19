import mongoose from 'mongoose';

const developerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    image: { type: String, required: true },
    desc: { type: String, required: true },
    socials: {
        github: { type: String, default: '#' },
        instagram: { type: String, default: '#' },
        linkedin: { type: String, default: '#' }
    }
});

export default mongoose.model('Developer', developerSchema);
