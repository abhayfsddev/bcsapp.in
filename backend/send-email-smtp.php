<?php
/**
 * PHP Email API with SMTP (PHPMailer)
 * Handles email sending requests using PHPMailer library
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Load configuration
$config = require '.env.php';

// Load PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Validate required fields
if (!isset($input['name']) || !isset($input['email']) || !isset($input['message'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit;
}

// Sanitize input
$name = htmlspecialchars(strip_tags($input['name']));
$email = filter_var($input['email'], FILTER_SANITIZE_EMAIL);
$message = htmlspecialchars(strip_tags($input['message']));
$subject = isset($input['subject']) ? htmlspecialchars(strip_tags($input['subject'])) : 'Contact Form Submission';

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit;
}

try {
    $mail = new PHPMailer(true);

    // Server settings
    $mail->isSMTP();
    $mail->Host = $config['SMTP_HOST'] ?? 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = $config['SMTP_USERNAME'] ?? '';
    $mail->Password = $config['SMTP_PASSWORD'] ?? '';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = $config['SMTP_PORT'] ?? 587;

    // Recipients
    $mail->setFrom($config['EMAIL_FROM'] ?? 'noreply@fsmaster.in', 'BCS App');
    $mail->addAddress($config['EMAIL_TO'] ?? 'your-email@example.com');
    $mail->addReplyTo($email, $name);

    // Content
    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body = "
        <html>
        <head>
            <title>New Contact Form Submission</title>
        </head>
        <body style='font-family: Arial, sans-serif;'>
            <h2 style='color: #333;'>New Contact Form Submission</h2>
            <p><strong>Name:</strong> {$name}</p>
            <p><strong>Email:</strong> {$email}</p>
            <p><strong>Subject:</strong> {$subject}</p>
            <hr style='border: 1px solid #ddd;'>
            <h3 style='color: #333;'>Message:</h3>
            <p style='background: #f9f9f9; padding: 15px; border-radius: 5px;'>" . nl2br($message) . "</p>
        </body>
        </html>
    ";
    $mail->AltBody = strip_tags($message);

    $mail->send();

    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Email sent successfully'
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to send email',
        'error' => $mail->ErrorInfo
    ]);
}
