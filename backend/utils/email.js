import nodemailer from "nodemailer";

const sendEmail = async (to, name) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "Registration Successful",
    text: `Hi ${name}, your form was submitted successfully.`,
  });
};

export default sendEmail;
