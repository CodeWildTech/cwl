import { supabase } from "../config/supabase.js";
import sendEmail from "../utils/email.js";

export const submitEventForm = async (req, res) => {
  try {
    const { name, email, phone, current_status } = req.body;

    if (!name || !email || !phone || !current_status) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const { error: dbError } = await supabase
      .from('event_registrations')
      .insert([
        { name, email, phone, current_status }
      ]);

    if (dbError) throw dbError;


    // ✅ Send Confirmation Email to User
    try {
      await sendEmail({ email, name });
    } catch (emailErr) {
      console.error("❌ User Event Confirmation Email failed:", emailErr.message);
    }

    // ✅ Send Notification Email to Admin
    try {
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
    } catch (adminEmailErr) {
      console.error("❌ Admin Event Notification Email failed:", adminEmailErr.message);
    }

    res.status(200).json({
      success: true,
      message: "Event contact submitted successfully",
    });
  } catch (error) {
    console.error("Event Form Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
