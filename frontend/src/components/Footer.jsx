import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand */}
        <div className="footer-brand">
          <h3>Robonity</h3>
          <p>
            A community-driven platform for robotics enthusiasts, engineers, and
            innovators.
          </p>
        </div>

        {/* Navigation */}
        <div className="footer-links">
          <h4>Explore</h4>
          <Link to="/projects">Projects</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/forum">Forum</Link>
          <Link to="/events">Events</Link>
        </div>

        {/* Resources */}
        <div className="footer-links">
          <h4>Resources</h4>
          <Link to="/roboshare">RoboShare</Link>
          <Link to="/resources">Learning</Link>
          <Link to="/newsletter">Newsletter</Link>
          <Link to="/about">About</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Robonity. All rights reserved.</p>
        <p>Author: Aman Choudhary, Anirban Das, Shashank Savarkar</p>
      </div>
    </footer>
  );
}

export default Footer;
