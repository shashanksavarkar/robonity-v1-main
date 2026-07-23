import React from "react";
import Link from "next/link";

const formatDate = (date) => !date || isNaN(new Date(date)) ? "Just now" : new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export default function ThreadItem({ id, title, authorName, date, replies, views }) {
  return (
    <Link href={`/forum/thread/${id}`} className="thread-link">
      <div className="thread-item">
        <div className="thread-details">
          <h3 className="thread-title">{title}</h3>
          <div className="thread-metadata">
            <span>AUTH: <strong>{authorName || "Anonymous"}</strong></span>
            <span>•</span>
            <span>{formatDate(date)}</span>
          </div>
        </div>
        <div className="thread-stats">
          <div className="stat-box">
            <span className="stat-value">{replies}</span>
            <span className="stat-label">Replies</span>
          </div>
          <div className="stat-box">
            <span className="stat-value">{views}</span>
            <span className="stat-label">Views</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
