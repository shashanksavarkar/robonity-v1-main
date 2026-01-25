import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import '../styles/CustomCursor.css';

const CustomCursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
    const springX = useSpring(cursorX, springConfig);
    const springY = useSpring(cursorY, springConfig);

    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => setIsHovering(false);

        // Add event listeners
        window.addEventListener('mousemove', moveCursor);

        // Add hover listeners to clickable elements
        const clickables = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
        clickables.forEach(el => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        // MutationObserver to attach listeners to dynamic elements
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // Element node
                        const newClickables = node.querySelectorAll ? node.querySelectorAll('a, button, input, textarea, select, [role="button"]') : [];
                        newClickables.forEach(el => {
                            el.addEventListener('mouseenter', handleMouseEnter);
                            el.addEventListener('mouseleave', handleMouseLeave);
                        });
                        // check the node itself
                        if (node.matches && node.matches('a, button, input, textarea, select, [role="button"]')) {
                            node.addEventListener('mouseenter', handleMouseEnter);
                            node.addEventListener('mouseleave', handleMouseLeave);
                        }
                    }
                });
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            clickables.forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
            observer.disconnect();
        };
    }, [cursorX, cursorY, isVisible]);

    // Update body class for CSS-based hover states
    useEffect(() => {
        if (isHovering) {
            document.body.classList.add('hovering');
        } else {
            document.body.classList.remove('hovering');
        }
    }, [isHovering]);

    if (!isVisible) return null;

    return (
        <>
            <motion.div
                className="cursor-dot"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%'
                }}
            />
            <motion.div
                className="cursor-ring"
                style={{
                    x: springX,
                    y: springY,
                    translateX: '-50%',
                    translateY: '-50%'
                }}
            />
        </>
    );
};

export default CustomCursor;
