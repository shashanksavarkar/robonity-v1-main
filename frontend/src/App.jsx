import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
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

const PageLayout = ({ children }) => (
  <div className="app-container" style={{ overflowX: "hidden" }}>
    <Navbar />
    <main className="main-content" style={{ minHeight: "calc(100vh - 200px)" }}>
      <AnimatedPage>{children}</AnimatedPage>
    </main>
    <Footer />
  </div>
);

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

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {routes.map(({ path, Comp }) => (
          <Route key={path} path={path} element={<PageLayout><Comp /></PageLayout>} />
        ))}

        {[
          { path: "/forum", Comp: Forum },
          { path: "/forum/thread/:threadId", Comp: SingleThreadPage },
        ].map(({ path, Comp }) => (
          <Route key={path} path={path} element={<ProtectedRoute><PageLayout><Comp /></PageLayout></ProtectedRoute>} />
        ))}

        <Route path="/roboshare" element={<PageLayout><RoboShare /></PageLayout>} />
      </Routes>
    </AnimatePresence>
  );
}
