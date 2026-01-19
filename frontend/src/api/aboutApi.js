import API from "./axios";

export const getAboutItems = () => API.get("/about/items");
export const getDevelopers = () => API.get("/about/devs");
