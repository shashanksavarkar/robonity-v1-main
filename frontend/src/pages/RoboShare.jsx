import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/Navbar.css"; // Ensure access to glass-panel if needed

export default function RoboShare() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", rollNo: "", mobile: "", password: "", otp: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegisterInitiate = async (e) => {
    e.preventDefault();
    if (!formData.email.endsWith("@gsv.ac.in")) return setError("Use @gsv.ac.in only");
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/roboshare/send-otp", formData);
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
      const res = await axios.post("http://localhost:5000/api/roboshare/verify-otp", { ...formData, otp: formData.otp.toString() });
      if (res.status === 200) setIsLoggedIn(true);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          flexDirection: "column",
          padding: "2rem 0"
        }}
      >
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

  const inputStyle = {
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    background: "rgba(15, 23, 42, 0.6)",
    color: "white",
    width: "100%",
    boxSizing: "border-box",
    fontSize: "1rem",
    marginTop: "5px"
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", padding: "2rem 0" }}>
      <motion.div
        className="glass-panel"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ width: "100%", maxWidth: "420px", padding: "40px", borderRadius: "24px" }}
      >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h2 style={{ color: "white", fontSize: "1.8rem", marginBottom: "8px" }}>
            {step === 1 ? "RoboShare Access" : "Verification"}
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
            {step === 1 ? "Enter your details to proceed" : "Enter the OTP sent to your mobile"}
          </p>
        </div>

        <form onSubmit={step === 1 ? handleRegisterInitiate : handleVerify} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <div>
                  <label style={{ fontSize: "0.85rem", color: "#cbd5e1", marginLeft: "4px" }}>Email Address</label>
                  <input name="email" type="email" placeholder="student@gsv.ac.in" onChange={handleChange} required style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontSize: "0.85rem", color: "#cbd5e1", marginLeft: "4px" }}>Roll Number</label>
                  <input name="rollNo" type="text" placeholder="e.g. 21BEC..." onChange={handleChange} required style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontSize: "0.85rem", color: "#cbd5e1", marginLeft: "4px" }}>Mobile Number</label>
                  <input name="mobile" type="tel" placeholder="+91 XXXXX XXXXX" onChange={handleChange} required style={inputStyle} />
                </div>
              </motion.div>
            ) : (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <div style={{ background: "rgba(59, 130, 246, 0.1)", padding: "12px", borderRadius: "8px", border: "1px solid rgba(59, 130, 246, 0.2)", marginBottom: "10px" }}>
                  <p style={{ color: "#93c5fd", textAlign: "center", fontSize: "0.9rem", margin: 0 }}>
                    OTP sent to {formData.mobile}
                  </p>
                </div>
                <div>
                  <label style={{ fontSize: "0.85rem", color: "#cbd5e1", marginLeft: "4px" }}>One-Time Password</label>
                  <input name="otp" type="text" placeholder="• • • • • •" maxLength={6} onChange={handleChange} required style={{ ...inputStyle, textAlign: "center", letterSpacing: "4px", fontSize: "1.2rem" }} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            style={{
              padding: "16px",
              borderRadius: "12px",
              border: "none",
              background: "linear-gradient(135deg, #3b82f6, #2563eb)",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
              marginTop: "12px",
              fontSize: "1rem",
              boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)"
            }}
          >
            {loading ? "Processing..." : step === 1 ? "Send OTP" : "Verify & Access"}
          </motion.button>
        </form>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            style={{ color: "#f87171", textAlign: "center", marginTop: "20px", background: "rgba(239, 68, 68, 0.1)", padding: "10px", borderRadius: "8px" }}
          >
            {error}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
