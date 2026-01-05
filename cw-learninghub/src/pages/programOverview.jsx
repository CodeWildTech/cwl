import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
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
  ChevronLeft,
  X,
  Users,
  GraduationCap,
  Award,
  Star,
} from 'lucide-react';

export default function ProgramOverviewPage() {
  const [currentTab, setCurrentTab] = useState('overview');
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollContainerRef = useRef(null);

  // Sample course data (same as your courses list)
  const course = {
    title: 'MERN Stack',
    description: 'Build modern scalable apps using MongoDB, Express, React, and Node.js. Master full-stack development with industry-standard tools and deployment strategies.',
    duration: '6 Months',
    mentors: 8,
    level: 'Intermediate',
    rating: 4.9,
    students: 1250,
    projects: 12,
    tag: 'Bestseller'
  };

  const mentors = useMemo(() => [
    { id: 1, name: 'Priya Sharma', expertise: 'Full Stack', avatar: 'https://i.pravatar.cc/100?img=12', rating: 4.9 },
    { id: 2, name: 'Rahul Patel', expertise: 'React', avatar: 'https://i.pravatar.cc/100?img=15', rating: 4.8 },
    { id: 3, name: 'Anita Desai', expertise: 'Node.js', avatar: 'https://i.pravatar.cc/100?img=18', rating: 5.0 },
    { id: 4, name: 'Vikram Singh', expertise: 'MongoDB', avatar: 'https://i.pravatar.cc/100?img=21', rating: 4.7 },
    { id: 5, name: 'Sneha Rao', expertise: 'DevOps', avatar: 'https://i.pravatar.cc/100?img=24', rating: 4.9 },
  ], []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Sparkles },
    { id: 'curriculum', label: 'Curriculum', icon: GraduationCap },
    { id: 'mentors', label: 'Mentors', icon: Users },
    { id: 'projects', label: 'Projects', icon: Award },
    { id: 'reviews', label: 'Reviews', icon: Star },
  ];

  const handleScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const progress = (el.scrollTop / (el.scrollHeight - el.clientHeight || 1)) * 100;
    setScrollProgress(Math.min(100, Math.max(0, progress || 0)));
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll);
      return () => el.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  return (
    <div className="min-h-screen bg-[#0A0504] text-slate-200 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#f97316 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
      <div className="absolute top-0 left-1/4 w-[560px] h-[560px] bg-orange-600/10 blur-[140px] rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-[560px] h-[560px] bg-purple-600/10 blur-[140px] rounded-full" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        {/* Header with Back Button */}
        <div className="pt-8 pb-12 lg:pt-16 lg:pb-20">
          <button className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-semibold mb-8 group">
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-all" />
            <span>Back to Courses</span>
          </button>
          
          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12">
            <div className="lg:w-1/2">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl">
                  <Code size={28} className="text-white" />
                </div>
                {course.tag && (
                  <span className="bg-orange-500/20 text-orange-400 px-4 py-1 rounded-full text-sm font-black uppercase tracking-wider">
                    {course.tag}
                  </span>
                )}
              </div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-tight mb-6">
                {course.title}
              </h1>
              <div className="flex items-center gap-6 text-sm font-semibold text-slate-300 mb-8">
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-orange-400" />
                  {course.duration}
                </div>
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-orange-400" />
                  {course.students}+ Students
                </div>
                <div className="flex items-center gap-1">
                  <Star className="text-orange-400 fill-orange-400" size={18} />
                  <span>{course.rating}</span>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 flex flex-col sm:flex-row gap-4 mt-8 lg:mt-0">
              <button className="px-10 py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black rounded-3xl hover:from-orange-400 hover:to-orange-500 hover:scale-[1.02] active:scale-95 transition-all flex-1 text-lg shadow-2xl">
                Start Learning Now
              </button>
              <button className="px-10 py-5 bg-white/10 border-2 border-white/20 text-white font-semibold rounded-3xl hover:bg-white/20 hover:border-white/30 transition-all flex-1">
                Download Syllabus
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-12 bg-[#1A1210]/80 backdrop-blur-sm border border-white/10 rounded-3xl p-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all flex-1 min-w-[140px] ${
                  currentTab === tab.id
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-xl'
                    : 'text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Content */}
        <div ref={scrollContainerRef} className="max-h-[70vh] overflow-y-auto pr-4 space-y-12 no-scrollbar mb-12">
          {/* Overview Tab */}
          {currentTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                  <Sparkles size={24} className="text-orange-400" />
                  About This Course
                </h3>
                <p className="text-lg text-slate-300 leading-relaxed max-w-3xl">
                  {course.description} This comprehensive program covers everything from database design to production 
                  deployment, ensuring you're ready for real-world full-stack development challenges.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white/5 p-8 rounded-3xl border border-white/10 group hover:border-orange-400/50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-orange-500/20 rounded-2xl">
                      <GraduationCap size={20} className="text-orange-400" />
                    </div>
                    <h4 className="font-bold text-xl text-white">12+ Projects</h4>
                  </div>
                  <p className="text-slate-400 leading-relaxed">Build production-ready applications</p>
                </div>
                <div className="bg-white/5 p-8 rounded-3xl border border-white/10 group hover:border-orange-400/50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-orange-500/20 rounded-2xl">
                      <Users size={20} className="text-orange-400" />
                    </div>
                    <h4 className="font-bold text-xl text-white">8 Expert Mentors</h4>
                  </div>
                  <p className="text-slate-400 leading-relaxed">1:1 mentorship & code reviews</p>
                </div>
                <div className="bg-white/5 p-8 rounded-3xl border border-white/10 group hover:border-orange-400/50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-orange-500/20 rounded-2xl">
                      <Award size={20} className="text-orange-400" />
                    </div>
                    <h4 className="font-bold text-xl text-white">Job Ready</h4>
                  </div>
                  <p className="text-slate-400 leading-relaxed">100% placement assistance</p>
                </div>
              </div>
            </div>
          )}

          {/* Mentors Tab */}
          {currentTab === 'mentors' && (
            <div>
              <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
                <Users size={24} className="text-orange-400" />
                Your Expert Mentors
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mentors.map((mentor) => (
                  <div key={mentor.id} className="group bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-orange-400/50 hover:bg-white/10 transition-all">
                    <div className="flex items-start gap-6 mb-6">
                      <div className="w-20 h-20 rounded-3xl overflow-hidden border-4 border-white/20 flex-shrink-0">
                        <img 
                          src={mentor.avatar} 
                          alt={mentor.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <div className="flex-1 min-w-0 pt-2">
                        <h4 className="font-black text-xl text-white mb-2 truncate">{mentor.name}</h4>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="bg-orange-500/20 text-orange-300 px-4 py-2 rounded-xl text-sm font-bold">
                            {mentor.expertise}
                          </span>
                          <div className="flex items-center gap-1 text-orange-400">
                            <Star size={14} fill="currentColor" />
                            <span className="text-sm font-bold">{mentor.rating}</span>
                          </div>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed">
                          10+ years leading development teams at top tech companies
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other tabs content would go here */}
        </div>

        {/* Scroll Progress & CTA */}
        <div className="flex items-center justify-between pt-12 border-t border-white/10">
          <div className="flex items-center gap-4">
            <div className="h-[4px] w-20 bg-orange-500/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full transition-all"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
            <span className="text-xs font-mono text-slate-500 uppercase">
              {Math.round(scrollProgress)}% explored
            </span>
          </div>
          <button className="px-12 py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black rounded-3xl hover:from-orange-400 hover:to-orange-500 transition-all shadow-2xl">
            Enroll Now - ₹49,999
          </button>
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; width: 0px; background: transparent; }
        .no-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .no-scrollbar::-webkit-scrollbar-thumb { background: transparent; }
      `}</style>
    </div>
  );
}
