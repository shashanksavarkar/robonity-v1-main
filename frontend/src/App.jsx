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

/* ================================
   PAGE ANIMATION CONFIG
================================ */
const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
};

const pageTransition = {
    duration: 0.45,
    ease: "easeOut",
};

/* Wrapper for each page */
const AnimatedPage = ({ children }) => (
    <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
    >
        {children}
    </motion.div>
);

function App() {
    const location = useLocation();

    return (
        <div className="app-container">
            <Navbar />

            <main className="main-content">
                <AnimatePresence mode="wait">
                    <Routes location={location} key={location.pathname}>
                        {/* ===== PUBLIC ROUTES ===== */}
                        <Route
                            path="/"
                            element={
                                <AnimatedPage>
                                    <Home />
                                </AnimatedPage>
                            }
                        />

                        <Route
                            path="/about"
                            element={
                                <AnimatedPage>
                                    <About />
                                </AnimatedPage>
                            }
                        />

                        <Route
                            path="/projects"
                            element={
                                <AnimatedPage>
                                    <Projects />
                                </AnimatedPage>
                            }
                        />

                        <Route
                            path="/events"
                            element={
                                <AnimatedPage>
                                    <Events />
                                </AnimatedPage>
                            }
                        />

                        <Route
                            path="/newsletter"
                            element={
                                <AnimatedPage>
                                    <Newsletter />
                                </AnimatedPage>
                            }
                        />

                        <Route
                            path="/roboshare"
                            element={
                                <AnimatedPage>
                                    <RoboShare />
                                </AnimatedPage>
                            }
                        />

                        <Route
                            path="/gallery"
                            element={
                                <AnimatedPage>
                                    <Gallery />
                                </AnimatedPage>
                            }
                        />

                        <Route
                            path="/resources"
                            element={
                                <AnimatedPage>
                                    <Resources />
                                </AnimatedPage>
                            }
                        />

                        {/* ===== AUTH ROUTES ===== */}
                        <Route
                            path="/auth"
                            element={
                                <AnimatedPage>
                                    <Auth />
                                </AnimatedPage>
                            }
                        />

                        <Route
                            path="/oauth-success"
                            element={
                                <AnimatedPage>
                                    <OAuthSuccess />
                                </AnimatedPage>
                            }
                        />

                        {/* ===== PROTECTED ROUTES ===== */}
                        <Route
                            path="/forum"
                            element={
                                <ProtectedRoute>
                                    <AnimatedPage>
                                        <Forum />
                                    </AnimatedPage>
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/forum/thread/:threadId"
                            element={
                                <ProtectedRoute>
                                    <AnimatedPage>
                                        <SingleThreadPage />
                                    </AnimatedPage>
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </AnimatePresence>
            </main>

            <Footer />
        </div>
    );
}

export default App;
