'use client';

import React, { memo } from 'react';
import LazyMedia from './LazyMedia';

const HoloCard = memo(function HoloCard({ item, onClick }) {
    return (
        <div className="relative aspect-square overflow-hidden cursor-pointer group" onClick={() => onClick(item)}>
            {item.image ? (
                <LazyMedia
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full [&_img]:transition-transform [&_img]:duration-500 [&_img]:ease-in-out group-hover:[&_img]:scale-[1.08]"
                    placeholderColor={item.color || '#1e293b'}
                    sizes="(max-width: 640px) 33vw, (max-width: 1024px) 20vw, 14vw"
                />
            ) : (
                <div className="absolute inset-0" style={{ background: item.color }} />
            )}
            <div className="absolute inset-0 bg-[rgba(2,6,16,0.6)] transition-colors duration-300 pointer-events-none group-hover:bg-[rgba(2,6,16,0.1)]" />
            <div className="absolute left-0 right-0 bottom-0 py-2.5 px-3 bg-gradient-to-t from-[rgba(2,6,16,0.9)] to-transparent opacity-0 translate-y-1.5 transition-all duration-250 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0">
                <span className="text-[0.6rem] text-[#00c6ff] uppercase tracking-wide block mb-0.5">{item.category}</span>
                <h3 className="text-white text-[0.8rem] font-bold m-0 leading-[1.3] overflow-hidden text-ellipsis line-clamp-2">{item.title}</h3>
            </div>
        </div>
    );
});

export default HoloCard;
