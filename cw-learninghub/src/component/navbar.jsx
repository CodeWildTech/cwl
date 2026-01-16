import React, { useState, useEffect, useRef } from 'react';
import EnrollmentContainer from './enrollmentFormContainer';
import { motion, AnimatePresence } from 'framer-motion';

import {
  Home,
  Info,
  Calendar,
  Layers,
  Phone,
} from 'lucide-react';

const Logo = () => (
  <div className="w-20 h-20 rounded-full flex items-center ">
    <img src="src/assets/Logo/cwlogo.png" alt="" />
  </div>
);

const navLinks = [
  { label: 'Home', icon: Home, section: 'hero' },
  { label: 'About', icon: Info, section: 'codewild' },
  { label: 'Events', icon: Calendar, section: 'events' },
  { label: 'Courses', icon: Layers, section: 'courses' },
  { label: 'Contact', icon: Phone, section: 'contact' },
];

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      setIsNavOpen(false);
      window.history.pushState(null, null, `/#${sectionId}`);
    }
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mobile detection for logo position
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isFormOpen ? 'hidden' : 'unset';
  }, [isFormOpen]);

  return (
    <div className="md:pb-0">
      {/* DESKTOP & MOBILE TOP NAVBAR */}
      <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.div
          animate={{
            scale: scrolled ? 0.94 : 1,
            y: scrolled ? -5 : 0
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-5xl pointer-events-auto mx-auto"
        >
          <div
            className={`
              relative flex items-center justify-center
              rounded-full px-4 sm:px-6 lg:px-8
              py-2 sm:py-2.5
              border transition-colors duration-700 ease-in-out
              ${scrolled
                ? 'bg-zinc-900/60 border-white/20 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]'
                : 'bg-zinc-950/40 border-white/5 backdrop-blur-md shadow-none'
              }
            `}
          >
            {/* Logo - Outside on Desktop/Laptop, Inside on Mobile */}
            {!isMobile ? (
              // Desktop/Laptop: Logo OUTSIDE navbar (fixed spacing)
              <div className="absolute -left-20 top-1/2 -translate-y-1/2 z-10">
                <Logo />
              </div>
            ) : (
              // Mobile: Logo INSIDE navbar (smaller size)
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="w-12 h-12 rounded-full flex items-center ">
                  <img src="src/assets/Logo/cwlogo.png" alt="" />
                </div>
              </div>
            )}

            {/* desktop nav - CENTERED */}
            <nav className="hidden md:flex items-center gap-3 lg:gap-4">
              {navLinks.map(({ label, icon: Icon, section }) => (
                <button
                  key={label}
                  onClick={() => scrollToSection(section)}
                  className={`
                    relative flex items-center h-10
                    transition-all duration-500 ease-[0.22,1,0.36,1] group
                    ${scrolled
                      ? 'bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-3 text-neutral-100/80 overflow-hidden'
                      : 'text-neutral-400 hover:text-white px-4'
                    }
                  `}
                >
                  <Icon className={`${scrolled ? 'w-4 h-4' : 'w-0 h-0 opacity-0'} transition-all duration-500`} />

                  <span
                    className={`
                      ${scrolled
                        ? 'max-w-0 opacity-0 group-hover:max-w-[100px] group-hover:opacity-100 group-hover:ml-2 text-[10px] tracking-widest uppercase'
                        : 'max-w-[150px] opacity-100 text-[15px] font-medium'}
                      whitespace-nowrap transition-all duration-500 ease-in-out
                    `}
                  >
                    {label}
                  </span>

                  {!scrolled && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-orange-500 transition-all duration-500 group-hover:w-4 rounded-full" />
                  )}
                </button>
              ))}
            </nav>

            {/* CTA Button - MOVED TO RIGHT SIDE */}
            <motion.div
              className="absolute right-4 top-1/2 -translate-y-1/2"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <button
                onClick={() => setIsFormOpen(true)}
                className="
                  group relative inline-flex items-center justify-center
                  px-6 py-2.5 rounded-full
                  bg-orange-600 text-sm font-bold text-white
                  transition-all duration-500 ease-[0.22,1,0.36,1]
                  hover:shadow-[0_0_30px_rgba(234,88,12,0.4)]
                  hover:scale-105 active:scale-95
                  overflow-hidden
                "
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10">Enroll Now</span>
              </button>
            </motion.div>
          </div>
        </motion.div>
      </header>

      {/* MOBILE BOTTOM NAVIGATION */}
      <nav className="md:hidden fixed bottom-3 left-0 right-0 z-50 px-6">
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="
            flex items-center justify-around
            rounded-[2.5rem] px-2 py-1
            bg-zinc-900/80 border border-white/10
            backdrop-blur-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)]
          "
        >
          {navLinks.map(({ label, icon: Icon, section }) => (
            <button
              key={label}
              onClick={() => scrollToSection(section)}
              className="group relative flex flex-col items-center p-2 transition-transform duration-300 active:scale-75"
            >
              <Icon className="w-5 h-5 text-neutral-400 group-hover:text-orange-500 transition-colors duration-300" />
              <span className="text-[10px] mt-1 font-medium text-neutral-500 group-hover:text-white transition-colors duration-300">
                {label}
              </span>
            </button>
          ))}
        </motion.div>
      </nav>

      <EnrollmentContainer
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
