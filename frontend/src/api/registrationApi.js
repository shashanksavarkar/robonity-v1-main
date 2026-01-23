import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

export const registerUser = async (userData) => {
  try {
    const res = await axios.post(`${API_URL}/api/registration`, userData, { headers: { "Content-Type": "application/json" } });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Registration failed" };
  }
};
