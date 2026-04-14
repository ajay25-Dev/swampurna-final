import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FiPhone, FiMail, FiMapPin, FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const Contactus = () => {
  const formRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init({
      publicKey: 'Vmg1ncOwkcXgjgKhc',
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus(null);

    // Use formRef.current or fallback to form selector
    const formElement = formRef.current || document.querySelector('#contact-form');
    
    if (!formElement) {
      console.error('Form element not found');
      setSubmitStatus('error');
      setIsLoading(false);
      return;
    }

    console.log('Sending form with EmailJS...');
    console.log('Form element:', formElement);
    console.log('Form data:', new FormData(formElement));

    emailjs.sendForm('service_ve5b4mi', 'template_gr58qjl', formElement, {
      publicKey: 'Vmg1ncOwkcXgjgKhc',
    }).then(
      (response) => {
        console.log('SUCCESS!', response.status, response.text);
        setSubmitStatus('success');
        if (formRef.current) {
          formRef.current.reset();
        }
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      },
      (error) => {
        console.error('FAILED...', error);
        console.error('Error details:', {
          text: error?.text,
          status: error?.status,
          message: error?.message,
          error: error
        });
        setSubmitStatus('error');
        
        // Clear error message after 5 seconds
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      },
    ).finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <PageWrapper>
      {/* Background Decoration */}
      <div className="bg-decoration">
        <div className="deco-circle circle-1"></div>
        <div className="deco-circle circle-2"></div>
      </div>

      {/* Hero Section */}
      <HeroSection>
        <span className="section-eyebrow">Get in Touch</span>
        <h1 className="hero-title">
          Get in Touch with <span className="title-accent">SWAMPURNA</span>
        </h1>
        <p className="hero-description">
          Whether you have questions about our programs, want to volunteer, or are 
          interested in collaborating with us, we'd love to hear from you! Use any 
          of the options below to reach us, and we'll get back to you as soon as possible.
        </p>
      </HeroSection>

      {/* Contact Section */}
      <ContactSection>
        {/* Contact Info Card */}
        <ContactInfoCard>
          <h2>Contact Information</h2>
          <p className="info-subtitle">
            We're always here to help. You can also reach us directly via the contact details below.
          </p>
          
          <div className="contact-items">
            <div className="contact-item">
              <div className="item-icon">
                <FiPhone />
              </div>
              <div className="item-content">
                <span className="item-label">Phone</span>
                <span className="item-value">+918789894415</span>
              </div>
            </div>

            <div className="contact-item">
              <div className="item-icon">
                <FiMail />
              </div>
              <div className="item-content">
                <span className="item-label">Email</span>
                <span className="item-value">bitn.dstprj@bitmesra.ac.in</span>
              </div>
            </div>

            <div className="contact-item">
              <div className="item-icon">
                <FiMapPin />
              </div>
              <div className="item-content">
                <span className="item-label">Address</span>
                <span className="item-value">BIT Mesra, Noida Campus A-7, Sector 1, Noida, Uttar Pradesh 201301</span>
              </div>
            </div>
          </div>

          <div className="social-section">
            <span className="social-label">Follow Us</span>
            <div className="social-icons">
              <a href="#" className="social-icon"><FaTwitter /></a>
              <a href="#" className="social-icon"><FaFacebookF /></a>
              <a href="#" className="social-icon"><FaInstagram /></a>
              <a href="#" className="social-icon"><FaLinkedinIn /></a>
            </div>
          </div>

          <div className="card-decoration"></div>
        </ContactInfoCard>

        {/* Contact Form */}
        <ContactFormCard>
          <h3>Send us a Message</h3>
          <form id="contact-form" ref={formRef} onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input 
                  id="firstName" 
                  name="firstName"
                  type="text" 
                  placeholder="Enter your first name" 
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input 
                  id="lastName" 
                  name="lastName"
                  type="text" 
                  placeholder="Enter your last name" 
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input 
                id="email" 
                name="email"
                type="email" 
                placeholder="Enter your email" 
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input 
                id="phone" 
                name="phone"
                type="tel" 
                placeholder="Enter your phone number" 
                required
              />
            </div>

            <div className="form-group">
              <label>Subject</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input id="subject-general" type="radio" name="subject" value="General Inquiry" required />
                  <span className="radio-custom"></span>
                  <span>General Inquiry</span>
                </label>
                <label className="radio-label">
                  <input id="subject-volunteer" type="radio" name="subject" value="Volunteer" />
                  <span className="radio-custom"></span>
                  <span>Volunteer</span>
                </label>
                <label className="radio-label">
                  <input id="subject-internship" type="radio" name="subject" value="Internship" />
                  <span className="radio-custom"></span>
                  <span>Internship</span>
                </label>
                <label className="radio-label">
                  <input id="subject-partnership" type="radio" name="subject" value="Partnership" />
                  <span className="radio-custom"></span>
                  <span>Partnership</span>
                </label>
                <label className="radio-label">
                  <input id="subject-donation" type="radio" name="subject" value="Donation" />
                  <span className="radio-custom"></span>
                  <span>Donation</span>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea 
                id="message" 
                name="message"
                placeholder="Write your message here..." 
                rows="4"
                required
              ></textarea>
            </div>

            {submitStatus === 'success' && (
              <SuccessMessage>
                <FiCheckCircle />
                <span>Message sent successfully! We'll get back to you soon.</span>
              </SuccessMessage>
            )}

            {submitStatus === 'error' && (
              <ErrorMessage>
                <FiAlertCircle />
                <span>Failed to send message. Please try again later.</span>
              </ErrorMessage>
            )}

            <button 
              type="submit" 
              className="submit-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <span>Sending...</span>
              ) : (
                <>
                  <span>Send Message</span>
                  <FiSend />
                </>
              )}
            </button>
          </form>
        </ContactFormCard>
      </ContactSection>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  position: relative;
  padding: var(--space-8) var(--space-6) var(--space-16);
  overflow: hidden;
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;

  .bg-decoration {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: -1;
  }

  .deco-circle {
    position: absolute;
    border-radius: 50%;
  }

  .circle-1 {
    width: 500px;
    height: 500px;
    top: -150px;
    right: -200px;
    background: radial-gradient(circle, rgba(217, 118, 82, 0.08) 0%, transparent 70%);
  }

  .circle-2 {
    width: 400px;
    height: 400px;
    bottom: 10%;
    left: -150px;
    background: radial-gradient(circle, rgba(90, 148, 112, 0.06) 0%, transparent 70%);
  }

  @media (max-width: 768px) {
    padding: var(--space-6) var(--space-4) var(--space-12);
  }
`;

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: var(--space-10);

  .section-eyebrow {
    display: inline-block;
    padding: var(--space-2) var(--space-5);
    background: var(--color-primary-50);
    color: var(--color-primary-700);
    font-size: var(--text-xs);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    border-radius: var(--radius-full);
    margin-bottom: var(--space-5);
    border: 1px solid var(--color-primary-100);
  }

  .hero-title {
    font-family: var(--font-heading);
    font-size: var(--text-5xl);
    font-weight: 600;
    color: var(--color-dark-900);
    margin-bottom: var(--space-5);
    line-height: 1.1;
  }

  .title-accent {
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-description {
    font-size: var(--text-lg);
    color: var(--color-dark-500);
    line-height: 1.8;
    max-width: 600px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    .hero-title {
      font-size: var(--text-4xl);
    }
  }
`;

const ContactSection = styled.section`
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: var(--space-6);
  background: white;
  border-radius: var(--radius-3xl);
  overflow: hidden;
  box-shadow: var(--shadow-soft-lg);
  border: 1px solid var(--color-dark-100);

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfoCard = styled.div`
  background: var(--gradient-dark);
  padding: var(--space-8);
  color: white;
  position: relative;
  overflow: hidden;

  h2 {
    font-family: var(--font-heading);
    font-size: var(--text-2xl);
    font-weight: 600;
    color: white;
    margin-bottom: var(--space-3);
  }

  .info-subtitle {
    font-size: var(--text-sm);
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.6;
    margin-bottom: var(--space-8);
  }

  .contact-items {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
    margin-bottom: var(--space-8);
  }

  .contact-item {
    display: flex;
    gap: var(--space-4);
    align-items: flex-start;
  }

  .item-icon {
    width: 44px;
    height: 44px;
    border-radius: var(--radius-lg);
    background: rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.125rem;
    flex-shrink: 0;
  }

  .item-content {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  .item-label {
    font-size: var(--text-xs);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    opacity: 0.6;
  }

  .item-value {
    font-size: var(--text-sm);
    line-height: 1.5;
  }

  .social-section {
    margin-top: auto;
  }

  .social-label {
    display: block;
    font-size: var(--text-xs);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    opacity: 0.6;
    margin-bottom: var(--space-3);
  }

  .social-icons {
    display: flex;
    gap: var(--space-3);
  }

  .social-icon {
    width: 40px;
    height: 40px;
    border-radius: var(--radius-lg);
    background: rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1rem;
    transition: all var(--transition-base);

    &:hover {
      background: var(--color-primary-500);
      transform: translateY(-2px);
    }
  }

  .card-decoration {
    position: absolute;
    bottom: -80px;
    right: -80px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: rgba(217, 118, 82, 0.15);
  }
`;

const ContactFormCard = styled.div`
  padding: var(--space-8);

  h3 {
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    font-weight: 600;
    color: var(--color-dark-900);
    margin-bottom: var(--space-6);
  }

  form {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-4);

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
    }
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  label {
    font-size: var(--text-sm);
    font-weight: 500;
    color: var(--color-dark-700);
  }

  input, textarea {
    padding: var(--space-3) var(--space-4);
    border: 1px solid var(--color-dark-200);
    border-radius: var(--radius-lg);
    font-size: var(--text-base);
    font-family: var(--font-body);
    transition: all var(--transition-base);
    background: white;

    &::placeholder {
      color: var(--color-dark-400);
    }

    &:focus {
      outline: none;
      border-color: var(--color-primary-400);
      box-shadow: 0 0 0 3px var(--color-primary-100);
    }
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }

  .radio-group {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-4);
  }

  .radio-label {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    cursor: pointer;
    font-size: var(--text-sm);
    color: var(--color-dark-600);

    input[type="radio"] {
      display: none;
    }

    .radio-custom {
      width: 18px;
      height: 18px;
      border: 2px solid var(--color-dark-300);
      border-radius: 50%;
      position: relative;
      transition: all var(--transition-base);

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--color-primary-500);
        transition: transform var(--transition-base);
      }
    }

    input[type="radio"]:checked + .radio-custom {
      border-color: var(--color-primary-500);

      &::after {
        transform: translate(-50%, -50%) scale(1);
      }
    }
  }

  .submit-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    padding: var(--space-4) var(--space-8);
    background: var(--gradient-primary);
    color: white;
    font-weight: 600;
    font-size: var(--text-base);
    border-radius: var(--radius-full);
    box-shadow: var(--shadow-md), var(--shadow-glow-primary);
    transition: all var(--transition-base);
    margin-top: var(--space-2);
    align-self: flex-start;

    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg), 0 12px 48px rgba(217, 118, 82, 0.35);
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }
`;

const SuccessMessage = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  background: var(--color-secondary-50);
  border: 1px solid var(--color-secondary-200);
  border-radius: var(--radius-lg);
  color: var(--color-secondary-700);
  font-size: var(--text-sm);
  margin-top: var(--space-2);

  svg {
    font-size: 1.25rem;
    color: var(--color-secondary-600);
    flex-shrink: 0;
  }
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: var(--radius-lg);
  color: #dc2626;
  font-size: var(--text-sm);
  margin-top: var(--space-2);

  svg {
    font-size: 1.25rem;
    color: #dc2626;
    flex-shrink: 0;
  }
`;

export default Contactus;
