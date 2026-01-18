import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../components/AuthContext";
import ThreadItem from "../components/ThreadItem";
import CreateThread from "../components/CreateThread";
import "../styles/Forum.css";

export default function Forum() {
  const mockThreads = [
    { _id: '1', title: 'Welcome to the new Holographic Forum', author: { name: 'Admin_Core' }, createdAt: new Date().toISOString(), replies: 42, views: 1024 },
    { _id: '2', title: 'System Update: v2.4 Released', author: { name: 'Dev_Ops' }, createdAt: new Date(Date.now() - 86400000).toISOString(), replies: 12, views: 340 },
    { _id: '3', title: 'Robotics Workshop: Neural Networks', author: { name: 'Sarah J.' }, createdAt: new Date(Date.now() - 172800000).toISOString(), replies: 8, views: 156 },
  ];

  const [threads, setThreads] = useState(mockThreads);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  const handleCreateThread = (newThreadTitle) => {
    const newThread = {
      _id: Date.now().toString(),
      title: newThreadTitle,
      author: { name: "Guest_User" },
      createdAt: new Date().toISOString(),
      replies: 0,
      views: 0
    };
    setThreads([newThread, ...threads]);
  };

  return (
    <div className="forum-page">
      <motion.h1
        className="page-title glitch-effect"
        data-text="COMMUNITY FORUM"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        COMMUNITY FORUM
      </motion.h1>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        {true ? <CreateThread onCreateThread={handleCreateThread} /> : (
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
              <ThreadItem
                id={thread._id}
                title={thread.title}
                authorName={thread.author?.name}
                date={thread.createdAt}
                replies={thread.replies}
                views={thread.views}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
