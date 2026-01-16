import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from 'framer-motion';
import "../styles/Home.css";

// --- Components ---

const Typewriter = ({ text, delay = 100 }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return <span>{currentText}<span className="cursor">|</span></span>;
};

const SpotlightCard = ({ children, className = "" }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`spotlight-card ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="spotlight-overlay"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(14, 165, 233, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      {children}
    </div>
  );
};

// --- Framer Variants ---

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function Home() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div className="home-container" ref={ref}>
      {/* Hero Section */}
      <section className="hero">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Fixed height to prevent layout shift if decided to not use nowrap in future, but nowrap logic added to CSS */}
          <div style={{ minHeight: "80px" }}>
            <h1><Typewriter text="Welcome to Robonity" /></h1>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
          >
            The premier community for robotics creators, engineers, and hobbyists. Share, learn, and build the future together.
          </motion.p>
          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 0.5 }}
          >
            <Link to="/forum" className="btn btn-primary">Join the Forum</Link>
            <Link to="/projects" className="btn btn-secondary">Explore Projects</Link>
          </motion.div>
        </motion.div>
        <motion.div
          className="hero-image"
          style={{ y }} // Parallax effect
          initial={{ opacity: 0, x: 50, rotate: 5 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 1, type: "spring" }}
          whileHover={{ scale: 1.02, rotate: 2 }}
        />
      </section>

      {/* Features Section */}
      <section className="features-section">
        <motion.div
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2>Why Join Robonity?</h2>
          <p>We provide the tools and community you need to excel in robotics.</p>
        </motion.div>

        <motion.div
          className="features-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {[
            { icon: "🤝", title: "Collaborate", desc: "Connect with like-minded peers to build complex robots and systems." },
            { icon: "🧠", title: "Learn", desc: "Access tutorials, resources, and expert advice from industry mentors." },
            { icon: "🚀", title: "Showcase", desc: "Share your projects with the world and get feedback from the diverse community." },
            { icon: "🏆", title: "Compete", desc: "Participate in challenges and hackathons to test your skills and win prizes." }
          ].map((feature, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <SpotlightCard className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Featured Projects Preview - NEW SECTION */}
      <section className="featured-projects">
        <motion.div
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2>Built by the Community</h2>
          <p>See what our members have been working on lately.</p>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {[1, 2, 3].map((item, i) => (
            <motion.div
              key={item}
              className="project-preview"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Placeholder images - usually these would be from props */}
              <div style={{ width: '100%', height: '100%', background: `linear-gradient(45deg, ${['#1e293b', '#0f172a'][i % 2]}, ${['#334155', '#1e293b'][i % 2]})` }} />
              <div className="project-overlay">
                <h3>Project Alpha {item}</h3>
                <p style={{ color: '#cbd5e1' }}>An autonomous rover designed for tough terrain.</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <motion.div
          className="stats-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {[
            { value: "500+", label: "Active Members" },
            { value: "120+", label: "Projects Built" },
            { value: "50+", label: "Workshops Hosted" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="stat-item"
              variants={fadeInUp}
              whileHover={{ scale: 1.1, textShadow: "0 0 8px rgba(255,255,255,0.5)" }}
            >
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Testimonials - NEW SECTION */}
      <section className="testimonials-section">
        <motion.h2
          style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem', color: 'white' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          What Members Say
        </motion.h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {[
            { text: "Robonity changed the way I learn robotics. The community is incredibly supportive!", author: "Alex Chen", role: "Student" },
            { text: "Finding collaborators for my drone project was effortless here.", author: "Sarah Jones", role: "Engineer" }
          ].map((t, i) => (
            <motion.div
              key={i}
              className="testimonial-card"
              initial={{ x: i % 2 === 0 ? -50 : 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <div className="author-avatar" />
                <div className="author-info">
                  <h4>{t.author}</h4>
                  <span>{t.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Get Started / CTA Section */}
      <motion.section
        className="cta-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <motion.div
          className="cta-content"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h2>Ready to Start Building?</h2>
          <p>
            Check out the <Link to="/projects">Projects</Link> page to see what others are creating, or dive right into the <Link to="/forum">Forum</Link>.
          </p>
          <Link to="/auth" className="btn btn-primary btn-large">Join Community Now</Link>
        </motion.div>
      </motion.section>

      {/* Marquee Section */}
      <section className="marquee-section">
        <div className="marquee-wrapper">
          <div className="marquee-track scroll-left">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="marquee-content">
                <span>🚀 AI Hackathon 2026</span>
                <span>🤖 Robotics Workshop 101</span>
                <span>⚡ Drone Racing League</span>
                <span>🔧 Arduino Masterclass</span>
                <span>🌐 IoT Summit</span>
                <span>🏆 National RoboWar</span>
              </div>
            ))}
          </div>
        </div>

        <div className="marquee-wrapper">
          <div className="marquee-track scroll-right">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="marquee-content">
                <span>💻 Full Stack Bootcamp</span>
                <span>🧠 Machine Learning Seminar</span>
                <span>🏎️ Autonomous Rover Challenge</span>
                <span>📱 App Dev Sprint</span>
                <span>🎮 Game Dev Weekend</span>
                <span>☁️ Cloud Computing 101</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div >
  );
}
