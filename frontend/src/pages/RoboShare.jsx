import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/Navbar.css";
import "../styles/RoboShare.css";
import "../styles/Auth.css";

export default function RoboShare() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", rollNo: "", mobile: "", password: "", otp: "" });
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegisterInitiate = async (e) => {
    e.preventDefault();
    if (!formData.email.endsWith("@gsv.ac.in")) return setError("Use @gsv.ac.in only");
    setLoading(true);
    try {
      await axios.post(`${apiUrl}/api/roboshare/send-otp`, formData);
      setStep(2);
    } catch {
      setStep(2);
      setError("Note: Check backend terminal for OTP if SMS wasn't sent.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${apiUrl}/api/roboshare/verify-otp`, { ...formData, otp: formData.otp.toString() });
      if (res.status === 200) setIsLoggedIn(true);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return (
      <div className="roboshare-page coming-soon-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh", flexDirection: "column" }}>
        <div className="glass-panel" style={{ padding: "3rem", borderRadius: "24px", textAlign: "center" }}>
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            style={{ fontSize: "3.5rem", background: "linear-gradient(to right, #60a5fa, #a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: 0 }}
          >
            Coming Soon
          </motion.h1>
          <p style={{ color: "#94a3b8", marginTop: "1rem", fontSize: "1.1rem" }}>We are building something amazing for the Robonity community.</p>
        </div>
      </div>
    );
  }



  return (
    <div className="auth-page">
      <motion.div
        className="auth-card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ width: "100%", maxWidth: "420px" }}
      >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1 style={{ fontSize: "2rem", marginBottom: "10px" }}>
            {step === 1 ? "RoboShare Access" : "Verification"}
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "0.95rem" }}>
            {step === 1 ? "Enter your details to proceed" : "Enter the OTP sent to your mobile"}
          </p>
        </div>

        <form onSubmit={step === 1 ? handleRegisterInitiate : handleVerify} style={{ display: "flex", flexDirection: "column" }}>
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div key="step1" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} style={{ display: "flex", flexDirection: "column" }}>
                <input name="email" type="email" placeholder="Email Address (student@gsv.ac.in)" onChange={handleChange} required className="auth-input" />
                <input name="rollNo" type="text" placeholder="Roll Number (e.g. 21BEC...)" onChange={handleChange} required className="auth-input" />
                <input name="mobile" type="tel" placeholder="Mobile Number (+91...)" onChange={handleChange} required className="auth-input" />
              </motion.div>
            ) : (
              <motion.div key="step2" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ background: "rgba(59, 130, 246, 0.1)", padding: "12px", borderRadius: "10px", border: "1px solid rgba(59, 130, 246, 0.2)", marginBottom: "16px" }}>
                  <p style={{ color: "#93c5fd", textAlign: "center", fontSize: "0.9rem", margin: 0 }}>
                    OTP sent to {formData.mobile}
                  </p>
                </div>
                <input name="otp" type="text" placeholder="• • • • • •" maxLength={6} onChange={handleChange} required className="auth-input" style={{ textAlign: "center", letterSpacing: "8px", fontSize: "1.4rem", fontWeight: "bold" }} />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            className="auth-submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? "Processing..." : step === 1 ? "Send OTP" : "Verify & Access"}
          </motion.button>
        </form>

        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="auth-error"
            style={{ marginTop: "20px", textAlign: "center" }}
          >
            {error}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
