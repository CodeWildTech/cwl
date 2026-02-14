import { supabase } from "../config/supabase.js";
import sendEmail from "../utils/email.js";

export const submitFooterContact = async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    if (!name || !phone || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const { error: dbError } = await supabase
      .from('footer_contacts')
      .insert([
        { name, phone, email, message }
      ]);

    if (dbError) throw dbError;


    // ✅ Send Confirmation Email to User
    try {
      await sendEmail({ email, name });
    } catch (emailErr) {
      console.error("❌ User Confirmation Email failed:", emailErr.message);
    }

    // ✅ Send Notification Email to Admin
    try {
      await sendEmail({
        isAdmin: true,
        subject: `📢 New Footer Contact: ${name}`,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
        `
      });
    } catch (adminEmailErr) {
      console.error("❌ Admin Notification Email failed:", adminEmailErr.message);
    }

    res.status(200).json({
      success: true,
      message: "Footer contact submitted successfully",
    });
  } catch (error) {
    console.error("Footer Contact Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
