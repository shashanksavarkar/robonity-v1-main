import React, { memo } from 'react';
import { motion } from 'framer-motion';

const HoloCard = memo(({ item, onClick }) => {
    return (
        <motion.div
            layout
            className="holo-card"
            initial={{ opacity: 0, z: -100 }}
            animate={{ opacity: 1, z: 0 }}
            exit={{ opacity: 0, z: -100 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            onClick={() => onClick(item)}
            whileHover={{ z: 50, scale: 1.1, rotateX: 5, rotateY: -5, zIndex: 100 }}
        >
            <div className="holo-visual">
                {item.image ? (
                    <img
                        src={item.image}
                        alt={item.title}
                        className="holo-img"
                        loading="lazy"
                        width="300"
                        height="200"
                    />
                ) : (
                    <div className="holo-color-fallback" style={{ background: item.color }} />
                )}
                <div className="scan-line"></div>
            </div>
            <div className="holo-info">
                <span className="holo-cat">{item.category}</span>
                <h3>{item.title}</h3>
            </div>
        </motion.div>
    );
});

export default HoloCard;
