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



  useEffect(() => {

    const mockDelay = setTimeout(() => {
      const mockThread = {
        _id: threadId,
        title: threadId === '1' ? 'Welcome to the new Holographic Forum' :
          threadId === '2' ? 'System Update: v2.4 Released' :
            'Mock Thread Title',
        authorName: 'Admin_Core',
        createdAt: new Date().toISOString(),
        content: "Welcome to the new system. This interface is designed for maximum efficiency and aesthetic pleasure. Enjoy the holographic data streams."
      };

      const mockReplies = [
        { _id: 'r1', text: 'This looks amazing!', author: { name: 'User_01' }, createdAt: new Date().toISOString() },
        { _id: 'r2', text: 'Love the new design.', author: { name: 'User_02' }, createdAt: new Date().toISOString() }
      ];

      setThread(mockThread);
      setReplies(mockReplies);
      setLoading(false);
    }, 500);

    return () => clearTimeout(mockDelay);
  }, [threadId]);



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
  if (!thread) return <p>Thread not found.</p>;

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
          <span><span className="meta-label">INITIATED BY:</span> <span className="meta-value">{thread.authorName || "Anonymous"}</span></span>
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
            key={reply._id}
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
          />
          <button className="btn-send-reply">TRANSMIT</button>
        </div>
      </div>
    </motion.div>
  );
}
