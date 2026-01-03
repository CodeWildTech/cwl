import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDownRight,
  Calendar,
  MapPin,
  X,
  CheckCircle2,
  Clock,
} from "lucide-react";

const EVENTS_DATA = [
  {
    id: 1,
    number: "01",
    title: "Digital Marketing",
    category: "Trivandrum",
    size: "md",
    status: "Upcoming",
    date: "Oct 24, 2025",
    location: "Technopark",
    desc: "Master SEO and Meta Ads.",
    image:
      "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 2,
    number: "02",
    title: "Digital Marketing",
    category: "Trivandrum",
    size: "xl",
    status: "Upcoming",
    date: "Today",
    location: "Online",
    desc: "Live session on growth hacking.",
    image:
      "https://images.pexels.com/photos/7567434/pexels-photo-7567434.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 3,
    number: "03",
    title: "Digital Marketing",
    category: "Trivandrum",
    size: "lg",
    status: "Ended",
    date: "Sep 12, 2024",
    location: "Kochi",
    desc: "Advanced content strategy workshop.",
    image:
      "https://images.pexels.com/photos/6476584/pexels-photo-6476584.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 4,
    number: "04",
    title: "Digital Marketing",
    category: "Online",
    size: "sm",
    status: "Upcoming",
    date: "Nov 05, 2025",
    location: "Zoom",
    desc: "Introduction to Email Automations.",
    image:
      "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 5,
    number: "05",
    title: "Digital Marketing",
    category: "Online",
    size: "sm",
    status: "Ended",
    date: "Dec 01, 2025",
    location: "Google Meet",
    desc: "UI/UX for Marketers.",
    image:
      "https://images.pexels.com/photos/6476586/pexels-photo-6476586.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

export default function EventsSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const filteredEvents =
    activeFilter === "All"
      ? EVENTS_DATA
      : EVENTS_DATA.filter((e) => e.category === activeFilter);

  return (
    <section className="relative min-h-[85vh] text-white px-6 lg:px-14 py-16 overflow-hidden bg-black">
      {/* Main Glassy Blurred Black/Orange Gradient - Center */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(255,106,26,0.3)_0%,rgba(249,115,22,0.15)_30%,rgba(234,88,12,0.08)_50%,transparent_70%)] backdrop-blur-[80px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_40%_at_50%_50%,rgba(255,106,26,0.15)_0%,rgba(249,115,22,0.08)_40%,transparent_60%)] backdrop-blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(20,11,5,0.4)_0%,rgba(15,15,15,0.2)_50%,transparent_80%)] backdrop-blur-[60px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-9">
          <div>
            <p className="text-xs tracking-[0.35em] uppercase text-white/70 mb-2.5">
              CW
            </p>
            <h1 className="text-7xl md:text-5.5xl font-black tracking-tight">
              <span className="text-white">Events</span>
            </h1>
          </div>

          <div className="flex bg-black/70 rounded-full p-1 border border-white/10 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
            {["All", "Trivandrum", "Online"].map((item) => (
              <button
                key={item}
                onClick={() => setActiveFilter(item)}
                className={`relative px-5.5 md:px-6.5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeFilter === item
                    ? "text-[#0f0a09]"
                    : "text-white/55 hover:text-white"
                }`}
              >
                {activeFilter === item && (
                  <motion.div
                    layoutId="filter-pill"
                    className="absolute inset-0 bg-white rounded-full shadow-lg shadow-orange-500/25"
                    transition={{
                      type: "spring",
                      bounce: 0.25,
                      duration: 0.45,
                    }}
                  />
                )}
                <span className="relative z-10">{item}</span>
              </button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-5"
        >
          {filteredEvents.map((event, idx) => (
            <EventCard
              key={event.id}
              event={event}
              index={idx}
              onClick={() => setSelectedEvent(event)}
            />
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedEvent && (
          <EventModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// EventCard component (unchanged)
function EventCard({ event, onClick, index }) {
  const heightMap = {
    sm: "h-[280px]",
    md: "h-[315px]",
    lg: "h-[350px]",
    xl: "h-[385px]",
  };

  const colMap = {
    1: "md:col-span-2 lg:col-span-2",
    2: "md:col-span-2 lg:col-span-4",
    3: "md:col-span-2 lg:col-span-3",
    4: "md:col-span-2 lg:col-span-3",
    5: "md:col-span-2 lg:col-span-6",
  };

  const statusColors = {
    Upcoming: "text-orange-400 border-orange-400/30 bg-orange-400/10",
    Ended: "text-white/40 border-white/10 bg-white/5",
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.09, ease: "easeOut" }}
      onClick={onClick}
      className={`${colMap[event.id]} ${heightMap[event.size]} group relative cursor-pointer rounded-[32px] border border-white/10 bg-[#0f0f0f] overflow-hidden transition-all duration-700 hover:border-white/30 hover:shadow-[0_0_70px_-18px_rgba(255,255,255,0.1)] backdrop-blur-md`}
    >
      {/* Text Content Section */}
      <div className="relative z-20 h-full w-[65%] p-7 md:p-8 flex flex-col justify-between pointer-events-none">
        <div>
          <div className="flex items-center gap-2.5 mb-5">
            <span className="text-3.5xl md:text-4.5xl font-black tracking-tighter text-white/20">
              {event.number}
            </span>
            <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${statusColors[event.status]}`}>
              {event.status}
            </div>
          </div>
          
          <h2 className="text-2.5xl md:text-3xl font-bold leading-[1.1] text-white group-hover:text-orange-400 transition-colors duration-500">
            {event.title} <br />
            <span className="text-white/40 group-hover:text-white transition-colors duration-500">{event.category}</span>
          </h2>
          
          <p className="mt-3.5 text-sm text-white/50 max-w-[260px] line-clamp-2 font-light leading-relaxed">
            {event.desc}
          </p>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-1">Location</span>
            <span className="text-sm font-medium text-white/80">{event.location}</span>
          </div>
          <motion.div 
            whileHover={{ scale: 1.08, rotate: -45 }}
            className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center bg-white/5 text-white backdrop-blur-sm"
          >
            <ArrowDownRight size={18} />
          </motion.div>
        </div>
      </div>

      {/* Image Section */}
      <div className="absolute top-0 right-0 w-[45%] h-full z-0 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-in-out"
        />
        
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f] via-[#0f0f0f]/80 to-transparent w-full" />
        <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      </div>

      {/* Background Decorative Element */}
      <div className="absolute -bottom-18 -left-18 w-56 h-56 bg-orange-500/5 rounded-full blur-[90px] pointer-events-none" />
    </motion.div>
  );
}

// Updated EventModal component with better design
function EventModal({ event, onClose }) {
  const isUpcoming = event.status === "Upcoming";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        className="relative w-full max-w-lg md:max-w-xl rounded-[32px] bg-white text-slate-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] overflow-hidden"
      >
        {/* Modern Gradient Accent Header */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-transparent -z-10" />
        
        {/* Elegant Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100/80 hover:bg-white hover:shadow-md transition-all z-50 group"
        >
          <X size={20} className="text-slate-600 group-hover:rotate-90 transition-transform duration-300" />
        </button>

        <div className="p-8 md:p-10">
          {/* Header Tags */}
          <div className="flex items-center gap-3 mb-6">
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
              isUpcoming ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"
            }`}>
              <div className={`w-1.5 h-1.5 rounded-full ${isUpcoming ? "bg-green-500 animate-pulse" : "bg-slate-400"}`} />
              {isUpcoming ? "Registration Open" : "Event Concluded"}
            </div>
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-tighter">
              #{event.number} • {event.category}
            </span>
          </div>

          {/* Title & Description */}
          <div className="space-y-4 mb-8">
            <h2 className="text-3xl md:text-4xl font-black leading-tight tracking-tight">
              {event.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">Masterclass</span>
            </h2>
            <p className="text-slate-500 text-base leading-relaxed max-w-[95%] font-medium">
              {event.desc}
            </p>
          </div>

          {/* Info Bento-Style Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-600">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</p>
                <p className="text-sm font-bold text-slate-800">{event.date}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Venue</p>
                <p className="text-sm font-bold text-slate-800">{event.location}</p>
              </div>
            </div>
          </div>

          {/* Registration Status & CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-white bg-slate-200 overflow-hidden ring-1 ring-slate-100">
                    <div className="w-full h-full bg-gradient-to-br from-slate-400 to-slate-500 flex items-center justify-center text-[8px] text-white font-bold uppercase">
                      CW
                    </div>
                  </div>
                ))}
                <div className="w-9 h-9 rounded-full border-2 border-white bg-orange-500 flex items-center justify-center text-[8px] text-white font-bold ring-1 ring-slate-100">
                  +120
                </div>
              </div>
              <p className="text-xs font-semibold text-slate-500 italic">Professionals joined</p>
            </div>

            {isUpcoming ? (
              <motion.button
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto ml-auto px-8 py-4 rounded-2xl bg-slate-900 text-white text-sm font-bold uppercase tracking-widest shadow-xl shadow-slate-200"
              >
                Reserve Seat
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto ml-auto px-8 py-4 rounded-2xl border-2 border-slate-200 text-slate-600 text-sm font-bold uppercase tracking-widest hover:bg-slate-50"
              >
                Get Notified
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}