import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "./AuthContext";
import "../styles/Navbar.css";

const Logo = () => (
  <motion.svg
    width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    whileHover={{ rotate: 360, transition: { duration: 1 } }}
  >
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    <circle cx="12" cy="12" r="4" />
    <path d="M12 8a8 8 0 0 0 -5.66 2.34" /><path d="M12 16a8 8 0 0 0 5.66 -2.34" />
  </motion.svg>
);

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLinkClick = () => { setIsMobileMenuOpen(false); setIsProfileOpen(false); };
  const handleLogout = () => { logout(); setIsProfileOpen(false); navigate("/"); };

  return (
    <nav className="navbar">
      <Link to="/" className="logo-link" onClick={handleLinkClick}>
        <Logo />
        <motion.span
          className="logo-text"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          Robonity
        </motion.span>
      </Link>
      <div className="menu-icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        <motion.div animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} className="bar"></motion.div>
        <motion.div animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }} className="bar"></motion.div>
        <motion.div animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} className="bar"></motion.div>
      </div>
      <motion.ul
        className={`nav-links ${isMobileMenuOpen ? "open" : ""}`}
      >
        {["Home", "Projects", "Gallery", "Forum", "Events", "RoboShare", "Resources", "Newsletter", "About"].map(item => (
          <motion.li key={item} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <NavLink to={item === "Home" ? "/" : `/${item.toLowerCase()}`} end={item === "Home"} onClick={handleLinkClick}>{item}</NavLink>
          </motion.li>
        ))}
        {!currentUser ? (
          <motion.li className="auth-links" whileHover={{ scale: 1.05 }}>
            <NavLink to="/auth" onClick={handleLinkClick} className="btn-join">Join Community</NavLink>
          </motion.li>
        ) : (
          <li className="auth-links profile-wrapper">
            <motion.img
              src={currentUser.avatar || "/default-avatar.png"}
              alt="avatar"
              className="profile-avatar"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              whileHover={{ scale: 1.1 }}
            />
            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  className="profile-dropdown"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <p className="profile-name">{currentUser.name || "Community Member"}</p>
                  <button onClick={handleLogout} className="btn-logout">Logout</button>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        )}
      </motion.ul>
    </nav>
  );
}
