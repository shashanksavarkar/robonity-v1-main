import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
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
import OAuthSuccess from "./pages/OAuthSuccess";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const AnimatedPage = ({ children }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: 0.45, ease: "easeOut" }}
    style={{ width: "100%" }}
  >
    {children}
  </motion.div>
);

// Unified Layout for Standard Pages
const StandardLayout = ({ children }) => (
  <div className="app-container" style={{ overflowX: "hidden" }}>
    <Navbar />
    <main className="main-content" style={{ minHeight: "calc(100vh - 200px)" }}>
      {children}
    </main>
    <Footer />
  </div>
);

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* ROUTES USING ROBONITY WRAPPER */}
        <Route
          path="/"
          element={
            <StandardLayout>
              <AnimatedPage>
                <Home />
              </AnimatedPage>
            </StandardLayout>
          }
        />
        <Route
          path="/about"
          element={
            <StandardLayout>
              <AnimatedPage>
                <About />
              </AnimatedPage>
            </StandardLayout>
          }
        />
        <Route
          path="/projects"
          element={
            <StandardLayout>
              <AnimatedPage>
                <Projects />
              </AnimatedPage>
            </StandardLayout>
          }
        />
        <Route
          path="/events"
          element={
            <StandardLayout>
              <AnimatedPage>
                <Events />
              </AnimatedPage>
            </StandardLayout>
          }
        />
        <Route
          path="/newsletter"
          element={
            <StandardLayout>
              <AnimatedPage>
                <Newsletter />
              </AnimatedPage>
            </StandardLayout>
          }
        />
        <Route
          path="/gallery"
          element={
            <StandardLayout>
              <AnimatedPage>
                <Gallery />
              </AnimatedPage>
            </StandardLayout>
          }
        />
        <Route
          path="/resources"
          element={
            <StandardLayout>
              <AnimatedPage>
                <Resources />
              </AnimatedPage>
            </StandardLayout>
          }
        />
        <Route
          path="/auth"
          element={
            <StandardLayout>
              <AnimatedPage>
                <Auth />
              </AnimatedPage>
            </StandardLayout>
          }
        />
        <Route
          path="/oauth-success"
          element={
            <StandardLayout>
              <AnimatedPage>
                <OAuthSuccess />
              </AnimatedPage>
            </StandardLayout>
          }
        />

        <Route
          path="/forum"
          element={
            <ProtectedRoute>
              <StandardLayout>
                <AnimatedPage>
                  <Forum />
                </AnimatedPage>
              </StandardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/forum/thread/:threadId"
          element={
            <ProtectedRoute>
              <StandardLayout>
                <AnimatedPage>
                  <SingleThreadPage />
                </AnimatedPage>
              </StandardLayout>
            </ProtectedRoute>
          }
        />

        {/* INDEPENDENT ROBOSHARE ROUTE */}
        <Route
          path="/roboshare"
          element={
            <AnimatedPage>
              <RoboShare />
            </AnimatedPage>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
