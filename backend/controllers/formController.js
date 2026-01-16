import pool from "../config/db.js";
import sendEmail from "../utils/email.js";

export const submitForm = async (req, res) => {
  try {
    console.log("Form received:", req.body); // Log received data
    const { name, email, phone, dob, location, qualification, course, message } = req.body;

    // Basic validation
    if (!name || !email || !phone) {
       return res.status(400).json({ error: "Missing required fields" });
    }

    await pool.query(
      "INSERT INTO enquiries (name, email, phone, dob, location, qualification, course, message) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [name, email, phone, dob, location, qualification, course, message]
    );

    // Send email (async, don't wait if not critical for response speed, or wait if reliability is key)
    // catch email errors separately so they don't block success response
    try {
        await sendEmail(email, name);
    } catch (emailErr) {
        console.error("Email sending failed:", emailErr);
    }

    res.status(201).json({ message: "Form submitted successfully" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
