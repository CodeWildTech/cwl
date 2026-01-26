import React, { useState, useEffect } from 'react';
import { Code, Users, BookOpen, X } from 'lucide-react';
import sarah from '../assets/mentors/Sarah.jpg';
import steve from '../assets/mentors/Steve.jpg';
import james from '../assets/mentors/James.jpg';
import marcus from '../assets/mentors/Marcus.jpg';
import stark from '../assets/mentors/Stark.jpg';
import angelin from '../assets/mentors/Angelin.jpg';
import studentImg from '../assets/mentors/stud.jpg';

const CodeWildLanding = () => {
  const [activeRow, setActiveRow] = useState(null);
  const [swapPhase, setSwapPhase] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredMentor, setHoveredMentor] = useState(null);

  // Mentors data (unchanged)
  const mentors = [
    { id: 1, top: "5%", right: "8%", mobileRight: "2%", delay: 0.1, img: sarah, name: "Sarah", role: "UX Designer" },
    { id: 2, top: "18%", right: "2%", mobileRight: "0%", delay: 0.2, img: steve, name: "Steve", role: "Developer" },
    { id: 3, top: "35%", right: "12%", mobileRight: "5%", delay: 0.3, img: james, name: "James", role: "Python expert" },
    { id: 4, top: "50%", right: "5%", mobileRight: "1%", delay: 0.4, img: marcus, name: "Marcus", role: "Data Scientist" },
    { id: 5, top: "68%", right: "10%", mobileRight: "3%", delay: 0.5, img: stark, name: "Stark", role: "DevOps Engineer" },
    { id: 6, top: "82%", right: "4%", mobileRight: "0%", delay: 0.6, img: angelin, name: "Angelin", role: "QA Specialist" },
  ];

  const mentorPaths = [
    "M 350 300 C 800 300, 550 60, 880 60",
    "M 350 300 C 500 300, 650 150, 940 150",
    "M 350 300 C 500 300, 550 240, 850 240",
    "M 350 300 C 500 300, 550 360, 930 360",
    "M 350 300 C 500 300, 550 450, 820 450",
    "M 350 300 C 800 300, 550 540, 880 510"
  ];

  useEffect(() => {
    const swapInterval = setInterval(() => {
      setSwapPhase(prev => (prev >= 1 ? 0 : +(prev + 0.02).toFixed(2)));
    }, 40);
    return () => clearInterval(swapInterval);
  }, []);

  const leftBoxItems = [
    'No/limited accountability',
    'Flexible - learn on your time',
    'Part-time; keep your current job',
    'Learn on demand without human support',
  ];

  const centerBoxItems = [
    'Flexibility - learn on your time',
    'Personal mentor and career coaching video calls to keep you on track',
    'Online learning flexibly with 1:1 human support',
    'Part-time; keep your current job while preparing for your new career',
  ];

  const rightBoxItems = [
    'Learn through live instruction at specific times',
    'Personal support and accountability through instruction and grading',
    'Scheduled classes',
    'Full-time commitment',
  ];

  const renderRow = (text, index, box) => {
    const isActive = activeRow === index;
    const isCenter = box === 'center';

    return (
      <div
        key={index}
        onMouseEnter={() => setActiveRow(index)}
        onMouseLeave={() => setActiveRow(null)}
        onTouchStart={() => setActiveRow(index)}
        className={`
          relative flex items-center justify-center text-center
          px-2 sm:px-6 py-4 sm:py-8 min-h-[90px] sm:min-h-[110px]
          transition-all duration-300 cursor-pointer overflow-hidden
          ${
            isActive
              ? isCenter
                ? 'text-white scale-[1.02]'
                : 'text-orange-100'
              : isCenter
              ? 'text-[#3b2a20]'
              : 'text-gray-500'
          }
        `}
      >
        <div
          className={`
            absolute inset-0 transition-all duration-300 ease-in-out
            ${isActive ? 'opacity-100' : 'opacity-0'}
            ${
              isCenter
                ? 'bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 shadow-lg'
                : 'bg-[#22120a]'
            }
          `}
        />
        <p
          className={`relative z-10 text-[9px] sm:text-sm md:text-lg leading-tight px-1 transition-transform duration-300
          ${isActive ? 'font-bold' : 'font-medium'}
        `}
        >
          {text}
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#070302] text-white p-3 sm:p-10 font-sans overflow-x-hidden">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(30px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-reveal { animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
            .delay-1 { animation-delay: 0.1s; }
            .delay-2 { animation-delay: 0.2s; }
            .delay-3 { animation-delay: 0.3s; }
          `,
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header - UPDATED SECTION */}
        <div className="mb-16 sm:mb-24 text-left px-2 animate-reveal overflow-visible">
          <h2 className="text-lg sm:text-4xl font-bold text-gray-400 tracking-wide mb-2">
            Why We're the
          </h2>
          <h1 className="text-[2.8rem] sm:text-[5rem] md:text-7xl font-black bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent leading-tight tracking-[-0.02em]">
            Right Choice
          </h1>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-3 items-stretch gap-0 relative mb-20">
          <div className="bg-[#0f0704] border border-orange-900/20 rounded-l-3xl overflow-hidden opacity-0 animate-reveal delay-1">
            <div className="h-20 sm:h-32 flex flex-col items-center justify-center border-b border-orange-900/10 bg-black/40">
              <BookOpen className="w-5 h-5 sm:w-8 sm:h-8 text-orange-500/50 mb-2" />
              <h3 className="font-bold text-[9px] sm:text-base uppercase text-gray-400">Self Learn</h3>
            </div>
            <div className="divide-y divide-orange-900/5">
              {leftBoxItems.map((item, i) => renderRow(item, i, 'left'))}
            </div>
          </div>

          <div className="relative z-30 bg-[#fffcf9] rounded-2xl sm:rounded-[40px] shadow-[0_0_50px_rgba(234,88,12,0.2)] transform scale-105 sm:scale-110 border-[3px] border-orange-500 overflow-hidden opacity-0 animate-reveal">
            <div className="h-20 sm:h-32 flex flex-col items-center justify-center bg-orange-50 border-b border-orange-100">
              <Code className="w-6 h-6 sm:w-10 sm:h-10 text-orange-600 mb-1" />
              <h3 className="font-black text-orange-600 text-xs sm:text-3xl tracking-tighter">CODE WILD</h3>
            </div>
            <div className="divide-y divide-orange-100">
              {centerBoxItems.map((item, i) => renderRow(item, i, 'center'))}
            </div>
          </div>

          <div className="bg-[#0f0704] border border-orange-900/20 rounded-r-3xl overflow-hidden opacity-0 animate-reveal delay-3">
            <div className="h-20 sm:h-32 flex flex-col items-center justify-center border-b border-orange-900/10 bg-black/40">
              <Users className="w-5 h-5 sm:w-8 sm:h-8 text-orange-500/50 mb-2" />
              <h3 className="font-bold text-[9px] sm:text-base uppercase text-gray-400">Offline</h3>
            </div>
            <div className="divide-y divide-orange-900/5">
              {rightBoxItems.map((item, i) => renderRow(item, i, 'right'))}
            </div>
          </div>
        </div>

        {/* Stay Aware Button */}
        <div className="flex justify-center sm:justify-end mb-16 pb-10 animate-reveal delay-3">
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="group bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Stay Aware</span>
          </button>
        </div>

        {/* How Code Wild Work Section */}
        <div className="mb-12 sm:mb-16 text-left px-2 animate-reveal flex items-center gap-3 sm:gap-4">
          <div>
            <h2 className="text-lg sm:text-3xl md:text-6xl font-bold text-orange-600 tracking-wide">How</h2>
            <h1 className="text-4xl sm:text-6xl font-black text-white">Code Wild Work</h1>
          </div>
          <svg className="w-8 h-8 sm:w-12 sm:h-12 text-orange-500 mt-4 sm:mt-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7M17 7H7M17 7V17"/>
          </svg>
        </div>

        {/* Mentorship Section */}
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <div className="relative w-full max-w-7xl h-[450px] md:h-[650px] mb-8">
            <div className="absolute left-[2%] md:left-[8%] top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-2 md:gap-3">
              <div className="w-16 h-20 md:w-24 md:h-32 rounded-xl md:rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl shadow-white/5">
                <img src={studentImg} alt="Student" className="w-full h-full object-cover" />
              </div>
              <span className="text-white/80 font-medium tracking-widest text-[8px] md:text-xs uppercase bg-white/10 px-2 md:px-4 py-1 rounded-full border border-white/10">Student</span>
            </div>

            <div className="absolute left-[30%] md:left-[35%] top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="w-8 h-8 md:w-12 md:h-12 bg-orange-600 rounded-full flex items-center justify-center shadow-[0_0_20px_#ff4500]">
                <div className="w-4 h-4 md:w-6 md:h-6 bg-white/30 rounded-full animate-ping" />
              </div>e
            </div>

            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
              <path d="M 130 300 Q 240 300 350 300" fill="transparent" stroke="rgba(255, 255, 255, 0.37)" strokeWidth="2" strokeDasharray="5,5" />
              {mentorPaths.map((path, i) => (
                <path key={`line-${i}`} d={path} fill="transparent" stroke="rgba(255, 255, 255, 0.29)" strokeWidth="1.5" strokeDasharray="5,5" />
              ))}
              <circle r="4" fill="#ff4500">
                <animateMotion dur="3s" repeatCount="indefinite" path="M 130 300 Q 240 300 350 300" />
              </circle>
              {mentorPaths.map((path, i) => (
                <circle key={`signal-${i}`} r="3" fill="#ff4500">
                  <animateMotion dur="3s" begin="1.5s" repeatCount="indefinite" path={path} />
                  <animate attributeName="opacity" values="0;1;0" dur="3s" begin="1.5s" repeatCount="indefinite" />
                </circle>
              ))}
            </svg>

            {mentors.map((mentor) => (
              <div
                key={mentor.id}
                className="absolute flex flex-row-reverse items-center gap-2 md:gap-3 z-30 transition-all duration-300"
                style={{ top: mentor.top, right: window.innerWidth < 768 ? mentor.mobileRight : mentor.right }}
                onMouseEnter={() => setHoveredMentor(mentor.id)}
                onMouseLeave={() => setHoveredMentor(null)}
              >
                <div className={`relative w-10 h-10 md:w-16 md:h-16 rounded-lg md:rounded-xl overflow-hidden border-2 transition-all duration-500 shadow-xl ${hoveredMentor === mentor.id ? 'border-orange-500 scale-110' : 'border-white/40'}`}>
                  <img src={mentor.img} alt={mentor.name} className="w-full h-full object-cover" />
                </div>
                <div className={`px-2 md:px-4 py-1 md:py-2 rounded-lg md:rounded-xl border transition-all duration-300 ${hoveredMentor === mentor.id ? 'bg-orange-600 border-orange-400 shadow-[0_10px_20px_rgba(234,88,12,0.3)]' : 'bg-white/5 border-white/10'}`}>
                  <p className="font-bold text-[10px] md:text-sm text-white leading-none">{mentor.name}</p>
                  <p className={`text-[8px] md:text-[10px] mt-0.5 md:mt-1 uppercase tracking-tighter ${hoveredMentor === mentor.id ? 'text-orange-100' : 'text-gray-500'}`}>{mentor.role}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative w-screen overflow-visible flex items-center justify-center">
            <div className="absolute inset-0 w-full h-full z-0">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black via-black/50 to-transparent z-10" />
                <img
                    src="/pattern.png"
                    alt="Background pattern"
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
            </div>

            <div className="relative max-w-2xl w-full mx-auto px-4 z-20 animate-reveal delay-2">
              <div className="absolute -top-10 left-6 md:left-12 z-30">
                <svg width="50" height="40" viewBox="0 0 75 45" fill="white" className="md:w-20 md:h-16 shadow-2xl">
                  <path d="M0 21.36C0 9.56 9.12 0 20.44 0C26.56 0 31.4 3.12 31.4 8.76C31.4 14.16 27.28 18.24 22.44 18.24C21.84 18.24 20.24 18.12 19.4 17.88C18.68 25.56 22.4 33.36 29.48 38.64L24.44 44.4C11.36 36.36 0 28.56 0 21.36ZM41.4 21.36C41.4 9.56 50.52 0 61.84 0C67.96 0 72.8 3.12 72.8 8.76C72.8 14.16 68.68 18.24 63.84 18.24C63.24 18.24 61.64 18.12 60.8 17.88C60.08 25.56 63.8 33.36 70.88 38.64L65.84 44.4C52.76 36.36 41.4 28.56 41.4 21.36Z" />
                </svg>
              </div>

              <div className="relative bg-[#ff4500] px-6 py-10 md:px-12 md:py-16 rounded-[2rem] md:rounded-[3rem] shadow-[0_30px_60px_rgba(255,69,0,0.4)] border border-white/10">
                <h2 className="text-white text-xl md:text-4xl font-bold leading-tight text-center max-w-lg mx-auto">
We provide direct mentorship from experienced industry experts                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Warning Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl border-4 border-red-200">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">⚠️ Warning!</h3>
                  <p className="text-red-600 font-semibold">Common Red Flags</p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <X size={28} className="text-gray-500 hover:text-gray-900" />
              </button>
            </div>

            <div className="space-y-4 mb-8">
              {['❌ Mentoring by juniors', '❌ Fake internships', '❌ No real-world projects', '❌ Weak portfolios', '❌ Low skill growth'].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-red-50 border-l-4 border-red-400 rounded-xl">
                  <div className="w-6 h-6 bg-red-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-red-600 font-bold text-sm">!</span>
                  </div>
                  <p className="text-gray-800 font-medium text-lg leading-relaxed">{item}</p>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-gray-200 text-center">
              <p className="text-gray-600 mb-4 text-sm">Code Wild gives you real mentorship</p>
              <button onClick={() => setIsModalOpen(false)} className="w-full bg-orange-600 text-white py-3 px-6 rounded-2xl font-bold text-lg hover:bg-orange-700 transition-colors">
                Got it! Choose Code Wild
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeWildLanding;