import React, { useState } from "react";
import EnrollmentForm from "./enrollmentForm";

const EnrollmentContainer = () => {
  const [isOpen, setIsOpen] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    location: "",
    qualification: "",
    course: "",
    doubts: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const [progress, setProgress] = useState(0);

  // ✅ INPUT CHANGE
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // simple progress calculation
    const currentData = { ...formData, [name]: value };
    const requiredFields = ['name', 'email', 'phone', 'dob', 'location', 'qualification', 'course'];
    const filledRequired = requiredFields.filter(field => currentData[field] && currentData[field].trim() !== "").length;

    // Calculate progress based on required fields (7 fields)
    setProgress(Math.min((filledRequired / 7) * 100, 100));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (formData.phone.length < 10) newErrors.phone = "Phone must be at least 10 digits";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.qualification.trim()) newErrors.qualification = "Qualification is required";
    if (!formData.course) newErrors.course = "Please select a course";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ SUBMIT → BACKEND
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setErrors(prev => ({ ...prev, general: "Please fill all required fields" }));
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      const response = await fetch(
        "http://localhost:8000/api/forms/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setSubmitStatus("success");

      // Close modal after success (optional, based on previous behavior)
      setTimeout(() => {
        setIsOpen(false);
        setSubmitStatus("");
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          dob: "",
          location: "",
          qualification: "",
          course: "",
          doubts: "",
        });
        setProgress(0);
      }, 2000);

    } catch (error) {
      console.error("Submission Error:", error);
      setSubmitStatus("error");
      setErrors(prev => ({ ...prev, general: "Something went wrong. Try again." }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <EnrollmentForm
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      formData={formData}
      onInputChange={handleInputChange}
      onSubmit={handleSubmit}
      progress={progress}
      errors={errors}
      submitStatus={submitStatus}
      isSubmitting={isSubmitting}
    />
  );
};

export default EnrollmentContainer;
