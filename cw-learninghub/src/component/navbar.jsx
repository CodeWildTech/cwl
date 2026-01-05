import React, { useState, useEffect, useRef } from 'react';
import EnrollmentForm from './enrollmentForm'; // Import your separate form component

import {
  Menu,
  X,
  ChevronDown,
  Home,
  Info,
  Calendar,
  Layers,
  Phone,
} from 'lucide-react';

// Placeholder logo component
const Logo = () => (
  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-sm">
    CW
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
  const mobileNavRef = useRef(null);

  // Smooth scroll function
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
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isFormOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isFormOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileNavRef.current && !mobileNavRef.current.contains(event.target)) {
        setIsNavOpen(false);
      }
    };

    if (isNavOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNavOpen]);

  return (
    <div className="pb-20 md:pb-0">
      {/* DESKTOP & MOBILE TOP NAVBAR */}
      <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
        <div
          className={`w-full max-w-5xl transition-all duration-500 ${
            scrolled ? 'scale-[0.96]' : 'scale-100'
          }`}
        >
          <div
            className={`
              relative flex items-center justify-between
              rounded-full px-4 sm:px-6 lg:px-8
              py-2 sm:py-3
              border shadow-[0_18px_45px_rgba(0,0,0,0.65)]
              transition-all duration-500
              ${
                scrolled
                  ? 'bg-white/8 border-white/25 backdrop-blur-xl'
                  : 'bg-gradient-to-r from-[#181818] via-[#111111] to-[#181818] border-white/5 backdrop-blur-2xl'
              }
            `}
          >
            {/* logo */}
            <div className="flex items-center gap-2">
              <Logo />
            </div>

            {/* desktop nav */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm lg:text-base">
              {navLinks.map(({ label, icon: Icon, section }) => (
                <button
                  key={label}
                  onClick={() => scrollToSection(section)}
                  className={`
                    relative flex items-center
                    transition-all duration-300 group
                    ${
                      scrolled
                        ? 'h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 text-neutral-100/80 px-2 overflow-hidden'
                        : ' tracking-wide font-medium text-[15px] text-neutral-300/80 hover:text-white'
                    }
                  `}
                >
                  {scrolled ? (
                    <>
                      <Icon className="w-4 h-4 shrink-0" />
                      <span
                        className="
                          ml-0 pl-0
                          max-w-0 opacity-0
                          group-hover:ml-2 group-hover:pl-1
                          group-hover:max-w-[120px] group-hover:opacity-100
                          whitespace-nowrap text-[11px] tracking-[0.18em] uppercase
                          transition-all duration-300 ease-out
                        "
                      >
                        {label}
                      </span>
                    </>
                  ) : (
                    <>
                      <span>{label}</span>
                      <span
                        className="
                          pointer-events-none
                          absolute -bottom-1.5 left-1/2 -translate-x-1/2
                          h-[2px] w-0 rounded-full
                          bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500
                          transition-all duration-300
                          group-hover:w-7
                        "
                      />
                    </>
                  )}
                </button>
              ))}
            </nav>

            {/* desktop & mobile CTA */}
            <button
              onClick={() => setIsFormOpen(true)}
              className="
                inline-flex items-center justify-center
                px-4 md:px-5 py-2 md:py-2.5 rounded-full
                bg-gradient-to-r from-[#ff6a1a] to-[#ff3c00]
                text-xs sm:text-sm font-semibold text-white
                shadow-[0_10px_30px_rgba(255,90,31,0.7)]
                transition-all duration-300
                hover:shadow-[0_16px_45px_rgba(255,90,31,0.9)]
                hover:-translate-y-0.5 hover:scale-[1.02]
                active:scale-95
                relative overflow-hidden
              "
            >
              <span className="relative z-10">Enroll Now</span>
            </button>

            <div
              className={`
                pointer-events-none absolute inset-0 rounded-full
                transition-colors duration-500
                ${
                  scrolled
                    ? 'border border-white/10'
                    : 'border border-orange-500/5'
                }
              `}
            />
          </div>
        </div>
      </header>

      {/* MOBILE BOTTOM NAVIGATION */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-4">
        <div
          className="
            flex items-center justify-around
            rounded-3xl px-4 py-3
            bg-white/5 border border-white/10
            backdrop-blur-2xl shadow-2xl shadow-black/30
          "
        >
          {navLinks.map(({ label, icon: Icon, section }) => (
            <button
              key={label}
              onClick={() => scrollToSection(section)}
              className="
                group relative flex flex-col items-center gap-1
                transition-all duration-300
                hover:scale-110 active:scale-95
              "
            >
              <Icon className="w-6 h-6 text-neutral-200 group-hover:text-white transition-colors" />
              <span className="text-[10px] font-medium text-neutral-300 group-hover:text-white tracking-wide transition-colors">
                {label}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* Enrollment Form Component */}
      <EnrollmentForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)}
      />

      {/* scrollbar hiding utility */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
