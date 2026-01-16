import React, { useState } from "react";
import { useAuth } from "./AuthContext";

export default function CreateThread() {
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
      const res = await fetch("http://localhost:5000/api/threads", {
        method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ title: title.trim() })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create thread.");
      setTitle("");
    } catch (err) {
      setError(err.message || "Failed to create thread. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="create-thread-form" onSubmit={handleSubmit}>
      <h3>Start a New Discussion</h3>
      {error && <p className="auth-error">{error}</p>}
      <div className="form-group">
        <input type="text" placeholder="What do you want to discuss?" value={title} onChange={(e) => setTitle(e.target.value)} disabled={submitting} required />
        <button type="submit" className="new-thread-btn" disabled={submitting}>{submitting ? "Posting…" : "Post Thread"}</button>
      </div>
    </form>
  );
}
