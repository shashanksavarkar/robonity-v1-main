import Testimonial from '../models/Testimonial.js';

export const getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find();
        res.status(200).json(testimonials);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
