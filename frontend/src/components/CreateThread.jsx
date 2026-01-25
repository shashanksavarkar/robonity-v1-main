import React, { useState } from "react";
import { useAuth } from "./AuthContext";

export default function CreateThread({ onCreateThread }) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { currentUser, isAuthenticated } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!title.trim()) return setError("Title cannot be empty.");
    if (!isAuthenticated || !currentUser) return setError("You must be logged in to post.");

    setSubmitting(true);
    try {
      // Delegate to parent prop which handles the API call
      await onCreateThread(title.trim());
      setTitle("");
    } catch (error) {
      setError("Failed to create thread. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="create-thread-form glass-panel" onSubmit={handleSubmit}>
      <h3 style={{ marginBottom: "20px", color: "#fff", textTransform: "uppercase", letterSpacing: "1px" }}>Start a New Discussion</h3>
      {error && <p className="auth-error">{error}</p>}
      <div className="collection-field">
        <input
          type="text"
          placeholder=" "
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={submitting}
          required
        />
        <label>What do you want to discuss?</label>
        <button type="submit" className="post-btn" disabled={submitting}>
          {submitting ? "POSTING..." : "INITIATE THREAD"}
        </button>
      </div>
    </form>
  );
}
