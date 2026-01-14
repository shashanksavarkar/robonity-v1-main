import React from 'react';

// File type detection helper
function getFileType(title) {
    const ext = title.split('.').pop().toUpperCase();
    return ext;
}

// Icon based on file type
function FileIcon({ type }) {
    const icons = {
        STL: '🧩',
        PDF: '📕',
        INO: '💻',
        ZIP: '🗜️',
        DEFAULT: '📄',
    };

    return (
        <div className="roboshare-icon">
            {icons[type] || icons.DEFAULT}
        </div>
    );
}

function RoboShareItem({ title, description, url }) {
    const fileType = getFileType(title);

    return (
        <div className="roboshare-item">
            <FileIcon type={fileType} />

            <h3 className="roboshare-title">
                {title}
                <span className="file-badge">{fileType}</span>
            </h3>

            <p className="roboshare-description">{description}</p>

            <a
                href={url}
                className="roboshare-link"
                download
                aria-label={`Download ${title}`}
            >
                Download →
            </a>
        </div>
    );
}

export default RoboShareItem;
