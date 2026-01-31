import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import MailgunTransport from "mailgun-nodemailer-transport";
import { FormData } from "@/app/types/form";

type ResponseData = {
  success: boolean;
  message: string;
};

// Configure Mailgun transport
const mailgunOptions = {
  auth: {
    apiKey: process.env.MAILGUN_API_KEY || "",
    domain: process.env.MAILGUN_SANDBOX_DOMAIN || "",
  },
};

const transporter = nodemailer.createTransport(new MailgunTransport(mailgunOptions));

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  const { name, email, message } = req.body as FormData;

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Please fill in all fields",
    });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address",
    });
  }

  try {
    // Send email
    await transporter.sendMail({
      from: process.env.MAILGUN_SANDBOX_EMAIL,
      to: "bdwalsh075@gmail.com", // Your email address
      replyTo: email,
      subject: `Portfolio Contact Form: Message from ${name}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (error) {
    console.error("Email send error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again later.",
    });
  }
}
