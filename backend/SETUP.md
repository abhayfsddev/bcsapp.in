# Backend Configuration for Email Sending

## Option 1: Quick Setup with Environment Variables

Create a `.env` file in your backend directory:

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
RECIPIENT_EMAIL=your-email@gmail.com
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
PORT=5000
```

## Option 2: Gmail Setup (Recommended for testing)

1. Enable 2-Factor Authentication on your Google Account
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Use the generated password in `EMAIL_PASSWORD` in .env
4. Use your Gmail address in `EMAIL_USER`

## Option 3: SendGrid Setup (Recommended for production)

1. Sign up at https://sendgrid.com (free tier available)
2. Create an API key
3. Add to .env:
   ```
   SENDGRID_API_KEY=your-sendgrid-api-key
   SENDGRID_FROM_EMAIL=noreply@yourdomain.com
   ```

## Dependencies

Install required packages:

```bash
npm install express cors body-parser nodemailer dotenv
```

## Testing the Email Endpoint
## https://mail.bcsapp.in/api/send-email
## http://localhost:5000/api/send-email
Using cURL:
```bash
curl -X POST https://mail.bcsapp.in/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "This is a test message with at least 10 characters"
  }'
```

Using Postman:
1. Create POST request to `http://localhost:5000/api/send-email`
2. Set Body to JSON with above data
3. Click Send

## Deployment

### For Vercel (Recommended for React + Vercel deployment)

Create `api/send-email.js`:
```javascript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message } = req.body;

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.RECIPIENT_EMAIL,
      subject: `Contact: ${subject}`,
      html: `<p>From: ${name} (${email})</p><p>${message}</p>`
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
```

### For Heroku

1. Deploy your Node.js server to Heroku
2. Set environment variables in Heroku dashboard
3. Update FRONTEND_URL in .env to your deployed React app URL

### For Railway/Render

Similar to Heroku, set environment variables through their dashboard.
