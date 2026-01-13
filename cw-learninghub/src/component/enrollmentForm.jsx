import React from 'react';
import { X, ChevronDown } from 'lucide-react';

const EnrollmentForm = ({
  isOpen,
  onClose,
  formData = {},
  onInputChange,
  progress = 0,
  submitStatus = '',
  errors = {},
  isSubmitting = false,
  onSubmit
}) => {
  if (!isOpen) return null;

  // ✅ SAFE DATA (Just to be sure, though parent initializes it)
  const safeFormData = {
    name: formData?.name || '',
    email: formData?.email || '',
    phone: formData?.phone || '',
    dob: formData?.dob || '',
    location: formData?.location || '',
    qualification: formData?.qualification || '',
    course: formData?.course || '',
    doubts: formData?.doubts || ''
  };

  return (
    <div
      className={`
        fixed inset-0 z-[100] flex items-center justify-center p-4
        transition-all duration-300
        ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
      `}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div
        className={`
          relative w-full max-w-2xl max-h-[90vh]
          overflow-y-auto hide-scrollbar
          bg-gradient-to-br from-orange-50/95 via-white/95 to-orange-50/95
          rounded-3xl shadow-2xl
          transition-all duration-500 ease-out
          ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-8'}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* decorative circles */}
        <div className="absolute top-20 right-10 w-32 h-32 rounded-full bg-orange-200/30 blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-orange-300/20 blur-3xl pointer-events-none" />

        {/* curved line SVG */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
          viewBox="0 0 800 1200"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M -50 260 C 120 120, 260 420, 420 260 S 700 100, 880 300"
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
          onClick={onClose}
          className="
            absolute top-6 right-6 z-10
            w-10 h-10 rounded-full
            bg-orange-500/10 hover:bg-orange-500/20
            border border-orange-300/30
            flex items-center justify-center
            transition-all duration-300
            hover:rotate-90 group
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
                style={{ transform: `scaleY(${(progress || 0) / 100})` }}
              />
            </div>
            <span className="mt-3 text-xs font-semibold tracking-[0.2em] uppercase text-orange-500">
              {(progress || 0).toFixed(0)}%
            </span>
          </div>

          {/* form content */}
          <div className="flex-1">
            <form onSubmit={onSubmit} className="relative p-8 md:p-12 pt-8">
              {/* Submit status */}
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

              {/* Header - ALL ORIGINAL */}
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
                  Fill the form to unlock training, mentorship, and real-time project experience.
                </p>
              </div>

              {/* ALL ORIGINAL FORM FIELDS - NO CHANGES */}
              <div className="space-y-5">
                {/* Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-neutral-700">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={safeFormData.name}
                    onChange={onInputChange}
                    className={`
                      w-full px-4 py-3 rounded-xl
                      bg-white/80 border-2 ${errors.name ? 'border-red-400 bg-red-50/50' : 'border-orange-300/50 focus:border-orange-500'
                      } focus:outline-none transition-all duration-300 text-neutral-800
                    `}
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-neutral-700">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={safeFormData.email}
                    onChange={onInputChange}
                    className={`
                      w-full px-4 py-3 rounded-xl
                      bg-white/80 border-2 ${errors.email ? 'border-red-400 bg-red-50/50' : 'border-orange-300/50 focus:border-orange-500'
                      } focus:outline-none transition-all duration-300 text-neutral-800
                    `}
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-neutral-700">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <div className="w-20 px-3 py-3 rounded-xl bg-white/80 border-2 border-orange-300/50 flex items-center justify-center text-neutral-600 font-medium">
                      +91
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={safeFormData.phone}
                      onChange={onInputChange}
                      maxLength={10}
                      className={`
                        flex-1 px-4 py-3 rounded-xl
                        bg-white/80 border-2 ${errors.phone ? 'border-red-400 bg-red-50/50' : 'border-orange-300/50 focus:border-orange-500'
                        } focus:outline-none transition-all duration-300 text-neutral-800
                      `}
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>

                {/* DOB + Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-neutral-700">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={safeFormData.dob}
                      onChange={onInputChange}
                      max={new Date().toISOString().split('T')[0]}
                      className={`
                        w-full px-4 py-3 rounded-xl
                        bg-white/80 border-2 ${errors.dob ? 'border-red-400 bg-red-50/50' : 'border-orange-300/50 focus:border-orange-500'
                        } focus:outline-none transition-all duration-300 text-neutral-800
                      `}
                    />
                    {errors.dob && <p className="text-xs text-red-500 mt-1">{errors.dob}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-neutral-700">
                      Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={safeFormData.location}
                      onChange={onInputChange}
                      className={`
                        w-full px-4 py-3 rounded-xl
                        bg-white/80 border-2 ${errors.location ? 'border-red-400 bg-red-50/50' : 'border-orange-300/50 focus:border-orange-500'
                        } focus:outline-none transition-all duration-300 text-neutral-800
                      `}
                    />
                    {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location}</p>}
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
                    value={safeFormData.qualification}
                    onChange={onInputChange}
                    className={`
                      w-full px-4 py-3 rounded-xl
                      bg-white/80 border-2 ${errors.qualification ? 'border-red-400 bg-red-50/50' : 'border-orange-300/50 focus:border-orange-500'
                      } focus:outline-none transition-all duration-300 text-neutral-800
                    `}
                  />
                  {errors.qualification && <p className="text-xs text-red-500 mt-1">{errors.qualification}</p>}
                </div>

                {/* Course */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-neutral-700">
                    Course Interested <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="course"
                      value={safeFormData.course}
                      onChange={onInputChange}
                      className={`
                        w-full px-4 py-3 rounded-xl
                        bg-white/80 border-2 ${errors.course ? 'border-red-400 bg-red-50/50' : 'border-orange-300/50 focus:border-orange-500'
                        } focus:outline-none transition-all duration-300 text-neutral-800 appearance-none cursor-pointer
                      `}
                    >
                      <option value="">Select a course</option>
                      <option value="web-development">Web Development</option>
                      <option value="data-science">Data Science</option>
                      <option value="mobile-development">Mobile Development</option>
                      <option value="ui-ux-design">UI/UX Design</option>
                      <option value="digital-marketing">Digital Marketing</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
                  </div>
                  {errors.course && <p className="text-xs text-red-500 mt-1">{errors.course}</p>}
                </div>

                {/* Doubts */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-neutral-700">
                    Do you have any doubts?
                  </label>
                  <textarea
                    name="doubts"
                    value={safeFormData.doubts}
                    onChange={onInputChange}
                    rows={3}
                    className="
                      w-full px-4 py-3 rounded-xl
                      bg-white/80 border-2 border-orange-300/50
                      focus:border-orange-500 focus:outline-none
                      transition-all duration-300 text-neutral-800 resize-none
                    "
                  />
                </div>

                {/* Submit - NOW CONNECTED TO BACKEND */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`
                      w-full md:w-auto md:mx-auto md:block
                      px-12 py-4 rounded-full text-base font-bold text-white
                      shadow-[0_12px_30px_rgba(255,90,31,0.6)]
                      transition-all duration-300
                      hover:shadow-[0_18px_40px_rgba(255,90,31,0.8)]
                      hover:-translate-y-1 hover:scale-[1.02] active:scale-95
                      ${isSubmitting
                        ? 'bg-gray-500 cursor-not-allowed opacity-75 shadow-none'
                        : 'bg-gradient-to-r from-[#ff6a1a] to-[#ff3c00]'
                      }
                    `}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="mr-2">⏳</span>
                        Submitting...
                      </>
                    ) : (
                      'Kickstart Now'
                    )}
                  </button>
                  <p className="text-xs text-neutral-500 mt-2 text-center">
                    * All fields are required
                  </p>
                </div>
              </div>
            </form>
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
    </div>
  );
};

export default EnrollmentForm;
