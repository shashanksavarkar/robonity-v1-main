import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../components/AuthContext";
import ThreadItem from "../components/ThreadItem";
import CreateThread from "../components/CreateThread";
import "../styles/Forum.css";

export default function Forum() {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetch(`${apiUrl}/api/threads`, { method: "GET", credentials: "include" })
      .then(res => res.json().then(data => (!res.ok ? Promise.reject(data) : data)))
      .then(data => setThreads(data.threads || []))
      .catch(err => setError(err.message || "Error loading threads"))
      .finally(() => setLoading(false));
  }, [apiUrl]);

  return (
    <div className="forum-page">
      <motion.h1 className="page-header" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>Community Forum</motion.h1>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        {currentUser ? <CreateThread /> : (
          <p className="auth-switch" style={{ textAlign: "left", margin: "2rem 0" }}>
            Please <a href="/auth">log in</a> or <a href="/auth">sign up</a> to create a thread.
          </p>
        )}
      </motion.div>

      {loading && <p>Loading threads...</p>}
      {error && (
        <div className="auth-error">
          <p><strong>Error loading threads:</strong></p>
          <p style={{ fontFamily: "monospace", fontSize: "0.9rem", marginTop: "1rem" }}>{error}</p>
        </div>
      )}
      {!loading && !error && (
        <motion.div
          className="forum-list"
          initial="hidden"
          animate="visible"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
        >
          {threads.length === 0 && (
            <p style={{ padding: "2rem", textAlign: "center", backgroundColor: "var(--content-bg)" }}>No threads yet. Be the first to post!</p>
          )}
          {threads.map(thread => (
            <motion.div key={thread._id} variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
              <ThreadItem id={thread._id} {...thread} date={thread.createdAt} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
