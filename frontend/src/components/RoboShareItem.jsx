import React from "react";

const getFileType = (title) => title.split(".").pop().toUpperCase();
const FileIcon = ({ type }) => <div className="roboshare-icon">{{ STL: "🧩", PDF: "📕", INO: "💻", ZIP: "🗜️" }[type] || "📄"}</div>;

export default function RoboShareItem({ title, description, url }) {
  const fileType = getFileType(title);
  return (
    <div className="roboshare-item">
      <FileIcon type={fileType} />
      <h3 className="roboshare-title">{title}<span className="file-badge">{fileType}</span></h3>
      <p className="roboshare-description">{description}</p>
      <a href={url} className="roboshare-link" download aria-label={`Download ${title}`}>Download →</a>
    </div>
  );
}
