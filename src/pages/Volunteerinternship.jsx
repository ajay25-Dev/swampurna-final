import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiUsers, FiArrowRight } from 'react-icons/fi';

const Volunteerinternship = () => {
  return (
    <PageWrapper>
      {/* Background Decoration */}
      <div className="bg-decoration">
        <div className="deco-circle circle-1"></div>
        <div className="deco-circle circle-2"></div>
      </div>

      {/* Hero Section */}
      <HeroSection>
        <div className="hero-icon">
          <FiUsers />
        </div>
        <span className="section-eyebrow">Support Us</span>
        <h1 className="hero-title">
          Volunteer & <span className="title-accent">Internship Opportunities</span>
        </h1>
        <p className="hero-description">
          Join our team and contribute your skills directly to the cause:
        </p>
      </HeroSection>

      {/* CTA Section */}
      <CTASection>
        <h2>Ready to Make a Difference?</h2>
        <p>
          Whether you're a student looking for an internship, a professional wanting to volunteer, or someone passionate about menstrual health, we'd love to have you on board.
        </p>
        <Link to="/Contactus" className="cta-button">
          <span>Get in Touch</span>
          <FiArrowRight />
        </Link>
      </CTASection>
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
  margin-bottom: var(--space-12);

  .hero-icon {
    width: 72px;
    height: 72px;
    border-radius: var(--radius-2xl);
    background: var(--gradient-primary);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    margin: 0 auto var(--space-5);
    box-shadow: var(--shadow-lg), var(--shadow-glow-primary);
  }

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
    max-width: 700px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    .hero-title {
      font-size: var(--text-4xl);
    }
  }
`;

const CTASection = styled.section`
  text-align: center;
  padding: var(--space-10);
  background: linear-gradient(135deg, var(--color-cream-100), var(--color-cream-200));
  border-radius: var(--radius-3xl);
  border: 1px solid var(--color-dark-100);

  h2 {
    font-family: var(--font-heading);
    font-size: var(--text-3xl);
    font-weight: 600;
    color: var(--color-dark-900);
    margin-bottom: var(--space-4);
  }

  p {
    font-size: var(--text-lg);
    color: var(--color-dark-500);
    line-height: 1.8;
    max-width: 600px;
    margin: 0 auto var(--space-6);
  }

  .cta-button {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-4) var(--space-8);
    background: var(--gradient-primary);
    color: white;
    font-weight: 600;
    font-size: var(--text-base);
    border-radius: var(--radius-full);
    box-shadow: var(--shadow-md), var(--shadow-glow-primary);
    transition: all var(--transition-base);
    text-decoration: none;
    border: none;
    cursor: pointer;

    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg), 0 12px 48px rgba(217, 118, 82, 0.35);
    }
  }
`;

export default Volunteerinternship;

