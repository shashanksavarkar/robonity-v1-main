import { motion, useMotionTemplate, useMotionValue, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import "../styles/Home.css";
import heroBgVid from '../assets/Home_BG_Vid.mp4';
import heroBgVidOth from '../assets/Home_BG_Oth_Sec.mp4';
import { getProjects } from '../api/projectApi';
import { getStats } from '../api/statApi';
import { getTestimonials } from '../api/testimonialApi';
import { getEvents } from '../api/eventApi';

gsap.registerPlugin(ScrollTrigger, useGSAP);

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

export default function Home() {
  const container = useRef();
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [stats, setStats] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [flagshipEvents, setFlagshipEvents] = useState([]);

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        console.log("Fetching home data...");

        // Fetch projects
        try {
          const projectsRes = await getProjects();
          console.log("Projects fetched:", projectsRes.data.length);
          setFeaturedProjects(projectsRes.data.filter(p => p.featured).slice(0, 3));
        } catch (err) {
          console.error("Failed to fetch projects:", err);
          setError(prev => (prev ? prev + " | " : "") + "Projects: " + err.message);
        }

        // Fetch stats
        try {
          const statsRes = await getStats();
          console.log("Stats fetched:", statsRes.data.length);
          setStats(statsRes.data);
        } catch (err) {
          console.error("Failed to fetch stats:", err);
          setError(prev => (prev ? prev + " | " : "") + "Stats: " + err.message);
        }

        // Fetch testimonials
        try {
          const testimonialsRes = await getTestimonials();
          console.log("Testimonials fetched:", testimonialsRes.data.length);
          setTestimonials(testimonialsRes.data);
        } catch (err) {
          console.error("Failed to fetch testimonials:", err);
          setError(prev => (prev ? prev + " | " : "") + "Testimonials: " + err.message);
        }

        // Fetch events
        try {
          const eventsRes = await getEvents();
          console.log("Events fetched:", eventsRes.data.length);
          setFlagshipEvents(eventsRes.data.filter(e => e.flagship).slice(0, 3));
        } catch (err) {
          console.error("Failed to fetch events:", err);
          setError(prev => (prev ? prev + " | " : "") + "Events: " + err.message);
        }

      } catch (err) {
        console.error("Unexpected error in fetchData:", err);
        setError("Unexpected error: " + err.message);
      }
    };
    fetchData();
  }, []);

  useGSAP(() => {
    gsap.to(".hero-content", {
      y: -50, opacity: 0.8, scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
    });
    gsap.from(".feature-card", {
      y: 50, opacity: 0, duration: 0.8, stagger: 0.1, scrollTrigger: { trigger: ".features-grid", start: "top 80%", toggleActions: "play none none reverse" }
    });
    gsap.from(".stat-entry", {
      opacity: 0, duration: 0.6, stagger: 0.2, ease: "power2.out", scrollTrigger: { trigger: ".stats-container", start: "top 85%", toggleActions: "play none none reverse" }
    });
    gsap.to(".bg-video-2", {
      opacity: 1, duration: 1, scrollTrigger: { trigger: ".features-section", start: "top center", toggleActions: "play none none reverse" }
    });
  }, { scope: container });

  return (
    <div className="home-container" ref={container}>
      <div className="global-bg-video" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
        <video className="bg-video-1" autoPlay loop muted playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.4)', transition: 'opacity 0.5s ease' }}><source src={heroBgVid} type="video/mp4" /></video>
        <video className="bg-video-2" autoPlay loop muted playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.4)', opacity: 0 }}><source src={heroBgVidOth} type="video/mp4" /></video>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(15, 23, 42, 0.4)' }}></div>
      </div>

      <section className="hero" style={{ background: 'transparent' }}>
        <div className="hero-content" style={{ zIndex: 1, position: 'relative' }}>
          <div className="hero-title-wrapper"><h1><Typewriter text="Welcome to Robonity" delay={40} /></h1></div>
          <motion.p>The premier community for robotics creators, engineers, and hobbyists. Share, learn, and build the future together.</motion.p>
          <motion.div className="hero-buttons">
            <Link to="/forum" className="btn btn-primary">Join the Forum</Link>
            <Link to="/projects" className="btn btn-secondary">Explore Projects</Link>
          </motion.div>
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
            <motion.div key={index} className="feature-card-wrapper">
              <SpotlightCard className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </SpotlightCard>
            </motion.div>
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
              <motion.div
                key={item._id || i}
                className="project-node-wrapper"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <SpotlightCard
                  className="project-node"
                  style={{ "--node-color": item.color.includes('gradient') ? '#00c6ff' : item.color }}
                >
                  <div className="node-scanline" />
                  <div className="node-content">
                    <div className="node-header">
                      <span className="node-tag">{item.category || 'PROJECT'}</span>
                      <div className="node-status-pulse" />
                    </div>
                    <div className="node-visual">
                      {item.image ? (
                        <img src={item.image} alt={item.title} className="node-image" />
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
                      <Link to={`/projects`} className="node-link">
                        VIEW <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                      </Link>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))
          ) : (
            <p style={{ textAlign: 'center', color: '#94a3b8', gridColumn: '1/-1' }}>Loading projects...</p>
          )}
        </div>
      </section>

      <section className="stats-section">
        <div className="stats-container">
          {stats.map((stat, index) => (
            <div key={index} className="stat-entry">
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="testimonials-section">
        <motion.h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem', color: 'white' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>What Members Say</motion.h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {testimonials.map((t, i) => (
            <motion.div key={i} className="testimonial-card" initial={{ x: i % 2 === 0 ? -50 : 50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <div className="author-avatar" />
                <div className="author-info"><h4>{t.author}</h4><span>{t.role}</span></div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <motion.section className="cta-section" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
        <motion.div className="cta-content" whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
          <h2>Ready to Start Building?</h2>
          <p>Check out the <Link to="/projects">Projects</Link> page to see what others are creating, or dive right into the <Link to="/forum">Forum</Link>.</p>
          <Link to="/auth" className="btn btn-primary btn-large">Join Community Now</Link>
        </motion.div>
      </motion.section>

      <section className="flagship-events-section" style={{ padding: 0, position: 'relative', zIndex: 10 }}>
        <div style={{ padding: '4rem 8% 2rem', textAlign: 'center' }}>
          <motion.div className="section-header" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} style={{ marginBottom: 0 }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Flagship Events</h2>
            <p style={{ color: '#94a3b8' }}>Join our biggest annual gatherings and competitions.</p>
          </motion.div>
        </div>
        <div style={{ padding: '2rem 8% 4rem' }}>
          <div className="events-grid">
            {flagshipEvents.map((event, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} viewport={{ once: true }} style={{ display: 'flex' }}>
                <SpotlightCard className="event-card" style={{ width: '100%', height: '100%', minHeight: '320px', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ height: '140px', borderRadius: '12px', background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))`, marginBottom: '1.5rem', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', background: `radial-gradient(circle, ${i === 0 ? '#3b82f6' : i === 1 ? '#a855f7' : '#f97316'} 0%, transparent 60%)`, opacity: 0.2 }} />
                  </div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{event.title}</h3>
                  <p style={{ color: '#cbd5e1', lineHeight: '1.6', flex: 1 }}>{event.description}</p>
                  <Link to="/events" style={{ marginTop: '1.5rem', display: 'inline-flex', alignItems: 'center', color: 'white', fontWeight: '500' }}>
                    View Details <span style={{ marginLeft: '0.5rem', display: 'inline-flex' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
                  </Link>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="marquee-section">
        <div className="marquee-wrapper">
          <div className="marquee-track scroll-left">
            <div className="marquee-content">{Array(5).fill("ROBONITY 2026").map((t, i) => <span key={i}>{t}</span>)}</div>
            <div className="marquee-content" aria-hidden="true">{Array(5).fill("ROBONITY 2026").map((t, i) => <span key={i}>{t}</span>)}</div>
          </div>
        </div>
      </section>


    </div >
  );
}
