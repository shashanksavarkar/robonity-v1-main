import React from "react";
import { Link } from "react-router-dom";

const formatDate = (date) => !date || isNaN(new Date(date)) ? "Just now" : new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export default function ThreadItem({ id, title, authorName, date, replies, views }) {
  return (
    <Link to={`/forum/thread/${id}`} className="thread-link">
      <div className="thread-item">
        <div className="thread-details">
          <h3 className="thread-title">{title}</h3>
          <div className="thread-metadata">by <strong>{authorName || "Anonymous"}</strong> · {formatDate(date)}</div>
        </div>
        <div className="thread-stats">
          <span><strong>{replies}</strong> replies</span>
          <span><strong>{views}</strong> views</span>
        </div>
      </div>
    </Link>
  );
}
