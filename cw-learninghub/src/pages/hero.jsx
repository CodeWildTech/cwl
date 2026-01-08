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

  // Text Animations
  const x1 = useTransform(smoothProgress, [0, 1], ["0%", "-100%"]);
  const x2 = useTransform(smoothProgress, [0, 1], ["0%", "-40%"]);

  // Right Side Box Animations (Refined)
  const imageScale = useTransform(smoothProgress, [0, 0.4], [0.85, 1]);
  const imageOpacity = useTransform(smoothProgress, [0, 0.3], [0, 1]);
  const imageRotate = useTransform(smoothProgress, [0, 0.5], [8, 0]);

  // Floating Elements Parallax (Subtle)
  const profileY = useTransform(smoothProgress, [0, 1], [0, -80]);
  const reviewY = useTransform(smoothProgress, [0, 1], [0, -40]);

  return (
    <div ref={containerRef} className="relative h-[250vh] bg-[#030712]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        
        {/* Ambient Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[-5%] w-[40%] h-[40%] bg-orange-500/10 blur-[100px] rounded-full" />
          <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-blue-600/10 blur-[100px] rounded-full" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Side: Text Content */}
            <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1">
              <motion.div style={{ x: x1 }} className="whitespace-nowrap">
                <h1 className="text-[12vw] lg:text-[8.5rem] font-black text-white leading-[0.85] tracking-tighter uppercase">
                  IT'S TIME <span className="text-orange-500">TO</span>
                </h1>
              </motion.div>
              
              <motion.div style={{ x: x2 }} className="whitespace-nowrap mt-2">
                <h1 className="text-[12vw] lg:text-[9.5rem] font-black text-transparent stroke-text leading-[0.85] tracking-tighter uppercase">
                  CHANGE THE GAME
                </h1>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-10 hidden lg:block"
              >
                <button className="px-10 py-4 bg-orange-500 text-white font-bold rounded-full hover:bg-white hover:text-black transition-all duration-300 shadow-lg shadow-orange-500/20">
                  Join Our Hub
                </button>
              </motion.div>
            </div>

            {/* Right Side: Compact & Clean Box */}
            <div className="lg:col-span-5 relative order-1 lg:order-2 flex justify-center">
              <motion.div 
                style={{ 
                  scale: imageScale, 
                  opacity: imageOpacity,
                  rotate: imageRotate
                }}
                className="relative w-[280px] md:w-[350px] lg:w-[400px] aspect-[4/5]"
              >
                {/* Main Image Container */}
                <div className="w-full h-full rounded-[2.5rem] p-[2px] bg-gradient-to-b from-white/20 to-transparent shadow-2xl relative overflow-visible">
                  <div className="w-full h-full rounded-[2.4rem] overflow-hidden bg-zinc-900 relative">
                    <img 
                      src="/team.png" 
                      alt="Team" 
                      className="w-full h-full object-cover"
                    />
                    {/* Bottom Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                    
                    <div className="absolute bottom-6 left-6">
                      <p className="text-orange-500 font-mono text-[10px] tracking-[0.2em] uppercase">V.02 / 2026</p>
                      <h3 className="text-white text-xl font-bold">Code Wild</h3>
                    </div>
                  </div>

                  {/* Floating Review - Compact */}
                  <motion.div
                    style={{ y: reviewY }}
                    className="absolute -top-6 -left-8 z-30 bg-white p-3 rounded-2xl shadow-xl flex flex-col gap-1 border border-zinc-100"
                  >
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="#f97316" color="#f97316" />)}
                    </div>
                    <p className="text-black text-xs font-bold leading-tight">Best Learning Hub</p>
                  </motion.div>

                  {/* Theme Switcher - Sleek */}
                  <div className="absolute top-6 -right-4 z-30 bg-zinc-900/80 backdrop-blur-md border border-white/10 p-1.5 rounded-full flex flex-col gap-2 shadow-xl">
                    <button onClick={() => setIsDark(false)} className={`p-1.5 rounded-full transition-colors ${!isDark ? 'bg-white text-black' : 'text-white/40'}`}><Sun size={14}/></button>
                    <button onClick={() => setIsDark(true)} className={`p-1.5 rounded-full transition-colors ${isDark ? 'bg-orange-500 text-white' : 'text-white/40'}`}><Moon size={14}/></button>
                  </div>

                  {/* Profile Card - Refined */}
                  <motion.div 
                    style={{ y: profileY }}
                    className="absolute -bottom-4 -right-8 z-30 w-56 bg-zinc-900/90 backdrop-blur-xl border border-white/10 p-4 rounded-3xl shadow-2xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-500 flex-shrink-0 border-2 border-white/10 overflow-hidden">
                         <img src="../src/assets/Logo/cwlogo.png" alt="CW" className="w-full h-full object-cover" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-white font-bold text-xs truncate">Learning Hub</p>
                        <p className="text-zinc-500 text-[10px]">Active Members: 2k+</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 h-32 w-[1px] bg-white/10 rounded-full">
          <motion.div style={{ scaleY: smoothProgress }} className="w-full h-full bg-orange-500 origin-top" />
        </div>
      </div>

      <style jsx>{`
        .stroke-text { -webkit-text-stroke: 1.5px rgba(255,255,255,0.2); }
        @media (min-width: 1024px) { .stroke-text { -webkit-text-stroke: 2px rgba(255,255,255,0.25); } }
      `}</style>
    </div>
  );
};

export default HeroSection;