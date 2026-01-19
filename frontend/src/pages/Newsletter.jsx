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
        visible: { opacity: 1, scale: 1, transition: { staggerChildren: 0.1, duration: 0.5 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="newsletter-page">
            <motion.div className="newsletter-card" variants={containerVariants} initial="hidden" animate="visible">
                <motion.h1 className="page-title glitch-effect" data-text="NEWSLETTER" variants={itemVariants}>NEWSLETTER</motion.h1>
                <motion.p className="newsletter-description" variants={itemVariants}>
                    Sign up for the Robonity newsletter to get the latest news, project highlights, and tutorials sent straight to your inbox.
                </motion.p>
                <form className={`newsletter-form ${submitted ? 'submitted' : ''}`} onSubmit={handleSubmit}>
                    <motion.div className="newsletter-field" variants={itemVariants}>
                        <input type="text" required placeholder=" " disabled={submitted} /><label>Your Name</label>
                    </motion.div>
                    <motion.div className="newsletter-field" variants={itemVariants}>
                        <input type="email" required placeholder=" " disabled={submitted} /><label>Your Email Address</label>
                    </motion.div>
                    <motion.button type="submit" disabled={submitted} variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        {submitted ? (
                            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                Subscribed <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                            </span>
                        ) : 'Subscribe'}
                    </motion.button>
                </form>
                {submitted && (
                    <motion.div className="newsletter-success" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                            <span>You’re subscribed! Check your inbox for updates.</span>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}
