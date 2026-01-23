import React, { useState } from "react";
import { useAuth } from "./AuthContext";

export default function PostReply({ threadId }) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { currentUser, isAuthenticated } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!text.trim()) return setError("Reply cannot be empty.");
    if (!isAuthenticated || !currentUser) return setError("You must be logged in to reply.");

    setSubmitting(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const res = await fetch(`${apiUrl}/api/threads/${threadId}/replies`, {
        method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ text: text.trim() })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to post reply.");
      setText("");
    } catch (err) {
      setError(err.message || "Failed to post reply.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="post-reply-form" onSubmit={handleSubmit}>
      <h3>Post a Reply</h3>
      {error && <p className="auth-error">{error}</p>}
      <textarea placeholder="Write your reply..." value={text} onChange={(e) => setText(e.target.value)} rows="4" disabled={submitting} />
      <button type="submit" className="new-thread-btn" disabled={submitting}>{submitting ? "Posting…" : "Post Reply"}</button>
    </form>
  );
}
