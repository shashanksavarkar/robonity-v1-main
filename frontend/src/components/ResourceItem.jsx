import React from 'react';

export default function ResourceItem({ title, url, description }) {
    return (
        <div className="resource-card">
            <h3 className="resource-title">{title}</h3>
            <p className="resource-description">{description}</p>
            <a href={url} target="_blank" rel="noopener noreferrer" className="resource-link" aria-label={`Open resource: ${title}`}>Visit Resource →</a>
        </div>
    );
}
