import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const [percent, setPercent] = useState(0);

  // Percentage update panna
  useEffect(() => {
    return scrollYProgress.onChange((v) => setPercent(Math.round(v * 100)));
  }, [scrollYProgress]);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
    
      {/* --- BOTTOM RIGHT WAVY CIRCLE --- */}
      <div className="fixed bottom-7 right-3 z-[100] flex items-center justify-center">
        <div className="relative group">
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-orange-500 blur-xl opacity-10 group-hover:opacity-40 transition-opacity rounded-full"></div>
          
          <svg width="70" height="180" viewBox="0 0 100 100" className="transform -rotate-90">
            {/* Background Circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#1a1a1a"
              strokeWidth="6"
              fill="transparent"
              className="opacity-80"
            />
            
            {/* Wavy Animated Path */}
            <motion.path
              d="M 50,10 
                 A 40,40 0 1,1 49.9,10 
                 Z" 
              fill="transparent"
              stroke="#f97316" // Orange
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="10 6" // Intha gap-thaan wavy effect tharum
              style={{ pathLength: scrollYProgress }}
            />
          </svg>

          {/* Percentage Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-orange-500 font-mono">
            <span className="text-xl font-bold leading-none">{percent}%</span>
            <span className="text-[8px] uppercase tracking-tighter opacity-70">Scrolling</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScrollProgress;