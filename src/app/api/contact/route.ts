import { NextResponse } from 'next/server';

// This is a simple contact form API handler that forwards submission data to your email
export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate the data
    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // In a production environment, we'd send the email here
    // For example, using a service like EmailJS, SendGrid, or Mailgun
    
    // For now, let's log the data and return a success response
    console.log('Contact form submission:', data);
    
    try {
      // Send data to FormSpree as a fallback
      const formspreeResponse = await fetch('https://formspree.io/f/mgelejpl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          _replyto: data.email,
          subject: data.subject,
          message: data.message
        })
      });
      
      console.log('FormSpree response:', formspreeResponse.status);
    } catch (formspreeError) {
      console.error('Error sending to FormSpree:', formspreeError);
      // We'll continue even if FormSpree fails
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { message: "Failed to process your request" },
      { status: 500 }
    );
  }
} 