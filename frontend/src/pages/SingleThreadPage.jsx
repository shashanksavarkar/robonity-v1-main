import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../components/AuthContext";
import { fetchThreadById, postReply } from "../api/forumApi";

export default function SingleThreadPage() {
  const { threadId } = useParams();
  const { currentUser } = useAuth();
  const [thread, setThread] = useState(null);
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [replyText, setReplyText] = useState("");
  const [submittingReply, setSubmittingReply] = useState(false);

  useEffect(() => {
    loadThread();
  }, [threadId]);

  const loadThread = async () => {
    try {
      const { data } = await fetchThreadById(threadId);
      setThread(data);
      setReplies(data.replies || []);
    } catch (err) {
      setError("Failed to retrieve transmission log.");
    } finally {
      setLoading(false);
    }
  };

  const handleReplySubmit = async () => {
    if (!replyText.trim()) return;
    if (!currentUser) {
      alert("Authentication required for transmission.");
      return;
    }

    setSubmittingReply(true);
    try {
      await postReply(threadId, { text: replyText });
      setReplyText("");
      // Refresh to show new reply
      await loadThread();
    } catch (err) {
      alert("Transmission failed. Please retry.");
    } finally {
      setSubmittingReply(false);
    }
  };

  if (loading) return (
    <div className="forum-page" style={{ justifyContent: 'center' }}>
      <p style={{ color: '#00c6ff', fontFamily: 'JetBrains Mono' }}>LOADING DATA STREAM...</p>
    </div>
  );

  if (error) return (
    <div className="auth-error">
      <p><strong>An error occurred:</strong></p>
      <p style={{ fontFamily: "monospace", fontSize: "0.9rem", marginTop: "1rem", wordBreak: "break-all" }}>{error}</p>
      <Link to="/forum" className="back-link" style={{ marginTop: "1rem", color: "#fff" }}>Back to Forum</Link>
    </div>
  );
  if (!thread) return <p style={{ color: "#fff", textAlign: "center", marginTop: "2rem" }}>Thread not found.</p>;

  return (
    <motion.div
      className="forum-page thread-detail-view"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="back-link-wrapper">
        <Link to="/forum" className="back-link-custom">
          &larr; RETURN TO LOG
        </Link>
      </div>

      <motion.div
        className="thread-content-box"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="thread-title-large glitch-effect" data-text={thread.title}>{thread.title}</h1>

        <div className="thread-meta-info">
          <span><span className="meta-label">INITIATED BY:</span> <span className="meta-value">{thread.author?.name || "Anonymous"}</span></span>
          <span><span className="meta-label">DATE:</span> <span className="meta-value">{new Date(thread.createdAt).toLocaleDateString()}</span></span>
        </div>

        <div className="thread-body-text">
          {thread.content || "No content data available."}
        </div>
      </motion.div>

      <div className="reply-section">
        <h3 className="reply-section-header">TRANSMISSIONS ({replies.length})</h3>

        {replies.length === 0 && <p style={{ color: "var(--text-muted)", margin: "1rem 0" }}>No transmissions yet.</p>}

        {replies.map((reply, i) => (
          <motion.div
            key={reply._id || i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
          >
            <div className="reply-card">
              <div className="reply-header-row">
                <span className="reply-author">{reply.author?.name || 'Unknown'}</span>
                <span>{new Date(reply.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="reply-content">{reply.text}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="reply-input-wrapper">
        <div className="reply-input-inner">
          <textarea
            className="reply-textarea"
            placeholder="Enter transmission..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            disabled={submittingReply}
          />
          <button
            className="btn-send-reply"
            onClick={handleReplySubmit}
            disabled={submittingReply || !replyText.trim()}
          >
            {submittingReply ? "TRANSMITTING..." : "TRANSMIT"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
