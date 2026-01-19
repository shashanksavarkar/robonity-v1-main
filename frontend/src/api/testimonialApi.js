import API from "./axios";

export const getTestimonials = () => API.get("/testimonials");
