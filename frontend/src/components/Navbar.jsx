import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "../styles/Navbar.css";

/* =========================
   LOGO COMPONENT
========================= */
const Logo = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="var(--primary-color)"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    <circle cx="12" cy="12" r="4" />
    <path d="M12 8a8 8 0 0 0 -5.66 2.34" />
    <path d="M12 16a8 8 0 0 0 5.66 -2.34" />
  </svg>
);

/* =========================
   NAVBAR
========================= */
function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate("/");
  };

  return (
    <nav className="navbar">
      {/* ===== LOGO ===== */}
      <Link to="/" className="logo-link" onClick={handleLinkClick}>
        <Logo />
        <span className="logo-text">Robonity</span>
      </Link>

      {/* ===== MOBILE MENU ICON ===== */}
      <div className="menu-icon" onClick={toggleMobileMenu}>
        <div className={isMobileMenuOpen ? "bar open" : "bar"}></div>
        <div className={isMobileMenuOpen ? "bar open" : "bar"}></div>
        <div className={isMobileMenuOpen ? "bar open" : "bar"}></div>
      </div>

      {/* ===== NAV LINKS ===== */}
      <ul className={isMobileMenuOpen ? "nav-links open" : "nav-links"}>
        <li>
          <NavLink to="/" end onClick={handleLinkClick}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/projects" onClick={handleLinkClick}>
            Projects
          </NavLink>
        </li>
        <li>
          <NavLink to="/gallery" onClick={handleLinkClick}>
            Gallery
          </NavLink>
        </li>
        <li>
          <NavLink to="/forum" onClick={handleLinkClick}>
            Forum
          </NavLink>
        </li>
        <li>
          <NavLink to="/events" onClick={handleLinkClick}>
            Events
          </NavLink>
        </li>
        <li>
          <NavLink to="/roboshare" onClick={handleLinkClick}>
            RoboShare
          </NavLink>
        </li>
        <li>
          <NavLink to="/resources" onClick={handleLinkClick}>
            Resources
          </NavLink>
        </li>
        <li>
          <NavLink to="/newsletter" onClick={handleLinkClick}>
            Newsletter
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" onClick={handleLinkClick}>
            About
          </NavLink>
        </li>

        {/* ===== AUTH SECTION ===== */}
        {!currentUser ? (
          <li className="auth-links">
            <NavLink to="/auth" onClick={handleLinkClick} className="btn-join">
              Join Community
            </NavLink>
          </li>
        ) : (
          <li className="auth-links profile-wrapper">
            <img
              src={currentUser.avatar || "/default-avatar.png"}
              alt="avatar"
              className="profile-avatar"
              onClick={() => setIsProfileOpen((prev) => !prev)}
            />

            {isProfileOpen && (
              <div className="profile-dropdown">
                <p className="profile-name">
                  {currentUser.name || "Community Member"}
                </p>
                <button onClick={handleLogout} className="btn-logout">
                  Logout
                </button>
              </div>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
