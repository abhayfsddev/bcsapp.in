import React, { useState } from 'react';
import { contactInfo } from '../data/topicsData';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const sendEmail = async () => {
    try {
      // Use Node.js email API endpoint
      const response = await fetch('https://mail.bcsapp.in/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage('✓ Message sent successfully! I will get back to you soon.');
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => {
          setSuccessMessage('');
          setSubmitted(false);
        }, 5000);
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Email send error:', error);
      setErrorMessage('Failed to send message. Please try again or contact directly via email.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!validateForm()) {
      setErrorMessage('Please fill in all fields correctly.');
      return;
    }

    setLoading(true);
    await sendEmail();
  };

  return (
    <div className="main">
      <h1 style={{ fontFamily: "'Syne', system-ui", fontSize: '22px', fontWeight: '700', marginBottom: '6px' }}>
        Contact Me
      </h1>
      <p style={{ fontSize: '13px', color: 'var(--text2)', marginBottom: '16px' }}>
        Have a question? Reach out anytime.
      </p>
      <div className="contact-grid">
        <div className="contact-info">
          {contactInfo.map((item, idx) => (
            <div key={idx} className="contact-item">
              <div className="contact-icon" style={{ fontSize: '18px' }}>
                {item.ico}
              </div>
              <div>
                <div style={{ fontSize: '10px', color: 'var(--text2)' }}>{item.lbl}</div>
                <div style={{ fontSize: '12px', fontWeight: '500' }}>{item.val}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="form-card">
          <div style={{ fontSize: '15px', fontWeight: '600', marginBottom: '12px' }}>
            Send a Message
          </div>
          
          {successMessage && (
            <div style={{
              padding: '10px 12px',
              marginBottom: '12px',
              borderRadius: '6px',
              background: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid #22c55e',
              color: '#16a34a',
              fontSize: '12px',
              fontWeight: '500'
            }}>
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div style={{
              padding: '10px 12px',
              marginBottom: '12px',
              borderRadius: '6px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid #ef4444',
              color: '#dc2626',
              fontSize: '12px',
              fontWeight: '500'
            }}>
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">
                Full Name {errors.name && <span style={{ color: '#ef4444' }}>*</span>}
              </label>
              <input
                className="form-input"
                style={{
                  borderColor: errors.name ? '#ef4444' : undefined,
                  background: errors.name ? 'rgba(239, 68, 68, 0.05)' : undefined
                }}
                placeholder="Your name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              {errors.name && (
                <div style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px' }}>
                  {errors.name}
                </div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">
                Email {errors.email && <span style={{ color: '#ef4444' }}>*</span>}
              </label>
              <input
                className="form-input"
                style={{
                  borderColor: errors.email ? '#ef4444' : undefined,
                  background: errors.email ? 'rgba(239, 68, 68, 0.05)' : undefined
                }}
                type="email"
                placeholder="your@email.com"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && (
                <div style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px' }}>
                  {errors.email}
                </div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">
                Subject {errors.subject && <span style={{ color: '#ef4444' }}>*</span>}
              </label>
              <input
                className="form-input"
                style={{
                  borderColor: errors.subject ? '#ef4444' : undefined,
                  background: errors.subject ? 'rgba(239, 68, 68, 0.05)' : undefined
                }}
                placeholder="What's this about?"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
              />
              {errors.subject && (
                <div style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px' }}>
                  {errors.subject}
                </div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">
                Message {errors.message && <span style={{ color: '#ef4444' }}>*</span>}
              </label>
              <textarea
                className="form-input"
                style={{
                  borderColor: errors.message ? '#ef4444' : undefined,
                  background: errors.message ? 'rgba(239, 68, 68, 0.05)' : undefined
                }}
                placeholder="Your message (minimum 10 characters)"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
              ></textarea>
              {errors.message && (
                <div style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px' }}>
                  {errors.message}
                </div>
              )}
            </div>

            <button
              className="btn-p"
              type="submit"
              disabled={loading || submitted}
              style={{
                width: '100%',
                justifyContent: 'center',
                background: submitted
                  ? 'linear-gradient(135deg,#22c55e,#16a34a)'
                  : loading
                  ? 'linear-gradient(135deg,#94a3b8,#64748b)'
                  : 'linear-gradient(135deg,var(--brand),var(--brand-dark))',
                opacity: loading || submitted ? 0.8 : 1,
                cursor: loading || submitted ? 'not-allowed' : 'pointer'
              }}
            >
              {submitted ? '✓ Sent! I will get back to you.' : loading ? 'Sending...' : 'Send Message →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
