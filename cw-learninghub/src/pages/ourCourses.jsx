import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import {
  ChevronRight,
  Clock,
  Download,
  Sparkles,
  Code,
  Palette,
  Brain,
  Target,
  Database,
  ChevronDown,
  MessageCircle,
  X, // ✅ Added X icon for close button
} from 'lucide-react';
import EnrollmentContainer from '../component/enrollmentFormContainer';
import ProgramOverviewPage from './programOverview'; 
import { coursesData } from '../data/courses';

// Main CoursesSection Component - FULLY CONNECTED TO JSON + TIMER POPUP
export default function ProgramOverview() {
  const [activeCategory, setActiveCategory] = useState('Development');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isOverviewPageOpen, setIsOverviewPageOpen] = useState(false);
  const [isEnrollmentFormOpen, setIsEnrollmentFormOpen] = useState(false);
  const [showTimerPopup, setShowTimerPopup] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);
  const scrollContainerRef = useRef(null);
  const sessionStartTime = useRef(Date.now());

  const categories = useMemo(
    () => [
      { name: 'Development', color: 'from-orange-400 to-orange-500', icon: <Code size={18} /> },
      { name: 'Design', color: 'from-orange-400 to-orange-500', icon: <Palette size={18} /> },
      { name: 'AI & ML', color: 'from-orange-400 to-orange-500', icon: <Brain size={18} /> },
      { name: 'Marketing', color: 'from-orange-400 to-orange-500', icon: <Target size={18} /> },
      { name: 'Data', color: 'from-orange-400 to-orange-500', icon: <Database size={18} /> },
    ],
    []
  );

  const courses = useMemo(() => coursesData, []);


  const mentors = [
  "https://images.unsplash.com/photo-1560250097-0b93528c311a",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
  "https://images.unsplash.com/photo-1556157382-97eda2d62296",
  "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1",
];


  useEffect(() => {
    const checkTime = () => {
      const timeSpent = (Date.now() - sessionStartTime.current) / 1000;
      if (timeSpent >= 15 && !showTimerPopup && !hasShownPopup) {
        setShowTimerPopup(true);
        setHasShownPopup(true);
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        sessionStartTime.current = Date.now();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    const interval = setInterval(checkTime, 1000);
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [hasShownPopup]);

  // Scroll handler
  const handleScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const progress = (el.scrollTop / (el.scrollHeight - el.clientHeight || 1)) * 100;
    setScrollProgress(Math.min(100, Math.max(0, progress || 0)));
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) el.addEventListener('scroll', handleScroll);
    return () => el && el.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleCategoryChange = (catName) => {
    setActiveCategory(catName);
    setScrollProgress(0);
    if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
    if (window.innerWidth < 1024) setIsDropdownOpen(false);
  };

  const handleEnrollNow = () => {
    setIsEnrollmentFormOpen(true);
  };

  const handleProgramOverview = (course) => {
    const fullCourseData = Object.values(coursesData).flat().find(
      c => c.title === course.title
    );
    setSelectedCourse(fullCourseData || course);
    setIsOverviewPageOpen(true);
  };

  const closeOverviewPage = () => {
    setIsOverviewPageOpen(false);
    setSelectedCourse(null);
  };

  const handleEnrollFromOverview = () => {
    setIsOverviewPageOpen(false);
    setIsEnrollmentFormOpen(true);
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/917356227477?text=Hello%20I%20am%20interested%20in%20your%20course', '_blank');
    setShowTimerPopup(false);
    setHasShownPopup(true);
  };

  const closeTimerPopup = () => {
    setShowTimerPopup(false);
    setHasShownPopup(true);
  };

  return (
    <>
      <section className="py-24 lg:py-28 bg-[#0A0504] relative overflow-hidden text-slate-200">
        {/* Background elements */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(#f97316 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}
        />
        <div className="absolute top-0 left-1/4 w-[560px] h-[560px] bg-orange-600/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[560px] h-[560px] bg-purple-600/10 blur-[140px] rounded-full" />

        <style>{`
          @keyframes slideIn { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
          @keyframes fadeIn  { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
          .no-scrollbar::-webkit-scrollbar { display: none; width: 0px; background: transparent; }
          .no-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .no-scrollbar::-webkit-scrollbar-thumb { background: transparent; }
        `}</style>

        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
          {/* Header */}
          <header className="max-w-3xl mb-16 lg:mb-20 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2.5 mb-5 bg-orange-500/10 w-fit mx-auto lg:mx-0 px-4 py-1.5 rounded-full border border-orange-500/20">
              <Sparkles size={16} className="text-orange-400" />
              <span className="text-[11px] sm:text-xs font-black uppercase tracking-[0.3em] text-orange-400">Future-Ready Skills</span>
            </div>
            <h2 className="text-[2.5rem] sm:text-[3rem] lg:text-[3.8rem] font-black mb-5 lg:mb-7 text-white tracking-tight leading-tight">
              Elevate your <span className="text-transparent bg-clip-text bg-orange-600">Career</span>
            </h2>
            <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0">Industry-vetted curriculums designed to take you from beginner to professional.</p>
          </header>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Left Nav */}
            <div className="lg:col-span-3 xl:col-span-4 space-y-4">
              <p className="text-xs font-black text-slate-500 uppercase ml-1 mb-4 tracking-[0.25em]">Select Path</p>
              <div className="lg:hidden">
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`w-full group flex items-center justify-between p-4 rounded-2xl transition-all duration-300 border ${isDropdownOpen ? 'bg-orange-600 border-white/30 shadow-xl' : 'bg-white/5 border-white/10'
                      }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`p-2.5 rounded-xl ${isDropdownOpen ? 'bg-white/30' : 'bg-white/10'}`}>
                        {categories.find((cat) => cat.name === activeCategory)?.icon}
                      </div>
                      <span className={`font-bold text-sm ${isDropdownOpen ? 'text-white' : 'text-slate-300'}`}>{activeCategory}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 w-full mt-3 bg-[#1A1210] border border-white/10 rounded-2xl z-20 overflow-hidden shadow-2xl">
                      {categories.map((cat) => (
                        <button
                          key={cat.name}
                          onClick={() => handleCategoryChange(cat.name)}
                          className={`w-full flex items-center gap-3.5 p-3.5 hover:bg-white/10 transition-colors ${activeCategory === cat.name ? 'bg-white/20 border-r-4 border-orange-400' : ''}`}
                        >
                          <div className="p-1.5 rounded-lg bg-white/20">{cat.icon}</div>
                          <span className="font-semibold text-sm">{cat.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="hidden lg:block space-y-3">
                {categories.map((cat, i) => (
                  <button
                    key={cat.name}
                    onClick={() => handleCategoryChange(cat.name)}
                    className={`w-full group flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 border-l-4 ${activeCategory === cat.name ? 'border-orange-400 bg-orange-500/10 text-white' : 'border-transparent text-slate-400 hover:text-white hover:bg-orange-500/5'
                      }`}
                    style={{ animation: `slideIn 0.4s ease-out forwards ${i * 0.08}s` }}
                  >
                    <div className="flex items-center gap-3.5 flex-1 text-left">
                      <div className={`p-2 rounded-xl transition-all ${activeCategory === cat.name ? 'bg-orange-400/20 text-white' : 'bg-white/10 text-slate-400 group-hover:bg-orange-400/20'}`}>
                        {cat.icon}
                      </div>
                      <span className="font-bold text-sm">{cat.name}</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-all ${activeCategory === cat.name ? 'rotate-90 opacity-100' : 'opacity-40 group-hover:opacity-100'}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Course List */}
            <div className="lg:col-span-9 xl:col-span-8">
              <div
                ref={scrollContainerRef}
                className="max-h-[640px] lg:max-h-[760px] overflow-y-auto pr-5 lg:pr-6 space-y-6 lg:space-y-7 no-scrollbar"
              >
                {(courses[activeCategory] || []).map((course, idx) => (
                  <div
                    key={course.slug}
                    className="group relative bg-[#1A1210] border border-white/5 px-7 py-7 lg:px-8 lg:py-8 rounded-[1.75rem] lg:rounded-[2rem] hover:border-orange-500/50 transition-all duration-500"
                    style={{ animation: `fadeIn 0.5s ease-out forwards ${idx * 0.08}s` }}
                  >
                    {course.tag && (
                      <span className="absolute top-4 right-7 bg-orange-500/15 text-orange-400 text-[9px] font-black px-3 py-0.5 rounded-full border border-orange-500/30 uppercase tracking-widest">
                        {course.tag}
                      </span>
                    )}

                    <h3 className="text-[2.35rem] lg:text-[1.6rem] font-black text-white mb-3.5 group-hover:text-orange-600 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed mb-6 text-sm lg:text-[0.98rem]">
                      {course.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-6 mb-8">
                      <div className="flex items-center gap-2 text-[11px] lg:text-xs font-bold text-slate-300">
                        <Clock size={14} className="text-orange-400" />
                        {course.duration}
                      </div>

                      <div className="flex items-center">
                        <div className="flex -space-x-2 mr-3">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="w-7 h-7 lg:w-8 lg:h-8 rounded-full border-2 border-[#1A1210] overflow-hidden bg-slate-800">
                           <img
  src={mentors[i % mentors.length]}
  alt="mentor"
  className="w-full h-full object-cover"
/>
                            </div>
                          ))}
                        </div>
                        <span className="text-[11px] lg:text-xs font-bold text-slate-400">
                          {course.mentors}+ Expert Mentors
                        </span>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={handleEnrollNow}
                        className="px-8 py-3.5 bg-orange-600 text-sm font-bold text-white text-white font-black rounded-2xl hover:bg-orange-400 hover:scale-[1.02] active:scale-95 transition-all duration-300 text-sm flex-1 sm:flex-none"
                      >
                        Enroll Now
                      </button>

                      <button
                        onClick={() => handleProgramOverview(course)}
                        className="flex items-center justify-center gap-2 px-8 py-3.5 bg-white/5 border border-white/10 text-white font-semibold rounded-2xl hover:bg-white/10 hover:border-white/20 hover:translate-y-[-2px] active:translate-y-0 transition-all duration-200 text-xs lg:text-sm flex-1 sm:flex-none"
                      >
                        <Download size={16} />
                        Program Overview
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Scroll Progress */}
              <div className="mt-8 flex items-center gap-4">
                <div className="h-[3px] flex-1 bg-transparent rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${scrollProgress}%`,
                      backgroundImage: 'repeating-linear-gradient(to right, #fb923c 0, #fb923c 8px, transparent 8px, transparent 14px)',
                    }}
                  />
                </div>
                <span className="text-[10px] font-mono text-slate-500 uppercase">
                  {Math.round(scrollProgress)}% explored
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAM OVERVIEW MODAL */}
      {isOverviewPageOpen && selectedCourse && (
        <ProgramOverviewPage
          course={selectedCourse}
          onClose={closeOverviewPage}
          onEnroll={handleEnrollFromOverview}
        />
      )}

      {/* Enrollment Form Modal */}
      <EnrollmentContainer
        isOpen={isEnrollmentFormOpen}
        onClose={() => setIsEnrollmentFormOpen(false)}
      />

      {/* ✅ TIMER POPUP - CLOSE BUTTON MOVED TO TOP RIGHT OF PAGE */}
      {showTimerPopup && (
        <>
          {/* ✅ NEW: Close button on top right of page - dull color */}
          <button
            onClick={closeTimerPopup}
            className="fixed top-6 right-6 z-[1001] w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-200 flex items-center justify-center shadow-xl hover:shadow-2xl active:scale-95 text-slate-400 hover:text-slate-200"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
          
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000] flex items-center justify-center p-6">
            <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden">
              {/* Clean header - REMOVED close button from here */}
              <div className="bg-gradient-to-r from-slate-800 to-slate-800 p-8 text-white text-center relative">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-300 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                </div>

                <h3 className="text-4xl font-bold mb-4 leading-tight">
                  Confused about choosing the right path?
                </h3>
                <p className="text-slate-300 text-lg mb-2 font-medium">
                  We're here to help you
                </p>
                <p className="text-slate-200 text-sm">
                  Get personalized course recommendations tailored for you
                </p>
              </div>

              {/* Clean content area */}
              <div className="p-8 space-y-6">
                {/* Course expert info */}
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-white text-lg">Course Expert</p>
                    <p className="text-slate-400 text-sm">Live 1:1 guidance</p>
                  </div>
                </div>

                {/* ✅ WHATSAPP GREEN BUTTON */}
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-lg py-4 px-6 rounded-2xl transition-all duration-200 shadow-xl hover:shadow-2xl active:scale-[0.98] border border-green-500/30 flex items-center justify-center gap-3 group"
                >
                  <svg className="w-6 h-6 group-hover:-translate-y-0.5 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-8.696-5.238 9.8 9.8 0 01-1.312-4.175 9.83 9.83 0 011.12-4.309 9.75 9.75 0 013.292-3.319 9.84 9.84 0 016.258-1.512 9.69 9.69 0 014.288 1.316 9.71 9.71 0 013.526 3.551 9.84 9.84 0 011.199 4.903c-.017.34-.11.677-.288.978a10.3 10.3 0 01-.883 1.222 10.62 1"/>
                  </svg>
                  <span>Just Chat on WhatsApp</span>
                </button>

                {/* Trust signals */}
                <div className="space-y-3 text-center">
                  <div className="flex items-center justify-center gap-2 text-sm text-slate-300">
                    <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                    </svg>
                    24/7 Support Available
                  </div>
                  <p className="text-xs text-slate-400">No spam, just expert guidance</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}