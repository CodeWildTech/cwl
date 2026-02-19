import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Trophy, User, Mail, Phone, School, BookOpen, MapPin, Briefcase } from 'lucide-react';
import API from '../config/api';

const CompetitionForm = ({ isPageMode, track }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        Status: '',
        institution: '',
        course: '',
        department: '',
        category: '',
        city: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch(`${API}/api/competition/submit`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, track }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Submission failed");
            }

            setSubmitted(true);
        } catch (err) {
            console.error("Submission Error:", err);
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClass = "w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/10 transition-all";
    const labelClass = "block text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-widest";

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
            >
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/10">
                    <Trophy size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Registration Received</h3>
                <p className="text-zinc-500 text-sm max-w-[240px] mx-auto leading-relaxed">
                    Your entry for the {track === 'design' ? 'UI/UX' : 'Development'} track has been logged. Check your email for details.
                </p>
                <button
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
                >
                    Register another team
                </button>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className={labelClass}>Full Name</label>
                    <div className="relative">
                        <User className="absolute left-4 top-3.5 text-zinc-600" size={16} />
                        <input
                            type="text" name="fullName" value={formData.fullName}
                            onChange={handleChange} required placeholder="John Doe"
                            className={`${inputClass} pl-12`}
                        />
                    </div>
                </div>
                <div>
                    <label className={labelClass}>Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-3.5 text-zinc-600" size={16} />
                        <input
                            type="email" name="email" value={formData.email}
                            onChange={handleChange} required placeholder="john@example.com"
                            className={`${inputClass} pl-12`}
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className={labelClass}>Phone Number</label>
                    <div className="relative">
                        <Phone className="absolute left-4 top-3.5 text-zinc-600" size={16} />
                        <input
                            type="tel" name="phone" value={formData.phone}
                            onChange={handleChange} required placeholder="+91 98765 43210"
                            className={`${inputClass} pl-12`}
                        />
                    </div>
                </div>
                <div>
                    <label className={labelClass}>Status</label>
                    <div className="relative">
                        <Briefcase className="absolute left-4 top-3.5 text-zinc-600" size={16} />
                        <select
                            name="Status" value={formData.Status}
                            onChange={handleChange} required
                            className={`${inputClass} pl-12 appearance-none`}
                        >
                            <option value="" className="bg-zinc-950">Select Status</option>
                            <option value="Student" className="bg-zinc-950">Student</option>
                            <option value="Working Professional" className="bg-zinc-950">Professional</option>
                            <option value="Freelancer" className="bg-zinc-950">Freelancer</option>
                            <option value="Other" className="bg-zinc-950">Other</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className={labelClass}>Institution</label>
                    <div className="relative">
                        <School className="absolute left-4 top-3.5 text-zinc-600" size={16} />
                        <input
                            type="text" name="institution" value={formData.institution}
                            onChange={handleChange} required placeholder="University / Company"
                            className={`${inputClass} pl-12`}
                        />
                    </div>
                </div>
                <div>
                    <label className={labelClass}>Course / Designation</label>
                    <div className="relative">
                        <BookOpen className="absolute left-4 top-3.5 text-zinc-600" size={16} />
                        <input
                            type="text" name="course" value={formData.course}
                            onChange={handleChange} placeholder="e.g. B.Tech CS / SDE"
                            className={`${inputClass} pl-12`}
                        />
                    </div>
                </div>
            </div>

            <div className={`grid grid-cols-1 ${track !== 'Masterclass' ? 'md:grid-cols-2' : ''} gap-6`}>
                <div className={track === 'Masterclass' ? 'col-span-full' : ''}>
                    <label className={labelClass}>Department</label>
                    <input
                        type="text" name="department" value={formData.department}
                        onChange={handleChange} placeholder="e.g. Engineering"
                        className={inputClass}
                    />
                </div>
                {track !== 'Masterclass' && (
                    <div>
                        <label className={labelClass}>Category</label>
                        <div className="relative">
                            <select
                                name="category" value={formData.category}
                                onChange={handleChange} required
                                className={`${inputClass} appearance-none`}
                            >
                                <option value="" className="bg-zinc-950">Select Category</option>
                                <option value="Web Development" className="bg-zinc-950">Web Development</option>
                                <option value="Design" className="bg-zinc-950">Product Design</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>

            <div>
                <label className={labelClass}>City</label>
                <div className="relative">
                    <MapPin className="absolute left-4 top-3.5 text-zinc-600" size={16} />
                    <input
                        type="text" name="city" value={formData.city}
                        onChange={handleChange} required placeholder="Your City"
                        className={`${inputClass} pl-12`}
                    />
                </div>
            </div>

            {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-medium">
                    {error}
                </div>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 group mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <span>{isSubmitting ? 'Processing...' : 'Initialize Registration'}</span>
                {!isSubmitting && <Send size={16} className="group-hover:translate-x-1 transition-transform" />}
            </button>
        </form>
    );
};

export default CompetitionForm;