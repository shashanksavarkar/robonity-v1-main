import React from 'react';
import { motion } from 'framer-motion';
import "../styles/About.css";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function About() {
    return (
        <div className="about-page">
            <div style={{ width: "100%", display: "flex", justifyContent: "center", marginBottom: "30px" }}>
                <motion.h1
                    className="page-title glitch-effect"
                    data-text="ABOUT ROBONITY"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ margin: 0 }}
                >
                    ABOUT ROBONITY
                </motion.h1>
            </div>
            <motion.p
                className="about-intro"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
            >
                Robonity is a community-driven platform built for robotics enthusiasts, engineers, and i
                nnovators. Our goal is to create a space where ideas turn into real-world robotic solutions through collaboration and learning.
            </motion.p>
            <motion.div
                className="about-grid"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {[
                    {
                        title: "Our Mission",
                        text: "To empower students and engineers to design, build, and share impactful robotics projects.",
                        icon: (
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                                <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                                <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                                <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                            </svg>
                        )
                    },
                    {
                        title: "Our Vision",
                        text: "A collaborative ecosystem where innovation, learning, and creativity drive the future of robotics.",
                        icon: (
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                            </svg>
                        )
                    },
                    {
                        title: "Community First",
                        text: "Robonity is powered by its community — makers, coders, and problem solvers growing together.",
                        icon: (
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                            </svg>
                        )
                    },
                    {
                        title: "Open Innovation",
                        text: "We believe in open-source knowledge sharing to accelerate technological breakthroughs for everyone.",
                        icon: (
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 0 1 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" />
                            </svg>
                        )
                    }
                ].map((item, i) => (
                    <motion.div key={i} className="about-card" variants={itemVariants}>
                        <div className="about-icon-wrapper">
                            {item.icon}
                        </div>
                        <h3>{item.title}</h3>
                        <p>{item.text}</p>
                    </motion.div>
                ))}

            </motion.div>
            <motion.div
                className="about-highlight glass-panel"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h2 style={{ color: "#fff", marginBottom: "1rem" }}>Why Robonity?</h2>
                <p>Because the future of robotics isn’t built alone. It’s built together — openly, collaboratively, and fearlessly.</p>
            </motion.div>

            <motion.div
                className="about-devs"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                style={{ marginTop: "6rem" }}
            >
                <div className="dev-header">
                    <h2>Meet Our Devs</h2>
                    <div className="dev-underline"></div>
                </div>

                <div className="dev-grid">
                    {[
                        { name: "Aman Choudhary", role: "Full Stack Developer", image: "https://ui-avatars.com/api/?name=Aman+Choudhary&background=0d8abc&color=fff", desc: "Passionate about building scalable web applications and exploring new tech stacks.", instagram: "#", linkedin: "#", github: "#" },
                        { name: "Anirban Das", role: "Frontend Developer", image: "https://ui-avatars.com/api/?name=Anirban+Das&background=0d8abc&color=fff", desc: "Crafting beautiful and intuitive user interfaces with a focus on user experience.", instagram: "#", linkedin: "#", github: "#" },
                        { name: "Shashank Savarkar", role: "Backend Developer", image: "https://ui-avatars.com/api/?name=Shashank+Savarkar&background=0d8abc&color=fff", desc: "Architecting robust server-side solutions and optimizing database performance.", instagram: "#", linkedin: "#", github: "#" }
                    ].map((dev, i) => (
                        <motion.div
                            key={i}
                            className="dev-card glass-panel"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            whileHover={{ y: -10 }}
                        >
                            <div className="dev-image-wrapper">
                                <img src={dev.image} alt={dev.name} className="dev-image" />
                            </div>
                            <h3>{dev.name}</h3>
                            <span className="dev-role">{dev.role}</span>
                            <div className="dev-socials">
                                <a href={dev.github} target="_blank" rel="noreferrer" className="social-link github">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                </a>
                                <a href={dev.instagram} target="_blank" rel="noreferrer" className="social-link instagram">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </a>
                                <a href={dev.linkedin} target="_blank" rel="noreferrer" className="social-link linkedin">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>
                            </div>
                            <p className="dev-desc">{dev.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div >
    );
}
