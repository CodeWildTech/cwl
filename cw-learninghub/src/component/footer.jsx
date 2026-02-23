import React, { useState } from "react";
import { Instagram, Linkedin, MapPin, Mail, Download, X } from "lucide-react";
import axios from "axios";
import developerImg from "../assets/footer/developer.webp";
import { toast, Toaster } from 'sonner';
import API from "../config/api.js";
import { Helmet } from "react-helmet-async";
const WhatsAppIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const ContactFormInner = ({ isModal = false }) => (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className={`w-full px-4 py-2.5 ${isModal ? 'bg-zinc-100 border-zinc-300' : 'bg-stone-200'} text-gray-900 rounded-md border`}
        required
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        className={`w-full px-4 py-2.5 ${isModal ? 'bg-zinc-100 border-zinc-300' : 'bg-stone-200'} text-gray-900 rounded-md border`}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Mail"
        value={formData.email}
        onChange={handleChange}
        className={`w-full px-4 py-2.5 ${isModal ? 'bg-zinc-100 border-zinc-300' : 'bg-stone-200'} text-gray-900 rounded-md border`}
        required
      />
      <textarea
        name="message"
        rows="3"
        placeholder="Drop your message"
        value={formData.message}
        onChange={handleChange}
        className={`w-full px-4 py-2.5 ${isModal ? 'bg-zinc-100 border-zinc-300' : 'bg-stone-200'} text-gray-900 rounded-md resize-none border`}
        required
      />
      <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 transition-colors text-sm font-bold text-white py-3 rounded-lg">
        Talk to Us
      </button>
    </form>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading('Sending your message...');

    try {
      const baseUrl = API || "http://localhost:8000";
      await axios.post(`${baseUrl}/api/footer-contact/submit`, formData);

      toast.dismiss(loadingToast);
      toast.success('Thank you for contacting us!', {
        description: 'We will get back to you shortly via email.',
        duration: 5000,
      });
      setFormData({ name: "", phone: "", email: "", message: "" });
      setIsFormModalOpen(false);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Failed to send message', {
        description: 'Please check your connection and try again.',
        duration: 6000,
      });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDownloadBrochure = () => {
    const brochureUrl = "/brochures/cw-broucher.pdf";
    const link = document.createElement("a");
    link.href = brochureUrl;
    link.download = "CW-LearningHub-Brochure.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Helmet>
        <title>Contact Us | CodeWild LearningHub</title>
        <meta name="description" content="Have questions about our coding courses? Get in touch with the CodeWild LearningHub team for career guidance and enrollment support." />
        <link rel="canonical" href="https://codewildlearn.com/contact" />
      </Helmet>
      <Toaster position="top-right" richColors closeButton expand duration={4500} />

      {/* HERO SECTION */}
      <section className="flex-1 relative bg-gradient-to-b from-[#1c0b00] via-[#120300] to-black">
        <div className="max-w-6xl mx-auto px-4 py-22 lg:px-0 min-h-[75vh] flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.1fr] gap-10 lg:gap-14 w-full">

            {/* LEFT */}
            <div className="flex items-end lg:items-center gap-2">
              <div className="relative">
                <div className="w-50 h-76 sm:w-52 sm:h-72 lg:w-56 lg:h-80 overflow-hidden">
                  <img src={developerImg} alt="Student" className="w-full h-full object-cover" />
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
                </p>

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

            {/* RIGHT */}
            <div className="flex justify-center lg:justify-end">
              {/* Desktop Form */}
              <div className="hidden lg:block w-full max-w-md bg-black/45 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-[0_35px_70px_rgba(0,0,0,0.85)] border border-white/10">
                <ContactFormInner />
              </div>

              {/* Mobile Contact Button */}
              <div className="lg:hidden w-full flex justify-center">
                <button
                  onClick={() => setIsFormModalOpen(true)}
                  className="px-10 py-4 bg-orange-600 text-sm font-bold text-white rounded-full hover:bg-orange-700 transition-all duration-300 shadow-lg shadow-orange-500/20"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE CONTACT MODAL */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsFormModalOpen(false)}
          />
          <div className="relative w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => setIsFormModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black transition-colors"
            >
              <X size={24} />
            </button>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
              <p className="text-gray-600 text-sm">Drop us a message and we'll get back to you.</p>
            </div>
            <ContactFormInner isModal={true} />
          </div>
        </div>
      )}

      {/* CONTACT INFO STRIP */}
      <section className="bg-black border-t border-white/5 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto py-6 sm:py-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12">

            <div className="flex items-start gap-3 flex-1 lg:flex-[0_0_300px]">
              <MapPin className="text-orange-500 mt-1 flex-shrink-0" size={24} />
              <div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight">CW LearningHub</h3>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mt-1">
                  Aristo Junction, Thiruvananthapuram, Kerala - 695041
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 lg:gap-8 w-full lg:w-auto">

              {/* EMAIL */}
              {/* EMAIL - Updated to open Gmail directly */}
              <a
                href="https://mail.google.com/mail/?view=cm&to=contact@codewildlearn.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-zinc-900/50 rounded-xl p-2.5 border border-white/5 hover:border-orange-500/50 transition-all duration-200 flex-1"
              >
                <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center">
                  <Mail size={18} className="text-gray-300" />
                </div>
                <p className="text-sm sm:text-base font-semibold text-gray-100 truncate">
                  contact@codewildlearn.com
                </p>
              </a>


              {/* PHONE */}
              {/* PHONE - Updated to open dialer/contact */}
              <a
                href="tel:+917356227477"
                className="flex items-center gap-3 bg-zinc-900/50 rounded-xl p-2.5 border border-white/5 hover:border-orange-500/50 transition-all duration-200 flex-1"
              >
                <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center">
                  <svg className="w-4.5 h-4.5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <p className="text-sm sm:text-base font-semibold text-gray-100">
                  +91 73562 27477
                </p>
              </a>

            </div>

            <div className="flex gap-3">
              <a href="https://www.instagram.com/codewild.learninghub?igsh=ZDV2NHE2aDRnNWFo" className="w-12 h-12 bg-zinc-900 hover:bg-orange-500 p-3 rounded-xl flex items-center justify-center"><Instagram size={18} /></a>
              <a href="https://www.linkedin.com/company/codewild-learning-hub/" className="w-12 h-12 bg-zinc-900 hover:bg-orange-500 p-3 rounded-xl flex items-center justify-center"><Linkedin size={18} /></a>
              <a
                href="https://wa.me/917356227477?text=Hello! Can I talk with your team."
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-zinc-900 hover:bg-[#25D366] p-3 rounded-xl flex items-center justify-center transition-colors duration-300"
              >
                <WhatsAppIcon size={20} />
              </a>
            </div>

          </div>
        </div>
      </section>

      <footer className="bg-black text-center py-5 text-gray-500 text-xs border-t border-zinc-900">
        © 2026 Design & Developed by CodeWild Tech
      </footer>
    </div>
  );
}