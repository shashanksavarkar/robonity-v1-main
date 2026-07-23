'use client';

import { motion, AnimatePresence, animate, useInView, useMotionTemplate, useMotionValue } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import "../styles/Home.css";
import { useHomeData } from '../hooks/useHomeData';
import Loader from '../components/Loader';
import LazyMedia from '../components/LazyMedia';
import JoinCommunityModal from '../components/JoinCommunityModal';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SpotlightCard = ({ children, className = "", style = {} }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  return (
    <div className={`spotlight-card ${className}`} onMouseMove={handleMouseMove} style={style}>
      <motion.div className="spotlight-overlay" style={{ background: useMotionTemplate`radial-gradient(650px circle at ${mouseX}px ${mouseY}px, rgba(14, 165, 233, 0.15), transparent 80%)` }} />
      {children}
    </div>
  );
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

// Counts up from 0 to the numeric part of `value` once scrolled into view, preserving any prefix/suffix (e.g. "100+").
const AnimatedStat = ({ value, label }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!isInView) return;
    const match = value.match(/[\d,.]+/);
    if (!match) return;
    const target = parseFloat(match[0].replace(/,/g, ''));
    const prefix = value.slice(0, match.index);
    const suffix = value.slice(match.index + match[0].length);
    const controls = animate(0, target, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(`${prefix}${Math.round(v)}${suffix}`),
    });
    return () => controls.stop();
  }, [isInView, value]);

  return (
    <div className="stat-entry" ref={ref}>
      <h3>{display}</h3>
      <p>{label}</p>
    </div>
  );
};

const QuoteIcon = () => (
  <svg className="quote-icon" width="42" height="42" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179Zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179Z" />
  </svg>
);

const ChevronIcon = ({ direction = "left" }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    {direction === "left" ? <path d="m15 18-6-6 6-6" /> : <path d="m9 18 6-6-6-6" />}
  </svg>
);

const TestimonialCarousel = ({ testimonials }) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || testimonials.length <= 1) return;
    const id = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(id);
  }, [paused, testimonials.length]);

  if (testimonials.length === 0) return null;

  const goTo = (i) => { setDirection(i > index ? 1 : -1); setIndex(i); };
  const prev = () => { setDirection(-1); setIndex((i) => (i - 1 + testimonials.length) % testimonials.length); };
  const next = () => { setDirection(1); setIndex((i) => (i + 1) % testimonials.length); };
  const t = testimonials[index];

  return (
    <div className="testimonial-carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="testimonial-stage">
        {testimonials.length > 1 && (
          <button type="button" className="carousel-arrow" onClick={prev} aria-label="Previous testimonial">
            <ChevronIcon direction="left" />
          </button>
        )}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            className="testimonial-card testimonial-card-featured"
            custom={direction}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <QuoteIcon />
            <p className="testimonial-text">&quot;{t.text}&quot;</p>
            <div className="testimonial-author">
              <div className="author-avatar" />
              <div className="author-info"><h4>{t.author}</h4><span>{t.role}</span></div>
            </div>
          </motion.div>
        </AnimatePresence>
        {testimonials.length > 1 && (
          <button type="button" className="carousel-arrow" onClick={next} aria-label="Next testimonial">
            <ChevronIcon direction="right" />
          </button>
        )}
      </div>
      {testimonials.length > 1 && (
        <div className="carousel-dots">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`carousel-dot ${i === index ? 'active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function HomeClient() {
  const container = useRef();
  const { featuredProjects, stats, testimonials, error, loading } = useHomeData();
  const [showJoinModal, setShowJoinModal] = useState(false);

  useGSAP(() => {
    if (loading) return;

    gsap.to(".bg-video-2", {
      opacity: 1, duration: 1, scrollTrigger: { trigger: ".features-section", start: "top center", toggleActions: "play none none reverse" }
    });

    // Refresh ScrollTrigger after DOM updates
    ScrollTrigger.refresh();
  }, { scope: container, dependencies: [loading, stats] });

  return (
    <div className="home-container" ref={container}>
      <section className="hero" style={{ background: 'transparent' }}>
        <div className="hero-content" style={{ zIndex: 1, position: 'relative' }}>
          <div className="hero-title-wrapper"><h1>Welcome to Robonity</h1></div>
          <p>The premier community for robotics creators, engineers, and hobbyists. Share, learn, and build the future together.</p>
          <div className="hero-buttons">
            <button type="button" className="btn btn-primary" onClick={() => setShowJoinModal(true)}>Join the Forum</button>
            <Link href="/projects" className="btn btn-secondary">Explore Projects</Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <motion.div className="section-header" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          <h2>Why Join Robonity?</h2>
          <p>We provide the tools and community you need to excel in robotics.</p>
        </motion.div>
        <div className="features-grid">
          {[{ icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>, title: "Collaborate", desc: "Connect with like-minded peers to build complex robots and systems." },
          { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>, title: "Learn", desc: "Access tutorials, resources, and expert advice from industry mentors." },
          { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>, title: "Showcase", desc: "Share your projects with the world and get feedback from the diverse community." },
          { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></svg>, title: "Compete", desc: "Participate in challenges and hackathons to test your skills and win prizes." }
          ].map((feature, index) => (
            <div key={index} className="feature-card-wrapper">
              <SpotlightCard className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </SpotlightCard>
            </div>
          ))}
        </div>
      </section>

      <section className="featured-projects">
        <motion.div className="section-header" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          <h2>Built by the Community</h2>
          <p>See what our members have been working on lately.</p>
          {error && (
            <div style={{ color: '#ff6b6b', background: 'rgba(50,0,0,0.8)', padding: '15px', borderRadius: '8px', border: '1px solid #ff6b6b', marginTop: '20px' }}>
              <strong>Debug Error:</strong> {error}
            </div>
          )}

        </motion.div>
        <div className="projects-grid-home">

          {featuredProjects.length > 0 ? (
            featuredProjects.map((item, i) => (
              <div key={item._id || i} className="project-node-wrapper">
                <SpotlightCard
                  className="project-node"
                  style={{ "--node-color": item.color && item.color.includes('gradient') ? '#00c6ff' : item.color }}
                >
                  <div className="node-scanline" />
                  <div className="node-content">
                    <div className="node-header">
                      <span className="node-tag">{item.category || 'PROJECT'}</span>
                      <div className="node-status-pulse" />
                    </div>
                    <div className="node-visual">
                      {item.image ? (
                        <LazyMedia src={item.image} alt={item.title} className="node-image" placeholderColor={item.color && !item.color.includes('gradient') ? item.color : '#1e293b'} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', background: item.color }} />
                      )}
                      <div className="node-glitch-overlay" />
                    </div>
                    <div className="node-info">
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                    </div>
                    <div className="node-footer">
                      <span className="node-author">BY {item.author?.toUpperCase() || 'ANONYMOUS'}</span>
                      <button type="button" className="node-link" onClick={() => setShowJoinModal(true)}>
                        VIEW <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                      </button>
                    </div>
                  </div>
                </SpotlightCard>
              </div>
            ))
          ) : (
            <div className="col-span-full flex justify-center py-10">
              <Loader />
            </div>
          )}
        </div>
      </section>

      <section className="social-proof-section">
        <div className="social-proof-grid">
          <div className="testimonials-column">
            <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>What Members Say</motion.h2>
            <TestimonialCarousel testimonials={testimonials} />
          </div>
          <div className="stats-column">
            {stats.map((stat, index) => (
              <React.Fragment key={index}>
                <AnimatedStat value={stat.value} label={stat.label} />
                {index < stats.length - 1 && <div className="stat-divider" aria-hidden="true" />}
              </React.Fragment>
            ))}
          </div>
        </div>

        <motion.div className="cta-content social-proof-cta" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
          <h2>Ready to Start Building?</h2>
          <p>Check out the <Link href="/projects">Projects</Link> page to see what others are creating, or dive right into the <Link href="/forum">Forum</Link>.</p>
          <button type="button" className="btn btn-primary btn-large" onClick={() => setShowJoinModal(true)}>Join Community Now</button>
        </motion.div>
      </section>

      <JoinCommunityModal open={showJoinModal} onClose={() => setShowJoinModal(false)} />
    </div>
  );
}
