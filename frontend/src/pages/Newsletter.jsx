import React, { useState } from 'react';
import "../styles/Newsletter.css";

function Newsletter() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        // In a real app, send data to backend here
    };

    return (
        <div className="newsletter-page">
            <div className="newsletter-card">
                <h1 className="page-header">Newsletter</h1>

                <p className="newsletter-description">
                    Sign up for the Robonity newsletter to get the latest news,
                    project highlights, and tutorials sent straight to your inbox.
                </p>

                <form
                    className={`newsletter-form ${submitted ? 'submitted' : ''}`}
                    onSubmit={handleSubmit}
                >
                    {/* NAME */}
                    <div className="newsletter-field">
                        <input
                            type="text"
                            required
                            placeholder=" "
                            disabled={submitted}
                        />
                        <label>Your Name</label>
                    </div>

                    {/* EMAIL */}
                    <div className="newsletter-field">
                        <input
                            type="email"
                            required
                            placeholder=" "
                            disabled={submitted}
                        />
                        <label>Your Email Address</label>
                    </div>

                    <button type="submit" disabled={submitted}>
                        {submitted ? 'Subscribed ✓' : 'Subscribe'}
                    </button>
                </form>

                {/* SUCCESS MESSAGE */}
                {submitted && (
                    <div className="newsletter-success">
                        🎉 You’re subscribed! Check your inbox for updates.
                    </div>
                )}
            </div>
        </div>
    );
}

export default Newsletter;
