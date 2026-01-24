import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Forum from "./pages/Forum";
import Events from "./pages/Events";
import Newsletter from "./pages/Newsletter";
import RoboShare from "./pages/RoboShare";
import Gallery from "./pages/Gallery";
import Resources from "./pages/Resources";
import Auth from "./pages/Auth";
import SingleThreadPage from "./pages/SingleThreadPage";
import OAuthsuccess from "./pages/OAuthsuccess";
import CustomCursor from "./components/CustomCursor";
import NeuroGrid from "./components/NeuroGrid";

gsap.registerPlugin(ScrollTrigger);

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const AnimatedPage = ({ children }) => (
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

const PageLayout = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const excludeGrid = ["/"];
  const showGrid = !excludeGrid.includes(location.pathname);

  return (
    <div className={`app-container ${showGrid ? 'bg-grid-pattern' : ''}`} style={{ overflowX: "hidden" }}>
      <Navbar />
      <main
        className={`main-content ${isHome ? 'home-layout' : ''}`}
        style={{
          minHeight: "calc(100vh - 200px)",
          ...(isHome ? { padding: 0, maxWidth: '100%', width: '100%', marginTop: 0 } : {})
        }}
      >
        <AnimatedPage>{children}</AnimatedPage>
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  const location = useLocation();
  const routes = [
    { path: "/", Comp: Home },
    { path: "/about", Comp: About },
    { path: "/projects", Comp: Projects },
    { path: "/events", Comp: Events },
    { path: "/newsletter", Comp: Newsletter },
    { path: "/gallery", Comp: Gallery },
    { path: "/resources", Comp: Resources },
    { path: "/auth", Comp: Auth },
    { path: "/oauth-success", Comp: OAuthsuccess },
  ];

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

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
    <AnimatePresence mode="wait">
      <NeuroGrid />
      <CustomCursor />
      <Routes location={location} key={location.pathname}>
        {routes.map(({ path, Comp }) => (
          <Route key={path} path={path} element={<PageLayout><Comp /></PageLayout>} />
        ))}

        {/* Protected Forum Routes */}
        <Route path="/forum" element={<ProtectedRoute><PageLayout><Forum /></PageLayout></ProtectedRoute>} />
        <Route path="/forum/thread/:threadId" element={<ProtectedRoute><PageLayout><SingleThreadPage /></PageLayout></ProtectedRoute>} />

        {/* Other Routes */}
        <Route path="/roboshare" element={<PageLayout><RoboShare /></PageLayout>} />
      </Routes>
    </AnimatePresence>
  );
}
