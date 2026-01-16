import React from 'react';

export default function GalleryItem({ imageUrl, title, description }) {
    return (
        <div className="gallery-item">
            <div className="gallery-image-wrapper">
                <img src={imageUrl} alt={title} className="gallery-image" />
                <div className="gallery-overlay">
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <span className="gallery-view">Click to view</span>
                </div>
            </div>
        </div>
    );
}
