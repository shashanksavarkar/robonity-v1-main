import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from 'framer-motion';
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import "../styles/Home.css";
import heroBg from '../assets/hero-bg.png';

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
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

export default function Home() {
  const container = useRef();

  useGSAP(() => {
    // Hero Text Parallax
    gsap.to(".hero-content", {
      y: -50,
      opacity: 0.8,
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // Stagger Fade In for Features
    gsap.from(".feature-card", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      scrollTrigger: {
        trigger: ".features-grid",
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    // Stats Counter Animation
    gsap.from(".stat-entry", {
      opacity: 0,
      duration: 0.6,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".stats-container",
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });

  }, { scope: container });

  return (
    <div className="home-container" ref={container}>

      <section className="hero">
        <div className="hero-background" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
          <img
            src={heroBg}
            alt="Robotics Future"
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.4)' }}
          />
        </div>
        <div className="hero-content" style={{ zIndex: 1, position: 'relative' }}>
          <div style={{ minHeight: "80px" }}>
            <h1><Typewriter text="Welcome to Robonity" delay={40} /></h1>
          </div>
          <motion.p>
            The premier community for robotics creators, engineers, and hobbyists. Share, learn, and build the future together.
          </motion.p>
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
          {[
            { icon: "🤝", title: "Collaborate", desc: "Connect with like-minded peers to build complex robots and systems." },
            { icon: "🧠", title: "Learn", desc: "Access tutorials, resources, and expert advice from industry mentors." },
            { icon: "🚀", title: "Showcase", desc: "Share your projects with the world and get feedback from the diverse community." },
            { icon: "🏆", title: "Compete", desc: "Participate in challenges and hackathons to test your skills and win prizes." }
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
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {[1, 2, 3].map((item, i) => (
            <motion.div key={item} className="project-preview" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.2 }} viewport={{ once: true }}>
              <div style={{ width: '100%', height: '100%', background: `linear-gradient(45deg, ${['#1e293b', '#0f172a'][i % 2]}, ${['#334155', '#1e293b'][i % 2]})` }} />
              <div className="project-overlay">
                <h3>Project Alpha {item}</h3>
                <p style={{ color: '#cbd5e1' }}>An autonomous rover designed for tough terrain.</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="stats-section">
        <div className="stats-container">
          {[
            { value: "500+", label: "Active Members" },
            { value: "120+", label: "Projects Built" },
            { value: "50+", label: "Workshops Hosted" }
          ].map((stat, index) => (
            <div key={index} className="stat-entry">
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="testimonials-section">
        <motion.h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem', color: 'white' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          What Members Say
        </motion.h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {[
            { text: "Robonity changed the way I learn robotics. The community is incredibly supportive!", author: "Alex Chen", role: "Student" },
            { text: "Finding collaborators for my drone project was effortless here.", author: "Sarah Jones", role: "Engineer" }
          ].map((t, i) => (
            <motion.div key={i} className="testimonial-card" initial={{ x: i % 2 === 0 ? -50 : 50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
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
            {[
              { title: "Robonity Hackathon 2026", desc: "48 hours of non-stop coding, building, and innovating with peers from around the globe.", color: "from-blue-500 to-cyan-500" },
              { title: "Global Tech Summit", desc: "Hear from industry pioneers and robotics experts about the future of automation.", color: "from-purple-500 to-pink-500" },
              { title: "Bot Wars Championship", desc: "The ultimate combat robotics tournament. Build, fight, and win glory.", color: "from-orange-500 to-red-500" }
            ].map((event, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} viewport={{ once: true }} style={{ display: 'flex' }}>
                <SpotlightCard className="event-card" style={{ width: '100%', height: '100%', minHeight: '320px', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ height: '140px', borderRadius: '12px', background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))`, marginBottom: '1.5rem', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', background: `radial-gradient(circle, ${i === 0 ? '#3b82f6' : i === 1 ? '#a855f7' : '#f97316'} 0%, transparent 60%)`, opacity: 0.2 }} />
                  </div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{event.title}</h3>
                  <p style={{ color: '#cbd5e1', lineHeight: '1.6', flex: 1 }}>{event.desc}</p>
                  <Link to="/events" style={{ marginTop: '1.5rem', display: 'inline-flex', alignItems: 'center', color: 'white', fontWeight: '500' }}>
                    View Details <span style={{ marginLeft: '0.5rem' }}>→</span>
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
            <div className="marquee-content">
              <span>ROBONITY 2026</span>
              <span>BUILD THE FUTURE</span>
              <span>INNOVATE</span>
              <span>COLLABORATE</span>
              <span>COMPETE</span>
              <span>ROBONITY 2026</span>
              <span>BUILD THE FUTURE</span>
              <span>INNOVATE</span>
              <span>COLLABORATE</span>
              <span>COMPETE</span>
            </div>
            <div className="marquee-content" aria-hidden="true">
              <span>ROBONITY 2026</span>
              <span>BUILD THE FUTURE</span>
              <span>INNOVATE</span>
              <span>COLLABORATE</span>
              <span>COMPETE</span>
              <span>ROBONITY 2026</span>
              <span>BUILD THE FUTURE</span>
              <span>INNOVATE</span>
              <span>COLLABORATE</span>
              <span>COMPETE</span>
            </div>
          </div>
        </div>
      </section>


    </div >
  );
}
