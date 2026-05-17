<?php
/**
 * PHP Email Configuration
 * Copy this file to .env.local.php and update with your actual values
 */

return [
    // Email Configuration
    'EMAIL_TO' => 'bcsopc@gmail.com',
    'EMAIL_FROM' => 'noreply@bcsapp.in',
    
    // SMTP Configuration (for send-email-smtp.php)
    'SMTP_HOST' => 'smtp.gmail.com',
    'SMTP_PORT' => '587',
    'SMTP_USERNAME' => 'bcsopc@gmail.com',
    'SMTP_PASSWORD' => 'dbst ykbp ieau epjg',
    
    // Security
    'ALLOWED_ORIGINS' => 'http://localhost:5173,https://bcsapp.in',
];
