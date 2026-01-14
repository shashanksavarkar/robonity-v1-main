import React, { useState } from "react";
import { loginUser, registerUser } from "../api/authApi";
import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

function Auth() {
  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState("login"); // login | signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  /* =========================
       EMAIL LOGIN / SIGNUP
    ========================= */
  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res =
        mode === "login"
          ? await loginUser({ email, password })
          : await registerUser({
              name: displayName,
              email,
              password,
            });

      // Save user globally
      localStorage.setItem("user", JSON.stringify(res.data));
      setCurrentUser(res.data);

      setSuccess("You can now join the forum 🎉");

      // Redirect after short delay
      setTimeout(() => {
        navigate("/forum");
      }, 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
       REAL SOCIAL LOGIN (OAUTH)
    ========================= */
  const handleSocial = (provider) => {
    // Redirect to backend OAuth endpoint
    window.location.href = `http://localhost:5000/api/auth/${provider}`;
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>{mode === "login" ? "Log In" : "Create Account"}</h1>

        {error && <p className="auth-error">{error}</p>}

        {success && (
          <p
            style={{
              background: "rgba(34,197,94,0.15)",
              color: "#86efac",
              padding: "0.75rem",
              borderRadius: "10px",
              marginBottom: "1rem",
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            {success}
          </p>
        )}

        {/* ===== SOCIAL AUTH ===== */}
        <div className="social-auth">
          <button onClick={() => handleSocial("google")}>
            Continue with Google
          </button>
          <button onClick={() => handleSocial("github")}>
            Continue with GitHub
          </button>
          <button disabled>Continue with Apple</button>
        </div>

        <div className="divider">OR</div>

        {/* ===== EMAIL AUTH ===== */}
        <form onSubmit={handleEmailAuth}>
          {mode === "signup" && (
            <input
              type="text"
              className="auth-input"
              placeholder="Display Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            className="auth-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="auth-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading
              ? "Please wait..."
              : mode === "login"
              ? "Log In"
              : "Create Account"}
          </button>
        </form>

        {/* ===== SWITCH MODE ===== */}
        <p className="switch-text">
          {mode === "login" ? (
            <>
              New here?{" "}
              <span onClick={() => setMode("signup")}>Create an account</span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span onClick={() => setMode("login")}>Log in</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default Auth;
