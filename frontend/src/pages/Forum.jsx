import React, { useState, useEffect } from "react";
import { useAuth } from "../components/AuthContext";
import ThreadItem from "../components/ThreadItem";
import CreateThread from "../components/CreateThread";
import "../styles/Forum.css";

function Forum() {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchThreads = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
            "http://localhost:5000/api/threads",
            {
              method: "GET",
              credentials: "include", // safe even if public
            }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to load threads");
        }

        setThreads(data.threads || []);
      } catch (err) {
        console.error(err);
        setError(err.message || "Error loading threads");
      } finally {
        setLoading(false);
      }
    };

    fetchThreads();
  }, []);

  return (
      <div>
        <h1 className="page-header">Community Forum</h1>

        {currentUser ? (
            <CreateThread />
        ) : (
            <p
                className="auth-switch"
                style={{ textAlign: "left", margin: "2rem 0" }}
            >
              Please <a href="/Auth">log in</a> or{" "}
              <a href="/Auth">sign up</a> to create a thread.
            </p>
        )}

        {/* Loading */}
        {loading && <p>Loading threads...</p>}

        {/* Error */}
        {error && (
            <div className="auth-error">
              <p><strong>Error loading threads:</strong></p>
              <p
                  style={{
                    fontFamily: "monospace",
                    fontSize: "0.9rem",
                    marginTop: "1rem",
                  }}
              >
                {error}
              </p>
            </div>
        )}

        {/* Content */}
        {!loading && !error && (
            <div className="forum-list">
              {threads.length === 0 && (
                  <p
                      style={{
                        padding: "2rem",
                        textAlign: "center",
                        backgroundColor: "var(--content-bg)",
                      }}
                  >
                    No threads yet. Be the first to post!
                  </p>
              )}

              {threads.map((thread) => (
                  <ThreadItem
                      key={thread._id}
                      id={thread._id}
                      title={thread.title}
                      authorName={thread.authorName}
                      date={thread.createdAt}
                      replies={thread.replies}
                      views={thread.views}
                  />
              ))}
            </div>
        )}
      </div>
  );
}

export default Forum;
