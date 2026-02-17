import React from 'react';
import { X, ChevronDown } from 'lucide-react';

const EnrollmentForm = ({
  isOpen,
  onClose,
  formData = {},
  onInputChange = () => { },
  progress = 0,
  submitStatus = '',
  errors = {},
  isSubmitting = false,
  onSubmit
}) => {
  // 🔧 INPUT VALIDATION HANDLERS
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Phone number - only digits allowed (10 digits max)
    if (name === 'phone') {
      const phoneValue = value.replace(/[^0-9]/g, '').slice(0, 10);
      onInputChange({ target: { name, value: phoneValue } });
      return;
    }

    // Name - only letters, spaces, and common characters
    if (name === 'name') {
      const nameValue = value.replace(/[^a-zA-Z\s.'\-]/g, '').slice(0, 50);
      onInputChange({ target: { name, value: nameValue } });
      return;
    }

    // Email - basic email pattern
    if (name === 'email') {
      const emailValue = value.slice(0, 100);
      onInputChange({ target: { name, value: emailValue } });
      return;
    }

    // Location - alphanumeric + common characters
    if (name === 'location') {
      const locationValue = value.replace(/[^a-zA-Z0-9\s.,\-]/g, '').slice(0, 100);
      onInputChange({ target: { name, value: locationValue } });
      return;
    }

    // Qualification - alphanumeric + common characters
    if (name === 'qualification') {
      const qualValue = value.replace(/[^a-zA-Z0-9\s(),.\-]/g, '').slice(0, 100);
      onInputChange({ target: { name, value: qualValue } });
      return;
    }

    // Doubts - alphanumeric + common characters
    if (name === 'doubts') {
      const doubtsValue = value.replace(/[^a-zA-Z0-9\s.,!?;:\-'"]/g, '').slice(0, 500);
      onInputChange({ target: { name, value: doubtsValue } });
      return;
    }

    onInputChange(e);
  };

  return (
    <div
      className={`
        fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4
        transition-all duration-300
        ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
      `}
    >
      {/* 🔧 BACKDROP — z-0 FIX */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0"
        onClick={onClose}
      />


      {/* 🔧 MODAL — z-10 ENSURES ABOVE BACKDROP */}
      <div
        className={`
          relative z-10 w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh]
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


        {/* close (CANCEL) button — NO CHANGE */}
        <button
          onClick={onClose}
          className="
            absolute top-4 right-4 sm:top-6 sm:right-6 z-20
            w-8 h-8 sm:w-10 sm:h-10 rounded-full
            bg-orange-500/10 hover:bg-orange-500/20
            border border-orange-300/30
            flex items-center justify-center
            transition-all duration-300
            hover:rotate-90 group
          "
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 group-hover:text-orange-700" />
        </button>


        {/* layout */}
        <div className="relative z-10 flex">
          {/* progress bar */}
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


          {/* form */}
          <div className="flex-1">
            <form onSubmit={onSubmit} className="relative p-5 sm:p-8 md:p-12 pt-6 sm:pt-8">
              {/* submit status */}
              {submitStatus === 'success' && (
                <div className="mb-4 sm:mb-6 p-4 rounded-2xl bg-green-100/80 border-2 border-green-300/50 text-green-800 text-sm font-medium">
                  🎉 Enrollment successful! We will contact you soon.
                </div>
              )}
              {submitStatus === 'error' && errors.general && (
                <div className="mb-4 sm:mb-6 p-4 rounded-2xl bg-red-100/80 border-2 border-red-300/50 text-red-800 text-sm font-medium">
                  {errors.general}
                </div>
              )}


              {/* header */}
              <div className="mb-6 sm:mb-8">
                <h2 className="text-xl md:text-3xl font-bold text-neutral-800 mb-1 sm:mb-2">
                  <span className="text-orange-500">CW</span> LearningHub
                </h2>
                <h3 className="text-2xl md:text-4xl font-bold text-neutral-900 mb-1 sm:mb-3">
                  Shape <span className="text-orange-500">Your Future</span>
                </h3>
                <h3 className="text-2xl md:text-4xl font-bold text-neutral-900 mb-2 sm:mb-4">
                  With Technology
                </h3>
                <p className="text-neutral-600 text-xs sm:text-base">
                  Fill the form to unlock training, mentorship, and real-time project experience.
                </p>
              </div>


              {/* ALL YOUR ORIGINAL FORM FIELDS — NOW WITH VALIDATION */}
              <div className="space-y-4 sm:space-y-5">
                {/* Name */}
                <div className="space-y-1 sm:space-y-2">
                  <label className="block text-xs sm:text-sm font-medium text-neutral-700">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name ?? ''}
                    onChange={handleInputChange}
                    className={`
                      w-full px-4 py-2.5 sm:py-3 rounded-xl
                      bg-white/80 border-2 ${errors.name ? 'border-red-400 bg-red-50/50' : 'border-orange-300/50 focus:border-orange-500'
                      } focus:outline-none transition-all duration-300 text-neutral-800 text-sm sm:text-base
                    `}
                  />
                  {errors.name && <p className="text-[10px] sm:text-xs text-red-500 mt-0.5 sm:mt-1">{errors.name}</p>}
                </div>


                {/* Email */}
                <div className="space-y-1 sm:space-y-2">
                  <label className="block text-xs sm:text-sm font-medium text-neutral-700">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email ?? ''}
                    onChange={handleInputChange}
                    className={`
                      w-full px-4 py-2.5 sm:py-3 rounded-xl
                      bg-white/80 border-2 ${errors.email ? 'border-red-400 bg-red-50/50' : 'border-orange-300/50 focus:border-orange-500'
                      } focus:outline-none transition-all duration-300 text-neutral-800 text-sm sm:text-base
                    `}
                  />
                  {errors.email && <p className="text-[10px] sm:text-xs text-red-500 mt-0.5 sm:mt-1">{errors.email}</p>}
                </div>


                {/* Phone */}
                <div className="space-y-1 sm:space-y-2">
                  <label className="block text-xs sm:text-sm font-medium text-neutral-700">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <div className="w-16 sm:w-20 px-3 py-2.5 sm:py-3 rounded-xl bg-white/80 border-2 border-orange-300/50 flex items-center justify-center text-neutral-600 font-medium text-sm sm:text-base">
                      +91
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone ?? ''}
                      onChange={handleInputChange}
                      maxLength={10}
                      pattern="[0-9]{10}"
                      inputMode="numeric"
                      className={`
                        flex-1 px-4 py-2.5 sm:py-3 rounded-xl
                        bg-white/80 border-2 ${errors.phone ? 'border-red-400 bg-red-50/50' : 'border-orange-300/50 focus:border-orange-500'
                        } focus:outline-none transition-all duration-300 text-neutral-800 text-sm sm:text-base
                      `}
                    />
                  </div>
                  {errors.phone && <p className="text-[10px] sm:text-xs text-red-500 mt-0.5 sm:mt-1">{errors.phone}</p>}
                </div>


                {/* DOB + Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1 sm:space-y-2">
                    <label className="block text-xs sm:text-sm font-medium text-neutral-700">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob ?? ''}
                      onChange={handleInputChange}
                      max={new Date().toISOString().split('T')[0]}
                      className={`
                        w-full px-4 py-2.5 sm:py-3 rounded-xl
                        bg-white/80 border-2 ${errors.dob ? 'border-red-400 bg-red-50/50' : 'border-orange-300/50 focus:border-orange-500'
                        } focus:outline-none transition-all duration-300 text-neutral-800 text-sm sm:text-base
                      `}
                    />
                    {errors.dob && <p className="text-[10px] sm:text-xs text-red-500 mt-0.5 sm:mt-1">{errors.dob}</p>}
                  </div>


                  <div className="space-y-1 sm:space-y-2">
                    <label className="block text-xs sm:text-sm font-medium text-neutral-700">
                      Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location ?? ''}
                      onChange={handleInputChange}
                      className={`
                        w-full px-4 py-2.5 sm:py-3 rounded-xl
                        bg-white/80 border-2 ${errors.location ? 'border-red-400 bg-red-50/50' : 'border-orange-300/50 focus:border-orange-500'
                        } focus:outline-none transition-all duration-300 text-neutral-800 text-sm sm:text-base
                      `}
                    />
                    {errors.location && <p className="text-[10px] sm:text-xs text-red-500 mt-0.5 sm:mt-1">{errors.location}</p>}
                  </div>
                </div>


                {/* Qualification */}
                <div className="space-y-1 sm:space-y-2">
                  <label className="block text-xs sm:text-sm font-medium text-neutral-700">
                    Educational Qualification <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="qualification"
                    value={formData.qualification ?? ''}
                    onChange={handleInputChange}
                    className={`
                      w-full px-4 py-2.5 sm:py-3 rounded-xl
                      bg-white/80 border-2 ${errors.qualification ? 'border-red-400 bg-red-50/50' : 'border-orange-300/50 focus:border-orange-500'
                      } focus:outline-none transition-all duration-300 text-neutral-800 text-sm sm:text-base
                    `}
                  />
                  {errors.qualification && <p className="text-[10px] sm:text-xs text-red-500 mt-0.5 sm:mt-1">{errors.qualification}</p>}
                </div>


                {/* Course */}
                <div className="space-y-1 sm:space-y-2">
                  <label className="block text-xs sm:text-sm font-medium text-neutral-700">
                    Course Interested <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="course"
                      value={formData.course ?? ''}
                      onChange={handleInputChange}
                      className={`
                        w-full px-4 py-2.5 sm:py-3 rounded-xl
                        bg-white/80 border-2 ${errors.course ? 'border-red-400 bg-red-50/50' : 'border-orange-300/50 focus:border-orange-500'
                        } focus:outline-none transition-all duration-300 text-neutral-800 appearance-none cursor-pointer text-sm sm:text-base
                      `}
                    >
                      <option value="">Select a course</option>
                      <option value="Web-development">Web Development</option>
                      <option value="Graphic-design">Graphic Design</option>
                      <option value="Frontend development">Frontend Development</option>
                      <option value="Big Data Analytics">Big Data Analytics</option>
                      <option value="Java Fullstack">Java Fullstack</option>
                      <option value="Python Fullstack">Python Fullstack</option>
                      <option value="Cyber Security">Cyber Security</option>
                      <option value="Devops">Devops</option>
                      <option value="Mern Stack">Mern Stack</option>
                      <option value="Data Science">Data Science</option>
                      <option value="Mobile Development">Mobile Development</option>
                      <option value="UI/UX Design">UI/UX Design</option>
                      <option value="Digital Marketing">Digital Marketing</option>
                      <option value="Machine Learning">Machine Learning</option>
                      <option value="Artificial Intelligence">Artificial Intelligence</option>
                      <option value="Others">Others</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
                  </div>
                  {errors.course && <p className="text-[10px] sm:text-xs text-red-500 mt-0.5 sm:mt-1">{errors.course}</p>}
                </div>


                {/* Doubts */}
                <div className="space-y-1 sm:space-y-2">
                  <label className="block text-xs sm:text-sm font-medium text-neutral-700">
                    Do you have any doubts?
                  </label>
                  <textarea
                    name="doubts"
                    value={formData.doubts ?? ''}
                    onChange={handleInputChange}
                    rows={2}
                    className="
                      w-full px-4 py-2.5 sm:py-3 rounded-xl
                      bg-white/80 border-2 border-orange-300/50
                      focus:border-orange-500 focus:outline-none
                      transition-all duration-300 text-neutral-800 text-sm sm:text-base resize-none
                    "
                  />
                </div>


                {/* Submit - NOW CONNECTED TO BACKEND */}
                <div className="pt-2 sm:pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`
                      w-full md:w-auto md:mx-auto md:block
                      px-8 py-3 sm:px-12 sm:py-4 rounded-full text-sm sm:text-base font-bold text-white
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