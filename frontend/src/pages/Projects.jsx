import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Projects.css';

const projects = [
    { title: "A-Bot", desc: "An autonomous small-scale rover using a Raspberry Pi and AI for navigation.", tags: ["AI", "Robotics", "Embedded"] },
    { title: "Swarm Bots", desc: "Building a team of AI-powered robots for the upcoming RoboSoccer 2026.", tags: ["AI", "Robotics", "ML"] },
    { title: "RoboSoccer Team", desc: "Building a team of AI-powered robots for the upcoming RoboSoccer 2026.", tags: ["AI", "Robotics", "ML"] },
    { title: "RoboSoccer Team", desc: "Building a team of AI-powered robots for the upcoming RoboSoccer 2026.", tags: ["AI", "Robotics", "ML"] },
    { title: "RoboSoccer Team", desc: "Building a team of AI-powered robots for the upcoming RoboSoccer 2026.", tags: ["AI", "Robotics", "ML"] }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function Projects() {
    return (
        <div className="projects-page">
            <motion.h1
                className="page-header"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Community Projects
            </motion.h1>
            <motion.p
                className="page-subtext"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                Here is a list of projects currently being developed by our community members.
            </motion.p>

            <motion.div
                className="projects-grid"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                {projects.map((p, i) => (
                    <motion.div key={i} className="project-card" variants={cardVariants} whileHover={{ y: -5 }}>
                        <h3>{p.title}</h3>
                        <p>{p.desc}</p>
                        <div className="project-tags">
                            {p.tags.map(t => <span key={t}>{t}</span>)}
                        </div>
                    </motion.div>
                ))}
                <motion.div
                    className="project-card add-project"
                    variants={cardVariants}
                    whileHover={{ scale: 1.02 }}
                >
                    <h3>Join Community to showcase your projects!</h3>
                    <p>Share your idea, get collaborators, and build together.</p>
                </motion.div>
            </motion.div>
        </div>
    );
}
