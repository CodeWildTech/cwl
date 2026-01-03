import React, { useState, useEffect, useRef } from 'react';

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
  { label: 'Home', icon: Home },
  { label: 'About', icon: Info },
  { label: 'Events', icon: Calendar },
  { label: 'Courses', icon: Layers },
  { label: 'Contact', icon: Phone },
];

export default function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    location: '',
    qualification: '',
    course: '',
    doubts: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [errors, setErrors] = useState({});

  const mobileNavRef = useRef(null);

  const totalFields = 8;
  const filledCount = Object.values(formData).filter(
    (val) => String(val).trim() !== ''
  ).length;
  const progress = Math.round((filledCount / totalFields) * 100);

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

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone must be 10 digits';
    
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.qualification.trim()) newErrors.qualification = 'Qualification is required';
    if (!formData.course) newErrors.course = 'Please select a course';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    
    if (submitStatus) {
      setSubmitStatus('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (progress < 100) {
      alert('Please fill all fields before submitting');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('');
    setErrors({});

    try {
      const response = await fetch('http://localhost:5000/api/enroll/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          phone: `+91${formData.phone}`,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          dob: '',
          location: '',
          qualification: '',
          course: '',
          doubts: '',
        });
        setTimeout(() => {
          setIsFormOpen(false);
          setSubmitStatus('');
        }, 2000);
      } else {
        setSubmitStatus('error');
        if (data.message.includes('already enrolled')) {
          setErrors({ general: 'You have already enrolled with this email or phone' });
        } else {
          setErrors({ general: data.message || 'Submission failed' });
        }
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
      setErrors({ general: 'Network error. Please check if backend is running on port 5000' });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              {navLinks.map(({ label, icon: Icon }) => (
                <button
                  key={label}
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
          {navLinks.map(({ label, icon: Icon }) => (
            <button
              key={label}
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

      {/* popup overlay */}
      <div
        className={`
          fixed inset-0 z-[100] flex items-center justify-center p-4
          transition-all duration-300
          ${isFormOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
        onClick={() => setIsFormOpen(false)}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        {/* form container */}
        <div
          className={`
            relative w-full max-w-2xl max-h-[90vh]
            overflow-y-auto hide-scrollbar
            bg-gradient-to-br from-orange-50/95 via-white/95 to-orange-50/95
            rounded-3xl shadow-2xl
            transition-all duration-500 ease-out
            ${
              isFormOpen
                ? 'scale-100 opacity-100 translate-y-0'
                : 'scale-90 opacity-0 translate-y-8'
            }
          `}
          onClick={(e) => e.stopPropagation()}
        >
          {/* decorative circles */}
          <div className="absolute top-20 right-10 w-32 h-32 rounded-full bg-orange-200/30 blur-3xl pointer-events-none" />
          <div className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-orange-300/20 blur-3xl pointer-events-none" />

          {/* curved line */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
            viewBox="0 0 800 1200"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="
                M -50 260
                C 120 120, 260 420, 420 260
                S 700 100, 880 300
              "
              stroke="url(#orangeGradient)"
              strokeWidth="34"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff6a1a" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#ff5a1f" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#ff3c00" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>

          {/* close button */}
          <button
            onClick={() => setIsFormOpen(false)}
            className="
              absolute top-6 right-6 z-10
              w-10 h-10 rounded-full
              bg-orange-500/10 hover:bg-orange-500/20
              border border-orange-300/30
              flex items-center justify-center
              transition-all duration-300
              hover:rotate-90
              group
            "
          >
            <X className="w-5 h-5 text-orange-600 group-hover:text-orange-700" />
          </button>

          {/* layout: vertical progress bar + form content */}
          <div className="relative z-10 flex">
            {/* vertical progress bar */}
            <div className="hidden sm:flex flex-col items-center justify-center px-2">
              <div className="h-64 w-1 rounded-full bg-orange-100 overflow-hidden relative">
                <div
                  className="
                    absolute top-0 left-0 w-full h-full
                    rounded-full bg-gradient-to-b from-[#ffd5b0] via-[#ff6a1a] to-[#ff3c00]
                    transition-transform duration-500 origin-top
                  "
                  style={{ transform: `scaleY(${progress / 100})` }}
                />
              </div>
              <span className="mt-3 text-xs font-semibold tracking-[0.2em] uppercase text-orange-500">
                {progress}%
              </span>
            </div>

            {/* right: header + form */}
            <div className="flex-1">
              <form onSubmit={handleSubmit} className="relative p-8 md:p-12 pt-8">
                {/* Submit status message */}
                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 rounded-2xl bg-green-100/80 border-2 border-green-300/50 text-green-800 text-sm font-medium">
                    🎉 Enrollment successful! We will contact you soon.
                  </div>
                )}
                {submitStatus === 'error' && errors.general && (
                  <div className="mb-6 p-4 rounded-2xl bg-red-100/80 border-2 border-red-300/50 text-red-800 text-sm font-medium">
                    {errors.general}
                  </div>
                )}

                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-2">
                    <span className="text-orange-500">CW</span> LearningHub
                  </h2>
                  <h3 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
                    Shape <span className="text-orange-500">Your Future</span>
                  </h3>
                  <h3 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                    With Technology
                  </h3>
                  <p className="text-neutral-600 text-sm md:text-base">
                    Fill the form to unlock training, mentorship, and real-time
                    project experience.
                  </p>
                </div>

                <div className="space-y-5">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-neutral-700">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`
                        w-full px-4 py-3 rounded-xl
                        bg-white/80 border-2 ${
                          errors.name 
                            ? 'border-red-400 bg-red-50/50' 
                            : 'border-orange-300/50 focus:border-orange-500'
                        } focus:outline-none
                        transition-all duration-300
                        text-neutral-800
                      `}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-neutral-700">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`
                        w-full px-4 py-3 rounded-xl
                        bg-white/80 border-2 ${
                          errors.email 
                            ? 'border-red-400 bg-red-50/50' 
                            : 'border-orange-300/50 focus:border-orange-500'
                        } focus:outline-none
                        transition-all duration-300
                        text-neutral-800
                      `}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-neutral-700">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      <div
                        className="
                          w-20 px-3 py-3 rounded-xl
                          bg-white/80 border-2 border-orange-300/50
                          flex items-center justify-center
                          text-neutral-600 font-medium
                        "
                      >
                        +91
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        maxLength={10}
                        className={`
                          flex-1 px-4 py-3 rounded-xl
                          bg-white/80 border-2 ${
                            errors.phone 
                              ? 'border-red-400 bg-red-50/50' 
                              : 'border-orange-300/50 focus:border-orange-500'
                          } focus:outline-none
                          transition-all duration-300
                          text-neutral-800
                        `}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                    )}
                  </div>

                  {/* DOB & Location */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-neutral-700">
                        Date of Birth <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleInputChange}
                        max={new Date().toISOString().split('T')[0]}
                        className={`
                          w-full px-4 py-3 rounded-xl
                          bg-white/80 border-2 ${
                            errors.dob 
                              ? 'border-red-400 bg-red-50/50' 
                              : 'border-orange-300/50 focus:border-orange-500'
                          } focus:outline-none
                          transition-all duration-300
                          text-neutral-800
                        `}
                      />
                      {errors.dob && (
                        <p className="text-xs text-red-500 mt-1">{errors.dob}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-neutral-700">
                        Location <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className={`
                          w-full px-4 py-3 rounded-xl
                          bg-white/80 border-2 ${
                            errors.location 
                              ? 'border-red-400 bg-red-50/50' 
                              : 'border-orange-300/50 focus:border-orange-500'
                          } focus:outline-none
                          transition-all duration-300
                          text-neutral-800
                        `}
                      />
                      {errors.location && (
                        <p className="text-xs text-red-500 mt-1">{errors.location}</p>
                      )}
                    </div>
                  </div>

                  {/* Qualification */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-neutral-700">
                      Educational Qualification <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleInputChange}
                      className={`
                        w-full px-4 py-3 rounded-xl
                        bg-white/80 border-2 ${
                          errors.qualification 
                            ? 'border-red-400 bg-red-50/50' 
                            : 'border-orange-300/50 focus:border-orange-500'
                        } focus:outline-none
                        transition-all duration-300
                        text-neutral-800
                      `}
                    />
                    {errors.qualification && (
                      <p className="text-xs text-red-500 mt-1">{errors.qualification}</p>
                    )}
                  </div>

                  {/* Course */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-neutral-700">
                      Course Interested <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        name="course"
                        value={formData.course}
                        onChange={handleInputChange}
                        className={`
                          w-full px-4 py-3 rounded-xl
                          bg-white/80 border-2 ${
                            errors.course 
                              ? 'border-red-400 bg-red-50/50' 
                              : 'border-orange-300/50 focus:border-orange-500'
                          } focus:outline-none
                          transition-all duration-300
                          text-neutral-800
                          appearance-none cursor-pointer
                        `}
                      >
                        <option value="">Select a course</option>
                        <option value="web-development">Web Development</option>
                        <option value="data-science">Data Science</option>
                        <option value="mobile-development">
                          Mobile Development
                        </option>
                        <option value="ui-ux-design">UI/UX Design</option>
                        <option value="digital-marketing">
                          Digital Marketing
                        </option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
                    </div>
                    {errors.course && (
                      <p className="text-xs text-red-500 mt-1">{errors.course}</p>
                    )}
                  </div>

                  {/* Doubts */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-neutral-700">
                      Do you have any doubts?
                    </label>
                    <textarea
                      name="doubts"
                      value={formData.doubts}
                      onChange={handleInputChange}
                      rows={3}
                      className="
                        w-full px-4 py-3 rounded-xl
                        bg-white/80 border-2 border-orange-300/50
                        focus:border-orange-500 focus:outline-none
                        transition-all duration-300
                        text-neutral-800
                        resize-none
                      "
                    />
                  </div>

                  {/* submit */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting || progress < 100}
                      className={`
                        w-full md:w-auto md:mx-auto md:block
                        px-12 py-4 rounded-full
                        text-base font-bold text-white
                        shadow-[0_12px_30px_rgba(255,90,31,0.6)]
                        transition-all duration-300
                        hover:shadow-[0_18px_40px_rgba(255,90,31,0.8)]
                        hover:-translate-y-1 hover:scale-[1.02]
                        active:scale-95
                        ${
                          isSubmitting || progress < 100
                            ? 'bg-gray-500 cursor-not-allowed opacity-75 shadow-none'
                            : 'bg-gradient-to-r from-[#ff6a1a] to-[#ff3c00]'
                        }
                      `}
                    >
                      {isSubmitting 
                        ? (
                          <>
                            <span className="mr-2">⏳</span>
                            Submitting...
                          </>
                        ) : (
                          'Kickstart Now'
                        )
                      }
                    </button>
                    <p className="text-xs text-neutral-500 mt-2 text-center">
                      * All fields are required
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

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