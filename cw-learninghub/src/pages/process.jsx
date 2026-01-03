import React, { useState } from "react";
import { motion } from "framer-motion";

const mentors = [
  { id: 1, name: "Sarah", role: "UX Designer", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop" },
  { id: 2, name: "Steve", role: "Developer", img: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop" },
  { id: 3, name: "Elena", role: "Product Manager", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop" },
  { id: 4, name: "Marcus", role: "Data Scientist", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop" },
  { id: 5, name: "Aria", role: "Tech Lead", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop" },
  { id: 6, name: "James", role: "Cloud Architect", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" }
];

const MentorshipSection = () => {
  const [hoveredMentor, setHoveredMentor] = useState(null);

  // Desktop paths remain unchanged
  const desktopPaths = [
    "M 450 300 C 600 300, 700 80, 850 80",
    "M 450 300 C 600 300, 700 170, 850 170",
    "M 450 300 C 600 300, 700 260, 850 260",
    "M 450 300 C 600 300, 700 350, 850 350",
    "M 450 300 C 600 300, 700 440, 850 440",
    "M 450 300 C 600 300, 700 530, 850 530"
  ];

  return (
    <section className="relative min-h-screen w-full bg-[#0a0a0a] py-20 px-6 overflow-hidden">
      <div className="text-center mb-16 z-50 relative">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Our Mentorship Network</h2>
        <p className="text-zinc-500 max-w-xl mx-auto">Bridging the gap between students and industry experts.</p>
      </div>

      <div className="relative w-full max-w-6xl mx-auto">
        
        {/* --- MOBILE VIEW (Visible only on small screens) --- */}
        <div className="flex flex-col items-center md:hidden space-y-0">
          {/* Student Node */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-32 h-40 bg-zinc-900 rounded-3xl border-2 border-zinc-800 overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" alt="Student" className="w-full h-full object-cover"/>
            </div>
            <span className="bg-zinc-800 text-white text-[10px] font-bold px-4 py-2 rounded-xl border border-zinc-700">STUDENT</span>
          </div>

          {/* Vertical Connector 1 */}
          <div className="h-20 w-px border-l-2 border-dashed border-zinc-700 relative">
             <div className="absolute top-0 left-[-3px] w-[6px] h-[6px] bg-[#ff4d00] rounded-full animate-bounce" />
          </div>

          {/* Central Hub */}
          <div className="w-14 h-14 bg-[#ff4d00] rounded-full shadow-[0_0_40px_rgba(255,77,0,0.6)] flex items-center justify-center relative">
            <div className="absolute inset-0 rounded-full animate-ping bg-[#ff4d00] opacity-25"></div>
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>

          {/* Vertical Connector 2 */}
          <div className="h-20 w-px border-l-2 border-dashed border-zinc-700" />

          {/* Mentor Grid - Final Step */}
          <div className="grid grid-cols-2 gap-6 w-full px-4 pb-10">
            {mentors.map((m) => (
              <div key={m.id} className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-zinc-800 shadow-xl">
                   <img src={m.img} alt={m.name} className="w-full h-full object-cover"/>
                </div>
                <div className="text-center">
                  <p className="text-white text-xs font-bold">{m.name}</p>
                  <p className="text-[#ff4d00] text-[8px] uppercase font-semibold">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- DESKTOP VIEW (Visible only on md screens and up) --- */}
        <div className="hidden md:block relative h-[700px] w-full">
          {/* Desktop SVG logic exactly as you liked it */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 900 600">
             <path d="M 150 300 L 450 300" fill="none" stroke="white" strokeWidth="2" strokeDasharray="8,8" className="opacity-20" />
             {desktopPaths.map((path, i) => (
               <React.Fragment key={i}>
                 <path d={path} fill="none" stroke="white" strokeWidth="1" strokeDasharray="4,4" className="opacity-10" />
                 <circle r="3" fill="#ff4d00">
                    <animateMotion dur={`${2 + i * 0.4}s`} repeatCount="indefinite" path={path} />
                 </circle>
               </React.Fragment>
             ))}
          </svg>

          {/* Central Hub */}
          <div className="absolute left-[450px] top-[300px] -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-[#ff4d00] rounded-full shadow-[0_0_40px_rgba(255,77,0,0.6)] z-20 flex items-center justify-center">
             <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>

          {/* Student (Left) */}
          <div className="absolute left-0 top-[300px] -translate-y-1/2 z-30 flex flex-col items-center gap-4">
             <div className="w-32 h-40 bg-zinc-900 rounded-3xl border-2 border-zinc-800 overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" alt="Student" className="w-full h-full object-cover"/>
             </div>
             <span className="bg-zinc-800 text-white text-[10px] font-bold px-4 py-2 rounded-xl border border-zinc-700">STUDENT</span>
          </div>

          {/* Mentors (Right) */}
          {mentors.map((m, i) => (
            <div 
              key={m.id}
              className="absolute right-0 flex items-center gap-4 group cursor-pointer"
              style={{ top: `${80 + i * 90}px`, transform: 'translateY(-50%)' }}
              onMouseEnter={() => setHoveredMentor(m.id)}
              onMouseLeave={() => setHoveredMentor(null)}
            >
               <div className="text-right transition-all duration-300 group-hover:translate-x-[-10px]">
                  <p className="text-white font-bold">{m.name}</p>
                  <p className="text-zinc-500 text-[10px] uppercase">{m.role}</p>
               </div>
               <div className={`w-16 h-16 rounded-2xl overflow-hidden border-2 transition-all duration-500 ${hoveredMentor === m.id ? 'border-[#ff4d00] scale-110' : 'border-zinc-800 grayscale'}`}>
                  <img src={m.img} alt={m.name} className="w-full h-full object-cover"/>
               </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default MentorshipSection;