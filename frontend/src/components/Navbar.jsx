'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useAuth } from "./AuthContext";
import MechanicalEyeLogo from "./MechanicalEyeLogo";

const cx = (...classes) => classes.filter(Boolean).join(' ');

function NavItem({ href, end, children, onClick }) {
  const pathname = usePathname();
  const isActive = end ? pathname === href : pathname.startsWith(href);
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cx(
        "inline-block no-underline text-2xl font-bold tracking-wide py-1.5 max-[600px]:text-[clamp(1.5rem,8vw,2.25rem)]",
        isActive ? "text-[#00c6ff] [text-shadow:0_0_20px_rgba(0,198,255,0.5)]" : "text-slate-400 hover:text-white",
      )}
    >
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
      <nav
        className={cx(
          "fixed top-5 left-1/2 -translate-x-1/2 z-1000 flex items-center gap-2.5 py-1.5 pr-2.5 pl-1.5 rounded-full",
          "bg-[rgba(15,23,42,0.7)] backdrop-blur-xl border border-[rgba(0,198,255,0.2)]",
          "shadow-[0_4px_30px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)_inset,0_0_20px_rgba(0,198,255,0.1)]",
          "max-[600px]:top-3.5",
          hidden && !isMenuOpen ? "-translate-y-[150%] opacity-0 pointer-events-none" : "opacity-100",
        )}
      >
        <Link href="/" className="flex items-center shrink-0 leading-[0]" aria-label="Robonity home">
          <MechanicalEyeLogo />
        </Link>
        <span className="text-sm font-extrabold text-white tracking-wider uppercase whitespace-nowrap max-[600px]:hidden">Robonity</span>
        <button
          type="button"
          className="flex items-center justify-center shrink-0 w-9 h-9 rounded-full bg-white/5 border border-white/[0.08] text-slate-400 hover:bg-[rgba(0,198,255,0.12)] hover:border-[rgba(0,198,255,0.35)] hover:text-white"
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
            className="fixed inset-0 z-1500 flex items-center justify-center p-6 bg-[rgba(2,6,16,0.7)] backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeMenu}
          >
            <motion.div
              className="w-full max-w-[880px] max-h-[85vh] flex flex-col rounded-3xl bg-[rgba(8,13,26,0.98)] border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.6)] overflow-hidden"
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex items-stretch justify-between shrink-0 pt-4 pr-0 pb-4 pl-5 border-b border-white/[0.08]">
                <Link href="/" className="flex items-center shrink-0 leading-[0]" onClick={closeMenu} aria-label="Robonity home">
                  <MechanicalEyeLogo />
                </Link>
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-base font-extrabold text-white tracking-[3px] uppercase">Robonity</span>
                <button
                  type="button"
                  className="flex items-center justify-center shrink-0 w-[70px] max-[600px]:w-14 border-0 border-l border-white/[0.08] bg-transparent text-slate-400 hover:bg-[rgba(255,59,59,0.1)] hover:text-[#ff6b6b]"
                  onClick={closeMenu}
                  aria-label="Close menu"
                >
                  <X size={20} strokeWidth={2} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8">
                <ul className="list-none m-0 p-0 flex flex-col gap-0.5">
                  {links.map(item => (
                    <li key={item}>
                      <NavItem href={item === "Home" ? "/" : `/${item.toLowerCase()}`} end={item === "Home"} onClick={closeMenu}>
                        {item}
                      </NavItem>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-3 shrink-0 p-5 border-t border-white/[0.08] text-[0.85rem] max-[600px]:justify-center max-[600px]:text-center">
                <span className="text-slate-400">The premier robotics community</span>
                <span className="text-slate-500">Est. 2023</span>
                {!currentUser ? (
                  <Link
                    href="/auth"
                    onClick={closeMenu}
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-gradient-to-br from-[rgba(0,198,255,0.2)] to-[rgba(0,114,255,0.2)] border border-[rgba(0,198,255,0.5)] text-white! font-bold text-[0.8rem] uppercase tracking-wide no-underline shadow-[0_0_15px_rgba(0,198,255,0.2)] hover:from-[rgba(0,198,255,0.4)] hover:to-[rgba(0,114,255,0.4)] hover:shadow-[0_0_25px_rgba(0,198,255,0.5)] hover:border-[#00c6ff]"
                  >
                    Join Community
                  </Link>
                ) : (
                  <div className="flex items-center gap-3">
                    <img src={currentUser.avatar || "/default-avatar.png"} alt="avatar" className="w-8 h-8 rounded-full border-2 border-[rgba(0,198,255,0.3)]" />
                    <span className="text-white font-semibold">{currentUser.name || "Member"}</span>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="bg-[rgba(255,59,59,0.15)] text-[#ff6b6b] border border-[rgba(255,59,59,0.3)] px-4 py-2 rounded-lg cursor-pointer font-semibold text-[0.8rem] hover:bg-[rgba(255,59,59,0.25)] hover:border-[#ff6b6b]"
                    >
                      Logout
                    </button>
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
