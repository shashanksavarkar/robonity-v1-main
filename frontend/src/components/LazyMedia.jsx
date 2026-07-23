'use client';

import { useState } from 'react';
import Image from 'next/image';

const LazyMedia = ({
    src,
    type = 'image', // 'image' or 'video'
    alt = '',
    className = '',
    style = {},
    placeholderColor = '#1e293b', // Default dark slate
    sizes = '100vw',
    videoProps = { autoPlay: true, loop: true, muted: true, playsInline: true },
    ...props
}) => {
    const [hasError, setHasError] = useState(false);

    return (
        <div
            className={`lazy-media-container ${className}`}
            style={{
                position: 'relative',
                backgroundColor: placeholderColor,
                overflow: 'hidden',
                ...style
            }}
            {...props}
        >
            {/* Valid src is required to attempt rendering. The placeholder color
                behind this shows during the brief network gap and is the only
                fallback if the media never loads — visibility never depends on a
                JS load callback firing, so it can't get stuck invisible. */}
            {src && !hasError && (
                type === 'video' ? (
                    <video
                        src={src}
                        className="lazy-media-element"
                        onError={() => setHasError(true)}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                        {...videoProps}
                    />
                ) : (
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        sizes={sizes}
                        style={{ objectFit: 'cover' }}
                        onError={() => setHasError(true)}
                    />
                )
            )}
        </div>
    );
};

export default LazyMedia;
