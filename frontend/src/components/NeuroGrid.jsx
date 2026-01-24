import React, { useEffect, useRef } from 'react';

const NeuroGrid = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width, height;
        let nodes = [];
        const maxDistance = 150;
        const mouse = { x: null, y: null };

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        const createNodes = () => {
            nodes = [];
            const density = (width * height) / 15000; // Node density
            for (let i = 0; i < density; i++) {
                nodes.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 2 + 1,
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Update and draw nodes
            nodes.forEach(node => {
                // Move
                node.x += node.vx;
                node.y += node.vy;

                // Bounce
                if (node.x < 0 || node.x > width) node.vx *= -1;
                if (node.y < 0 || node.y > height) node.vy *= -1;

                // Mouse Interaction (Gravity Well)
                if (mouse.x != null) {
                    const dx = mouse.x - node.x;
                    const dy = mouse.y - node.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 200) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const force = (200 - distance) / 200;
                        // Gentle pull towards mouse
                        node.vx += forceDirectionX * force * 0.05;
                        node.vy += forceDirectionY * force * 0.05;
                    }
                }

                // Draw node
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 198, 255, 0.5)';
                ctx.fill();

                // Draw connections
                nodes.forEach(otherNode => {
                    const dx = node.x - otherNode.x;
                    const dy = node.y - otherNode.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 198, 255, ${1 - distance / maxDistance})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(otherNode.x, otherNode.y);
                        ctx.stroke();
                    }
                });
            });

            requestAnimationFrame(animate);
        };

        resize();
        createNodes();
        animate();

        const handleResize = () => {
            resize();
            createNodes();
        };

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const handleMouseLeave = () => {
            mouse.x = null;
            mouse.y = null;
        }

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseLeave);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseLeave);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: -1, // Behind everything
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle at 50% 50%, #1f2937, #111827)', // Fallback / Base
                pointerEvents: 'none', // Let clicks pass through
            }}
        />
    );
};

export default NeuroGrid;
