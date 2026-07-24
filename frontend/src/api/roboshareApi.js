import axios from "axios";

// RoboShare has its own OTP-verified identity, separate from the main app's
// auth ("user" in localStorage), so it needs its own token + storage key.
const SESSION_KEY = "roboshare_session";

const API = axios.create({ baseURL: (process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000") + "/api" });

API.interceptors.request.use((req) => {
    const session = JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
    if (session?.token) req.headers.Authorization = `Bearer ${session.token}`;
    return req;
});

export const getRoboshareSession = () => {
    if (typeof window === "undefined") return null;
    return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
};

export const setRoboshareSession = (session) => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
};

export const clearRoboshareSession = () => {
    localStorage.removeItem(SESSION_KEY);
};

export const sendOTP = (data) => API.post("/roboshare/send-otp", data);
export const verifyOTP = (data) => API.post("/roboshare/verify-otp", data);
export const getResources = () => API.get("/roboshare/resources");
export const createResource = (data) => API.post("/roboshare/resources", data);
