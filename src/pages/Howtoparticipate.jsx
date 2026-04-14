import React from 'react';
import styled from 'styled-components';
import { FiUserPlus, FiUsers, FiCode, FiSend, FiArrowRight, FiCheck, FiCalendar } from 'react-icons/fi';

const Howtoparticipate = () => {
  const steps = [
    {
      number: '01',
      icon: FiUserPlus,
      title: 'Register',
      description: 'Create your account and register for the hackathon. It only takes a minute!',
      color: 'primary'
    },
    {
      number: '02',
      icon: FiUsers,
      title: 'Form a Team',
      description: 'Build a team of 2-4 members or join our team matching pool to find collaborators.',
      color: 'secondary'
    },
    {
      number: '03',
      icon: FiCode,
      title: 'Build Your Solution',
      description: 'Choose a track and start building during the 48-hour hackathon period.',
      color: 'accent'
    },
    {
      number: '04',
      icon: FiSend,
      title: 'Submit & Present',
      description: 'Submit your project and pitch it to our panel of expert judges.',
      color: 'primary'
    },
  ];

  const eligibility = [
    'Open to students, professionals, and enthusiasts from all backgrounds',
    'Participants must be 16 years or older',
    'Teams can have 2-4 members',
    'Individual participation is also allowed',
    'International participants welcome'
  ];

  const requirements = [
    'A working prototype or demo',
    'Source code on GitHub (public or private)',
    'A 3-minute video pitch',
    'Project documentation',
    'Slide deck presentation'
  ];

  return (
    <PageWrapper>
      {/* Background Decoration */}
      <div className="bg-decoration">
        <div className="deco-circle circle-1"></div>
        <div className="deco-circle circle-2"></div>
      </div>

      {/* Hero Section */}
      <HeroSection>
        <span className="section-eyebrow">Get Started</span>
        <h1 className="hero-title">
          How to <span className="title-accent">Participate</span>
        </h1>
        <p className="hero-description">
          Ready to innovate for menstrual health? Follow these simple steps to join 
          the SWAMPURNA Hackathon and start building solutions that matter.
        </p>
      </HeroSection>

      {/* Steps Section */}
      <StepsSection>
        {steps.map((step, index) => (
          <StepCard key={index} className={`color-${step.color}`}>
            <div className="step-number">{step.number}</div>
            <div className={`step-icon color-${step.color}`}>
              <step.icon />
            </div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
            {index < steps.length - 1 && <div className="connector"></div>}
          </StepCard>
        ))}
      </StepsSection>

      {/* Two Column Section */}
      <TwoColumnSection>
        <InfoCard>
          <h3>Eligibility Criteria</h3>
          <ul>
            {eligibility.map((item, index) => (
              <li key={index}>
                <FiCheck className="check-icon" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </InfoCard>

        <InfoCard className="secondary">
          <h3>Submission Requirements</h3>
          <ul>
            {requirements.map((item, index) => (
              <li key={index}>
                <FiCheck className="check-icon" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </InfoCard>
      </TwoColumnSection>

      {/* Important Dates */}
      <DatesCard>
        <h3>Important Dates</h3>
        <div className="dates-grid">
          <div className="date-item">
            <FiCalendar className="date-icon" />
            <div className="date-content">
              <span className="date-label">Registration Opens</span>
              <span className="date-value">October 15, 2024</span>
            </div>
          </div>
          <div className="date-item">
            <FiCalendar className="date-icon" />
            <div className="date-content">
              <span className="date-label">Registration Closes</span>
              <span className="date-value">November 8, 2024</span>
            </div>
          </div>
          <div className="date-item">
            <FiCalendar className="date-icon" />
            <div className="date-content">
              <span className="date-label">Hackathon Dates</span>
              <span className="date-value">Nov 10-12, 2024</span>
            </div>
          </div>
          <div className="date-item">
            <FiCalendar className="date-icon" />
            <div className="date-content">
              <span className="date-label">Results Announced</span>
              <span className="date-value">November 15, 2024</span>
            </div>
          </div>
        </div>
      </DatesCard>

      {/* CTA Section */}
      <CTASection>
        <h2>Ready to Make an Impact?</h2>
        <p>Join hundreds of innovators building solutions for menstrual health</p>
        <button className="cta-button">
          <span>Register Now</span>
          <FiArrowRight />
        </button>
      </CTASection>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  position: relative;
  padding: var(--space-8) var(--space-6) var(--space-16);
  overflow: hidden;
  min-height: 100vh;
  max-width: 1100px;
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
  margin-bottom: var(--space-12);

  .section-eyebrow {
    display: inline-block;
    padding: var(--space-2) var(--space-5);
    background: var(--color-secondary-50);
    color: var(--color-secondary-700);
    font-size: var(--text-xs);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    border-radius: var(--radius-full);
    margin-bottom: var(--space-5);
    border: 1px solid var(--color-secondary-100);
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
    background: var(--gradient-secondary);
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

const StepsSection = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-6);
  margin-bottom: var(--space-12);
  position: relative;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const StepCard = styled.div`
  background: white;
  border-radius: var(--radius-2xl);
  padding: var(--space-6);
  text-align: center;
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--color-dark-100);
  position: relative;
  transition: all var(--transition-base);

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-soft-lg);
  }

  .step-number {
    font-family: var(--font-heading);
    font-size: var(--text-4xl);
    font-weight: 700;
    color: var(--color-dark-100);
    margin-bottom: var(--space-3);
  }

  .step-icon {
    width: 56px;
    height: 56px;
    border-radius: var(--radius-xl);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    margin: 0 auto var(--space-4);

    &.color-primary {
      background: var(--color-primary-100);
      color: var(--color-primary-600);
    }

    &.color-secondary {
      background: var(--color-secondary-100);
      color: var(--color-secondary-600);
    }

    &.color-accent {
      background: var(--color-accent-100);
      color: var(--color-accent-700);
    }
  }

  h3 {
    font-family: var(--font-heading);
    font-size: var(--text-lg);
    font-weight: 600;
    color: var(--color-dark-900);
    margin-bottom: var(--space-2);
  }

  p {
    font-size: var(--text-sm);
    color: var(--color-dark-500);
    line-height: 1.6;
  }
`;

const TwoColumnSection = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);
  margin-bottom: var(--space-8);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InfoCard = styled.div`
  background: white;
  border-radius: var(--radius-2xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--color-dark-100);

  &.secondary {
    background: var(--color-secondary-50);
    border-color: var(--color-secondary-100);
  }

  h3 {
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    font-weight: 600;
    color: var(--color-dark-900);
    margin-bottom: var(--space-5);
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  li {
    display: flex;
    align-items: flex-start;
    gap: var(--space-3);
    font-size: var(--text-sm);
    color: var(--color-dark-600);
    line-height: 1.5;

    .check-icon {
      color: var(--color-secondary-500);
      flex-shrink: 0;
      margin-top: 2px;
    }
  }
`;

const DatesCard = styled.div`
  background: var(--gradient-dark);
  border-radius: var(--radius-2xl);
  padding: var(--space-6);
  margin-bottom: var(--space-8);
  color: white;

  h3 {
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    font-weight: 600;
    margin-bottom: var(--space-5);
  }

  .dates-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-4);

    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  }

  .date-item {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-4);
    background: rgba(255, 255, 255, 0.1);
    border-radius: var(--radius-lg);
  }

  .date-icon {
    font-size: 1.25rem;
    opacity: 0.7;
  }

  .date-content {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .date-label {
    font-size: var(--text-xs);
    opacity: 0.7;
  }

  .date-value {
    font-size: var(--text-sm);
    font-weight: 600;
  }
`;

const CTASection = styled.section`
  background: var(--gradient-primary);
  border-radius: var(--radius-3xl);
  padding: var(--space-10);
  text-align: center;

  h2 {
    font-family: var(--font-heading);
    font-size: var(--text-3xl);
    font-weight: 600;
    color: white;
    margin-bottom: var(--space-3);
  }

  p {
    font-size: var(--text-base);
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: var(--space-6);
  }

  .cta-button {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-4) var(--space-8);
    background: white;
    color: var(--color-primary-700);
    font-weight: 600;
    border-radius: var(--radius-full);
    box-shadow: var(--shadow-lg);
    transition: all var(--transition-base);

    &:hover {
      transform: translateY(-2px);
    }
  }
`;

export default Howtoparticipate;
