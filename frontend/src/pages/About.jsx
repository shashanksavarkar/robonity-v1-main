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
            <motion.h1
                className="page-header"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                About Robonity
            </motion.h1>
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
                    { title: "Our Mission", text: "To empower students and engineers to design, build, and share impactful robotics projects." },
                    { title: "Our Vision", text: "A collaborative ecosystem where innovation, learning, and creativity drive the future of robotics." },
                    { title: "Community First", text: "Robonity is powered by its community — makers, coders, and problem solvers growing together." }
                ].map((item, i) => (
                    <motion.div key={i} className="about-card" variants={itemVariants}>
                        <h3>{item.title}</h3>
                        <p>{item.text}</p>
                    </motion.div>
                ))}
            </motion.div>
            <motion.div
                className="about-highlight"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h2>Why Robonity?</h2>
                <p>Because the future of robotics isn’t built alone. It’s built together — openly, collaboratively, and fearlessly.</p>
            </motion.div>
        </div>
    );
}
