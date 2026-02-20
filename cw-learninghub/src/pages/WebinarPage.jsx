import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft, Palette, Code2, Rocket,
    Sparkles, Search, Layout, Server, Globe
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CompetitionForm from '../component/CompetitionForm';

const WebinarPage = () => {
    const navigate = useNavigate();
    const [activeStage, setActiveStage] = useState('research');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const stagesInfo = {
        research: {
            title: "Research & Discovery",
            tagline: "Phase 01",
            accent: "from-amber-500 to-orange-500",
            glow: "rgba(245, 158, 11, 0.08)",
            description: "Learn how to bridge the gap between problem and solution. We'll cover user research, competitor analysis, and defining the MVP.",
            highlights: ["User Personas", "Market Research", "Product Strategy"],
            icon: <Search size={20} />
        },
        design: {
            title: "Premium Design",
            tagline: "Phase 02",
            accent: "from-rose-500 to-orange-500",
            glow: "rgba(244, 63, 94, 0.08)",
            description: "Master the art of visual storytelling. Learn advanced UI/UX principles, design systems, and high-fidelity prototyping.",
            highlights: ["Figma Mastery", "Design Systems", "User Experience"],
            icon: <Palette size={20} />
        },
        development: {
            title: "Fullstack Build",
            tagline: "Phase 03",
            accent: "from-cyan-500 to-blue-500",
            glow: "rgba(6, 182, 212, 0.08)",
            description: "Architecting the logic. From responsive frontend components to robust backend APIs and database management.",
            highlights: ["React & Next.js", "API Design", "Database Modeling"],
            icon: <Code2 size={20} />
        },
        deployment: {
            title: "Global Launch",
            tagline: "Phase 04",
            accent: "from-emerald-500 to-teal-500",
            glow: "rgba(16, 185, 129, 0.08)",
            description: "Going live. Learn about CI/CD pipelines, cloud infrastructure, SEO optimization, and performance scaling.",
            highlights: ["AWS/Vercel", "CI/CD Setup", "Performance Tuning"],
            icon: <Rocket size={20} />
        }
    };

    const current = stagesInfo[activeStage];

    return (
        <div className="min-h-screen bg-[#030712] text-zinc-100 pt-24 pb-32 selection:bg-white/10 selection:text-white">
            {/* Modern Grid Background */}
            <div className="fixed inset-0 z-0 opacity-20"
                style={{ backgroundImage: `radial-gradient(#ffffff10 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

            {/* Dynamic Glow */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <motion.div
                    animate={{ background: `radial-gradient(circle at 50% 0%, ${current.glow} 0%, transparent 70%)` }}
                    className="absolute inset-0 transition-colors duration-1000"
                />
            </div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                {/* Navigation */}
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-zinc-500 hover:text-white transition-all mb-12 group text-sm font-medium"
                >
                    <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="tracking-wide">Back to Hub</span>
                </motion.button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

                    {/* LEFT COLUMN: Masterclass Info */}
                    <div className="lg:col-span-7">
                        <header className="mb-16">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6"
                            >
                                <Sparkles size={14} className="text-orange-500" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Limited Capacity Masterclass</span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-5xl lg:text-7xl font-bold tracking-tight mb-8"
                            >
                                Application <br />
                                <span className="text-zinc-500">Masterclass</span>
                            </motion.h1>

                            <p className="text-zinc-400 text-lg max-w-xl leading-relaxed mb-8">
                                A comprehensive journey from research and discovery to designing premium interfaces,
                                developing scalable logic, and deploying to the world.
                            </p>

                            {/* MOBILE ONLY: Enroll Button */}
                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                onClick={() => setIsModalOpen(true)}
                                className="lg:hidden w-full py-4 rounded-xl bg-orange-600 text-white font-bold uppercase tracking-widest shadow-lg shadow-orange-500/20 active:scale-95 transition-all"
                            >
                                Enroll Now
                            </motion.button>
                        </header>

                        {/* Stage Selector */}
                        <div className="space-y-8">
                            <div className="grid grid-cols-2 lg:flex lg:flex-wrap gap-2 p-1 bg-zinc-900/50 border border-white/5 rounded-2xl w-full lg:w-fit">
                                {Object.keys(stagesInfo).map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => setActiveStage(s)}
                                        className={`relative px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all w-full lg:w-auto ${activeStage === s ? 'text-black' : 'text-zinc-500 hover:text-zinc-300'
                                            }`}
                                    >
                                        {activeStage === s && (
                                            <motion.div layoutId="activeWebinarTab" className="absolute inset-0 bg-white rounded-xl" />
                                        )}
                                        <span className="relative z-10">{s}</span>
                                    </button>
                                ))}
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeStage}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="p-8 rounded-[2rem] bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10"
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="p-3 rounded-2xl bg-black/40 border border-white/5">
                                            {current.icon}
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold tracking-tight">{current.title}</h2>
                                            <p className={`text-[10px] font-black uppercase tracking-[0.2em] bg-gradient-to-r ${current.accent} bg-clip-text text-transparent`}>
                                                {current.tagline}
                                            </p>
                                        </div>
                                    </div>

                                    <p className="text-zinc-400 leading-relaxed mb-8 text-base">
                                        {current.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {current.highlights.map((item, i) => (
                                            <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] font-medium text-zinc-300">
                                                <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: The Form (Desktop Only) */}
                    <div className="hidden lg:block lg:col-span-5">
                        <div className="sticky top-32">
                            <div className="relative group">
                                <div className={`absolute -inset-0.5 bg-gradient-to-b ${current.accent} rounded-[2.5rem] opacity-10 group-hover:opacity-20 transition-opacity blur-xl`} />

                                <div className="relative bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
                                    <div className="p-8 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                                        <div>
                                            <h3 className="text-sm font-bold uppercase tracking-widest">Enrollment</h3>
                                            <p className="text-[10px] text-zinc-500 mt-1 uppercase">Instance: webinar_msc_v1</p>
                                        </div>
                                        <div className="flex gap-1.5">
                                            <div className="w-2 h-2 rounded-full bg-zinc-800" />
                                            <div className="w-2 h-2 rounded-full bg-zinc-800" />
                                        </div>
                                    </div>
                                    <div className="p-8 lg:p-10">
                                        <CompetitionForm isPageMode={true} track="Masterclass" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Mobile Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 100 }}
                            transition={{ type: "spring", damping: 25, stiffness: 500 }}
                            className="fixed inset-x-0 bottom-0 z-50 p-6 bg-[#0a0a0a] border-t border-white/10 rounded-t-[2rem] max-h-[85vh] overflow-y-auto lg:hidden"
                        >
                            <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-8" />
                            <div className="mb-6">
                                <h3 className="text-xl font-bold">Secure Your Spot</h3>
                                <p className="text-zinc-500 text-sm">Join the Masterclass</p>
                            </div>
                            <CompetitionForm isPageMode={true} track="Masterclass" />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default WebinarPage;
