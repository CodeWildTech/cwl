import pool from "../config/db.js";
import sendEmail from "../utils/email.js";

/* =========================
   ENQUIRY FORM SUBMIT
========================= */
export const submitForm = async (req, res) => {
  try {
    console.log("Enquiry Form received:", req.body);

    const {
      name,
      email,
      phone,
      dob,
      location,
      qualification,
      course,
      message,
    } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }

    // DB insert
    await pool.query(
      `
        INSERT INTO enquiries
        (name, email, phone, dob, location, qualification, course, message)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      `,
      [
        name,
        email,
        phone,
        dob,
        location,
        qualification,
        course,
        message,
      ]
    );

    // 📩 Enquiry mail
    try {
      await sendEmail({
        type: "submit",
        name,
        email,
      });
    } catch (emailErr) {
      console.error("❌ Enquiry mail failed:", emailErr);
    }

    return res.status(201).json({
      message: "Enquiry submitted successfully",
    });
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json({
      error: "Server error",
    });
  }
};
