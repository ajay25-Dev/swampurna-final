import React from 'react';
import styled from 'styled-components';
import { FiStar, FiSmartphone, FiLayers, FiShield, FiRefreshCw, FiUsers } from 'react-icons/fi';
import { useContentItems } from '../hooks/useContentItems';

const fallbackPartners = [
  {
    title: 'Creative Agency',
    subtitle: 'Technology & Design Partner',
    tag: 'primary',
    description:
      'Creative Agency is our trusted development partner, working closely with the SWAMPURNA team to bring our vision into reality. With strong expertise in mobile app development, UI/UX design, animation integration, and interactive learning experiences, Creative Agency helps us transform complex educational content into simple, engaging, and user-friendly digital solutions. Their experience with social impact projects and youth-focused digital platforms makes them a valuable contributor to the SWAMPURNA mission.',
  },
];

const Ourpartner = () => {
  const { items } = useContentItems({
    page: 'Ourpartner',
    section: 'partners',
    fallback: fallbackPartners,
  });

  const partners = items || [];

  const supportAreas = [
    {
      icon: FiSmartphone,
      title: 'Designing a smooth and accessible user experience',
      description: 'For all age groups',
      color: 'primary'
    },
    {
      icon: FiLayers,
      title: 'Integrating educational animations and interactive modules',
      description: 'Making learning engaging and effective',
      color: 'secondary'
    },
    {
      icon: FiShield,
      title: 'Ensuring technical quality, stability, and security',
      description: 'Of the application',
      color: 'accent'
    },
    {
      icon: FiRefreshCw,
      title: 'Supporting continuous improvements and updates',
      description: 'Throughout the project lifecycle',
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
        <span className="section-eyebrow">Our Partners</span>
        <h1 className="hero-title">
          <FiStar className="star-icon" />
          Our <span className="title-accent">Partners</span>
        </h1>
        <p className="hero-description">
          SWAMPURNA works hand in hand with trusted organizations who share our vision of accessible,
          stigma-free menstrual health education. Meet the partners helping us bring that vision to life.
        </p>
      </HeroSection>

      {/* Partners List */}
      {partners.map((partner, index) => (
        <PartnerSection key={partner.id || index}>
          <div className="partner-head">
            {partner.image_url && (
              <div className="partner-logo">
                <img src={partner.image_url} alt={partner.title} />
              </div>
            )}
            <div>
              <h2>{partner.title}</h2>
              {partner.subtitle && <span className={`partner-tag color-${partner.tag || 'primary'}`}>{partner.subtitle}</span>}
            </div>
          </div>
          <div className="partner-intro">
            <p>{partner.description}</p>
          </div>

          {index === 0 && (
            <SupportAreasGrid>
              {supportAreas.map((area, i) => (
                <SupportCard key={i} className={`color-${area.color}`}>
                  <div className={`icon-wrapper color-${area.color}`}>
                    <area.icon />
                  </div>
                  <h3>{area.title}</h3>
                  <p>{area.description}</p>
                </SupportCard>
              ))}
            </SupportAreasGrid>
          )}
        </PartnerSection>
      ))}
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

  .section-label {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    margin-bottom: var(--space-8);
  }

  .label-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--color-dark-200) 20%, var(--color-dark-200) 80%, transparent);
  }

  .label-text {
    font-size: var(--text-xs);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--color-secondary-600);
    padding: var(--space-2) var(--space-5);
    background: var(--color-secondary-50);
    border-radius: var(--radius-full);
    white-space: nowrap;
    border: 1px solid var(--color-secondary-100);
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
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-3);

    .star-icon {
      color: var(--color-accent-500);
      font-size: 2.5rem;
    }
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
    max-width: 700px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    .hero-title {
      font-size: var(--text-4xl);
    }
  }
`;

const PartnerSection = styled.section`
  background: white;
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--color-dark-100);
  margin-bottom: var(--space-8);

  .partner-head {
    display: flex;
    align-items: center;
    gap: var(--space-5);
    margin-bottom: var(--space-5);
  }

  .partner-logo {
    width: 72px;
    height: 72px;
    border-radius: var(--radius-xl);
    overflow: hidden;
    flex-shrink: 0;
    background: var(--color-dark-50);
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  h2 {
    font-family: var(--font-heading);
    font-size: var(--text-2xl);
    font-weight: 600;
    color: var(--color-dark-900);
    margin: 0 0 var(--space-2);
  }

  .partner-tag {
    display: inline-block;
    padding: var(--space-1) var(--space-3);
    font-size: var(--text-xs);
    font-weight: 600;
    border-radius: var(--radius-full);

    &.color-primary {
      background: var(--color-primary-50);
      color: var(--color-primary-700);
    }

    &.color-secondary {
      background: var(--color-secondary-50);
      color: var(--color-secondary-700);
    }

    &.color-accent {
      background: var(--color-accent-50);
      color: var(--color-accent-700);
    }
  }

  .partner-intro {
    margin-bottom: var(--space-6);

    p {
      font-size: var(--text-lg);
      color: var(--color-dark-700);
      line-height: 1.8;
      font-weight: 500;
    }
  }

  @media (max-width: 640px) {
    .partner-head {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;

const SupportAreasGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-5);
  margin-bottom: var(--space-8);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SupportCard = styled.div`
  background: white;
  border-radius: var(--radius-xl);
  padding: var(--space-5);
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--color-dark-100);
  border-left: 4px solid;
  transition: all var(--transition-base);

  &.color-primary {
    border-left-color: var(--color-primary-500);
  }

  &.color-secondary {
    border-left-color: var(--color-secondary-500);
  }

  &.color-accent {
    border-left-color: var(--color-accent-500);
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-soft-lg);
  }

  .icon-wrapper {
    width: 48px;
    height: 48px;
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    margin-bottom: var(--space-3);

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
    font-size: var(--text-base);
    font-weight: 600;
    color: var(--color-dark-900);
    margin-bottom: var(--space-2);
    line-height: 1.4;
  }

  p {
    font-size: var(--text-sm);
    color: var(--color-dark-600);
    line-height: 1.6;
    margin: 0;
  }
`;

export default Ourpartner;
