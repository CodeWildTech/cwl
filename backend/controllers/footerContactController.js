import pool from "../config/db.js";

export const submitFooterContact = async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    if (!name || !phone || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    await pool.query(
      `INSERT INTO footer_contacts (name, phone, email, message)
       VALUES ($1, $2, $3, $4)`,
      [name, phone, email, message]
    );

    res.status(200).json({
      success: true,
      message: "Footer contact submitted successfully",
    });
  } catch (error) {
    console.error("Footer Contact Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
