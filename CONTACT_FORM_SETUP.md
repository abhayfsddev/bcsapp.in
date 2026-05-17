# Contact Form - Validation & Email Setup

## ✅ What's Been Implemented

### 1. Frontend Form Validation (Contact.jsx)

The contact form now includes comprehensive validation for all fields:

- **Name**: Required, minimum 2 characters
- **Email**: Required, must be valid email format (regex validation)
- **Subject**: Required, minimum 3 characters  
- **Message**: Required, minimum 10 characters

### Features:
- ✅ Real-time error clearing when user starts typing
- ✅ Error messages displayed below each field with red styling
- ✅ Red border on invalid fields
- ✅ Overall error message at top if form validation fails
- ✅ Loading state while sending email
- ✅ Success/error messages displayed to user
- ✅ Form resets on successful submission
- ✅ Button disabled state during submission

## 📧 Email Sending Setup

### Quick Start (Choose One Option):

#### Option A: Using Gmail (Free, Easiest)
1. Go to https://myaccount.google.com/apppasswords
2. Generate an app password
3. Create a Node.js backend (see backend-sample/ folder)
4. Set environment variables in .env

#### Option B: Using SendGrid (Free tier available)
1. Sign up at https://sendgrid.com
2. Create API key
3. Use the provided emailRouter.js with SendGrid

#### Option C: Using Vercel (If deploying on Vercel)
1. Create `/api/send-email.js` in your project
2. Use Resend or SendGrid via Vercel serverless functions
3. See backend-sample/SETUP.md for details

## 🚀 Implementation Steps

### Step 1: Set Up Backend

Copy files from `backend-sample/` folder:
- `emailRouter.js` - Email handling logic
- `server.js` - Express server setup
- `SETUP.md` - Detailed configuration guide

### Step 2: Configure Environment Variables

Create a `.env` file in your backend:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
RECIPIENT_EMAIL=your-email@gmail.com
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
PORT=5000
```

### Step 3: Install Dependencies

In your backend directory:
```bash
npm install express cors body-parser nodemailer dotenv
```

### Step 4: Start Backend Server

```bash
node server.js
```

You should see: `Server running on http://localhost:5000`

### Step 5: Test the Form

1. Start your React dev server (vite)
2. Go to Contact page
3. Try submitting with invalid data - see validation errors
4. Fill in properly and submit - email will be sent!

## 🔧 Frontend Code Changes

The Contact component now handles:

```javascript
// Validation on submit
validateForm() // returns boolean

// Error state management
const [errors, setErrors] = useState({})

// Email sending
const sendEmail = async () // tries POST to /api/send-email

// User feedback
const [successMessage, setSuccessMessage]
const [errorMessage, setErrorMessage]
const [loading, setLoading]
```

## 📝 Email Templates

The backend sends 2 emails:
1. **Admin Notification** - Formatted message to your email
2. **User Confirmation** - Thank you message to the user

Both include:
- Sender's name and email
- Subject and message
- Timestamp
- Professional formatting

## 🔒 Security Considerations

- ✅ Email validation on both frontend and backend
- ✅ Field length validation prevents abuse
- ✅ Sanitized HTML in email templates
- ✅ Error messages don't expose sensitive info to users
- ✅ CORS enabled for your frontend domain only
- ✅ Environment variables protect credentials

## 🐛 Troubleshooting

### "Failed to send email"
- Check backend is running on port 5000
- Verify environment variables are set correctly
- Check email service credentials
- Check CORS settings match your frontend URL

### "Network error"
- Make sure backend server is running
- Check FRONTEND_URL in .env matches your dev server
- Check browser console for CORS errors

### Gmail App Password issues
- Must have 2FA enabled
- Go to https://myaccount.google.com/apppasswords
- Generate new password for "Mail" app on "Windows Computer"
- Use full 16-character password (no spaces)

## 📱 Responsive Design

Form validation errors are displayed:
- Below each field with red text
- Red border on the input field
- Summary message at top of form
- All styled to work on mobile/desktop

## ✨ Next Steps

1. Set up your backend (Node.js/Express)
2. Configure email service (Gmail or SendGrid)
3. Update environment variables
4. Test form submission
5. Deploy backend alongside frontend
6. Monitor emails to ensure they're being received

## 📞 Testing Email Setup

Use curl to test the backend:
```bash
curl -X POST http://localhost:5000/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "This is a test message with at least 10 characters"
  }'
```

Expected response:
```json
{"success": true, "message": "Email sent successfully"}
```
