import React, { useState, useEffect } from "react";
import {
  Users,
  ArrowRight,
  X,
  Laptop,
  ChevronRight,
} from "lucide-react";

export default function RedesignedProgramPage({ course, onClose, onEnroll }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!course) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-[#1a0000] via-[#000] to-[#0a0000] text-slate-200 overflow-y-auto selection:bg-orange-500/30 font-sans">

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-orange-600/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-25" />
      </div>

      {/* Navbar */}
      <nav
        className={`fixed top-0 inset-x-0 z-[110] transition-all duration-300 ${
          scrolled
            ? "bg-black/70 backdrop-blur-md border-b border-orange-500/20 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div />
          <button
            onClick={onClose}
            className="p-2 hover:bg-orange-500/20 rounded-full border border-orange-500/30"
          >
            <X className="text-orange-300" />
          </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span className="text-[10px] font-bold tracking-widest text-orange-300 uppercase">
              Enrolling for Q1 2026
            </span>
          </div>

          <h1 className="text-5xl md:text-8xl font-bold text-white mb-6 leading-[1.1]">
            Master
            <span className="block bg-gradient-to-r from-orange-400 to-orange-200 bg-clip-text text-transparent">
              {course.title}
            </span>
          </h1>

          <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
            {course.overview?.about}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={onEnroll}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-black font-bold rounded-full shadow-xl hover:scale-[1.02]"
            >
              Enroll for Full Course{" "}
              <ArrowRight className="inline ml-2 w-4 h-4" />
            </button>

            <button className="px-8 py-4 border border-orange-500/30 text-orange-200 rounded-full hover:bg-orange-500/20">
              View Course Overview PDF
            </button>
          </div>
        </div>
      </header>

      {/* Features */}
      <section className="py-24 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-4">

          <div className="md:col-span-8 p-8 rounded-3xl bg-gradient-to-br from-orange-500/5 to-transparent border border-orange-500/20">
            <Laptop className="w-10 h-10 text-orange-400 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">
              Hands-on Course Projects
            </h3>
            <p className="text-slate-300 max-w-md">
              Real-world projects aligned with this course to build strong
              practical experience and portfolio.
            </p>

            <div className="mt-8 flex gap-2 flex-wrap">
              {(course.overview?.tags || []).map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-orange-500/10 border border-orange-500/30 rounded-md text-[10px] text-orange-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="md:col-span-4 p-8 rounded-3xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-2xl">
            <Users className="w-10 h-10 text-white mb-6" />
            <h3 className="text-2xl font-bold text-white mb-2">
              Mentor Support
            </h3>
            <p className="text-orange-100 text-sm">
              Get continuous feedback and expert guidance throughout the course.
            </p>
          </div>

          <div className="md:col-span-4 p-8 rounded-3xl border border-orange-500/20 bg-orange-500/5">
            <div className="text-4xl font-bold text-orange-400 mb-2">92%</div>
            <p className="text-slate-300 text-sm">
              Learners reported significant improvement after completing this
              course.
            </p>
          </div>

          <div className="md:col-span-8 p-8 rounded-3xl border border-orange-500/20 bg-orange-500/5 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                Active Learning Community
              </h3>
              <p className="text-slate-300 text-sm">
                Collaborate, share work, and grow together.
              </p>
            </div>
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-full border-4 border-black bg-gradient-to-r from-orange-500 to-orange-600"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Syllabus */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-200 bg-clip-text text-transparent">
            Course Overview
          </h2>
          <p className="text-slate-400 mt-2">
            Step-by-step structured learning path
          </p>
        </div>

        <div className="space-y-3">
          {(course.overview?.syllabus || []).map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-orange-500/10 bg-orange-500/5 flex items-center gap-6 hover:border-orange-500/30"
            >
              <span className="text-orange-500 font-mono font-bold">
                0{i + 1}
              </span>
              <span className="flex-1 font-semibold">{item}</span>
              <ChevronRight className="text-orange-400" />
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Bar */}
      <div className="fixed bottom-8 inset-x-0 z-[120] px-6">
        <div className="max-w-3xl mx-auto bg-orange-500/10 backdrop-blur-xl border border-orange-500/30 p-4 rounded-full flex justify-between items-center">
          <div>
            <p className="text-[10px] text-orange-400 font-bold uppercase">
Be First to Join            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-white">
                ₹24,999
              </span>
              <span className="text-xs line-through text-slate-400">
                ₹49,999
              </span>
            </div>
            <p className="text-[10px] text-slate-400">
              Includes lifetime access & certificate
            </p>
          </div>

          <button
            onClick={onEnroll}
            className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-full"
          >
            Claim Your Spot
          </button>
        </div>
      </div>

      <div className="h-32" />
    </div>
  );
}
