const Joi = require('joi');

const enrollmentSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^\d{10}$/).required(),
  dob: Joi.date().iso().max('now').required(),
  location: Joi.string().min(2).max(100).required(),
  qualification: Joi.string().min(2).max(100).required(),
  course: Joi.string().valid('web-development', 'data-science', 'mobile-development', 'ui-ux-design', 'digital-marketing').required(),
  doubts: Joi.string().max(500).allow('')
});

const validateEnrollment = (req, res, next) => {
  const { error } = enrollmentSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }
  next();
};

module.exports = { validateEnrollment };
