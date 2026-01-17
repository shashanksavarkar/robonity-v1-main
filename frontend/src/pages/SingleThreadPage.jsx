import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../components/AuthContext";
import PostReply from "../components/PostReply";
import ReplyItem from "../components/ReplyItem";

export default function SingleThreadPage() {
  const { threadId } = useParams();
  const { currentUser } = useAuth();
  const [thread, setThread] = useState(null);
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    Promise.all([
      fetch(`${apiUrl}/api/threads/${threadId}`, { credentials: "include" }).then(r => r.json().then(d => !r.ok ? Promise.reject(d) : d)),
      fetch(`${apiUrl}/api/threads/${threadId}/replies`, { credentials: "include" }).then(r => r.json().then(d => !r.ok ? Promise.reject(d) : d))
    ])
      .then(([threadData, repliesData]) => {
        setThread(threadData.thread);
        setReplies(repliesData.replies || []);
      })
      .catch(err => setError(err.message || "Failed to load data"))
      .finally(() => setLoading(false));
  }, [threadId, apiUrl]);

  if (loading) return <p>Loading thread...</p>;
  if (error) return (
    <div className="auth-error">
      <p><strong>An error occurred:</strong></p>
      <p style={{ fontFamily: "monospace", fontSize: "0.9rem", marginTop: "1rem", wordBreak: "break-all" }}>{error}</p>
      <Link to="/forum" className="back-link" style={{ marginTop: "1rem", color: "#fff" }}>Back to Forum</Link>
    </div>
  );
  if (!thread) return <p>Thread not found.</p>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Link to="/forum" className="back-link">&larr; Back to Forum</Link>
      <motion.div
        className="thread-content"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="page-header">{thread.title}</h1>
        <p className="thread-author">Posted by <strong>{thread.authorName || "Anonymous"}</strong></p>
      </motion.div>
      <div className="reply-list">
        <h3>Replies</h3>
        {replies.length === 0 && <p style={{ color: "var(--text-muted)", margin: "1rem 0" }}>Be the first to reply.</p>}
        {replies.map((reply, i) => (
          <motion.div
            key={reply._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
          >
            <ReplyItem reply={reply} />
          </motion.div>
        ))}
      </div>
      {currentUser ? <PostReply threadId={threadId} /> : (
        <p className="auth-switch" style={{ textAlign: "left", margin: "2rem 0" }}>
          Please <Link to="/login">log in</Link> or <Link to="/signup">sign up</Link> to reply.
        </p>
      )}
    </motion.div>
  );
}
