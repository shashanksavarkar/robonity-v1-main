import API from "./axios";

export const getEvents = () => API.get("/events");
