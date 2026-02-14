import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ email, name, subject, html, isAdmin = false }) => {
  try {
    const fromEmail = 'contact@codewildlearn.com'; // Verified domain
    const toEmail = isAdmin ? process.env.EMAIL_USER : email;

    const { data, error } = await resend.emails.send({
      from: `CodeWild <${fromEmail}>`,
      to: toEmail,
      subject: subject || "✅ Registration Successful – CodeWild",
      html: html || `
        <div style="font-family: Arial, Helvetica, sans-serif; background:#f5f5f5; padding:30px;">
          <div style="max-width:600px; margin:auto; background:#ffffff; padding:30px; border-radius:8px;">
            <h2 style="color:#ea580c; margin-bottom:10px;">Registration Successful 🎉</h2>
            <p style="font-size:15px; color:#333;">Hi <strong>${name}</strong>,</p>
            <p style="font-size:15px; color:#333; line-height:1.6;">
              Thank you for registering with <strong>CodeWild</strong>. We have successfully received your enquiry.
            </p>
            <p style="font-size:15px; color:#333; line-height:1.6;">
              Our team will review your details and contact you shortly with the next steps.
            </p>
            <div style="margin:30px 0; padding:15px; background:#fff7ed; border-left:4px solid #ea580c;">
              <p style="margin:0; font-size:14px; color:#555;">📌 If you have any questions, feel free to reply to this email.</p>
            </div>
            <p style="font-size:15px; color:#333;">Best regards,<br /><strong>CodeWild Team</strong></p>
            <hr style="margin:30px 0; border:none; border-top:1px solid #eee;" />
            <p style="font-size:12px; color:#777; text-align:center;">© ${new Date().getFullYear()} CodeWild. All rights reserved.</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("❌ Resend API Error:", error);
      throw error;
    }

    console.log(`✅ ${isAdmin ? 'Admin' : 'User'} Email sent successfully via Resend to:`, toEmail);
    return data;
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    throw error;
  }
};

export default sendEmail;
