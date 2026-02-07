import pool from "../config/db.js";
import sendEmail from "../utils/email.js";

export const submitEventForm = async (req, res) => {
  try {
    const { name, email, phone, current_status } = req.body;

    if (!name || !email || !phone || !current_status) {
      return res.status(400).json({ error: "All fields are required" });
    }

    await pool.query(
      `INSERT INTO event_registrations (name, email, phone, current_status)
       VALUES ($1, $2, $3, $4)`,
      [name, email, phone, current_status]
    );

    // ✅ Send Confirmation Email to User
    await sendEmail({ email, name });

    // ✅ Send Notification Email to Admin
    await sendEmail({
      isAdmin: true,
      subject: `🎉 New Event Registration: ${name}`,
      html: `
        <h3>New Event Registration</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Status:</strong> ${current_status}</p>
      `
    });

    res.status(200).json({
      success: true,
      message: "Event contact submitted successfully",
    });
  } catch (error) {
    console.error("Event Form Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
