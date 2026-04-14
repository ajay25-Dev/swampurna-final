import React from 'react';
import styled from 'styled-components';
import { FiShield, FiLock, FiUsers, FiFileText, FiMail } from 'react-icons/fi';

const Privacypolicy = () => {
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
          Privacy <span className="title-accent">Policy</span>
        </h1>
        <p className="hero-description">
          Welcome to SWAMPURNA. This project is an initiative funded by the Department of Science and Technology (DST) - Cognitive Science Research Initiative (CSRI), implemented by Birla Institute of Technology, Mesra, Noida Campus
        </p>
        <p className="hero-description">
          By accessing our website, downloading the SWAMPURNA Android Application, or participating in our research initiatives, you agree to the following policies.
        </p>
      </HeroSection>

      {/* Privacy Policy Content */}
      <ContentSection>
        <PolicySection>
          <div className="section-header">
            <FiShield className="section-icon" />
            <h2>🔒 Privacy Policy</h2>
          </div>
          <p className="section-intro">
            We are committed to protecting the dignity and privacy of our users, especially given the sensitive nature of Menstrual Health and Hygiene (MHH). This policy explains how we handle your data.
          </p>
        </PolicySection>

        <PolicySection>
          <div className="section-header">
            <FiFileText className="section-icon" />
            <h3>1. Information We Collect</h3>
          </div>
          <p>To provide accurate cognitive mapping and health interventions, we collect the following types of data:</p>
          <ul>
            <li><strong>Personal Information:</strong> Name, Age, Education Level, and Location (State/District).</li>
            <li><strong>Sensitive Personal Data (Health & Cognition):</strong>
              <ul>
                <li>Menstrual cycle details (dates, symptoms, flow).</li>
                <li>Responses to the Psychometric Screening Tool (AKAB - Awareness, Knowledge, Attitude, Behavior).</li>
                <li>Mental well-being indicators (stress levels, mood).</li>
              </ul>
            </li>
            <li><strong>Device Information:</strong> IP address, device model, and operating system version for app optimization.</li>
            <li><strong>User-Generated Content:</strong> Stories, poems, reels, or images submitted for the SWAMPURNA National Creative Competition.</li>
          </ul>
        </PolicySection>

        <PolicySection>
          <div className="section-header">
            <FiUsers className="section-icon" />
            <h3>2. How We Use Your Data</h3>
          </div>
          <p>Your data is used strictly for Academic Research and Service Improvement:</p>
          <ul>
            <li><strong>Cognitive Assessment:</strong> To categorize users into cognitive levels (Level 1, 2, or 3) and recommend specific interventions (e.g., breathing exercises, yoga).</li>
            <li><strong>Resource Mapping:</strong> To locate and suggest the nearest government health centers or NGOs based on your location.</li>
            <li><strong>Research & Development:</strong> Anonymized data is analyzed to understand MHH trends across India and publish scientific papers. Your identity is never revealed in public reports.</li>
            <li><strong>Communication:</strong> To send follow-up notifications regarding health tips or research phases.</li>
          </ul>
        </PolicySection>

        <PolicySection>
          <div className="section-header">
            <FiLock className="section-icon" />
            <h3>3. Data Protection & Anonymity</h3>
          </div>
          <ul>
            <li><strong>Encryption:</strong> All data collected via the app is encrypted during transmission and storage.</li>
            <li><strong>Anonymization:</strong> For research analysis (e.g., by our partners at AIIMS or DST), all personal identifiers (names, phone numbers) are removed.</li>
            <li><strong>Private Settings:</strong> The app is designed with "Private Settings" to ensure sensitive discussions or logs remain confidential, protecting users in shared-device households.</li>
          </ul>
        </PolicySection>

        <PolicySection>
          <div className="section-header">
            <FiUsers className="section-icon" />
            <h3>4. Minors and Consent</h3>
          </div>
          <p>A significant portion of our target audience comprises adolescent girls (minors).</p>
          <ul>
            <li><strong>Parental/Guardian Consent:</strong> We adhere to ICMR National Ethical Guidelines. For participants under 18, we require informed consent from a parent or guardian and the assent (verbal/written agreement) of the minor.</li>
            <li><strong>School-Based Consent:</strong> For interventions in schools, permission is obtained from school authorities acting in loco parentis alongside guardian notification.</li>
          </ul>
        </PolicySection>

        <PolicySection>
          <div className="section-header">
            <FiShield className="section-icon" />
            <h3>5. Data Sharing</h3>
          </div>
          <p>We do not sell your data to third-party advertisers. Data is only shared with:</p>
          <ul>
            <li><strong>Core Research Team:</strong> Researchers at BIT Mesra and AIIMS.</li>
            <li><strong>Funding Body:</strong> Anonymized statistics reported to DST (Govt. of India).</li>
            <li><strong>Service Providers:</strong> Trusted tech partners (e.g., hosting services) bound by confidentiality agreements.</li>
          </ul>
        </PolicySection>

        <ContactSection>
          <div className="contact-header">
            <FiMail className="contact-icon" />
            <h3>Contact for Data Privacy Concerns</h3>
          </div>
          <p>If you have questions about how your data is handled or wish to request the deletion of your data, please contact:</p>
          <div className="contact-details">
            <p><strong>Dr. Suparna Dutta</strong> (Principal Investigator)</p>
            <p>BIT Mesra, Noida Campus</p>
            <p>A-7, Block A, Sector 1, Noida, Uttar Pradesh 201301</p>
            <p>Email: <a href="mailto:s.dutta@bitmesra.ac.in">s.dutta@bitmesra.ac.in</a></p>
          </div>
        </ContactSection>
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

const PolicySection = styled.div`
  background: white;
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--color-dark-100);

  .section-header {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    margin-bottom: var(--space-4);

    .section-icon {
      font-size: 1.5rem;
      color: var(--color-primary-600);
    }

    h2, h3 {
      font-family: var(--font-heading);
      font-size: var(--text-2xl);
      font-weight: 600;
      color: var(--color-dark-900);
      margin: 0;
    }

    h3 {
      font-size: var(--text-xl);
    }
  }

  .section-intro {
    font-size: var(--text-base);
    color: var(--color-dark-600);
    line-height: 1.8;
    margin-bottom: var(--space-4);
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

      ul {
        margin-top: var(--space-2);
        margin-left: var(--space-4);

        li::before {
          content: '◦';
        }
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

export default Privacypolicy;

