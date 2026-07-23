'use client';

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../../../components/AuthContext";
import ProtectedRoute from "../../../../components/ProtectedRoute";
import { fetchThreadById, postReply } from "../../../../api/forumApi";

function SingleThreadContent() {
  const { threadId } = useParams();
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();
  const [replyText, setReplyText] = useState("");

  const { data: thread, isLoading, error } = useQuery({
    queryKey: ["thread", threadId],
    queryFn: async () => {
      const { data } = await fetchThreadById(threadId);
      return data;
    },
  });

  const replyMutation = useMutation({
    mutationFn: (text) => postReply(threadId, { text }),
    onSuccess: () => {
      setReplyText("");
      queryClient.invalidateQueries({ queryKey: ["thread", threadId] });
    },
    onError: () => {
      alert("Transmission failed. Please retry.");
    },
  });

  const handleReplySubmit = async () => {
    if (!replyText.trim()) return;
    if (!currentUser) {
      alert("Authentication required for transmission.");
      return;
    }
    replyMutation.mutate(replyText);
  };

  if (isLoading) return (
    <div className="forum-page" style={{ justifyContent: 'center' }}>
      <p style={{ color: '#00c6ff', fontFamily: 'JetBrains Mono' }}>LOADING DATA STREAM...</p>
    </div>
  );

  if (error) return (
    <div className="auth-error">
      <p><strong>An error occurred:</strong></p>
      <p style={{ fontFamily: "monospace", fontSize: "0.9rem", marginTop: "1rem", wordBreak: "break-all" }}>Failed to retrieve transmission log.</p>
      <Link href="/forum" className="back-link" style={{ marginTop: "1rem", color: "#fff" }}>Back to Forum</Link>
    </div>
  );
  if (!thread) return <p style={{ color: "#fff", textAlign: "center", marginTop: "2rem" }}>Thread not found.</p>;

  const replies = thread.replies || [];

  return (
    <motion.div
      className="forum-page thread-detail-view"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="back-link-wrapper">
        <Link href="/forum" className="back-link-custom">
          &larr; RETURN TO LOG
        </Link>
      </div>

      <motion.div
        className="thread-content-box"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="thread-title-large">{thread.title}</h1>

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
            disabled={replyMutation.isPending}
          />
          <button
            className="btn-send-reply"
            onClick={handleReplySubmit}
            disabled={replyMutation.isPending || !replyText.trim()}
          >
            {replyMutation.isPending ? "TRANSMITTING..." : "TRANSMIT"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function SingleThreadPage() {
  return (
    <ProtectedRoute>
      <SingleThreadContent />
    </ProtectedRoute>
  );
}
