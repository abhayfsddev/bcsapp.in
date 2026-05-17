/**
 * Email Backend API Handler
 * 
 * This file shows how to handle email sending in your backend.
 * 
 * SETUP OPTIONS:
 * 
 * Option 1: Using Node.js/Express with Nodemailer (Recommended)
 * ============================================================
 * 
 * 1. Install dependencies:
 *    npm install express nodemailer cors body-parser
 * 
 * 2. Create a server.js file with this code:
 * 
 * const express = require('express');
 * const nodemailer = require('nodemailer');
 * const cors = require('cors');
 * const bodyParser = require('body-parser');
 * 
 * const app = express();
 * app.use(cors());
 * app.use(bodyParser.json());
 * 
 * // Configure your email service (Gmail, SendGrid, etc.)
 * const transporter = nodemailer.createTransport({
 *   service: 'gmail',
 *   auth: {
 *     user: process.env.EMAIL_USER,      // Your email
 *     pass: process.env.EMAIL_PASSWORD   // Your app password
 *   }
 * });
 * 
 * app.post('/api/send-email', async (req, res) => {
 *   try {
 *     const { name, email, subject, message } = req.body;
 *     
 *     // Validate inputs
 *     if (!name || !email || !subject || !message) {
 *       return res.status(400).json({ error: 'Missing required fields' });
 *     }
 *     
 *     // Send email
 *     await transporter.sendMail({
 *       from: process.env.EMAIL_USER,
 *       to: process.env.RECIPIENT_EMAIL || 'abhay@example.com',
 *       subject: `New Contact: ${subject}`,
 *       html: `
 *         <h2>New Message from ${name}</h2>
 *         <p><strong>Email:</strong> ${email}</p>
 *         <p><strong>Subject:</strong> ${subject}</p>
 *         <p><strong>Message:</strong></p>
 *         <p>${message.replace(/\n/g, '<br>')}</p>
 *       `
 *     });
 *     
 *     // Send confirmation to user
 *     await transporter.sendMail({
 *       from: process.env.EMAIL_USER,
 *       to: email,
 *       subject: 'We received your message',
 *       html: `
 *         <p>Hello ${name},</p>
 *         <p>Thank you for reaching out. We have received your message and will get back to you soon.</p>
 *         <p>Best regards,<br>Abhay Kumar</p>
 *       `
 *     });
 *     
 *     res.json({ success: true, message: 'Email sent successfully' });
 *   } catch (error) {
 *     console.error('Email error:', error);
 *     res.status(500).json({ error: 'Failed to send email' });
 *   }
 * });
 * 
 * const PORT = process.env.PORT || 5000;
 * app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
 * 
 * 3. Create a .env file with:
 *    EMAIL_USER=your-email@gmail.com
 *    EMAIL_PASSWORD=your-app-password
 *    RECIPIENT_EMAIL=your-email@gmail.com
 * 
 * 4. For Gmail: Generate an App Password at https://myaccount.google.com/apppasswords
 * 
 * 
 * Option 2: Using SendGrid API (Simple & Free)
 * =============================================
 * 
 * 1. Sign up at https://sendgrid.com
 * 2. Get your API key
 * 3. Install: npm install @sendgrid/mail
 * 4. Create endpoint:
 * 
 * const sgMail = require('@sendgrid/mail');
 * sgMail.setApiKey(process.env.SENDGRID_API_KEY);
 * 
 * app.post('/api/send-email', async (req, res) => {
 *   try {
 *     const { name, email, subject, message } = req.body;
 *     
 *     await sgMail.send({
 *       to: 'your-email@example.com',
 *       from: process.env.SENDGRID_FROM_EMAIL,
 *       subject: `New Contact: ${subject}`,
 *       html: `<p>From: ${name} (${email})</p><p>${message}</p>`
 *     });
 *     
 *     res.json({ success: true });
 *   } catch (error) {
 *     res.status(500).json({ error: error.message });
 *   }
 * });
 * 
 * 
 * Option 3: Using Vercel Email Service (For Vercel deployment)
 * =============================================================
 * 
 * Create: api/send-email.js
 * 
 * import { Resend } from 'resend';
 * 
 * const resend = new Resend(process.env.RESEND_API_KEY);
 * 
 * export default async (req, res) => {
 *   if (req.method !== 'POST') return res.status(405);
 *   
 *   try {
 *     const { name, email, subject, message } = req.body;
 *     
 *     await resend.emails.send({
 *       from: 'onboarding@resend.dev',
 *       to: process.env.RECIPIENT_EMAIL,
 *       subject: `Contact: ${subject}`,
 *       html: `<p>From: ${name} (${email})</p><p>${message}</p>`
 *     });
 *     
 *     res.status(200).json({ success: true });
 *   } catch (error) {
 *     res.status(500).json({ error: error.message });
 *   }
 * };
 */
