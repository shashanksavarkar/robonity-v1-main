import React from 'react';

const formatDate = (timestamp) => !timestamp ? 'Just now' : new Date(timestamp).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });

export default function ReplyItem({ reply }) {
  return (
    <div className="reply-item">
      <div className="reply-header">
        <span className="reply-author">{reply.authorName || 'Anonymous'}</span>
        <span className="reply-date">{formatDate(reply.createdAt)}</span>
      </div>
      <p className="reply-text">{reply.text}</p>
    </div>
  );
}
