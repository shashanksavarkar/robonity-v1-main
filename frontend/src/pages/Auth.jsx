import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { loginUser } from "../api/authApi";
import { registerUser } from "../api/registrationApi";
import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

export default function Auth() {
  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const data = mode === "login"
        ? await loginUser({ email, password })
        : await registerUser({ name: displayName, email, password });

      localStorage.setItem("user", JSON.stringify(data));
      setCurrentUser(data);
      setSuccess("You can now join the forum 🎉");
      setTimeout(() => navigate("/forum"), 1200);
    } catch (err) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSocial = (provider) => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/${provider}`;
  };

  return (
    <div className="auth-page">
      <motion.div
        className="auth-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode="wait">
          <motion.h1
            key={mode}
            className="page-title glitch-effect"
            data-text={mode === "login" ? "LOG IN" : "CREATE ACCOUNT"}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            {mode === "login" ? "Log In" : "Create Account"}
          </motion.h1>
        </AnimatePresence>

        {error && <motion.p className="auth-error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{error}</motion.p>}
        {success && (
          <motion.p
            style={{ background: "rgba(34,197,94,0.15)", color: "#86efac", padding: "0.75rem", borderRadius: "10px", marginBottom: "1rem", textAlign: "center", fontWeight: "600" }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {success}
          </motion.p>
        )}

        <div className="social-auth">
          <button onClick={() => handleSocial("google")}>Continue with Google</button>
          <button onClick={() => handleSocial("github")}>Continue with GitHub</button>
          <button disabled>Continue with Apple</button>
        </div>

        <div className="divider">OR</div>

        <form onSubmit={handleEmailAuth}>
          <AnimatePresence>
            {mode === "signup" && (
              <div className="auth-field">
                <input
                  type="text"
                  placeholder=" "
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                />
                <label>Display Name</label>
              </div>
            )}
          </AnimatePresence>
          <div className="auth-field">
            <input
              type="email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Email Address</label>
          </div>

          <div className="auth-field">
            <input
              type="password"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
            <label>Password</label>
          </div>
          <motion.button
            type="submit"
            className="auth-submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? "Please wait..." : mode === "login" ? "Log In" : "Create Account"}
          </motion.button>
        </form>

        <p className="switch-text">
          {mode === "login" ? (
            <>New here? <span onClick={() => setMode("signup")}>Create an account</span></>
          ) : (
            <>Already have an account? <span onClick={() => setMode("login")}>Log in</span></>
          )}
        </p>
      </motion.div>
    </div>
  );
}
