import API from "./axios";

export const getResources = () => API.get("/resources");
