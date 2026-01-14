import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import PostReply from "../components/PostReply";
import ReplyItem from "../components/ReplyItem";

function SingleThreadPage() {
  const { threadId } = useParams();
  const { currentUser } = useAuth();

  const [thread, setThread] = useState(null);
  const [replies, setReplies] = useState([]);
  const [loadingThread, setLoadingThread] = useState(true);
  const [loadingReplies, setLoadingReplies] = useState(true);
  const [error, setError] = useState("");

  /* =========================
     FETCH THREAD
  ========================= */
  useEffect(() => {
    const fetchThread = async () => {
      setLoadingThread(true);
      setError("");

      try {
        const res = await fetch(
            `http://localhost:5000/api/threads/${threadId}`,
            {
              method: "GET",
              credentials: "include",
            }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Thread not found.");
        }

        setThread(data.thread);
      } catch (err) {
        setError("Failed to load thread: " + err.message);
      } finally {
        setLoadingThread(false);
      }
    };

    fetchThread();
  }, [threadId]);

  /* =========================
     FETCH REPLIES
  ========================= */
  useEffect(() => {
    const fetchReplies = async () => {
      setLoadingReplies(true);

      try {
        const res = await fetch(
            `http://localhost:5000/api/threads/${threadId}/replies`,
            {
              method: "GET",
              credentials: "include",
            }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to load replies.");
        }

        setReplies(data.replies || []);
      } catch (err) {
        setError("Failed to load replies: " + err.message);
      } finally {
        setLoadingReplies(false);
      }
    };

    fetchReplies();
  }, [threadId]);

  const isLoading = loadingThread || loadingReplies;

  if (isLoading) return <p>Loading thread...</p>;

  if (error) {
    return (
        <div className="auth-error">
          <p><strong>An error occurred:</strong></p>
          <p
              style={{
                fontFamily: "monospace",
                fontSize: "0.9rem",
                marginTop: "1rem",
                wordBreak: "break-all",
              }}
          >
            {error}
          </p>
          <Link
              to="/forum"
              className="back-link"
              style={{ marginTop: "1rem", color: "#fff" }}
          >
            Back to Forum
          </Link>
        </div>
    );
  }

  if (!thread) return <p>Thread not found.</p>;

  return (
      <div>
        <Link to="/forum" className="back-link">
          &larr; Back to Forum
        </Link>

        <div className="thread-content">
          <h1 className="page-header">{thread.title}</h1>
          <p className="thread-author">
            Posted by <strong>{thread.authorName || "Anonymous"}</strong>
          </p>
        </div>

        <div className="reply-list">
          <h3>Replies</h3>

          {replies.length === 0 && (
              <p style={{ color: "var(--text-muted)", margin: "1rem 0" }}>
                Be the first to reply.
              </p>
          )}

          {replies.map((reply) => (
              <ReplyItem key={reply._id} reply={reply} />
          ))}
        </div>

        {currentUser ? (
            <PostReply threadId={threadId} />
        ) : (
            <p
                className="auth-switch"
                style={{ textAlign: "left", margin: "2rem 0" }}
            >
              Please <Link to="/login">log in</Link> or{" "}
              <Link to="/signup">sign up</Link> to reply.
            </p>
        )}
      </div>
  );
}

export default SingleThreadPage;
