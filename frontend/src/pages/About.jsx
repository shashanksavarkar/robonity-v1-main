import React from 'react';
import "../styles/About.css";

function About() {
    return (
        <div className="about-page">
            <h1 className="page-header">About Robonity</h1>

            <p className="about-intro">
                Robonity is a community-driven platform built for robotics enthusiasts,
                engineers, and innovators. Our goal is to create a space where ideas
                turn into real-world robotic solutions through collaboration and learning.
            </p>

            <div className="about-grid">
                <div className="about-card">
                    <h3>Our Mission</h3>
                    <p>
                        To empower students and engineers to design, build, and share
                        impactful robotics projects.
                    </p>
                </div>

                <div className="about-card">
                    <h3>Our Vision</h3>
                    <p>
                        A collaborative ecosystem where innovation, learning, and creativity
                        drive the future of robotics.
                    </p>
                </div>

                <div className="about-card">
                    <h3>Community First</h3>
                    <p>
                        Robonity is powered by its community — makers, coders, and problem
                        solvers growing together.
                    </p>
                </div>
            </div>

            <div className="about-highlight">
                <h2>Why Robonity?</h2>
                <p>
                    Because the future of robotics isn’t built alone. It’s built together —
                    openly, collaboratively, and fearlessly.
                </p>
            </div>
        </div>
    );
}

export default About;
