import { supabase } from "../config/supabase.js";
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

    // DB insert using Supabase
    const { error: dbError } = await supabase
      .from('enquiries')
      .insert([
        {
          name,
          email,
          phone,
          dob,
          location,
          qualification,
          course,
          message
        }
      ]);

    if (dbError) throw dbError;


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
