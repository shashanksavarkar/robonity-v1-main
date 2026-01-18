import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "./AuthContext";
import "../styles/Navbar.css";

const Logo = () => (
  <div style={{ position: 'relative', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    {/* Rotating Gear */}
    <motion.svg
      width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ position: 'absolute' }}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" opacity="0.1" />
      <path d="M12 1v3m0 16v3m7.78-18.78l-2.12 2.12m-11.32 11.32l-2.12 2.12m0-13.44l2.12 2.12m11.32 11.32l2.12 2.12M1 12h3m16 0h3M3.5 12a8.5 8.5 0 1 1 17 0 8.5 8.5 0 0 1-17 0z" strokeWidth="2" />
      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" strokeWidth="1.5" />
    </motion.svg>

    {/* Stationary Eye */}
    <motion.svg
      width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      style={{ position: 'absolute', zIndex: 1 }}
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" fill="#fff" />
    </motion.svg>
  </div>
);

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // Check for mobile view to apply animations only on small screens
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
            {/* ... Dropdown ... */}
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
