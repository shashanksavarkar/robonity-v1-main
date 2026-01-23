import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "./AuthContext";
import "../styles/Navbar.css";
import MechanicalEyeLogo from "./MechanicalEyeLogo";



export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLinkClick = () => { setIsMobileMenuOpen(false); setIsProfileOpen(false); };
  const handleLogout = () => { logout(); setIsProfileOpen(false); navigate("/"); };

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo-link" onClick={handleLinkClick}>
        <MechanicalEyeLogo />
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
        variants={isMobile ? menuVariants : {}}
        initial={isMobile ? "closed" : false}
        animate={isMobile ? (isMobileMenuOpen ? "open" : "closed") : false}
      >
        {["Home", "Projects", "Gallery", "Forum", "Events", "RoboShare", "Resources", "Newsletter", "About"].map(item => (
          <motion.li
            key={item}
            variants={isMobile ? itemVariants : {}}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <NavLink to={item === "Home" ? "/" : `/${item.toLowerCase()}`} end={item === "Home"} onClick={handleLinkClick}>{item}</NavLink>
          </motion.li>
        ))}
        {!currentUser ? (
          <motion.li className="auth-links" variants={isMobile ? itemVariants : {}} whileHover={{ scale: 1.05 }}>
            <NavLink to="/auth" onClick={handleLinkClick} className="btn-join">Join Community</NavLink>
          </motion.li>
        ) : (
          <motion.li className="auth-links profile-wrapper" variants={isMobile ? itemVariants : {}}>
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
          </motion.li>
        )}
      </motion.ul>
    </nav>
  );
}
