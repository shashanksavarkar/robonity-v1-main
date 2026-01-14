import React from "react";
import { Link } from "react-router-dom";

function formatDate(date) {
  if (!date) return "Just now";

  // supports ISO string or Date
  const parsedDate = new Date(date);

  if (isNaN(parsedDate)) return "Just now";

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function ThreadItem({ id, title, authorName, date, replies, views }) {
  return (
      <Link to={`/forum/thread/${id}`} className="thread-link">
        <div className="thread-item">
          {/* LEFT */}
          <div className="thread-details">
            <h3 className="thread-title">{title}</h3>
            <div className="thread-metadata">
              by <strong>{authorName || "Anonymous"}</strong> ·{" "}
              {formatDate(date)}
            </div>
          </div>

          {/* RIGHT */}
          <div className="thread-stats">
          <span>
            <strong>{replies}</strong> replies
          </span>
            <span>
            <strong>{views}</strong> views
          </span>
          </div>
        </div>
      </Link>
  );
}

export default ThreadItem;
