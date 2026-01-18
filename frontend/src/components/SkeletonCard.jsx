import React from 'react';
import '../styles/Skeleton.css';

const SkeletonCard = () => {
    return (
        <div className="skeleton-card">
            <div className="skeleton-image"></div>
            <div className="skeleton-content">
                <div className="skeleton-text title"></div>
                <div className="skeleton-text line"></div>
                <div className="skeleton-text line half"></div>
            </div>
        </div>
    );
};

export default SkeletonCard;
