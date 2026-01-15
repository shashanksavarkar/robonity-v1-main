import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RoboShare = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [step, setStep] = useState(1); // 1: Registration Form, 2: OTP Box
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

  // STEP 1: Request OTP
  const handleRegisterInitiate = async (e) => {
    e.preventDefault();
    setError("");
    if (!formData.email.endsWith("@gsv.ac.in"))
      return setError("Use @gsv.ac.in only");

    setLoading(true);
    try {
      await axios.post(
        "http://localhost:5000/api/roboshare/send-otp",
        formData
      );
      setStep(2); // Move to OTP entry box
    } catch (err) {
      // Even if Twilio fails, if you see the OTP in your terminal, move to Step 2
      console.error("SMS failed, but check terminal for OTP");
      setStep(2);
      setError("Note: Check backend terminal for OTP if SMS wasn't sent.");
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: Verify OTP
  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Explicitly send fields to avoid any hidden formData issues
      const response = await axios.post(
        "http://localhost:5000/api/roboshare/verify-otp",
        {
          email: formData.email,
          otp: formData.otp.toString(), // Force string
          rollNo: formData.rollNo,
          password: formData.password,
          mobile: formData.mobile,
        }
      );

      if (response.status === 200) {
        setIsLoggedIn(true);
      }
    } catch (err) {
      // Show the specific error message from the backend
      setError(err.response?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // --- DASHBOARD VIEW (Visible after successful verification) ---
  if (isLoggedIn) {
    return (
      <div
        style={{
          backgroundColor: "#0f172a",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
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

  // --- REGISTRATION / OTP VIEW ---
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
            border: "1px solid rgba(255,255,255,0.1)",
            width: "100%",
            maxWidth: "450px",
          }}
        >
          <h2
            style={{
              color: "white",
              textAlign: "center",
              marginBottom: "25px",
            }}
          >
            {step === 1 ? "RoboShare Access" : "Enter OTP"}
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
                {/* <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                  required
                  style={inputStyle}
                /> */}
              </>
            ) : (
              <>
                <p style={{ color: "#94a3b8", textAlign: "center" }}>
                  Check your terminal for the OTP
                </p>
                <input
                  name="otp"
                  type="text"
                  placeholder="6-digit OTP"
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </>
            )}
            <button type="submit" disabled={loading} style={btnStyle}>
              {loading
                ? "Processing..."
                : step === 1
                ? "Get OTP"
                : "Verify & Login"}
            </button>
          </form>
          {error && (
            <p
              style={{
                color: "#ef4444",
                textAlign: "center",
                marginTop: "15px",
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
