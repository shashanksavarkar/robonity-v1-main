'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
    LayoutGrid, Bot, BrainCircuit, Eye, Wifi, Code, Boxes,
    X, ArrowUpRight, Sparkles, Rocket,
} from 'lucide-react';
import LazyMedia from '../../components/LazyMedia';

const CATEGORY_ICONS = {
    Robotics: Bot,
    'Artificial Intelligence': BrainCircuit,
    'Computer Vision': Eye,
    IoT: Wifi,
    Software: Code,
};

const STATUS_STYLES = {
    Completed: 'bg-emerald-500/25 text-emerald-400',
    Ongoing: 'bg-blue-500/25 text-blue-400',
    'In Progress': 'bg-blue-500/25 text-blue-400',
    Planning: 'bg-amber-500/25 text-amber-400',
    Concept: 'bg-violet-500/25 text-violet-400',
};
const DEFAULT_STATUS_STYLE = 'bg-white/15 text-slate-100';

const cx = (...classes) => classes.filter(Boolean).join(' ');

// Project categories are stored as slash-separated tag strings
// (e.g. "Robotics / Autonomous Systems / Hybrid Electric Vehicles (UGV)");
// the first segment is the broad domain used for filtering + icons.
const getPrimaryCategory = (category = '') => category.split('/')[0].trim();

function StatusBadge({ status, className }) {
    return (
        <span className={cx(
            'px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide backdrop-blur-sm',
            STATUS_STYLES[status] || DEFAULT_STATUS_STYLE,
            className,
        )}>
            {status || 'Unknown'}
        </span>
    );
}

function ProjectModal({ project, onClose }) {
    useEffect(() => {
        const handleKeyDown = (e) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-2000 bg-black/80 backdrop-blur-md flex items-center justify-center p-5 overflow-y-auto"
            onClick={onClose}
        >
            <div
                className="relative bg-slate-900 border border-white/10 rounded-[20px] overflow-hidden w-full max-w-[800px] max-h-[calc(100vh-40px)] grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:max-h-[85vh] overflow-y-auto"
                role="dialog"
                aria-modal="true"
                aria-labelledby="project-modal-title"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    className="absolute top-3.5 right-3.5 z-2 flex items-center justify-center w-[34px] h-[34px] bg-black/50 border border-white/15 rounded-full text-white cursor-pointer transition-colors hover:bg-[#00c6ff] hover:text-[#06121c] hover:border-[#00c6ff]"
                    onClick={onClose}
                    aria-label="Close"
                >
                    <X size={18} strokeWidth={2.5} />
                </button>

                <div className="relative min-h-[240px] w-full bg-slate-950">
                    <div className="absolute inset-0" style={{ background: project.color }} />
                    {project.image && (
                        <LazyMedia
                            src={project.image}
                            alt={project.title}
                            placeholderColor={project.color}
                            style={{ position: 'absolute', inset: 0 }}
                            sizes="(max-width: 768px) 100vw, 40vw"
                        />
                    )}
                </div>

                <div className="p-[clamp(20px,4vw,32px)] flex flex-col gap-3">
                    <StatusBadge status={project.status} className="self-start" />
                    <h3 id="project-modal-title" className="text-[clamp(1.4rem,3vw,1.8rem)] text-white leading-tight m-0">
                        {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-2.5 text-[0.85rem] text-slate-400">
                        <span>BY {(project.author || 'Anonymous').toUpperCase()}</span>
                        <span aria-hidden="true">&bull;</span>
                        <span>{getPrimaryCategory(project.category) || 'Project'}</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed m-0">{project.desc}</p>
                    <button
                        type="button"
                        className="self-start mt-auto px-5.5 py-2.5 bg-transparent border border-white/20 text-white rounded-lg font-semibold text-[0.85rem] cursor-pointer transition-colors hover:bg-[#00c6ff]/12 hover:border-[#00c6ff] hover:text-[#00c6ff]"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function ProjectsClient({ projects }) {
    const [filter, setFilter] = useState('All');
    const [activeProject, setActiveProject] = useState(null);

    const categories = useMemo(() => {
        const unique = Array.from(
            new Set(projects.map((p) => getPrimaryCategory(p.category)).filter(Boolean))
        );
        return ['All', ...unique];
    }, [projects]);

    const filteredProjects = useMemo(() => {
        return projects.filter((project) => filter === 'All' || getPrimaryCategory(project.category) === filter);
    }, [projects, filter]);

    const stats = useMemo(() => ({
        total: projects.length,
        active: projects.filter((p) => p.status === 'Ongoing' || p.status === 'In Progress').length,
        completed: projects.filter((p) => p.status === 'Completed').length,
    }), [projects]);

    return (
        <div className="w-full min-h-screen flex flex-col gap-[clamp(28px,5vw,48px)]">
            <header className="flex flex-col items-center text-center gap-3.5">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#00c6ff]/10 border border-[#00c6ff]/30 text-[#00c6ff] text-[11px] font-bold uppercase tracking-widest">
                    <Rocket size={13} /> Built by the Community
                </span>
                <h1 className="text-[clamp(2.2rem,6vw,3.5rem)] font-black m-0 bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent uppercase tracking-[-1px]">
                    Explore Projects
                </h1>
                <p className="text-slate-400 text-[clamp(0.9rem,2vw,1.1rem)] max-w-[56ch] leading-relaxed m-0">
                    Robots, systems, and experiments engineered by Robonity members — from concept sketches to competition-ready machines.
                </p>

                <div className="flex flex-wrap justify-center gap-[clamp(10px,3vw,18px)] mt-2.5">
                    <div className="flex flex-col items-center gap-0.5 px-5.5 py-2.5 bg-slate-900/60 border border-white/10 rounded-2xl min-w-[110px]">
                        <strong className="text-2xl text-white font-extrabold">{stats.total}</strong>
                        <span className="text-[11px] text-slate-500 uppercase tracking-wide">Total Projects</span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5 px-5.5 py-2.5 bg-slate-900/60 border border-white/10 rounded-2xl min-w-[110px]">
                        <strong className="text-2xl text-white font-extrabold">{stats.active}</strong>
                        <span className="text-[11px] text-slate-500 uppercase tracking-wide">In Progress</span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5 px-5.5 py-2.5 bg-slate-900/60 border border-white/10 rounded-2xl min-w-[110px]">
                        <strong className="text-2xl text-white font-extrabold">{stats.completed}</strong>
                        <span className="text-[11px] text-slate-500 uppercase tracking-wide">Completed</span>
                    </div>
                </div>
            </header>

            {/* Left-side icon sidebar on desktop; collapses into a bottom dock on mobile */}
            <nav className="fixed z-900 flex bg-black/85 backdrop-blur-xl border border-white/10 shadow-2xl
                             bottom-5 left-1/2 -translate-x-1/2 flex-row rounded-full
                             md:bottom-auto md:top-1/2 md:left-0 md:translate-x-0 md:-translate-y-1/2 md:flex-col md:border-l-0 md:rounded-l-none md:rounded-r-2xl">
                {categories.map((cat) => {
                    const Icon = cat === 'All' ? LayoutGrid : (CATEGORY_ICONS[cat] || Boxes);
                    const isActive = filter === cat;
                    return (
                        <button
                            key={cat}
                            type="button"
                            className={cx(
                                'group relative flex items-center justify-center bg-transparent border-none cursor-pointer transition-colors duration-200',
                                'w-11 h-11 border-r border-white/5 last:border-r-0',
                                'md:w-13 md:h-13 md:border-r-0 md:border-b md:border-white/5 md:last:border-b-0',
                                isActive ? 'bg-blue-500 text-white' : 'text-slate-400 hover:bg-[#00c6ff]/10 hover:text-white',
                            )}
                            onClick={() => setFilter(cat)}
                            aria-label={`Filter by ${cat}`}
                            aria-pressed={isActive}
                        >
                            <Icon size={18} strokeWidth={2} />
                            <span className="pointer-events-none absolute whitespace-nowrap rounded-md border border-[#00c6ff]/30 bg-[rgba(8,13,26,0.95)] px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100
                                             left-1/2 -translate-x-1/2 bottom-[calc(100%+10px)]
                                             md:left-[calc(100%+10px)] md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:translate-x-0">
                                {cat}
                            </span>
                        </button>
                    );
                })}
            </nav>

            <div className="grid gap-[clamp(16px,3vw,28px)] w-full grid-cols-[repeat(auto-fill,minmax(min(280px,100%),1fr))] md:pl-[70px]">
                {filteredProjects.map((project) => (
                    <article
                        key={project.id}
                        className={cx(
                            'relative flex flex-col overflow-hidden rounded-[18px] border bg-slate-900/60 shadow-[0_10px_30px_rgba(0,0,0,0.25)] cursor-pointer transition-colors duration-300',
                            'hover:border-[#00c6ff] hover:shadow-[0_0_30px_rgba(0,198,255,0.2)] focus-visible:outline-none focus-visible:border-[#00c6ff]',
                            project.featured
                                ? "border-[#00c6ff]/35 before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:bg-gradient-to-r before:from-[#00c6ff] before:to-transparent before:z-1"
                                : 'border-white/10',
                        )}
                        onClick={() => setActiveProject(project)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === 'Enter') setActiveProject(project); }}
                    >
                        <div className="relative w-full aspect-[16/10] bg-slate-900">
                            {/* Rendered underneath the image too: LazyMedia's own placeholderColor
                                only works for solid colors (it's applied via backgroundColor, which
                                silently no-ops for a gradient string), so without this the card goes
                                blank while the image loads or if it fails. */}
                            <div className="absolute inset-0" style={{ background: project.color }} />
                            {project.image && (
                                <LazyMedia
                                    src={project.image}
                                    alt={project.title}
                                    placeholderColor={project.color}
                                    style={{ position: 'absolute', inset: 0 }}
                                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 320px"
                                />
                            )}
                            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(2,6,16,0.75),transparent_55%)]" />
                            <StatusBadge status={project.status} className="absolute top-3 left-3" />
                            {project.featured && (
                                <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#00c6ff]/90 text-[#06121c] text-[10px] font-extrabold uppercase tracking-wide">
                                    <Sparkles size={11} /> Featured
                                </span>
                            )}
                        </div>

                        <div className="p-[clamp(16px,3vw,24px)] flex-1 flex flex-col gap-2">
                            <span className="text-[#00c6ff] text-[11px] font-bold uppercase tracking-wide">
                                {getPrimaryCategory(project.category)}
                            </span>
                            <h3 className="text-[1.15rem] text-slate-100 font-bold leading-snug m-0">{project.title}</h3>
                            <p className="text-slate-400 text-[0.88rem] leading-relaxed m-0 flex-grow line-clamp-3">
                                {project.desc}
                            </p>
                            <div className="flex justify-between items-center gap-2.5 pt-3.5 mt-1.5 border-t border-white/[0.06]">
                                <span className="text-slate-500 text-[0.78rem] truncate">{project.author}</span>
                                <span className="inline-flex items-center gap-1 text-[#00c6ff] text-[0.78rem] font-bold whitespace-nowrap shrink-0">
                                    Details <ArrowUpRight size={14} />
                                </span>
                            </div>
                        </div>
                    </article>
                ))}

                {filteredProjects.length === 0 && (
                    <div className="col-span-full flex flex-col items-center gap-3 py-[60px] px-5 text-slate-500 text-center">
                        <Boxes size={32} strokeWidth={1.5} />
                        <p>No projects in this category yet.</p>
                        <button
                            type="button"
                            className="px-4.5 py-2 bg-[#00c6ff]/12 border border-[#00c6ff]/40 text-[#00c6ff] rounded-full text-[0.85rem] font-semibold cursor-pointer transition-colors hover:bg-[#00c6ff]/22"
                            onClick={() => setFilter('All')}
                        >
                            Show all projects
                        </button>
                    </div>
                )}

                <a
                    href="/auth"
                    className="relative flex flex-col overflow-hidden rounded-[18px] border-2 border-dashed border-white/15 items-center justify-center text-center no-underline min-h-[220px] transition-colors hover:border-[#00c6ff] hover:bg-[#00c6ff]/[0.04]"
                >
                    <div className="flex flex-col items-center gap-2.5 p-6 text-[#00c6ff]">
                        <Rocket size={26} strokeWidth={1.75} />
                        <h3 className="text-white text-[1.15rem] m-0">Join the Community</h3>
                        <p className="text-slate-400 text-[0.85rem] leading-relaxed m-0">
                            Unlock full access to submit your own projects and collaborate with other builders.
                        </p>
                    </div>
                </a>
            </div>

            {activeProject && (
                <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
            )}
        </div>
    );
}
