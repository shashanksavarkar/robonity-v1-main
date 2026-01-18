import React, { useState } from 'react';
import { motion } from 'framer-motion';
import "../styles/Newsletter.css";

export default function Newsletter() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                staggerChildren: 0.1,
                duration: 0.5
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="newsletter-page">
            <motion.div
                className="newsletter-card"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.h1
                    className="page-title glitch-effect"
                    data-text="NEWSLETTER"
                    variants={itemVariants}
                >
                    NEWSLETTER
                </motion.h1>
                <motion.p className="newsletter-description" variants={itemVariants}>
                    Sign up for the Robonity newsletter to get the latest news, project highlights, and tutorials sent straight to your inbox.
                </motion.p>
                <form className={`newsletter-form ${submitted ? 'submitted' : ''}`} onSubmit={handleSubmit}>
                    <motion.div className="newsletter-field" variants={itemVariants}>
                        <input type="text" required placeholder=" " disabled={submitted} />
                        <label>Your Name</label>
                    </motion.div>
                    <motion.div className="newsletter-field" variants={itemVariants}>
                        <input type="email" required placeholder=" " disabled={submitted} />
                        <label>Your Email Address</label>
                    </motion.div>
                    <motion.button
                        type="submit"
                        disabled={submitted}
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {submitted ? 'Subscribed ✓' : 'Subscribe'}
                    </motion.button>
                </form>
                {submitted && (
                    <motion.div
                        className="newsletter-success"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        🎉 You’re subscribed! Check your inbox for updates.
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}
