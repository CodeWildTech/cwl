import React, { useState } from "react";
import { Instagram, Linkedin, Youtube, MapPin, Mail, Download, X } from "lucide-react";
import axios from "axios";
import developerImg from "../assets/footer/developer.png";
import { toast, Toaster } from 'sonner'; // Import here

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
  const loadingToast = toast.loading('Sending your message...'); // Spinner state
  
  try {
    console.log("Sending form data:", formData);
    const response = await axios.post("http://localhost:8000/api/footer-contact/submit", formData);
    console.log("Server response:", response.data);
    
    toast.dismiss(loadingToast);
    toast.success('Thank you for contacting us!', {
      description: 'We will get back to you shortly via email.',
      duration: 5000,
      action: {
        label: 'View Status',
        onClick: () => setIsFormModalOpen(true),  // Reopen modal or navigate
      },
    });
    setFormData({ name: "", phone: "", email: "", message: "" });
    setIsFormModalOpen(false);
  } catch (error) {
    toast.dismiss(loadingToast);
    console.error("Error submitting form:", error);
    toast.error('Failed to send message', {
      description: 'Please check your connection and try again.',
      duration: 6000,
      action: {
        label: 'Retry',
        onClick: () => handleSubmit(e),  // Retry button!
      },
    });
  }
};

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // **NEW: Brochure Download Function**
  const handleDownloadBrochure = () => {
    // Replace with your actual brochure PDF path
    const brochureUrl = "/brochures/cw-broucher.pdf"; // or "https://yourdomain.com/brochures/cw-brochure.pdf"

    // Create temporary link for download
    const link = document.createElement("a");
    link.href = brochureUrl;
    link.download = "CW-LearningHub-Brochure.pdf"; // File name when downloaded
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Optional: Track download
    console.log("Brochure downloaded!");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* HERO SECTION */}
       <Toaster 
        position="top-right"
        richColors
        closeButton
        expand={true}  // Auto-expands on hover for interactivity
        duration={4500}
      />
      <section className="flex-1 relative bg-gradient-to-b from-[#1c0b00] via-[#120300] to-black">
        <div className="max-w-6xl mx-auto px-4 py-22 lg:px-0 min-h-[75vh] flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.1fr] gap-10 lg:gap-14 w-full">
            {/* LEFT: PERSON + TEXT - FIRST ON MOBILE & DESKTOP */}
            <div className="flex items-end lg:items-center gap-2">
              {/* Original Image */}
              <div className="relative">
                <div className="w-50 h-76 sm:w-52 sm:h-72 lg:w-56 lg:h-80  overflow-hidden ">
                  <img
                    src={developerImg}
                    alt="Student"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="space-y-4 pb-6 lg:pb-0 text-left">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
                  <span className="text-orange-500">Talk</span> With
                  <br />
                  Our Team
                </h1>
                <p className="text-gray-200 text-sm sm:text-base max-w-md">
                  Get in touch with our team for any course enquiries or support.
                  We're here to help you start your learning journey with confidence.
                </p>

                {/* **UPDATED: Working Download Button */}
                <button
                  onClick={handleDownloadBrochure}
                  className="inline-flex items-center gap-3 border border-white/70 hover:border-orange-500 hover:bg-orange-500/20 px-4 py-2.5 rounded-lg transition-all duration-300 hover:scale-105 group"
                >
                  <span className="text-xs sm:text-sm font-medium">Download Brochure</span>
                  <div className="bg-orange-500 p-2 rounded-md group-hover:bg-orange-600 transition-all duration-300">
                    <Download size={16} className="group-hover:rotate-[-45deg] transition-transform duration-300" />
                  </div>
                </button>
              </div>
            </div>

            {/* RIGHT: MOBILE BUTTON / DESKTOP FORM */}
            <div className="flex justify-center lg:justify-end">
              {/* MOBILE: Redesigned Compact Contact Button */}
              <div className="block lg:hidden">
                <button
                  onClick={() => setIsFormModalOpen(true)}
                  className="w-full max-w-sm bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-sm py-3 px-6 rounded-xl shadow-lg shadow-orange-500/40 hover:shadow-xl hover:shadow-orange-500/60 border border-orange-400/50 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 overflow-hidden relative group"
                >
                  <div className="absolute inset-0 bg-white/20 blur-xl scale-110 group-hover:opacity-100 opacity-0 transition-all duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform -translate-x-[30%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Contact Us
                  </span>
                </button>
              </div>

              {/* DESKTOP: Original Form Card */}
              <div className="hidden lg:block w-full max-w-md bg-black/45 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-[0_35px_70px_rgba(0,0,0,0.85)] border border-white/10">
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="block text-xs  tracking-[0.15em] text-gray-300">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-stone-200 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="block text-xs  tracking-[0.15em] text-gray-300">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-stone-200 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="email" className="block text-xs  tracking-[0.15em] text-gray-300">
                      Mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-stone-200 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="message" className="block text-xs  tracking-[0.15em] text-gray-300">
                      Drop your message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-stone-200 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full  bg-orange-600 text-sm font-bold text-white hover:bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold py-4 rounded-lg transition-transform duration-200 hover:scale-[1.02] shadow-[0_15px_35px_rgba(249,115,22,0.65)]"
                  >
                    Talk to Us
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE FORM MODAL */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 lg:hidden">
          <div className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-black/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-[0_35px_70px_rgba(0,0,0,0.85)] border border-white/10">
            {/* Header with Close Button */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <h3 className="text-xl font-bold text-white">Contact Us</h3>
              <button
                onClick={() => setIsFormModalOpen(false)}
                className="p-2 hover:bg-white/10 rounded-xl transition-colors"
              >
                <X size={24} className="text-gray-300" />
              </button>
            </div>

            {/* Form */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-1.5">
                <label htmlFor="name-modal" className="block text-xs tracking-[0.15em] text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  id="name-modal"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-stone-200 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="phone-modal" className="block text-xs tracking-[0.15em] text-gray-300">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone-modal"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-stone-200 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email-modal" className="block text-xs tracking-[0.15em] text-gray-300">
                  Mail
                </label>
                <input
                  type="email"
                  id="email-modal"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-stone-200 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message-modal" className="block text-xs tracking-[0.15em] text-gray-300">
                  Drop your message
                </label>
                <textarea
                  id="message-modal"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-stone-200 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                  required
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsFormModalOpen(false)}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-orange-600 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-transform duration-200 hover:scale-[1.02] shadow-[0_15px_35px_rgba(249,115,22,0.65)]"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BOTTOM INFO STRIP - FIXED FOR ALL SCREENS */}
      <section className="bg-black border-t border-white/5 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto py-6 sm:py-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6 lg:gap-8">
          {/* Address & name */}
          <div className="flex items-start gap-2 sm:gap-3 min-w-0 flex-1">
            <MapPin className="text-orange-500 mt-1 flex-shrink-0" size={24} />
            <div className="min-w-0">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight">CW LearningHub</h3>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mt-1 line-clamp-2">
                Aristo Junction, Thiruvananthapuram,
                <br className="hidden sm:block" />
                Kerala - 695041
              </p>
            </div>
          </div>

          {/* Social icons */}
          <div className="flex flex-col gap-2 sm:gap-3 w-full sm:w-auto">
            <h4 className="text-xs sm:text-sm font-medium text-gray-200 tracking-[0.18em]">
              Connect With Us
            </h4>
            <div className="flex gap-2 sm:gap-4">
              <a
                href="https://www.instagram.com/codewild.learninghub?igsh=ZDV2NHE2aDRnNWFo"
                className="bg-zinc-900 hover:bg-orange-500 p-2 sm:p-3 rounded-full transition-all duration-200 hover:scale-110 flex-shrink-0"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="bg-zinc-900 hover:bg-orange-500 p-2 sm:p-3 rounded-full transition-all duration-200 hover:scale-110 flex-shrink-0"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="bg-zinc-900 hover:bg-orange-500 p-2 sm:p-3 rounded-full transition-all duration-200 hover:scale-110 flex-shrink-0"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Email pill */}
          <button className="inline-flex items-center gap-2 sm:gap-3 bg-zinc-900 rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-200 hover:text-orange-500 transition-colors flex-shrink-0">
            <Mail size={18} />
            <span className="truncate">codewildlearninghub@gmail.com</span>
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-center py-5 text-gray-500 text-xs border-t border-zinc-900">
        © 2025 Design &amp; Developed by Code Wild Tech
      </footer>
    </div>
  );
}