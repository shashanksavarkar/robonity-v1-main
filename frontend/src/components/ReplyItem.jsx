import React from 'react';

function formatDate(timestamp) {
  if (!timestamp) return 'Just now';
  return timestamp.toDate().toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });
}

function ReplyItem({ reply }) {
  const username = reply.authorName || 'Anonymous';

  return (
      <div className="reply-item">
        <div className="reply-header">
          <span className="reply-author">{username}</span>
          <span className="reply-date">{formatDate(reply.createdAt)}</span>
        </div>

        <p className="reply-text">{reply.text}</p>
      </div>
  );
}

export default ReplyItem;
