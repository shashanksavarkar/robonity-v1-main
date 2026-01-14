import React from 'react';

function GalleryItem({ imageUrl, title, description }) {
    return (
        <div className="gallery-item">
            <div className="gallery-image-wrapper">
                <img src={imageUrl} alt={title} className="gallery-image" />

                {/* Hover Overlay */}
                <div className="gallery-overlay">
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <span className="gallery-view">Click to view</span>
                </div>
            </div>
        </div>
    );
}

export default GalleryItem;
