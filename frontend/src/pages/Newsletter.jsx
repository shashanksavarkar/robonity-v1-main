import React, { useState } from 'react';
import { motion } from 'framer-motion';
import "../styles/Newsletter.css";

export default function Newsletter() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="newsletter-page">
            <motion.div
                className="newsletter-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="page-header">Newsletter</h1>
                <p className="newsletter-description">
                    Sign up for the Robonity newsletter to get the latest news, project highlights, and tutorials sent straight to your inbox.
                </p>
                <form className={`newsletter-form ${submitted ? 'submitted' : ''}`} onSubmit={handleSubmit}>
                    <div className="newsletter-field">
                        <input type="text" required placeholder=" " disabled={submitted} />
                        <label>Your Name</label>
                    </div>
                    <div className="newsletter-field">
                        <input type="email" required placeholder=" " disabled={submitted} />
                        <label>Your Email Address</label>
                    </div>
                    <motion.button
                        type="submit"
                        disabled={submitted}
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
