import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import nodemailer from 'nodemailer';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(2, "Subject must be at least 2 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// Email destination - this is configured server-side for security
const CONTACT_EMAIL = "lucimast@gmail.com";

// Add static export configuration
export const dynamic = 'force-static';
export const revalidate = false;

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Validate the form data
    const result = contactFormSchema.safeParse(body);
    if (!result.success) {
      // Return validation errors
      return NextResponse.json(
        { success: false, message: "Invalid form data", errors: result.error.format() },
        { status: 400 }
      );
    }
    
    const { name, email, subject, message } = result.data;
    
    // Set up email transporter
    // Note: In production, you would use a proper email service
    // For development, this might require configuration
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER || "smtp.gmail.com",
      port: parseInt(process.env.EMAIL_PORT || "587"),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER || CONTACT_EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    
    // Email content
    const mailOptions = {
      from: `"Barelands Website" <${process.env.EMAIL_FROM || CONTACT_EMAIL}>`,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `[Contact Form] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <p><strong>From:</strong> ${name} (${email})</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 4px;">
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br/>')}</p>
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #777;">
            This email was sent from the Barelands Photography website contact form.
          </p>
        </div>
      `,
    };
    
    // Check if email service is configured
    if (!process.env.EMAIL_PASSWORD) {
      console.log('Email not configured. Would have sent:', mailOptions);
      return NextResponse.json(
        { 
          success: true, 
          message: "Your message was received (Note: Email delivery is simulated in development mode)"
        }
      );
    }
    
    // Send the email
    await transporter.sendMail(mailOptions);
    
    // Return success response
    return NextResponse.json({ 
      success: true, 
      message: "Your message has been sent successfully" 
    });
    
  } catch (error) {
    console.error('Error processing contact form:', error);
    
    return NextResponse.json(
      { success: false, message: "Failed to process your message" },
      { status: 500 }
    );
  }
} 