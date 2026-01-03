const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { 
    type: String, 
    required: true, 
    trim: true, 
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  phone: { 
    type: String, 
    required: true,
    match: [/^\d{10}$/, 'Phone number must be 10 digits']
  },
  dob: { type: Date, required: true },
  location: { type: String, required: true, trim: true },
  qualification: { type: String, required: true, trim: true },
  course: { 
    type: String, 
    required: true,
    enum: ['web-development', 'data-science', 'mobile-development', 'ui-ux-design', 'digital-marketing']
  },
  doubts: { type: String, trim: true },
  enrollmentDate: { type: Date, default: Date.now },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'rejected'], 
    default: 'pending' 
  }
}, {
  timestamps: true
});

// Index for better query performance
studentSchema.index({ email: 1 });
studentSchema.index({ phone: 1 });
studentSchema.index({ enrollmentDate: -1 });

module.exports = mongoose.model('Student', studentSchema);
