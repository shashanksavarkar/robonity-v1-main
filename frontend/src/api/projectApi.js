import API from "./axios";

export const getProjects = () => API.get("/projects");
