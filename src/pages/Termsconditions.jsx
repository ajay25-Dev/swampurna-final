import React from 'react';
import styled from 'styled-components';
import { FiFileText, FiAlertTriangle, FiShield, FiCopy, FiBook, FiMail } from 'react-icons/fi';

const Termsconditions = () => {
  return (
    <PageWrapper>
      {/* Background Decoration */}
      <div className="bg-decoration">
        <div className="deco-circle circle-1"></div>
        <div className="deco-circle circle-2"></div>
      </div>

      {/* Hero Section */}
      <HeroSection>
        <span className="section-eyebrow">Legal & Compliance</span>
        <h1 className="hero-title">
          Terms & <span className="title-accent">Conditions</span>
        </h1>
        <p className="hero-description">
          Please read these terms carefully before using the SWAMPURNA website or application.
        </p>
      </HeroSection>

      {/* Terms Content */}
      <ContentSection>
        <TermsSection>
          <div className="section-header">
            <FiFileText className="section-icon" />
            <h3>1. Acceptance of Terms</h3>
          </div>
          <p>By using the SWAMPURNA App or Website, you agree to these Terms. If you do not agree, please do not use our services.</p>
        </TermsSection>

        <TermsSection className="important">
          <div className="section-header">
            <FiAlertTriangle className="section-icon" />
            <h3>2. Medical Disclaimer (Crucial)</h3>
          </div>
          <p><strong>SWAMPURNA is a Research and Educational Tool, NOT a Medical Device.</strong></p>
          <ul>
            <li>The content, including "Cycle Syncing," breathing techniques, and dietary advice, is for educational and cognitive support only.</li>
            <li>The Psychometric Screening Tool is for assessing awareness levels, not for clinical diagnosis of mental health disorders.</li>
            <li><strong>Always consult a qualified doctor or healthcare provider for medical advice, diagnosis, or treatment of menstrual irregularities or mental health issues.</strong></li>
          </ul>
        </TermsSection>

        <TermsSection>
          <div className="section-header">
            <FiShield className="section-icon" />
            <h3>3. User Responsibilities</h3>
          </div>
          <ul>
            <li><strong>Accuracy:</strong> You agree to provide accurate information regarding your age and health to ensure the app provides relevant interventions.</li>
            <li><strong>Conduct:</strong> You agree not to use the app or website to harass others, spread misinformation, or upload inappropriate content.</li>
          </ul>
        </TermsSection>

        <TermsSection>
          <div className="section-header">
            <FiCopy className="section-icon" />
            <h3>4. Intellectual Property</h3>
          </div>
          <ul>
            <li>All content, including the SWAMPURNA logo, the Psychometric Tool, game designs, comic strips, and educational materials, is the intellectual property of the Principal Investigator (Dr. Suparna Dutta) and BIT Mesra.</li>
            <li>You may not copy, modify, or distribute our proprietary tools without written permission.</li>
          </ul>
        </TermsSection>

        <TermsSection>
          <div className="section-header">
            <FiFileText className="section-icon" />
            <h3>5. User-Generated Content (Creative Competition)</h3>
          </div>
          <p>By submitting entries (stories, art, videos) to the SWAMPURNA Competition:</p>
          <ul>
            <li>You grant us a non-exclusive, royalty-free license to use, reproduce, and display your work for research publications, awareness campaigns, and anthologies.</li>
            <li>You confirm that the work is your original creation.</li>
          </ul>
        </TermsSection>

        <TermsSection>
          <div className="section-header">
            <FiShield className="section-icon" />
            <h3>6. Limitation of Liability</h3>
          </div>
          <p>The SWAMPURNA project team, BIT Mesra, and DST shall not be liable for any direct, indirect, or consequential damages arising from the use or inability to use the app, including any reliance placed on educational materials provided therein.</p>
        </TermsSection>

        <TermsSection>
          <div className="section-header">
            <FiBook className="section-icon" />
            <h3>7. Governing Law</h3>
          </div>
          <p>These terms are governed by the laws of India. Any disputes are subject to the exclusive jurisdiction of the courts in Noida/Delhi.</p>
          <p style={{ marginTop: 'var(--space-4)' }}>
            <strong>Contact for Data Privacy Concerns:</strong> If you have questions about how your data is handled or wish to request the deletion of your data, please contact:
          </p>
          <ContactDetailsInline>
            <p><strong>Dr. Suparna Dutta</strong> (Principal Investigator)</p>
            <p>BIT Mesra, Noida Campus</p>
            <p>A-7, Block A, Sector 1, Noida, Uttar Pradesh 201301</p>
            <p>Email: <a href="mailto:s.dutta@bitmesra.ac.in">s.dutta@bitmesra.ac.in</a></p>
          </ContactDetailsInline>
        </TermsSection>
      </ContentSection>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  position: relative;
  padding: var(--space-8) var(--space-6) var(--space-16);
  overflow: hidden;
  min-height: 100vh;
  max-width: 900px;
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
    bottom: 20%;
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
    font-size: var(--text-base);
    color: var(--color-dark-600);
    line-height: 1.8;
    max-width: 800px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    .hero-title {
      font-size: var(--text-4xl);
    }
  }
`;

const ContentSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
`;

const TermsSection = styled.div`
  background: white;
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--color-dark-100);

  &.important {
    border-left: 4px solid var(--color-accent-500);
    background: var(--color-accent-50);
  }

  .section-header {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    margin-bottom: var(--space-4);

    .section-icon {
      font-size: 1.5rem;
      color: var(--color-primary-600);
    }

    h3 {
      font-family: var(--font-heading);
      font-size: var(--text-xl);
      font-weight: 600;
      color: var(--color-dark-900);
      margin: 0;
    }
  }

  p {
    font-size: var(--text-base);
    color: var(--color-dark-600);
    line-height: 1.8;
    margin-bottom: var(--space-3);
  }

  ul {
    list-style: none;
    padding: 0;
    margin: var(--space-4) 0;

    li {
      font-size: var(--text-base);
      color: var(--color-dark-600);
      line-height: 1.8;
      margin-bottom: var(--space-3);
      padding-left: var(--space-5);
      position: relative;

      &::before {
        content: '•';
        position: absolute;
        left: 0;
        color: var(--color-primary-500);
        font-weight: bold;
        font-size: 1.2rem;
      }
    }
  }
`;

const ContactSection = styled.div`
  background: var(--gradient-primary);
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
  color: white;
  margin-top: var(--space-4);

  .contact-header {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    margin-bottom: var(--space-4);

    .contact-icon {
      font-size: 1.5rem;
    }

    h3 {
      font-family: var(--font-heading);
      font-size: var(--text-xl);
      font-weight: 600;
      margin: 0;
    }
  }

  p {
    font-size: var(--text-base);
    line-height: 1.8;
    margin-bottom: var(--space-3);
    opacity: 0.95;
  }

  .contact-details {
    margin-top: var(--space-4);

    p {
      margin-bottom: var(--space-2);

      a {
        color: white;
        text-decoration: underline;
        font-weight: 600;
      }
    }
  }
`;

const ContactDetailsInline = styled.div`
  margin-top: var(--space-4);
  padding: var(--space-4);
  background: var(--color-cream-100);
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-dark-100);

  p {
    font-size: var(--text-base);
    color: var(--color-dark-600);
    line-height: 1.8;
    margin-bottom: var(--space-2);

    a {
      color: var(--color-primary-600);
      text-decoration: underline;
      font-weight: 600;
    }
  }
`;

export default Termsconditions;

