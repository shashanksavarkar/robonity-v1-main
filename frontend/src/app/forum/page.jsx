'use client';

import React from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ThreadItem from "../../components/ThreadItem";
import CreateThread from "../../components/CreateThread";
import ProtectedRoute from "../../components/ProtectedRoute";
import { fetchThreads, createThread } from "../../api/forumApi";
import "../../styles/Forum.css";

function ForumContent() {
  const queryClient = useQueryClient();

  const { data: threads = [], isLoading, error } = useQuery({
    queryKey: ["threads"],
    queryFn: async () => {
      const { data } = await fetchThreads();
      return data.map(t => ({
        ...t,
        replies: Array.isArray(t.replies) ? t.replies.length : (t.replies || 0),
      }));
    },
  });

  const createMutation = useMutation({
    mutationFn: createThread,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["threads"] }),
    onError: (err) => {
      console.error("Failed to create thread:", err);
      alert("Failed to create thread. Ensure you are logged in.");
    },
  });

  const handleCreateThread = async (newThreadData) => {
    const payload = typeof newThreadData === 'string' ? { title: newThreadData, content: "No content provided." } : newThreadData;
    await createMutation.mutateAsync(payload);
  };

  return (
    <div className="forum-page">
      <motion.h1
        className="page-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        COMMUNITY FORUM
      </motion.h1>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <CreateThread onCreateThread={handleCreateThread} />
      </motion.div>

      {isLoading && <p style={{ textAlign: "center", color: "#00c6ff", marginTop: "2rem" }}>LOADING DATA STREAM...</p>}
      {error && <div className="auth-error"><p><strong>Error:</strong> Failed to load transmission logs.</p></div>}

      {!isLoading && !error && (
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
                  replies={thread.replies}
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

export default function ForumPage() {
  return (
    <ProtectedRoute>
      <ForumContent />
    </ProtectedRoute>
  );
}
