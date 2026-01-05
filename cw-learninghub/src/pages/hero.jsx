import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Sun, Moon, Star } from 'lucide-react';

const HeroSection = () => {
  const containerRef = useRef(null);
  const [isDark, setIsDark] = useState(true);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Scroll animations
  const x1 = useTransform(smoothProgress, [0, 1], ["0%", "-120%"]);
  const x2 = useTransform(smoothProgress, [0, 1], ["0%", "-50%"]);
  const imageScale = useTransform(smoothProgress, [0, 0.5], [1, 0.9]);

  // Parallax elements
  const profileY = useTransform(smoothProgress, [0, 1], [0, -150]);
  const reviewY = useTransform(smoothProgress, [0, 1], [0, -60]);
  const toggleY = useTransform(smoothProgress, [0, 1], [0, -40]);

  return (
    <div ref={containerRef} className="relative h-[250vh] bg-[#030712]">
      {/* Sticky container adjusted for mobile height */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center py-10 lg:py-0">
        
        {/* Background Ambient Glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[5%] -left-[10%] w-[60%] h-[40%] bg-orange-500/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[10%] -right-[5%] w-[50%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Grid setup with order control for mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Side: Text Content */}
            <div className="lg:col-span-7 flex flex-col justify-center order-1">
              <div className="overflow-hidden">
                <motion.div 
                  style={{ x: x1 }}
                  initial={{ x: "-100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h1 className="text-[14vw] lg:text-[8.5rem] font-black text-white leading-[0.9] tracking-tighter uppercase">
                    IT'S TIME <span className="text-orange-500">TO</span>
                  </h1>
                </motion.div>
              </div>
              
              <div className="overflow-hidden mt-2">
                <motion.div 
                  style={{ x: x2 }}
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="whitespace-nowrap"
                >
                  <h1 className="text-[14vw] lg:text-[8.5rem] font-black text-transparent stroke-text leading-[0.9] tracking-tighter uppercase">
                    CHANGE THE <br/> GAME
                  </h1>
                </motion.div>
              </div>

              {/* CTA Button: Hidden on mobile here, shown at bottom */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="mt-12 hidden lg:block"
              >
                <button className="px-10 py-5 bg-white text-black font-bold rounded-full hover:scale-105 hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-xl">
                  Join Our Hub
                </button>
              </motion.div>
            </div>

            {/* Right Side: Image Component (Order 2 on mobile) */}
            <motion.div 
              className="lg:col-span-5 relative order-2 mt-8 lg:mt-0"
              style={{ scale: imageScale }}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative w-full aspect-[4/5] max-w-[320px] lg:max-w-[450px] mx-auto group">
                {/* Main Visual */}
                <motion.div className="w-full h-full rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-2xl relative border border-white/5">
                    <img 
                      src="/team.png" 
                      alt="Team" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                </motion.div>

                {/* Review Box */}
                <motion.div
                  style={{ y: reviewY }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2.2 }}
                  className="absolute -top-6 -left-6 lg:-top-12 lg:-left-10 z-50 bg-white p-3 lg:p-4 rounded-xl lg:rounded-2xl shadow-2xl flex items-start gap-3 max-w-[180px] lg:max-w-[240px]"
                >
                  <div className="flex flex-col">
                    <div className="flex gap-1 mb-1">
                      {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="#f97316" color="#f97316" />)}
                    </div>
                    <p className="text-black text-[10px] lg:text-sm font-bold leading-tight">"We can help you!"</p>
                  </div>
                </motion.div>

                {/* Theme Switcher */}
                <motion.div 
                  style={{ y: toggleY }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5 }}
                  className="absolute top-2 -right-2 lg:top-4 lg:-right-4 z-50 bg-[#18181b]/80 backdrop-blur-xl border border-white/10 p-1 rounded-full flex items-center gap-1"
                >
                  <button onClick={() => setIsDark(false)} className={`p-1.5 rounded-full ${!isDark ? 'bg-white text-black' : 'text-white/40'}`}><Sun size={14}/></button>
                  <button onClick={() => setIsDark(true)} className={`p-1.5 rounded-full ${isDark ? 'bg-blue-600 text-white' : 'text-white/40'}`}><Moon size={14}/></button>
                </motion.div>

                {/* Profile Card */}
                <motion.div 
                   style={{ y: profileY }}
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: 2.7, duration: 0.8 }}
                   className="absolute bottom-10 -left-6 lg:-left-12 z-40 w-56 lg:w-72 bg-[#18181b]/90 backdrop-blur-2xl border border-white/10 p-3 lg:p-5 rounded-[1.5rem] lg:rounded-[2rem] shadow-2xl"
                >
                  <div className="flex items-center gap-2 lg:gap-3">
                    <div className="w-8 h-8 lg:w-12 lg:h-12 rounded-full bg-orange-500 overflow-hidden">
                      <img src="../src/assets/Logo/cwlogo.png" alt="Avatar" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-[10px] lg:text-sm">Code Wild LearningHub</p>
                      <p className="text-zinc-500 text-[8px] lg:text-xs">@codewildlearninghub</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Mobile-only CTA Button (Order 3) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3, duration: 0.6 }}
              className="lg:hidden flex justify-center order-3 mt-4"
            >
              <button className="w-full max-w-[280px] py-4 bg-white text-black font-bold rounded-full shadow-xl active:scale-95 transition-all">
                Join the Revolution
              </button>
            </motion.div>

          </div>
        </div>

        {/* Scroll Progress Indicator */}
        <div className="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2 h-40 w-[2px] bg-white/5 rounded-full">
            <motion.div style={{ scaleY: smoothProgress }} className="w-full h-full bg-orange-500 origin-top" />
        </div>
      </div>

      <style jsx>{`
        .stroke-text { -webkit-text-stroke: 1px rgba(255,255,255,0.3); }
        @media (min-width: 1024px) { .stroke-text { -webkit-text-stroke: 2px rgba(255,255,255,0.25); } }
      `}</style>
    </div>
  );
};

export default HeroSection;