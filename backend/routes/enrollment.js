const express = require('express');
const Student = require('../models/Student');
const { validateEnrollment } = require('../middleware/validation');
const router = express.Router();

// Rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per IP
  message: 'Too many enrollment attempts, please try again later'
});

// POST /api/enroll - Student enrollment
router.post('/enroll', limiter, validateEnrollment, async (req, res) => {
  try {
    // Check if student already exists
    const existingStudent = await Student.findOne({
      $or: [{ email: req.body.email }, { phone: req.body.phone }]
    });

    if (existingStudent) {
      return res.status(409).json({
        success: false,
        message: 'Student with this email or phone already enrolled'
      });
    }

    // Create new student
    const student = new Student(req.body);
    await student.save();

    res.status(201).json({
      success: true,
      message: 'Enrollment successful! We will contact you soon.',
      data: {
        id: student._id,
        name: student.name,
        email: student.email,
        course: student.course,
        status: student.status
      }
    });
  } catch (error) {
    console.error('Enrollment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during enrollment'
    });
  }
});

// GET /api/enroll/stats - Admin dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const stats = await Student.aggregate([
      {
        $group: {
          _id: '$course',
          count: { $sum: 1 },
          pending: {
            $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
          }
        }
      }
    ]);

    res.json({
      success: true,
      totalEnrollments: await Student.countDocuments(),
      stats
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
