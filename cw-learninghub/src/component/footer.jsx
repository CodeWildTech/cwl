import React, { useState } from "react";
import { Instagram, Linkedin, Youtube, MapPin, Mail, Download } from "lucide-react";
import developerImg from "../assets/footer/developer.png";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for contacting us!");
    setFormData({ name: "", phone: "", email: "", message: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* HERO SECTION */}
      <section className="flex-1 relative bg-gradient-to-b from-[#1c0b00] via-[#120300] to-black">
        <div className="max-w-6xl mx-auto px-4 py-22 lg:px-0 min-h-[75vh] flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.1fr] gap-10 lg:gap-14 w-full">
            {/* LEFT: PERSON + TEXT - NOW FIRST ON MOBILE */}
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
                <button className="inline-flex items-center gap-3 border border-white/70 hover:border-orange-500 px-4 py-2.5 rounded transition-colors">
                  <span className="text-xs sm:text-sm">CW - Boucher</span>
                  <div className="bg-orange-500 p-2 rounded group-hover:bg-orange-600 transition-colors">
                    <Download size={16} />
                  </div>
                </button>
              </div>
            </div>

            {/* RIGHT: FORM CARD - NOW SECOND ON MOBILE */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md bg-black/45 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-[0_35px_70px_rgba(0,0,0,0.85)] border border-white/10">
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="block text-xs uppercase tracking-[0.15em] text-gray-300">
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
                    <label htmlFor="phone" className="block text-xs uppercase tracking-[0.15em] text-gray-300">
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
                    <label htmlFor="email" className="block text-xs uppercase tracking-[0.15em] text-gray-300">
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
                    <label htmlFor="message" className="block text-xs uppercase tracking-[0.15em] text-gray-300">
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
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-lg transition-transform duration-200 hover:scale-[1.02] shadow-[0_15px_35px_rgba(249,115,22,0.65)]"
                  >
                    Talk to Us
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM INFO STRIP */}
      <section className="bg-black border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          {/* Address & name */}
          <div className="flex items-start gap-3">
            <MapPin className="text-orange-500 mt-1" size={26} />
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold">CW LearningHub</h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Aristo Junction, Thiruvananthapuram,
                <br />
                Kerala - 695041
              </p>
            </div>
          </div>

          {/* Social icons */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font- text-gray-200  tracking-[0.18em]">
              Connect With Us
            </h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="bg-zinc-900 hover:bg-orange-500 p-3 rounded-full transition-all duration-200 hover:scale-110"
              >
                <Instagram size={22} />
              </a>
              <a
                href="#"
                className="bg-zinc-900 hover:bg-orange-500 p-3 rounded-full transition-all duration-200 hover:scale-110"
              >
                <Linkedin size={22} />
              </a>
              <a
                href="#"
                className="bg-zinc-900 hover:bg-orange-500 p-3 rounded-full transition-all duration-200 hover:scale-110"
              >
                <Youtube size={22} />
              </a>
            </div>
          </div>

          {/* Email pill */}
          <button className="inline-flex items-center gap-3 bg-zinc-900 rounded-full px-4 py-2 text-sm text-gray-200 hover:text-orange-500 transition-colors">
            <Mail size={20} />
            <span>codewildlearninghub@gmail.com</span>
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
