'use client';

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../components/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LayoutWrapper from "../components/LayoutWrapper";

gsap.registerPlugin(ScrollTrigger);

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

function AnimatedPage({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ width: "100%" }}
    >
      {children}
    </motion.div>
  );
}

// Routes that are static per an explicit request — no page-enter/exit transition.
const STATIC_ROUTES = ["/forum", "/projects", "/gallery"];

function PageShell({ children }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isStaticRoute = STATIC_ROUTES.some((route) => pathname.startsWith(route));
  const showGrid = !isHome;

  if (isHome) {
    return (
      <div className={`app-container ${showGrid ? "bg-grid-pattern" : ""}`} style={{ overflowX: "hidden" }}>
        <Navbar />
        <main className="main-content home-layout" style={{ padding: 0, maxWidth: "100%", width: "100%", marginTop: 0 }}>
          {children}
        </main>
        <Footer />
      </div>
    );
  }

  if (isStaticRoute) {
    return (
      <div className={`app-container ${showGrid ? "bg-grid-pattern" : ""}`} style={{ overflowX: "hidden" }}>
        <Navbar />
        <LayoutWrapper>{children}</LayoutWrapper>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`app-container ${showGrid ? "bg-grid-pattern" : ""}`} style={{ overflowX: "hidden" }}>
      <Navbar />
      <LayoutWrapper>
        <AnimatePresence mode="wait">
          <AnimatedPage key={pathname}>{children}</AnimatedPage>
        </AnimatePresence>
      </LayoutWrapper>
      <Footer />
    </div>
  );
}

export default function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster position="top-right" toastOptions={{ style: { background: "#1f2937", color: "#fff" } }} />
        <div className="app-root">
          <PageShell>{children}</PageShell>
        </div>
      </AuthProvider>
    </QueryClientProvider>
  );
}
