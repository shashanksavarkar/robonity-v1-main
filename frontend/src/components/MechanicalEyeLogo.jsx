import React from "react";
import { motion } from "framer-motion";

const MechanicalEyeLogo = () => {
    // Color palette - using the cyan from the theme or falling back to a techy cyan
    const primaryColor = "var(--primary-color, #00f3ff)";
    const secondaryColor = "#ffffff";

    return (
        <div style={{ width: "45px", height: "45px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            {/* Outer Gear */}
            <motion.svg
                width="45"
                height="45"
                viewBox="0 0 100 100"
                fill="none"
                style={{ position: "absolute" }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            >
                {/* Gear Body */}
                <circle cx="50" cy="50" r="38" stroke={primaryColor} strokeWidth="4" />

                {/* Gear Teeth - simple varying stroke dasharray or carefully placed rectangles could work, 
            but drawing individual teeth is clearer for a custom shape. 
            Let's use a path for teeth. */}
                {Array.from({ length: 8 }).map((_, i) => (
                    <rect
                        key={i}
                        x="44"
                        y="2"
                        width="12"
                        height="12"
                        fill={primaryColor}
                        transform={`rotate(${i * 45} 50 50)`}
                    />
                ))}

                {/* Inner detail ring */}
                <circle cx="50" cy="50" r="32" stroke={primaryColor} strokeWidth="1" opacity="0.5" />
            </motion.svg>

            {/* Inner Iris / Shutter Mechanism */}
            <motion.svg
                width="30"
                height="30"
                viewBox="0 0 100 100"
                fill="none"
                style={{ position: "absolute" }}
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            >
                {/* Shutter blades */}
                <path d="M50 50 L50 10 L65 15 Z" fill={secondaryColor} opacity="0.8" transform="rotate(0 50 50)" />
                <path d="M50 50 L50 10 L65 15 Z" fill={secondaryColor} opacity="0.8" transform="rotate(60 50 50)" />
                <path d="M50 50 L50 10 L65 15 Z" fill={secondaryColor} opacity="0.8" transform="rotate(120 50 50)" />
                <path d="M50 50 L50 10 L65 15 Z" fill={secondaryColor} opacity="0.8" transform="rotate(180 50 50)" />
                <path d="M50 50 L50 10 L65 15 Z" fill={secondaryColor} opacity="0.8" transform="rotate(240 50 50)" />
                <path d="M50 50 L50 10 L65 15 Z" fill={secondaryColor} opacity="0.8" transform="rotate(300 50 50)" />

                <circle cx="50" cy="50" r="28" stroke={secondaryColor} strokeWidth="2" />
            </motion.svg>

            {/* Pupil / Core */}
            <motion.div
                style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: primaryColor,
                    boxShadow: `0 0 10px ${primaryColor}, 0 0 20px ${primaryColor}`,
                    zIndex: 2,
                }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
        </div>
    );
};

export default MechanicalEyeLogo;
