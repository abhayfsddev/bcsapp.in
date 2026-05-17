/**
 * Sample Backend Handler for Contact Form Email
 * 
 * Place this in your backend server (e.g., routes/email.js or api/send-email.js)
 * This example uses Express.js and Nodemailer
 */

const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Configure your email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD // Use app-specific password for Gmail
  }
});

// Validation helper
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateForm = (data) => {
  const errors = {};
  
  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }
  
  if (!validateEmail(data.email)) {
    errors.email = 'Invalid email address';
  }
  
  if (!data.subject || data.subject.trim().length < 3) {
    errors.subject = 'Subject must be at least 3 characters';
  }
  
  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }
  
  return errors;
};

// Send email endpoint
router.post('/send-email', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Validate form data
    const errors = validateForm({ name, email, subject, message });
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ success: false, errors });
    }
    
    // Email to admin
    const adminEmail = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL || 'abhay@example.com',
      subject: `New Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>New Message from Contact Form</h2>
          <hr style="border: none; border-top: 1px solid #e0e0e0;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border: none; border-top: 1px solid #e0e0e0;">
          <h3>Message:</h3>
          <p style="white-space: pre-wrap; line-height: 1.6;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
          <hr style="border: none; border-top: 1px solid #e0e0e0;">
          <p style="color: #888; font-size: 12px;">Received at: ${new Date().toLocaleString()}</p>
        </div>
      `
    };
    
    // Confirmation email to user
    const userEmail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'We received your message - FsMaster.in',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Thank You for Contacting Us!</h2>
          <p>Hello ${name},</p>
          <p>We have received your message and appreciate you reaching out. Our team will review your inquiry and get back to you as soon as possible.</p>
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
          <h3>Your Message Summary:</h3>
          <p><strong>Subject:</strong> ${subject}</p>
          <p style="white-space: pre-wrap; line-height: 1.6; color: #666;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
          <p>Best regards,<br><strong>Abhay Kumar</strong><br>FsMaster.in Team</p>
          <p style="color: #888; font-size: 12px; margin-top: 20px;">This is an automated response. Please do not reply to this email.</p>
        </div>
      `
    };
    
    // Send both emails
    await Promise.all([
      transporter.sendMail(adminEmail),
      transporter.sendMail(userEmail)
    ]);
    
    return res.status(200).json({ 
      success: true, 
      message: 'Your message has been sent successfully!' 
    });
    
  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to send email. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
