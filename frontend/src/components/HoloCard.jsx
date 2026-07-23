'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import LazyMedia from './LazyMedia';

const HoloCard = memo(function HoloCard({ item, onClick }) {
    return (
        <motion.div
            layout
            className="holo-card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => onClick(item)}
        >
            {item.image ? (
                <LazyMedia
                    src={item.image}
                    alt={item.title}
                    className="holo-img"
                    placeholderColor={item.color || '#1e293b'}
                    sizes="(max-width: 640px) 33vw, (max-width: 1024px) 20vw, 14vw"
                />
            ) : (
                <div className="holo-color-fallback" style={{ background: item.color }} />
            )}
            <div className="holo-scrim" />
            <div className="holo-info">
                <span className="holo-cat">{item.category}</span>
                <h3>{item.title}</h3>
            </div>
        </motion.div>
    );
});

export default HoloCard;
