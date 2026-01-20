import dotenv from "dotenv";
import nodemailer from "nodemailer";

// Load env vars
dotenv.config();

console.log("Testing Email configuration...");
console.log("User:", process.env.EMAIL_USER ? "Present" : "Missing");
console.log("Pass:", process.env.EMAIL_PASS ? "Present" : "Missing");

const transporter = nodemailer.createTransporter({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendTest = async () => {
    try {
        console.log("Attempting to send mail...");
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Send to self
            subject: "Test Email from Backend",
            text: "If you see this, nodemailer is working.",
        });
        console.log("Success! Message ID:", info.messageId);
    } catch (error) {
        console.error("FAILED to send:", error);
    }
};

sendTest();
