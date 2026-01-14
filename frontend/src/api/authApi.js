import API from "./axios";

export const registerUser = (data) =>
    API.post("/auth/register", data);

export const loginUser = (data) =>
    API.post("/auth/login", data);

export const socialLogin = (data) =>
    API.post("/auth/social", data);
