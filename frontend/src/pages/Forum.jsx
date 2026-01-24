import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ThreadItem from "../components/ThreadItem";
import CreateThread from "../components/CreateThread";
import { fetchThreads, createThread } from "../api/forumApi";
import "../styles/Forum.css";

export default function Forum() {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadThreads();
  }, []);

  const loadThreads = async () => {
    try {
      const { data } = await fetchThreads();
      // Ensure replies is treated as a count if it's an array
      const processedData = data.map(t => ({
        ...t,
        replies: Array.isArray(t.replies) ? t.replies.length : (t.replies || 0)
      }));
      setThreads(processedData);
    } catch (err) {
      setError("Failed to load transmission logs.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateThread = async (newThreadData) => {
    // newThreadData can be an object { title, content } or just title string depending on CreateThread component
    // We will assume CreateThread passes an object or check it
    const payload = typeof newThreadData === 'string' ? { title: newThreadData, content: "No content provided." } : newThreadData;

    try {
      await createThread(payload);
      loadThreads(); // Reload to show new thread
    } catch (err) {
      console.error("Failed to create thread:", err);
      alert("Failed to create thread. Ensure you are logged in.");
    }
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
        <CreateThread onCreateThread={handleCreateThread} />
      </motion.div>

      {loading && <p style={{ textAlign: "center", color: "#00c6ff", marginTop: "2rem" }}>LOADING DATA STREAM...</p>}
      {error && <div className="auth-error"><p><strong>Error:</strong> {error}</p></div>}

      {!loading && !error && (
        <motion.div
          className="forum-list"
          initial="hidden"
          animate="visible"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
        >
          {threads.length === 0 ? (
            <p style={{ textAlign: "center", color: "var(--text-muted)", marginTop: "2rem" }}>No active threads. Be the first to transmit.</p>
          ) : (
            threads.map(thread => (
              <motion.div key={thread._id} variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                <ThreadItem
                  id={thread._id}
                  title={thread.title}
                  authorName={thread.author?.name}
                  date={thread.createdAt}
                  replies={thread.replies} // Now a number
                  views={thread.views}
                />
              </motion.div>
            ))
          )}
        </motion.div>
      )}
    </div>
  );
}
