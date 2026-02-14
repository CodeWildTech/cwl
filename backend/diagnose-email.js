import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

async function diagnoseEmail() {
    console.log("🔍 Starting Email Diagnosis...");
    console.log("Email User:", process.env.EMAIL_USER);
    console.log("Email Pass Length:", process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 0);

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        debug: true, // Enable debug output
        logger: true, // Log to console
    });

    try {
        console.log("⏳ Verifying transporter connection...");
        await transporter.verify();
        console.log("✅ Transporter is ready to take our messages");

        const mailOptions = {
            from: `"Diagnostic Test" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER, // Send to self
            subject: "🧪 Node.js Email Diagnostic Test",
            text: "If you are reading this, your email configuration is working!",
            html: "<b>If you are reading this, your email configuration is working!</b>",
        };

        console.log("⏳ Sending test email...");
        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent successfully!");
        console.log("Message ID:", info.messageId);
        console.log("Response:", info.response);
    } catch (error) {
        console.error("❌ Diagnosis Failed!");
        console.error("Error Message:", error.message);
        console.error("Error Code:", error.code);
        console.error("Error Command:", error.command);

        if (error.message.includes("Invalid login")) {
            console.log("\n💡 Potential Solution: Your Google App Password might be incorrect or revoked.");
            console.log("1. Go to https://myaccount.google.com/apppasswords");
            console.log("2. Generate a new App Password for 'Mail' and 'Other (Custom Name)'.");
            console.log("3. Update EMAIL_PASS in your .env file.");
        } else if (error.code === "ECONNREFUSED") {
            console.log("\n💡 Potential Solution: The connection was refused. This often happens if the port is blocked by a firewall or if the SMTP server is down.");
        }
    }
}

diagnoseEmail();
