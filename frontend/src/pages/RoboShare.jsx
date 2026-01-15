import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RoboShare = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    rollNo: "",
    mobile: "",
    password: "",
    otp: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegisterInitiate = async (e) => {
    e.preventDefault();
    if (!formData.email.endsWith("@gsv.ac.in"))
      return setError("Use @gsv.ac.in only");
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:5000/api/roboshare/send-otp",
        formData
      );
      setStep(2);
      setError("");
    } catch (err) {
      setError("Failed to send OTP. Check mobile format.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:5000/api/roboshare/verify-otp",
        formData
      );
      setIsLoggedIn(true);
    } catch (err) {
      setError("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return (
      <div
        style={{
          backgroundColor: "#0f172a",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          width: "100vw",
          overflowX: "hidden",
        }}
      >
        <nav
          style={{
            margin: "20px auto",
            width: "90%",
            padding: "15px 30px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(12px)",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <div style={{ fontWeight: "bold", color: "#fff" }}>RoboShare</div>
          <div style={{ display: "flex", gap: "25px", color: "#94a3b8" }}>
            <span>Op1</span>
            <span>Op2</span>
            <span>Op3</span>
            <div
              style={{
                width: "35px",
                height: "35px",
                borderRadius: "50%",
                background: "linear-gradient(45deg, #30cfd0, #330867)",
              }}
            ></div>
          </div>
        </nav>
        <main
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 style={{ fontSize: "4rem", color: "white" }}>Coming Soon</h1>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="app-container" style={{ overflowX: "hidden" }}>
      <Navbar />
      <main
        className="main-content"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 250px)",
        }}
      >
        <div
          style={{
            background: "rgba(30, 41, 59, 0.7)",
            padding: "40px",
            borderRadius: "20px",
            width: "100%",
            maxWidth: "450px",
          }}
        >
          <h2
            style={{
              color: "white",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            {step === 1 ? "RoboShare Registration" : "Enter OTP"}
          </h2>
          <form
            onSubmit={step === 1 ? handleRegisterInitiate : handleVerify}
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            {step === 1 ? (
              <>
                <input
                  name="email"
                  type="email"
                  placeholder="student@gsv.ac.in"
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
                <input
                  name="rollNo"
                  type="text"
                  placeholder="Roll Number"
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
                <input
                  name="mobile"
                  type="tel"
                  placeholder="Mobile (+91...)"
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </>
            ) : (
              <input
                name="otp"
                type="text"
                placeholder="6-digit OTP"
                onChange={handleChange}
                required
                style={inputStyle}
              />
            )}
            <button type="submit" style={btnStyle}>
              {loading ? "Processing..." : step === 1 ? "Get OTP" : "Verify"}
            </button>
          </form>
          {error && (
            <p
              style={{
                color: "#ef4444",
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              {error}
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #334155",
  background: "#0f172a",
  color: "white",
  width: "100%",
  boxSizing: "border-box",
};
const btnStyle = {
  padding: "14px",
  borderRadius: "8px",
  border: "none",
  background: "linear-gradient(90deg, #3b82f6, #2563eb)",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};

export default RoboShare;
