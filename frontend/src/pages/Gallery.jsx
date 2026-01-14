import React, { useState } from 'react';
import GalleryItem from '../components/GalleryItem';
import "../styles/Gallery.css";

function Gallery() {
    const [filter, setFilter] = useState("All");
    const [activeItem, setActiveItem] = useState(null);

    const galleryData = [
        {
            id: 1,
            title: 'Autonomous Rover',
            description: 'A student-built rover navigating an obstacle course.',
            category: 'Robotics',
            imageUrl: './Public/KickOff-25 GIF.gif'
        },
        {
            id: 2,
            title: 'RoboSoccer 2025',
            description: 'Our team competing in the finals.',
            category: 'AI',
            imageUrl: './Public/KickOff-25 GIF.gif'
        },
        {
            id: 3,
            title: '3D Printed Arm',
            description: 'A 6-axis robotic arm prototype.',
            category: 'Mechanical',
            imageUrl: './Public/KickOff-25 GIF.gif'
        },
        {
            id: 4,
            title: 'Workshop Day',
            description: 'Members learning soldering and circuitry.',
            category: 'Robotics',
            imageUrl: './Public/KickOff-25 GIF.gif'
        },
        {
            id: 5,
            title: 'Autonomous Rover',
            description: 'A student-built rover navigating an obstacle course.',
            category: 'Robotics',
            imageUrl: './Public/KickOff-25 GIF.gif'
        },
        {
            id: 6,
            title: 'RoboSoccer 2025',
            description: 'Our team competing in the finals.',
            category: 'AI',
            imageUrl: './Public/KickOff-25 GIF.gif'
        },
        {
            id: 7,
            title: '3D Printed Arm',
            description: 'A 6-axis robotic arm prototype.',
            category: 'Mechanical',
            imageUrl: './Public/KickOff-25 GIF.gif'
        },
        {
            id: 8,
            title: 'Workshop Day',
            description: 'Members learning soldering and circuitry.',
            category: 'Robotics',
            imageUrl: './Public/KickOff-25 GIF.gif'
        },
        {
            id: 9,
            title: 'Workshop Day',
            description: 'Members learning soldering and circuitry.',
            category: 'Robotics',
            imageUrl: './Public/KickOff-25 GIF.gif'
        }
    ];

    const filteredData =
        filter === "All"
            ? galleryData
            : galleryData.filter(item => item.category === filter);

    return (
        <div className="gallery-page">
            <h1 className="page-header">Project Gallery</h1>
            <p className="page-subtext">
                A visual showcase of the amazing robots built by our community members.
            </p>

            {/* FILTERS */}
            <div className="gallery-filters">
                {["All", "Robotics", "AI", "Mechanical"].map(cat => (
                    <button
                        key={cat}
                        className={filter === cat ? "active" : ""}
                        onClick={() => setFilter(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* MASONRY GRID */}
            <div className="gallery-masonry">
                {filteredData.map(item => (
                    <div key={item.id} onClick={() => setActiveItem(item)}>
                        <GalleryItem {...item} />
                    </div>
                ))}
            </div>

            {/* LIGHTBOX */}
            {activeItem && (
                <div className="lightbox" onClick={() => setActiveItem(null)}>
                    <div className="lightbox-content" onClick={e => e.stopPropagation()}>
                        <img src={activeItem.imageUrl} alt={activeItem.title} />
                        <h3>{activeItem.title}</h3>
                        <p>{activeItem.description}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Gallery;
