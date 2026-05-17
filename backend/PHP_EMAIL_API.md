# PHP Email API Setup Guide

This directory contains PHP API endpoints for handling email sending functionality.

## Files

- `send-email.php` - Basic email API using PHP's mail() function
- `send-email-smtp.php` - Email API using PHPMailer with SMTP (recommended)
- `.env.php` - Configuration file for email settings
- `composer.json` - Composer dependencies for PHPMailer

## Setup Instructions

### Option 1: Basic Email API (send-email.php)

1. Copy `.env.php` to `.env.local.php`
2. Update the email configuration:
   ```php
   'EMAIL_TO' => 'your-email@example.com',
   'EMAIL_FROM' => 'noreply@fsmaster.in',
   ```
3. Upload `send-email.php` to your PHP server
4. Test the endpoint

### Option 2: SMTP Email API (send-email-smtp.php) - Recommended

1. Install Composer if not already installed
2. Run `composer install` in the backend directory
3. Copy `.env.php` to `.env.local.php`
4. Update SMTP configuration:
   ```php
   'SMTP_HOST' => 'smtp.gmail.com',
   'SMTP_PORT' => '587',
   'SMTP_USERNAME' => 'your-email@gmail.com',
   'SMTP_PASSWORD' => 'your-app-password',
   ```
5. For Gmail, generate an App Password:
   - Go to Google Account settings
   - Enable 2-factor authentication
   - Generate App Password for mail
   - Use the 16-character App Password
6. Upload files to your PHP server

## API Usage

### Endpoint

```
POST /backend/send-email.php
POST /backend/send-email-smtp.php
```

### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Contact Form Submission",
  "message": "This is a test message"
}
```

### Response

Success:
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

Error:
```json
{
  "success": false,
  "message": "Error message"
}
```

## Example JavaScript/Fetch Call

```javascript
fetch('/backend/send-email-smtp.php', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Contact Form',
    message: 'Hello, this is a test message'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

## Server Requirements

- PHP 7.4 or higher
- For SMTP version: Composer and PHPMailer library
- SMTP server access (for send-email-smtp.php)
- Proper email server configuration (for send-email.php)

## Troubleshooting

### Email not sending with send-email.php
- Check PHP mail configuration in php.ini
- Verify sendmail is installed and configured
- Check server error logs

### Email not sending with send-email-smtp.php
- Verify SMTP credentials are correct
- Check if SMTP port is blocked by firewall
- For Gmail, ensure App Password is used (not regular password)
- Enable "Less secure app access" or use App Password

### CORS errors
- Update ALLOWED_ORIGINS in .env.php
- Ensure headers are properly set in PHP files

## Security Notes

- Never commit `.env.local.php` to version control
- Use environment variables for sensitive data
- Implement rate limiting for production use
- Validate and sanitize all input data
- Consider adding CAPTCHA for spam prevention
