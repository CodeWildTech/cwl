import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import heroImage from "../assets/hackathon.png"; 

export default function HackathonPoster() {
  return (
    <div className="relative w-full min-h-screen bg-[#0a0a0a] flex items-center justify-center overflow-hidden py-20 px-6">
      
      {/* BACKGROUND STRIP */}
      <div 
        className="absolute w-[150%] h-[260px] bg-[#FF5714] z-0"
        style={{ transform: "rotate(-4deg)" }}
      />

      {/* MAIN CONTENT */}
      <div className="relative z-10 w-full max-w-7xl flex flex-col md:flex-row items-end md:items-center justify-between">
        
        {/* LEFT SECTION */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex-1 text-white space-y-6 mb-10 md:mb-0"
        >
          <div>
            <h2 className="text-3xl font-black">CW</h2>
            <h1 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter">
              Hackathon
            </h1>
          </div>

          <span className="inline-block bg-white text-black px-5 py-1 rounded-full font-bold text-[10px] uppercase">
            Show your skills. Solve real problems.
          </span>
        </motion.div>

        {/* CENTER IMAGE */}
        <div className="flex-[4] flex justify-center relative">
          <motion.img
            src={heroImage}
            alt="Hackathon"
            initial={{ y: 120, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 60, damping: 20 }}
            className="h-[550px] md:h-[750px] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.7)] -mt-64 relative z-40"
          />
        </div>

        {/* RIGHT SECTION */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex-1 text-white text-right"
        >
          <div className="mb-8">
            <div className="flex items-center justify-end gap-2">
              <span className="text-6xl md:text-8xl font-black italic">2026</span>
              <ArrowUpRight size={48} />
            </div>
            <p className="text-2xl md:text-3xl font-black -mt-2">
              Coming Soon!
            </p>
          </div>

          <button className="bg-white text-[#FF5714] px-10 py-3 rounded-lg font-bold uppercase shadow-xl hover:scale-105 transition">
            Know more
          </button>
        </motion.div>
      </div>

   <div className="absolute inset-0 z-30 pointer-events-none max-w-6xl mx-auto hidden md:block">
  <ScrollPerk text="Cash Prizes"              x="20%" y="22%" delay={0.2} flipped={false} />
  <ScrollPerk text="Internship Opportunities" x="32%" y="19%" delay={0.4} flipped={false} />
  <ScrollPerk text="Swags & Goodies"          x="52%" y="18%" delay={0.6} flipped={true} />
  <ScrollPerk text="Certificates"             x="68%" y="17%" delay={0.8} flipped={true} />
</div>

    </div>
  );
}

/* ===============================
   SCROLL PERK WITH PERFECT DOTTED PATH
================================ */
/* ===============================
   SCROLL PERK WITH ANIMATED PATH
================================ */
function ScrollPerk({ text, x, y, delay, flipped = false }) {
  const path =
    "M10 20 Q 40 80, 80 60 T 140 90"; // base wavy path

  return (
    <motion.div
      className="absolute flex flex-col items-center"
      style={{ left: x, top: y }}
    >
      {/* Label */}
      <motion.p
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay, type: "spring", stiffness: 120 }}
        className="bg-black/90 backdrop-blur-md border border-white/20 text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider mb-2"
      >
        {text}
      </motion.p>

      {/* PATH + MOVING DOT */}
      <svg
        width="150"
        height="100"
        viewBox="0 0 150 100"
        className="overflow-visible"
        style={
          flipped
            ? { transform: "scaleX(-1)", transformOrigin: "center" }
            : {}
        }
      >
        <path
          d={path}
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeDasharray="3 9"
          strokeLinecap="round"
          opacity="0.5"
        />

        <circle r="3" fill="#ffffff">
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            path={path}
          />
        </circle>
      </svg>
    </motion.div>
  );
}
