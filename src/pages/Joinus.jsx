import React from 'react';
import styled from 'styled-components';
import { FiHeart, FiUsers, FiDollarSign, FiGlobe, FiArrowRight, FiCheck } from 'react-icons/fi';
import image1 from '../assets/images/img29.png';
import image2 from '../assets/images/img30.png';
import image3 from '../assets/images/img31.png';
import image4 from '../assets/images/img32.png';

const Joinus = () => {
  const opportunities = [
    {
      icon: FiHeart,
      image: image1,
      title: 'Join as a Volunteer',
      subtitle: 'Why Volunteer with Us?',
      description: 'Volunteers are the heart of SWAMPURNA. By contributing your time, skills, and passion, you can help us create a meaningful impact in the lives of young girls and their communities.',
      benefits: [
        'Hands-on experience in community outreach',
        'Opportunity to make a real-world difference',
        'Personal and professional growth',
        'Be part of an inclusive team'
      ],
      steps: [
        'Fill out our online volunteer application',
        'Choose your area of interest',
        'Attend a brief orientation',
        'Start making a difference!'
      ],
      buttonText: 'Volunteer Now',
      color: 'primary'
    },
    {
      icon: FiUsers,
      image: image2,
      title: 'Partner with SWAMPURNA',
      subtitle: 'Collaboration is Key',
      description: 'We work with NGOs, educational institutions, healthcare providers, and corporate partners to build programs that benefit communities.',
      benefits: [
        'Educational partnerships for curriculum',
        'CSR initiatives for health and hygiene',
        'Research collaborations',
        'Sponsorships for community events'
      ],
      steps: [
        'Reach out via contact form or email',
        'Tell us about your organization',
        'Work with our team to co-create programs'
      ],
      buttonText: 'Become a Partner',
      color: 'secondary'
    },
    {
      icon: FiDollarSign,
      image: image3,
      title: 'Support Through Donations',
      subtitle: 'Your Contribution Matters',
      description: 'Financial support allows us to sustain and expand our programs. Your contribution, big or small, helps ensure adolescent girls have access to education and resources.',
      benefits: [
        'One-time donations',
        'Monthly recurring donations',
        'Sponsoring specific programs',
        'Hygiene kit distribution support'
      ],
      buttonText: 'Donate Today',
      color: 'accent'
    },
    {
      icon: FiGlobe,
      image: image4,
      title: 'Join Our Community',
      subtitle: 'Be Part of Something Larger',
      description: 'By joining our community, you\'re not only supporting a cause but becoming part of something larger. Share your voice and advocate for menstrual health.',
      benefits: [
        'Subscribe to our newsletter',
        'Follow us on social media',
        'Attend events and workshops',
        'Share your story or impact'
      ],
      buttonText: 'Subscribe for Updates',
      color: 'primary'
    },
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
        <span className="section-eyebrow">Get Involved</span>
        <h1 className="hero-title">
          Get <span className="title-accent">Involved</span>
        </h1>
        <p className="hero-description">
          Get in Touch with SWAMPURNA Whether you have questions about our programs, want to volunteer, or are interested in collaborating with us, we'd love to hear from you! Use any of the options below to reach us, and we'll get back to you as soon as possible.
        </p>
      </HeroSection>

      {/* Contact Info Section */}
      <ContactInfoSection>
        <h2>Contact Information</h2>
        <p>We're always here to help. You can also reach us directly via the contact details below.</p>
        <div className="contact-details">
          <div className="contact-detail">
            <strong>Phone:</strong> +918789894415
          </div>
          <div className="contact-detail">
            <strong>Email:</strong> bitn.dstprj@bitmesra.ac.in
          </div>
          <div className="contact-detail">
            <strong>Address:</strong> BIT Mesra, Noida Campus A-7, Sector 1, Noida, Uttar Pradesh 201301
          </div>
        </div>
      </ContactInfoSection>

      {/* Hero Section - Keep for backward compatibility */}
      <HeroSection style={{display: 'none'}}>
        <span className="section-eyebrow">Get Involved</span>
        <h1 className="hero-title">
          Become Part of <span className="title-accent">SWAMPURNA</span>
        </h1>
        <p className="hero-description">
          SWAMPURNA invites individuals, organizations, and communities to join our 
          mission of transforming menstrual health awareness. Together, we can make 
          a difference by empowering adolescent girls.
        </p>
      </HeroSection>

      {/* Opportunities Section */}
      <OpportunitiesSection>
        {opportunities.map((opp, index) => (
          <OpportunityCard key={index} className={index % 2 === 0 ? 'image-left' : 'image-right'}>
            <div className="image-container">
              <img src={opp.image} alt={opp.title} />
              <div className={`card-number color-${opp.color}`}>{String(index + 1).padStart(2, '0')}</div>
            </div>
            <div className="content-container">
              <div className={`icon-badge color-${opp.color}`}>
                <opp.icon />
              </div>
              <h2>{opp.title}</h2>
              <h3>{opp.subtitle}</h3>
              <p className="description">{opp.description}</p>
              
              <div className="benefits-list">
                {opp.benefits.map((benefit, i) => (
                  <div key={i} className={`benefit-item color-${opp.color}`}>
                    <FiCheck className="check-icon" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              {opp.steps && (
                <div className="steps-section">
                  <span className="steps-title">How to Get Started:</span>
                  <div className="steps-list">
                    {opp.steps.map((step, i) => (
                      <div key={i} className="step-item">
                        <span className={`step-number color-${opp.color}`}>{i + 1}</span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button className={`action-button color-${opp.color}`}>
                <span>{opp.buttonText}</span>
                <FiArrowRight />
              </button>
            </div>
          </OpportunityCard>
        ))}
      </OpportunitiesSection>
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

const OpportunitiesSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: var(--space-10);
`;

const OpportunityCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-8);
  background: white;
  border-radius: var(--radius-3xl);
  overflow: hidden;
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--color-dark-100);

  &.image-right {
    .image-container {
      order: 2;
    }
    .content-container {
      order: 1;
    }
  }

  .image-container {
    position: relative;
    min-height: 500px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .card-number {
      position: absolute;
      top: var(--space-6);
      right: var(--space-6);
      font-family: var(--font-heading);
      font-size: var(--text-5xl);
      font-weight: 700;
      opacity: 0.3;

      &.color-primary {
        color: white;
      }

      &.color-secondary {
        color: white;
      }

      &.color-accent {
        color: var(--color-dark-900);
      }
    }
  }

  .content-container {
    padding: var(--space-8);
    display: flex;
    flex-direction: column;
  }

  .icon-badge {
    width: 56px;
    height: 56px;
    border-radius: var(--radius-xl);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    margin-bottom: var(--space-4);

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

  h2 {
    font-family: var(--font-heading);
    font-size: var(--text-2xl);
    font-weight: 600;
    color: var(--color-dark-900);
    margin-bottom: var(--space-2);
  }

  h3 {
    font-size: var(--text-base);
    font-weight: 500;
    color: var(--color-dark-400);
    margin-bottom: var(--space-4);
  }

  .description {
    font-size: var(--text-base);
    color: var(--color-dark-500);
    line-height: 1.8;
    margin-bottom: var(--space-5);
  }

  .benefits-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    margin-bottom: var(--space-5);
  }

  .benefit-item {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    font-size: var(--text-sm);
    color: var(--color-dark-600);

    .check-icon {
      flex-shrink: 0;
    }

    &.color-primary .check-icon {
      color: var(--color-primary-500);
    }

    &.color-secondary .check-icon {
      color: var(--color-secondary-500);
    }

    &.color-accent .check-icon {
      color: var(--color-accent-600);
    }
  }

  .steps-section {
    background: var(--color-cream-100);
    border-radius: var(--radius-xl);
    padding: var(--space-4);
    margin-bottom: var(--space-5);
  }

  .steps-title {
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-dark-700);
    display: block;
    margin-bottom: var(--space-3);
  }

  .steps-list {
display: flex;
flex-direction: column;
    gap: var(--space-2);
  }

  .step-item {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    font-size: var(--text-sm);
    color: var(--color-dark-600);
  }

  .step-number {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--text-xs);
    font-weight: 600;
    flex-shrink: 0;

    &.color-primary {
      background: var(--color-primary-100);
      color: var(--color-primary-700);
    }

    &.color-secondary {
      background: var(--color-secondary-100);
      color: var(--color-secondary-700);
    }

    &.color-accent {
      background: var(--color-accent-100);
      color: var(--color-accent-700);
    }
  }

  .action-button {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-4) var(--space-6);
    font-weight: 600;
    font-size: var(--text-base);
    border-radius: var(--radius-full);
    width: fit-content;
    margin-top: auto;
    transition: all var(--transition-base);

    &.color-primary {
      background: var(--gradient-primary);
      color: white;
      box-shadow: var(--shadow-md), var(--shadow-glow-primary);
    }

    &.color-secondary {
      background: var(--gradient-secondary);
      color: white;
      box-shadow: var(--shadow-md), var(--shadow-glow-secondary);
    }

    &.color-accent {
      background: var(--gradient-accent);
      color: var(--color-dark-900);
      box-shadow: var(--shadow-md), var(--shadow-glow-accent);
    }

    &:hover {
      transform: translateY(-2px);
    }
  }

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;

    &.image-right {
      .image-container {
        order: 1;
      }
      .content-container {
        order: 2;
      }
    }

    .image-container {
      min-height: 300px;
    }
  }
`;

export default Joinus;
