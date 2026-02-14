import nodemailer from "nodemailer";

const sendEmail = async ({ email, name, subject, html, isAdmin = false }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      connectionTimeout: 10000,
    });

    const mailOptions = {
      from: `"CodeWild Team" <${process.env.EMAIL_USER}>`,
      to: isAdmin ? process.env.EMAIL_USER : email,
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
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ ${isAdmin ? 'Admin' : 'User'} Email sent successfully to:`, isAdmin ? process.env.EMAIL_USER : email);
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    throw error;
  }
};

export default sendEmail;
