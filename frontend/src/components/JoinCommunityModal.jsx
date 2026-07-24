'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

export default function JoinCommunityModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-5 bg-slate-950/70 backdrop-blur-[6px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-[420px] p-10 rounded-[20px] bg-slate-900 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-center"
            role="dialog"
            aria-modal="true"
            aria-labelledby="join-modal-title"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/[0.08] text-slate-400 cursor-pointer transition-colors duration-200 hover:bg-white/10 hover:text-white"
              onClick={onClose}
              aria-label="Close"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18" /><path d="m6 6 12 12" />
              </svg>
            </button>

            <h2 id="join-modal-title" className="text-white text-[1.8rem] mb-3">Join Robonity</h2>
            <p className="text-slate-400 text-base leading-relaxed mb-8">Create an account to share projects and join the forum, or log in if you&apos;re already a member.</p>

            <div className="flex gap-4 justify-center max-[480px]:flex-col">
              <Link href="/auth?mode=signup" className="flex-1 bg-gradient-to-br from-[#00c6ff] to-[#0072ff] shadow-[0_0_30px_rgba(0,198,255,0.35)] text-white py-3 px-6 rounded-xl no-underline font-semibold text-base transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(0,198,255,0.5)]" onClick={onClose}>Sign Up</Link>
              <Link href="/auth?mode=login" className="flex-1 text-[#9fdcff] border border-[rgba(159,220,255,0.35)] py-3 px-6 rounded-xl no-underline font-semibold transition-colors duration-200 hover:bg-white/[0.06]" onClick={onClose}>Log In</Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
