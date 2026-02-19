import { supabase } from "../config/supabase.js";
import sendEmail from "../utils/email.js";

/* =====================================
   COMPETITION / WEBINAR SUBMIT
   ===================================== */
export const submitCompetitionForm = async (req, res) => {
    try {
        console.log("Competition/Webinar Form received:", req.body);

        const {
            fullName,
            email,
            phone,
            Status,
            institution,
            course,
            department,
            category,
            track,
            city
        } = req.body;

        if (!fullName || !email || !phone || !track) {
            return res.status(400).json({
                error: "Missing required fields (Full Name, Email, Phone, or Track)",
            });
        }

        // DB insert using Supabase
        console.log("Inserting into Supabase 'competition_registrations' table...");
        const { data: dbData, error: dbError } = await supabase
            .from('competition_registrations')
            .insert([
                {
                    full_name: fullName,
                    email,
                    phone,
                    status: Status,
                    institution,
                    course,
                    department,
                    category,
                    track,
                    city
                }
            ])
            .select();

        if (dbError) {
            console.error("❌ Supabase Insertion Error:", dbError);
            throw dbError;
        }

        console.log("✅ Supabase Insertion Success:", dbData);

        // 📩 Confirmation mail to User
        try {
            await sendEmail({
                type: "submit", // Reusing "submit" type if it fits, otherwise customize email.js
                name: fullName,
                email,
            });
        } catch (emailErr) {
            console.error("❌ Confirmation mail failed:", emailErr);
        }

        // 📩 Notification mail to Admin
        try {
            await sendEmail({
                isAdmin: true,
                subject: `🎉 New Registration: ${track === 'Masterclass' ? 'Webinar' : 'Competition'} - ${fullName}`,
                html: `
            <h3>New ${track === 'Masterclass' ? 'Webinar' : 'Competition'} Registration</h3>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Track:</strong> ${track}</p>
            <p><strong>Category:</strong> ${category || 'N/A'}</p>
            <p><strong>Status:</strong> ${Status}</p>
            <p><strong>Institution:</strong> ${institution}</p>
            <p><strong>City:</strong> ${city}</p>
          `
            });
        } catch (adminEmailErr) {
            console.error("❌ Admin Notification Email failed:", adminEmailErr.message);
        }

        return res.status(201).json({
            success: true,
            message: "Registration submitted successfully",
        });
    } catch (err) {
        console.error("Database error:", err);
        return res.status(500).json({
            error: "Server error",
        });
    }
};
