import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Star, Code2, Cpu } from 'lucide-react';
import logoIm from '../assets/Logo/cwlogo.png';

const HeroSection = () => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Screen size check
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Text Animations
  const x1 = useTransform(smoothProgress, [0, 1], ["0%", "-100%"]);
  const x2 = useTransform(smoothProgress, [0, 1], ["0%", "-40%"]);

  // Scroll Animations
  const imageScale = useTransform(smoothProgress, [0, 0.4], [0.85, 1]);
  const imageOpacityScroll = useTransform(smoothProgress, [0, 0.3], [0, 1]);
  
  // ✅ FIXED: Changed [8, 0] to [0, 0] so it starts and stays straight
  const imageRotate = useTransform(smoothProgress, [0, 0.5], [0, 0]);

  // Floating Elements Parallax
  const profileY = useTransform(smoothProgress, [0, 1], [0, -80]);
  const reviewY = useTransform(smoothProgress, [0, 1], [0, -40]);

  // Tech Status Animation
  const techPulse = useTransform(smoothProgress, [0, 0.5], [0.8, 1.2]);

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
            <div className="lg:col-span-7 flex flex-col justify-center order-1 lg:order-1 pt-0 -mt-4 lg:mt-0">
              <motion.div 
                style={{ x: x1 }}
                initial={{ x: "100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="whitespace-nowrap"
              >
                <h1 className="text-[12vw] lg:text-[8.5rem] font-black text-white leading-[0.85] tracking-tighter uppercase">
                  IT'S TIME <span className="text-orange-600">TO</span>
                </h1>
              </motion.div>
              
              <motion.div 
                style={{ x: x2 }}
                initial={{ x: "100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
                className="whitespace-nowrap mt-2"
              >
                <h1 className="text-[10vw] lg:text-[9.5rem] font-black text-transparent stroke-text leading-[1] tracking-tighter uppercase">
                  CHANGE THE GAME
                </h1>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-10 hidden lg:block"
              >
                <button className="px-10 py-4 bg-orange-600 text-sm font-bold text-white rounded-full hover:bg-white hover:text-black transition-all duration-300 shadow-lg shadow-orange-500/20">
                  Join Our Hub
                </button>
              </motion.div>
            </div>

            {/* Right Side: Image Box */}
            <div className="lg:col-span-5 relative order-2 lg:order-2 flex justify-center">
              <motion.div 
                style={{ 
                  scale: imageScale, 
                  opacity: isMobile ? undefined : imageOpacityScroll, 
                  rotate: imageRotate
                }}
                initial={isMobile ? { x: "100%", opacity: 0 } : {}}
                animate={isMobile ? { x: "0%", opacity: 1 } : {}}
                transition={isMobile ? { duration: 1.2, delay: 1.2, ease: "easeOut" } : {}}
                className="relative w-[280px] md:w-[350px] lg:w-[400px] aspect-[4/5]"
              >
                <div className="w-full h-full rounded-[2.5rem] p-[2px] bg-gradient-to-b from-white/20 to-transparent shadow-2xl relative overflow-visible">
                  <div className="w-full h-full rounded-[2.4rem] overflow-hidden bg-zinc-900 relative">
                    <img 
                      src="/team.png" 
                      alt="Team" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                    
                    <div className="absolute bottom-6 left-6">
                      <p className="text-orange-500 font-mono text-[10px] tracking-[0.2em] uppercase">V.02 / 2026</p>
                      <h3 className="text-white text-xl font-bold">Code Wild</h3>
                    </div>
                  </div>

                  {/* Top Left: Review Badge */}
                  <motion.div
                    style={{ y: reviewY }}
                    className="absolute -top-6 -left-8 z-30 bg-white p-3 rounded-2xl shadow-xl flex flex-col gap-1 border border-zinc-100"
                  >
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="#f97316" color="#f97316" />)}
                    </div>
                    <p className="text-black text-xs font-bold leading-tight">Best Learning Hub</p>
                  </motion.div>

                  {/* Tech Icon */}
                  <motion.div 
                    style={{ scale: techPulse }}
                    className="absolute top-10 -right-6 z-30 backdrop-blur-md border border-white/10 p-2 rounded-2xl flex flex-col items-center gap-1.5 shadow-2xl"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-blue-500/30 rounded-full blur-sm animate-ping" />
                      <motion.div 
                        className="bg-gradient-to-r from-orange-500/30 to-blue-500/30 p-2 rounded-xl relative border border-white/20 backdrop-blur-sm"
                        animate={{ 
                          scale: [1, 1.05, 1],
                          backgroundColor: ["#f97316", "#3b82f6", "#f97316"]
                        }}
                        transition={{ 
                          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                          backgroundColor: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                        }}
                      >
                        <Code2 size={12} className="text-white drop-shadow-lg" />
                      </motion.div>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[7px] font-bold text-white/60 uppercase tracking-widest">Tech</span>
                      <div className="flex items-center gap-1">
                        <motion.div 
                          className="w-2 h-2 rounded-full bg-green-400"
                          animate={{ scale: [1, 1.4, 1] }}
                          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <span className="text-white text-[10px] font-bold">LIVE</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Bottom Right: Profile Card */}
                  <motion.div 
                    style={{ y: profileY }}
                    className="absolute -bottom-4 -right-8 z-30 w-56 bg-zinc-900/90 backdrop-blur-xl border border-white/10 p-4 rounded-3xl shadow-2xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-500 flex-shrink-0 border-2 border-white/10 overflow-hidden">
                         <img src={logoIm} alt="CW" className="w-full h-full object-cover" />
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

        {/* Scroll Progress Indicator */}
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