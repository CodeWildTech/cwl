import React, { useState, useEffect, useRef, useCallback } from "react";
import Aslin from "../assets/students/Aslin.jpeg";
import Jofna from "../assets/students/jofna.jpeg";
import Jose from "../assets/students/jose.jpeg";
import Stephin from "../assets/students/stephin.jpeg";
import Ashik from "../assets/students/ashik.jpeg";
import Nikhitha from "../assets/students/nikkitha.jpg";
import Sandra from "../assets/students/sandra.jpg";
import Anandhu from "../assets/students/Anandhu.jpg";
import Vandana from "../assets/students/vandana.jpg";
import Hannah from "../assets/students/Hannah.jpeg";

import { motion, AnimatePresence } from "framer-motion";
import { Zap, Cpu, Sparkles, Rocket, Star, Code } from 'lucide-react';
import EnrollmentForm from '../component/enrollmentForm'; 

export default function TestimonialsSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [particles, setParticles] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showCard, setShowCard] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false); 
  
  const containerRef = useRef(null);
  const intervalRef = useRef(null);
  const mobileScrollRef = useRef(null);

  const techIcons = [Zap, Cpu, Sparkles, Rocket, Star, Code];
  const testimonials = [
    {
      id: 1,
      name: "Ascilin",
      role: "Nagercoil",
      image: Aslin,
      message: "Before joining CodeWild Tech, I was really confused about my career direction. The Python course helped me build strong basics step by step and boosted my confidence a lot. The mentors were friendly and always ready to help. Today, I’m working as a software developer in Trivandrum, and I’m very thankful for the guidance I received here.",
      position: { top: "6%", right: "35%", mobile: { top: "4%", right: "8%" } },
      size: "lg",
      xType: "right", // Appears to the left of the image
    },
    {
      id: 2,
      name: "Jofna",
      role: "Kochi",
      image: Jofna,
      message: "What I loved most about the course was the practical teaching style. Every topic was explained using real-life examples, which made learning easy. The hands-on projects helped me improve my skills and gain confidence to work on my own.",
      position: { top: "30%", left: "10%", mobile: { top: "22%", left: "4%" } },
      size: "md",
      xType: "left", // Appears to the right of the image
    },
    {
      id: 3,
      name: "Jose",
      role: "Nagercoil",
      image: Jose,
      message: "The course content was well structured and easy to follow. Everything felt updated and relevant to current industry needs. Mentors explained concepts patiently and clearly. After completing the course, I felt confident to handle real-world development tasks.",
      position: { bottom: "35%", left: "18%", mobile: { bottom: "30%", left: "4%" } },
      size: "xl",
      xType: "left",
    },
    {
      id: 4,
      name: "Stephin",
      role: "Kochi",
      image: Stephin,
      message: "The assignments and practical sessions helped me understand concepts in depth. Whenever I had doubts, the support team was quick to respond and clarify. Overall, it was a smooth and positive learning experience for me.",
      position: { top: "48%", left: "32%", mobile: { top: "40%", left: "18%" } },
      size: "sm",
      xType: "left",
    },
    {
      id: 5,
      name: "Ashik",
      role: "Trivandrum",
      image: Ashik,
      message: "The mentors genuinely care about student growth and progress. The step-by-step teaching approach made learning comfortable. The placement guidance and support really helped me get placed within a short time after completing the course.",
      position: { top: "18%", right: "22%", mobile: { top: "15%", right: "8%" } },
      size: "lg",
      xType: "right",
    },
    {
      id: 6,
      name: "Nikhitha J S",
      role: "Trivandrum",
      image: Nikhitha,
      message: "I didn't have a strong technical background initially, but the teaching style made everything easy to understand. The live sessions and project work helped me gain confidence and improve my practical knowledge a lot.",
      position: { top: "56%", right: "13%", mobile: { top: "50%", right: "12%" } },
      size: "md",
      xType: "right",
    },
    {
      id: 7,
      name: "Sandra A S",
      role: "Trivandrum",
      image: Sandra,
      message: "Everything was taught clearly from the basics, so it was easy to keep up with the sessions. The mentor guidance and community support were very helpful throughout the learning journey. I never felt stuck or left behind.",
      position: { bottom: "24%", right: "34%", mobile: { bottom: "20%", right: "18%" } },
      size: "xl",
      xType: "right",
    },
    {
      id: 8,
      name: "Ananthu R S",
      role: "Kollam",
      image: Anandhu,
      message: "Classes were interactive and doubts were cleared instantly. Even complex topics were explained in a simple and understandable way. The overall learning experience was smooth and definitely worth the time and effort.",
      position: { top: "32%", right: "8%", mobile: { top: "34%", right: "4%" } },
      size: "sm",
      xType: "right",
    },
    {
      id: 9,
      name: "Vandana",
      role: "Trivandrum",
      image: Vandana,
      message: "This course gave me great hands-on experience with real tools and live projects. It helped me understand how things work in real scenarios. I now feel much more confident while attending interviews and technical discussions.",
      position: { bottom: "14%", right: "23%", mobile: { bottom: "10%", right: "8%" } },
      size: "lg",
      xType: "right",
    },
    {
      id: 10,
      name: "Hannah",
      role: "Trivandrum",
      image: Hannah,
      message: "The mentors were professional and supportive, and the learning environment was really positive. Sessions were well planned and easy to follow. Overall, I'm very satisfied with the course and the learning experience.",
      position: { bottom: "40%", right: "44%", mobile: { bottom: "44%", right: "22%" } },
      size: "md",
      xType: "right",
    },
  ];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const max = 150;
      const ratio = window.scrollY / window.innerHeight;
      setScrollOffset(Math.min(max, ratio * max));
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      const nextIndex = (currentTestimonial + 1) % testimonials.length;
      setCurrentTestimonial(nextIndex);
      setShowCard(true);
      
      if (isMobile && mobileScrollRef.current) {
        const scrollContainer = mobileScrollRef.current;
        const containerWidth = scrollContainer.offsetWidth;
        const spacerWidth = (containerWidth / 2) - 48;
        const profileAndGapWidth = 24 * 4 + 32; 
        const scrollPosition = spacerWidth + (profileAndGapWidth * nextIndex);
        
        scrollContainer.scrollTo({
         left: scrollPosition,
         behavior: 'smooth'
        });
      }
    }, 4000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, currentTestimonial, isMobile, testimonials.length]);

  const handleCardMouseEnter = () => setIsPaused(true);
  const handleCardMouseLeave = () => setIsPaused(false);

  const handleProfileClick = (index) => {
    setCurrentTestimonial(index);
    setShowCard(true);
    setIsPaused(true);
    
    setTimeout(() => {
      setIsPaused(false);
    }, 6000);
    
    if (isMobile && mobileScrollRef.current) {
      const scrollContainer = mobileScrollRef.current;
      const containerWidth = scrollContainer.offsetWidth;
      const spacerWidth = (containerWidth / 2) - 48;
      const profileAndGapWidth = 24 * 4 + 32;
      const scrollPosition = spacerWidth + (profileAndGapWidth * index);
      
      scrollContainer.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleProfileHover = (index) => {
    if (!isMobile) {
      setCurrentTestimonial(index);
      setShowCard(true);
      setIsPaused(true);
    }
  };

  const handleMobileScroll = () => {
    if (!isMobile || !mobileScrollRef.current) return;
    
    const scrollContainer = mobileScrollRef.current;
    const containerWidth = scrollContainer.offsetWidth;
    const scrollPosition = scrollContainer.scrollLeft;
    const spacerWidth = (containerWidth / 2) - 48;
    const profileAndGapWidth = 24 * 4 + 32;
    
    const activeIndex = Math.round((scrollPosition - spacerWidth) / profileAndGapWidth);
    const clampedIndex = Math.max(0, Math.min(activeIndex, testimonials.length - 1));
    
    if (clampedIndex !== currentTestimonial && clampedIndex >= 0 && clampedIndex < testimonials.length) {
      setCurrentTestimonial(clampedIndex);
      setShowCard(true);
      setIsPaused(true);
      setTimeout(() => {
        setIsPaused(false);
      }, 4000);
    }
  };

  const handleMouseDown = useCallback((e) => {
    if (isMobile) return;
    
    e.preventDefault();
    setIsDragging(true);
    const rect = containerRef.current.getBoundingClientRect();
    const startX = e.clientX - rect.left;
    const startY = e.clientY - rect.top;
    
    const handleMouseMove = (moveEvent) => {
      if (!isDragging) return;
      const newX = (moveEvent.clientX - rect.left) - startX;
      const newY = (moveEvent.clientY - rect.top) - startY;
      
      const maxX = rect.width - 80;
      const maxY = rect.height - 80;
      
      setDragPosition({
        x: Math.max(-20, Math.min(newX, maxX)),
        y: Math.max(-20, Math.min(newY, maxY))
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      
      setTimeout(() => {
        setDragPosition({ x: 0, y: 0 });
      }, 200);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }, [isDragging, isMobile]);

  const handleOpenEnrollment = () => {
    setIsEnrollmentOpen(true);
  };

  const handleCloseEnrollment = () => {
    setIsEnrollmentOpen(false);
  };

  const companyLogos = [
    { name: "Cognizant", src: "/logos/cognizant.png" },
    { name: "Fresh Works", src: "/logos/freshworks.png" },
    { name: "Hexaware", src: "/logos/Hexaware.png" },
    { name: "Hcl", src: "/logos/hcl.png" },
    { name: "mindtree", src: "/logos/mindtree.png" },
    { name: "NttData", src: "/logos/nttdata (2).png" },
    { name: "Tcs", src: "/logos/Tata.png" },
    { name: "capgemini-logo", src: "/logos/capgemini-logo.png" },
    { name: "L & T", src: "/logos/lt.png" },
    { name: "Myntra", src: "/logos/myntra.png" },
    { name: "Zoho", src: "/logos/zoho.png" },
    { name: "Amazon", src: "/logos/amazon.png" },
  ];

  const getSizeClasses = (size) => ({
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-20 h-20",
    xl: "w-24 h-24",
  }[size]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-[#120806] to-[#1a0903] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="w-full h-full lg:block hidden" viewBox="0 0 2200 1000" preserveAspectRatio="none">
         <path className="curve-1" d="M -600 320 C -450 280, -300 400, -100 260 S 200 420, 500 500 S 800 300, 1100 420 S 1500 650, 1800 420 S 2100 200, 2400 420" 
            fill="none" stroke="#dc4109" strokeWidth="30" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" style={{ filter: "url(#glow)" }} />
         <defs><filter id="glow"><feGaussianBlur stdDeviation="2" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
        </svg>
        <svg className="w-full h-full lg:hidden block" viewBox="0 0 400 600" preserveAspectRatio="none">
         <path d="M 0 100 Q 100 80, 200 100 T 400 100 L 400 0 L 0 0 Z" fill="#dc4109" opacity="0.15" />
         <path d="M 0 200 Q 100 180, 200 200 T 400 200" fill="none" stroke="#dc4109" strokeWidth="3" opacity="0.6" />
        </svg>
      </div>

      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} 
                className="text-orange-500 font-bold tracking-[0.3em] uppercase text-sm">Student Testimonials</motion.p>
              <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, delay: 0.1 }} 
                className="text-4xl sm:text-5xl lg:text-8xl font-black text-white leading-none tracking-tighter">
                Voices of <span className="text-orange-600">Success</span>
              </motion.h1>
              <p className="text-white/90 max-w-md mx-auto lg:mx-0 text-base lg:text-lg">Join 100+ professionals who transformed their careers through our industry-leading workshops.</p>
            </div>

            {!isMobile && (
              <div ref={containerRef} className="relative h-[540px] mt-6 lg:mt-0 animate-fade-in-delay">
                {testimonials.map((testimonial, index) => {
                  const sizeClasses = getSizeClasses(testimonial.size);
                  const pos = testimonial.position;
                  const isCurrent = currentTestimonial === index;
                  const alignLeft = testimonial.xType === "left";

                  return (
                    <div key={testimonial.id} className="absolute" style={{
                      ...pos,
                      zIndex: isCurrent ? 100 : 10 + index,
                      animation: isDragging ? 'none' : `float ${2.5 + index * 0.25}s ease-in-out infinite`,
                      animationDelay: `${index * 0.12}s`,
                    }}>
                      <div className="relative flex items-center justify-center">
                        <div 
                          className={`${sizeClasses} rounded-full overflow-hidden shadow-2xl transition-all duration-300 ring-2 ring-white/20
                            ${isCurrent 
                              ? `ring-orange-500/50 ring-4 shadow-orange-500/30 scale-105 cursor-grab ${isDragging ? 'shadow-2xl shadow-orange-500/60 scale-110 cursor-grabbing' : ''}`
                              : 'hover:shadow-orange-500/50 hover:scale-110 hover:-rotate-3 cursor-pointer'
                            }`}
                          style={isCurrent ? {
                            transform: `translate(${dragPosition.x}px, ${dragPosition.y}px)`
                          } : {}}
                          onMouseDown={isCurrent ? handleMouseDown : undefined}
                          onClick={() => !isCurrent && handleProfileClick(index)}
                          onMouseEnter={() => !isCurrent && handleProfileHover(index)}
                          onMouseLeave={() => !isCurrent && setIsPaused(false)}
                        >
                          <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                        </div>

                        <AnimatePresence>
                        {showCard && isCurrent && (
                          <motion.div
                            key={`card-${currentTestimonial}`}
                            initial={{ opacity: 0, scale: 0.9, x: alignLeft ? 20 : -20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className={`absolute w-72 bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/20 z-50
                              ${alignLeft ? "left-full ml-6" : "right-full mr-6"}`}
                            onMouseEnter={handleCardMouseEnter}
                            onMouseLeave={handleCardMouseLeave}
                          >
                            <div className="flex items-start gap-3 mb-4">
                              <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-orange-500/30 flex-shrink-0" />
                              <div className="min-w-0">
                                <h3 className="font-bold text-orange-500 text-lg truncate">{testimonial.name}</h3>
                                <p className="text-gray-500 text-sm">{testimonial.role}</p>
                              </div>
                            </div>
                            <p className="text-gray-700 text-sm leading-relaxed line-clamp-5">{testimonial.message}</p>
                            
                            {/* Pointing Arrow Correction */}
                            <div className={`absolute top-1/2 -translate-y-1/2 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent
                              ${alignLeft 
                                ? "-left-2 border-r-[10px] border-r-white/95" 
                                : "-right-2 border-l-[10px] border-l-white/95"}`} 
                            />
                          </motion.div>
                        )}
                        </AnimatePresence>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {isMobile && (
              <div className="w-full space-y-6">
                <div className="relative overflow-hidden">
                  <div 
                    ref={mobileScrollRef}
                    onScroll={handleMobileScroll}
                    className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-8 scroll-smooth"
                    style={{ 
                      scrollbarWidth: 'none', 
                      msOverflowStyle: 'none',
                    }}
                  >
                    <div className="flex-shrink-0" style={{ width: 'calc(50vw - 48px)' }}></div>
                    {testimonials.map((testimonial, index) => {
                      const isCurrent = currentTestimonial === index;
                      return (
                        <div 
                          key={testimonial.id} 
                          className="flex-shrink-0 snap-center"
                          onClick={() => handleProfileClick(index)}
                        >
                          <motion.div
                            animate={{
                              scale: isCurrent ? 1.15 : 0.85,
                              opacity: isCurrent ? 1 : 0.5
                            }}
                            transition={{ duration: 0.5 }}
                            className="relative"
                          >
                            <div 
                              className={`w-24 h-24 rounded-full overflow-hidden shadow-2xl ring-2
                                ${isCurrent 
                                  ? 'ring-orange-500 ring-4 shadow-orange-500/60'
                                  : 'ring-white/20'
                                }`}
                            >
                              <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                            </div>
                          </motion.div>
                        </div>
                      );
                    })}
                    <div className="flex-shrink-0" style={{ width: 'calc(50vw - 48px)' }}></div>
                  </div>
                  <div className="absolute left-0 top-0 bottom-0 w-20 to-transparent pointer-events-none z-10" />
                  <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#120806] to-transparent pointer-events-none z-10" />
                </div>

                {showCard && (
                  <motion.div
                    key={`mobile-card-${currentTestimonial}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/20"
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <img src={testimonials[currentTestimonial].image} alt={testimonials[currentTestimonial].name} className="w-12 h-12 rounded-full object-cover ring-2 ring-orange-500/30 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-orange-500 text-lg">{testimonials[currentTestimonial].name}</h3>
                        <p className="text-gray-500 text-sm">{testimonials[currentTestimonial].role}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">{testimonials[currentTestimonial].message}</p>
                  </motion.div>
                )}

                <div className="flex justify-center gap-2 pt-4">
                  {testimonials.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleProfileClick(index)}
                      animate={{
                        width: currentTestimonial === index ? 32 : 8,
                        backgroundColor: currentTestimonial === index ? '#f97316' : 'rgba(255,255,255,0.3)'
                      }}
                      className="h-2 rounded-full"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-center mt-12 lg:mt-16">
            <div className="relative">
              {particles.map((p) => {
                const Icon = p.Icon;
                return (
                  <span key={p.id} className="absolute left-1/2 top-1/2 z-50 pointer-events-none"
                    style={{ '--x': `${p.x}px`, '--y': `${p.y}px`, '--r': `${p.rotation}deg`, animation: 'burst 900ms ease-out forwards' }}>
                    <Icon className="w-5 h-5 text-orange-400 drop-shadow-[0_0_12px_rgba(249,115,22,0.8)]" />
                  </span>
                );
              })}
              <motion.button 
                onClick={handleOpenEnrollment}
                whileHover={{ scale: 1.08 }} 
                whileTap={{ scale: 0.94 }}
                className="relative px-8 lg:px-12 py-3 lg:py-4 rounded-full font-semibold tracking-wider text-white text-sm lg:text-base bg-black border border-orange-500/40 shadow-[0_0_40px_rgba(249,115,22,0.35)] overflow-hidden group"
              >
                <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-orange-500/40 via-amber-400/30 to-orange-500/40 blur-xl" />
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <span className="relative z-10 flex items-center gap-3">
                  <Rocket className="w-4 h-4 text-orange-400" /> Claim Your Spot
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
      
      <EnrollmentForm
        isOpen={isEnrollmentOpen}
        onClose={handleCloseEnrollment}
        formData={{}}
        onInputChange={() => {}}
        progress={0}
        submitStatus=""
        errors={{}}
        isSubmitting={false}
        onSubmit={() => {}}
      />
      
      <div className="relative z-10 mt-12 lg:mt-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
         <div className="mb-6 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-orange-500/50" />
            <div className="text-xs font-semibold tracking-[0.25em] uppercase text-orange-400/60">Trusted Partners</div>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-orange-500/50" />
         </div>
         <div className="relative py-8">
           <div className="pointer-events-none absolute left-0 top-0 h-full w-24 lg:w-32 z-10" />
           <div className="pointer-events-none absolute right-0 top-0 h-full w-24 lg:w-32 z-10" />
           <div className="logo-strip flex items-center gap-6 lg:gap-10">
             {[...companyLogos, ...companyLogos, ...companyLogos].map((logo, idx) => (
               <div key={logo.name + idx} className="group relative flex h-16 w-28 lg:h-20 lg:w-36 items-center justify-center flex-shrink-0">
                 <img src={logo.src} alt={logo.name} className="max-h-11 lg:max-h-20 w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
               </div>
             ))}
           </div>
         </div>
        </div>
      </div>
       
      <style jsx>{`
        @keyframes float {
         0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
         25% { transform: translateY(-10px) translateX(2px) rotate(1deg); }
         50% { transform: translateY(-6px) translateX(-2px) rotate(-1deg); }
         75% { transform: translateY(-12px) translateX(1px) rotate(0.5deg); }
        }
        @keyframes burst {
         0% { transform: translate(-50%, -50%) scale(0.3) rotate(0deg); opacity: 0; }
         20% { opacity: 1; }
         100% { transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y))) scale(1) rotate(var(--r)); opacity: 0; }
        }
        .logo-strip { width: max-content; animation: logos-slide 24s linear infinite; }
        .logo-strip:hover { animation-play-state: paused; }
        @keyframes logos-slide {
         0% { transform: translateX(0); }
         100% { transform: translateX(-50%); }
        }
        .line-clamp-5 { display: -webkit-box; -webkit-line-clamp: 5; -webkit-box-orient: vertical; overflow: hidden; }
        .animate-fade-in-delay { animation: fadeIn 1s ease-out 0.3s both; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}