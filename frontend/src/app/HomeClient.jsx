'use client';

import { motion, AnimatePresence, animate, useInView, useMotionTemplate, useMotionValue } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
    <div
      className={`group relative overflow-hidden border border-white/10 bg-[rgba(30,41,59,0.4)] ${className}`}
      onMouseMove={handleMouseMove}
      style={style}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: useMotionTemplate`radial-gradient(650px circle at ${mouseX}px ${mouseY}px, rgba(14, 165, 233, 0.15), transparent 80%)` }}
      />
      {children}
    </div>
  );
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
    <div
      className="flex flex-col items-center justify-start w-auto transition-[transform,text-shadow] duration-300 hover:scale-110 hover:[text-shadow:0_0_8px_rgba(255,255,255,0.5)] max-[900px]:min-w-[140px] max-[900px]:flex-[0_1_auto]"
      ref={ref}
    >
      <h3 className="text-5xl font-extrabold bg-gradient-to-br from-blue-400 to-purple-500 bg-clip-text text-transparent mb-1.5">{display}</h3>
      <p className="text-slate-200 text-[1.1rem] font-medium">{label}</p>
    </div>
  );
};

const QuoteIcon = () => (
  <svg className="text-indigo-400 opacity-60 mb-4" width="42" height="42" viewBox="0 0 24 24" fill="currentColor">
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
    <div className="flex flex-col items-center gap-8 w-full" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="flex items-center justify-center gap-6 w-full">
        {testimonials.length > 1 && (
          <button
            type="button"
            className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center bg-white/[0.04] border border-white/[0.08] text-slate-300 cursor-pointer transition-[background,border-color,color,transform] duration-200 hover:bg-[rgba(129,140,248,0.15)] hover:border-[rgba(129,140,248,0.4)] hover:text-white hover:scale-[1.08]"
            onClick={prev}
            aria-label="Previous testimonial"
          >
            <ChevronIcon direction="left" />
          </button>
        )}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            className="flex-1 min-w-0 min-h-[220px] px-10 py-10 text-center flex flex-col items-center bg-white/[0.04] rounded-2xl border border-white/5 relative"
            custom={direction}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <QuoteIcon />
            <p className="text-[1.25rem] text-slate-300 italic mb-8">&quot;{t.text}&quot;</p>
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
              <div className="text-center">
                <h4 className="text-white m-0 text-base">{t.author}</h4>
                <span className="text-slate-500 text-[0.85rem]">{t.role}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        {testimonials.length > 1 && (
          <button
            type="button"
            className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center bg-white/[0.04] border border-white/[0.08] text-slate-300 cursor-pointer transition-[background,border-color,color,transform] duration-200 hover:bg-[rgba(129,140,248,0.15)] hover:border-[rgba(129,140,248,0.4)] hover:text-white hover:scale-[1.08]"
            onClick={next}
            aria-label="Next testimonial"
          >
            <ChevronIcon direction="right" />
          </button>
        )}
      </div>
      {testimonials.length > 1 && (
        <div className="flex gap-2.5">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`h-2 rounded-full border-none cursor-pointer p-0 transition-[width,background] duration-250 ${i === index ? 'w-6 bg-gradient-to-br from-blue-400 to-purple-500' : 'w-2 bg-white/20 hover:bg-white/40'}`}
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

    // Refresh ScrollTrigger after DOM updates
    ScrollTrigger.refresh();
  }, { scope: container, dependencies: [loading, stats] });

  return (
    <div className="relative" ref={container}>
      <section
        className="relative min-h-screen flex items-center justify-center p-0 overflow-visible
                   max-[900px]:flex-col max-[900px]:text-center max-[900px]:justify-center! max-[900px]:pt-20! max-[900px]:pb-20! max-[900px]:h-dvh! max-[900px]:min-h-screen max-[900px]:overflow-hidden max-[900px]:m-0 max-[900px]:relative max-[900px]:top-0"
        style={{ background: 'transparent' }}
      >
        <div className="max-w-[1000px] z-1 relative text-center flex flex-col items-center mx-auto max-[900px]:w-full max-[900px]:px-5 max-[900px]:mt-8 max-[900px]:opacity-100! max-[900px]:transform-none!">
          <div className="max-[900px]:min-h-[3em] max-[900px]:flex max-[900px]:items-center max-[900px]:justify-center">
            <h1 className="text-[3.5rem] font-extrabold leading-[1.15] mb-[1.2rem] text-white bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent whitespace-nowrap overflow-visible max-[900px]:text-[2rem] max-[900px]:whitespace-normal max-[900px]:mb-8 max-[900px]:leading-[1.3]">
              Welcome to Robonity
            </h1>
          </div>
          <p className="text-[1.15rem] leading-[1.75] text-[#b8c4d4] mb-10 max-w-[600px] mx-auto max-[900px]:text-base max-[900px]:px-2.5 max-[900px]:text-slate-300">
            The premier community for robotics creators, engineers, and hobbyists. Share, learn, and build the future together.
          </p>
          <div className="flex gap-6 mt-4 justify-center max-[900px]:flex-col max-[900px]:w-full max-[900px]:gap-4 max-[900px]:px-5">
            <button
              type="button"
              className="bg-gradient-to-br from-[#00c6ff] to-[#0072ff] shadow-[0_0_30px_rgba(0,198,255,0.35)] text-white py-3 px-6 rounded-xl border-none no-underline font-semibold text-base cursor-pointer inline-block transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(0,198,255,0.5)] max-[900px]:w-full max-[900px]:block max-[900px]:text-center"
              onClick={() => setShowJoinModal(true)}
            >
              Join the Forum
            </button>
            <Link
              href="/projects"
              className="text-[#9fdcff] border border-[rgba(159,220,255,0.35)] py-3 px-6 rounded-xl no-underline font-semibold transition-colors duration-200 hover:bg-white/[0.06] max-[900px]:w-full max-[900px]:block max-[900px]:text-center"
            >
              Explore Projects
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-[8%]">
        <div className="text-left mb-10">
          <h2 className="text-[2.5rem] text-white mb-4 max-[600px]:text-[1.8rem]">Why Join Robonity?</h2>
          <p className="text-slate-400 text-[1.1rem]">We provide the tools and community you need to excel in robotics.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-[30px]">
          {[{ icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>, title: "Collaborate", desc: "Connect with like-minded peers to build complex robots and systems." },
          { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>, title: "Learn", desc: "Access tutorials, resources, and expert advice from industry mentors." },
          { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>, title: "Showcase", desc: "Share your projects with the world and get feedback from the diverse community." },
          { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></svg>, title: "Compete", desc: "Participate in challenges and hackathons to test your skills and win prizes." }
          ].map((feature, index) => (
            <div key={index} className="flex-[1_1_280px] max-w-[400px] w-full">
              <SpotlightCard className="p-[30px] rounded-[20px] hover:-translate-y-2 hover:border-[rgba(0,198,255,0.4)] hover:shadow-[0_20px_50px_rgba(0,198,255,0.15)] transition-[transform,border-color,box-shadow] duration-300">
                <div className="w-[60px] h-[60px] bg-[rgba(0,198,255,0.1)] rounded-xl flex items-center justify-center mb-5 text-[#00c6ff] shadow-[0_0_20px_rgba(0,198,255,0.2)] transition-all duration-300 group-hover:bg-[#00c6ff] group-hover:text-slate-900 group-hover:shadow-[0_0_30px_rgba(0,198,255,0.6)] group-hover:scale-110 group-hover:rotate-[5deg]">
                  {feature.icon}
                </div>
                <h3 className="text-white text-2xl mb-2.5">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </SpotlightCard>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-[8%] bg-transparent! relative z-1">
        <div className="text-left mb-10">
          <h2 className="text-[2.5rem] text-white mb-4 max-[600px]:text-[1.8rem]">Built by the Community</h2>
          <p className="text-slate-400 text-[1.1rem]">See what our members have been working on lately.</p>
          {error && (
            <div className="text-[#ff6b6b] bg-[rgba(50,0,0,0.8)] p-[15px] rounded-lg border border-[#ff6b6b] mt-5">
              <strong>Debug Error:</strong> {error}
            </div>
          )}
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-10 w-full">
          {featuredProjects.length > 0 ? (
            featuredProjects.map((item, i) => (
              <div key={item.id || i} className="[perspective:1000px]">
                <SpotlightCard
                  className="!p-0 rounded-3xl bg-[rgba(15,23,42,0.6)] backdrop-blur-md [backdrop-filter:blur(12px)_saturate(180%)] h-full flex flex-col transition-all duration-500 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-2.5 hover:border-[var(--node-color)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                  style={{ "--node-color": item.color && item.color.includes('gradient') ? '#00c6ff' : item.color }}
                >
                  <div
                    className="absolute top-0 left-0 w-full h-0.5 z-10 pointer-events-none opacity-50 animate-node-scan"
                    style={{ background: `linear-gradient(to right, transparent, var(--node-color), transparent)` }}
                  />
                  <div className="p-6 flex flex-col gap-5 h-full relative z-5">
                    <div className="flex justify-between items-center">
                      <span
                        className="text-[0.7rem] font-extrabold tracking-[2px] bg-white/[0.03] py-1 px-3 rounded-full border border-white/10 whitespace-nowrap overflow-hidden text-ellipsis max-w-full"
                        style={{ color: 'var(--node-color)' }}
                      >
                        {item.category || 'PROJECT'}
                      </span>
                      <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981] animate-pulse-ring" />
                    </div>
                    <div className="w-full h-40 rounded-2xl relative overflow-hidden shadow-[inset_0_0_30px_rgba(0,0,0,0.5)] bg-slate-900">
                      {item.image ? (
                        <LazyMedia
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full [&_img]:object-cover [&_img]:transition-transform [&_img]:duration-[600ms] group-hover:[&_img]:scale-110"
                          placeholderColor={item.color && !item.color.includes('gradient') ? item.color : '#1e293b'}
                          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 400px"
                        />
                      ) : (
                        <div style={{ width: '100%', height: '100%', background: item.color }} />
                      )}
                      <div className="absolute inset-0 pointer-events-none [background:repeating-linear-gradient(0deg,rgba(0,0,0,0.15)_0px,transparent_1px,transparent_2px)]" />
                    </div>
                    <div>
                      <h3 className="text-[1.6rem] mb-2 text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.5)]">{item.title}</h3>
                      <p className="text-slate-400 text-[0.95rem] leading-relaxed line-clamp-2">{item.desc}</p>
                    </div>
                    <div className="mt-auto pt-[15px] border-t border-white/5 flex justify-between items-center">
                      <span className="text-xs text-slate-500 font-semibold">BY {item.author?.toUpperCase() || 'ANONYMOUS'}</span>
                      <button
                        type="button"
                        className="text-white text-[0.8rem] font-bold flex items-center gap-1.5 no-underline transition-[gap,color] duration-300 bg-transparent border-none p-0 cursor-pointer hover:gap-2.5 hover:text-[var(--node-color)]"
                        onClick={() => setShowJoinModal(true)}
                      >
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

      <section className="py-20 px-[8%] bg-[rgba(15,23,42,0.3)] backdrop-blur-[5px] relative z-1 border-t border-b border-white/5 rounded-[20px]">
        <div className="grid grid-cols-[1.4fr_1fr] gap-16 items-center max-[900px]:grid-cols-1 max-[900px]:gap-12">
          <div>
            <motion.h2
              className="text-center text-[2.5rem] text-white mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              What Members Say
            </motion.h2>
            <TestimonialCarousel testimonials={testimonials} />
          </div>
          <div className="flex flex-col items-stretch gap-7 p-8 rounded-[20px] bg-[rgba(15,23,42,0.4)] border border-white/5 max-[900px]:flex-row max-[900px]:flex-wrap max-[900px]:justify-center max-[900px]:gap-8">
            {stats.map((stat, index) => (
              <React.Fragment key={index}>
                <AnimatedStat value={stat.value} label={stat.label} />
                {index < stats.length - 1 && (
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-white/15 to-transparent max-[900px]:hidden" aria-hidden="true" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="py-[60px] px-5 rounded-[30px] text-center mt-16 pt-16 pb-0 border-t border-white/5 max-[600px]:py-10 max-[600px]:px-5">
          <h2 className="text-[2.8rem] text-white mb-6 max-[600px]:text-[1.8rem]">Ready to Start Building?</h2>
          <p className="text-slate-400 text-[1.1rem] mb-10 max-w-[600px] mx-auto">
            Check out the <Link href="/projects" className="text-[#00c6ff]">Projects</Link> page to see what others are creating, or dive right into the <Link href="/forum" className="text-[#00c6ff]">Forum</Link>.
          </p>
          <button
            type="button"
            className="bg-gradient-to-br from-[#00c6ff] to-[#0072ff] shadow-[0_0_30px_rgba(0,198,255,0.35)] text-white py-4 px-10 text-[1.1rem] rounded-xl border-none no-underline font-semibold cursor-pointer inline-block transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(0,198,255,0.5)] max-[600px]:py-3.5 max-[600px]:px-6 max-[600px]:w-full max-[600px]:block max-[600px]:mt-4"
            onClick={() => setShowJoinModal(true)}
          >
            Join Community Now
          </button>
        </div>
      </section>

      <JoinCommunityModal open={showJoinModal} onClose={() => setShowJoinModal(false)} />
    </div>
  );
}
