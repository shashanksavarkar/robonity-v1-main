import axios from "axios";

const API = axios.create({ baseURL: (process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000") + "/api" });

API.interceptors.request.use((req) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.token) req.headers.Authorization = `Bearer ${user.token}`;
    return req;
});

export default API;
