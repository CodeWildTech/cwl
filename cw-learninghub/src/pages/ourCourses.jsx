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
} from 'lucide-react';
import EnrollmentContainer from '../component/enrollmentFormContainer';
import ProgramOverviewPage from './programOverview'; // ✅ NEW PAGE IMPORT

// Main CoursesSection Component - UPDATED
export default function ProgramOverview() {
  const [activeCategory, setActiveCategory] = useState('Development');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isOverviewPageOpen, setIsOverviewPageOpen] = useState(false); // ✅ NEW STATE
  const [isEnrollmentFormOpen, setIsEnrollmentFormOpen] = useState(false);
  const scrollContainerRef = useRef(null);

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

  const courses = useMemo(
    () => ({
      Development: [
        { title: 'Java Full Stack', description: 'Master backend logic with Spring Boot and frontend with modern frameworks.', duration: '4 Months', mentors: 5, tag: 'Bestseller' },
        { title: 'Python Full Stack', description: 'Scale applications using Django and high-performance Python architectures.', duration: '5 Months', mentors: 6, tag: 'Trending' },
        { title: 'MERN Stack', description: 'Build modern scalable apps using MongoDB, Express, React, and Node.', duration: '6 Months', mentors: 4 },
        { title: 'React Native', description: 'Create high-performance cross-platform mobile applications for iOS & Android.', duration: '4 Months', mentors: 3 },
      ],
      Design: [
        { title: 'UI/UX Design', description: 'Master Figma and user psychology to build world-class digital products.', duration: '3 Months', mentors: 4, tag: 'New' },
        { title: 'Motion Graphics', description: 'Bring designs to life with After Effects and cinematic storytelling.', duration: '3 Months', mentors: 3 },
      ],
      'AI & ML': [
        { title: 'Machine Learning', description: 'Deep dive into neural networks and predictive modeling with Python.', duration: '6 Months', mentors: 7, tag: 'Hot' },
        { title: 'Data Science', description: 'Turn raw data into business intelligence through advanced statistics.', duration: '5 Months', mentors: 5 },
      ],
      Marketing: [
        { title: 'Digital Growth', description: 'Modern SEO, SEM, and performance marketing strategies.', duration: '3 Months', mentors: 4 },
      ],
      Data: [
        { title: 'Big Data', description: 'Processing massive datasets using Hadoop and Spark ecosystems.', duration: '5 Months', mentors: 6 },
      ],
    }),
    []
  );

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

  // ✅ UPDATED: Enroll Now handler
  const handleEnrollNow = () => {
    setIsEnrollmentFormOpen(true);
  };

  // ✅ UPDATED: Program Overview handler - NOW OPENS NEW PAGE
  const handleProgramOverview = (course) => {
    setSelectedCourse(course);
    setIsOverviewPageOpen(true); // ✅ USES NEW PAGE
  };

  // ✅ NEW: Close overview page handler
  const closeOverviewPage = () => {
    setIsOverviewPageOpen(false);
    setSelectedCourse(null);
  };

  // ✅ NEW: Enroll from overview page
  const handleEnrollFromOverview = () => {
    setIsOverviewPageOpen(false);
    setIsEnrollmentFormOpen(true);
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
                    key={course.title}
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
                                src={`https://i.pravatar.cc/100?img=${i + (idx * 3)}`}
                                alt="mentor"
                                className="w-full h-full object-cover opacity-80"
                              />
                            </div>
                          ))}
                        </div>
                        <span className="text-[11px] lg:text-xs font-bold text-slate-400">
                          {course.mentors}+ Expert Mentors
                        </span>
                      </div>
                    </div>

                    {/* Buttons - PROGRAM OVERVIEW ✅ CONNECTED */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={handleEnrollNow}
                        className="px-8 py-3.5  bg-orange-600 text-sm font-bold text-white text-white font-black rounded-2xl hover:bg-orange-400 hover:scale-[1.02] active:scale-95 transition-all duration-300 text-sm flex-1 sm:flex-none"
                      >
                        Enroll Now
                      </button>

                      <button
                        onClick={() => handleProgramOverview(course)} // ✅ NOW OPENS ProgramOverviewPage
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

      {/* ✅ PROGRAM OVERVIEW PAGE MODAL - NEW */}
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
    </>
  );
}
