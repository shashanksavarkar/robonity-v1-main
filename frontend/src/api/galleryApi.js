import API from "./axios";

export const getGallery = () => API.get("/gallery");
