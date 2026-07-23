'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useAuth } from "./AuthContext";
import "../styles/Navbar.css";
import MechanicalEyeLogo from "./MechanicalEyeLogo";

function NavItem({ href, end, children, onClick }) {
  const pathname = usePathname();
  const isActive = end ? pathname === href : pathname.startsWith(href);
  return (
    <Link href={href} className={isActive ? "active" : ""} onClick={onClick}>
      {children}
    </Link>
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { currentUser, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Hide the pill on scroll-down, reveal it again on scroll-up or near the top.
  useEffect(() => {
    let lastY = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < 80) {
        setHidden(false);
      } else if (currentY > lastY + 5) {
        setHidden(true);
      } else if (currentY < lastY - 5) {
        setHidden(false);
      }
      lastY = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change (derived during render instead of an effect,
  // per https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes)
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsMenuOpen(false);
  }

  // Lock scroll + allow Escape to close while the menu is open
  useEffect(() => {
    if (!isMenuOpen) return;

    document.body.style.overflow = "hidden";
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const handleLogout = () => { logout(); setIsMenuOpen(false); router.push("/"); };
  const closeMenu = () => setIsMenuOpen(false);

  const links = ["Home", "Projects", "Gallery", "Forum", "Events", "RoboShare", "Resources", "Newsletter", "About"];

  return (
    <>
      <nav className={`navbar-pill${hidden && !isMenuOpen ? " nav-hidden" : ""}`}>
        <Link href="/" className="pill-logo" aria-label="Robonity home">
          <MechanicalEyeLogo />
        </Link>
        <span className="pill-wordmark">Robonity</span>
        <button
          type="button"
          className="pill-menu-btn"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={isMenuOpen}
        >
          <Menu size={18} strokeWidth={2} />
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="nav-overlay-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeMenu}
          >
            <motion.div
              className="nav-overlay-card"
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="overlay-header">
                <Link href="/" className="pill-logo" onClick={closeMenu} aria-label="Robonity home">
                  <MechanicalEyeLogo />
                </Link>
                <span className="overlay-wordmark">Robonity</span>
                <button type="button" className="overlay-close" onClick={closeMenu} aria-label="Close menu">
                  <X size={20} strokeWidth={2} />
                </button>
              </div>

              <div className="overlay-body">
                <ul className="overlay-links">
                  {links.map(item => (
                    <li key={item}>
                      <NavItem href={item === "Home" ? "/" : `/${item.toLowerCase()}`} end={item === "Home"} onClick={closeMenu}>
                        {item}
                      </NavItem>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="overlay-footer">
                <span className="overlay-tagline">The premier robotics community</span>
                <span className="overlay-meta">Est. 2023</span>
                {!currentUser ? (
                  <Link href="/auth" className="btn-join" onClick={closeMenu}>Join Community</Link>
                ) : (
                  <div className="overlay-profile">
                    <img src={currentUser.avatar || "/default-avatar.png"} alt="avatar" className="profile-avatar" />
                    <span className="overlay-profile-name">{currentUser.name || "Member"}</span>
                    <button type="button" onClick={handleLogout} className="btn-logout">Logout</button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
