import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "./AuthContext";
import "../styles/Navbar.css";
import MechanicalEyeLogo from "./MechanicalEyeLogo";
import { useDevice } from "../hooks/useDevice";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { isMobile } = useDevice();

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  // Disable scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const handleLogout = () => { logout(); setIsProfileOpen(false); navigate("/"); };

  const links = ["Home", "Projects", "Gallery", "Forum", "Events", "RoboShare", "Resources", "Newsletter", "About"];

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo-link">
          <MechanicalEyeLogo />
          <motion.span
            className="logo-text"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            Robonity
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <ul className="nav-links">
            {links.map(item => (
              <li key={item}>
                <NavLink to={item === "Home" ? "/" : `/${item.toLowerCase()}`} end={item === "Home"}>{item}</NavLink>
              </li>
            ))}
            {!currentUser ? (
              <li className="auth-links">
                <Link to="/auth" className="btn-join">Join Community</Link>
              </li>
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
                      <p className="profile-name">{currentUser.name || "Member"}</p>
                      <button onClick={handleLogout} className="btn-logout">Logout</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )}
          </ul>
        )}

        {/* Mobile Hamburger */
          isMobile && (
            <div className="menu-icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <motion.div animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} className="bar"></motion.div>
              <motion.div animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }} className="bar"></motion.div>
              <motion.div animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} className="bar"></motion.div>
            </div>
          )}
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobile && isMobileMenuOpen && (
          <motion.div
            className="mobile-drawer"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div className="drawer-header">
              <span className="drawer-title">Menu</span>
              <button className="close-btn" onClick={() => setIsMobileMenuOpen(false)}>×</button>
            </div>

            <ul className="drawer-links">
              {links.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <NavLink to={item === "Home" ? "/" : `/${item.toLowerCase()}`} end={item === "Home"}>{item}</NavLink>
                </motion.li>
              ))}
            </ul>

            <div className="drawer-footer">
              {!currentUser ? (
                <Link to="/auth" className="btn-join-mobile">Join Community</Link>
              ) : (
                <div className="drawer-profile">
                  <div className="profile-info">
                    <img src={currentUser.avatar || "/default-avatar.png"} alt="avatar" />
                    <span>{currentUser.name}</span>
                  </div>
                  <button onClick={handleLogout} className="btn-logout-mobile">Logout</button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
