import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiUsers, FiArrowRight, FiMapPin } from 'react-icons/fi';
import { useContentItems } from '../hooks/useContentItems';

function plainText(content) {
  return String(content || '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}

function excerpt(content, limit = 160) {
  const text = plainText(content);
  return text.length > limit ? `${text.slice(0, limit)}...` : text;
}

const Volunteerinternship = () => {
  const { items } = useContentItems({
    page: 'Volunteerinternship',
    section: 'volunteer_opportunities',
    fallback: [],
  });

  const opportunities = items || [];

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

      {/* Open Opportunities */}
      {opportunities.length > 0 && (
        <OpportunitiesGrid>
          {opportunities.map((opp, index) => (
            <OpportunityCard key={opp.id || index} className={opp.tag === 'Internship' ? 'internship' : 'volunteer'}>
              <span className="opp-badge">{opp.tag || 'Volunteer'}</span>
              <h3>{opp.title}</h3>
              {opp.subtitle && (
                <div className="opp-meta">
                  <FiMapPin />
                  <span>{opp.subtitle}</span>
                </div>
              )}
              <p>{excerpt(opp.description)}</p>
              {opp.link_url ? (
                <a className="opp-apply" href={opp.link_url} target="_blank" rel="noopener noreferrer">
                  <span>Apply Now</span>
                  <FiArrowRight />
                </a>
              ) : (
                <Link className="opp-apply" to="/Contactus">
                  <span>Apply Now</span>
                  <FiArrowRight />
                </Link>
              )}
            </OpportunityCard>
          ))}
        </OpportunitiesGrid>
      )}

      {/* CTA Section */}
      <CTASection>
        <h2>Ready to Make a Difference?</h2>
        <p>
          Whether you&apos;re a student looking for an internship, a professional wanting to volunteer, or someone passionate about menstrual health, we&apos;d love to have you on board.
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

const OpportunitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-6);
  margin-bottom: var(--space-12);
`;

const OpportunityCard = styled.article`
  background: white;
  border-radius: var(--radius-2xl);
  padding: var(--space-6);
  border: 1px solid var(--color-dark-100);
  box-shadow: var(--shadow-soft);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  transition: all var(--transition-base);

  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-soft-lg);
  }

  .opp-badge {
    align-self: flex-start;
    padding: var(--space-1) var(--space-3);
    font-size: var(--text-xs);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-radius: var(--radius-full);
  }

  &.volunteer .opp-badge {
    background: var(--color-secondary-50);
    color: var(--color-secondary-700);
  }

  &.internship .opp-badge {
    background: var(--color-primary-50);
    color: var(--color-primary-700);
  }

  h3 {
    font-family: var(--font-heading);
    font-size: var(--text-lg);
    font-weight: 600;
    color: var(--color-dark-900);
    margin: 0;
  }

  .opp-meta {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    font-size: var(--text-sm);
    color: var(--color-dark-500);
  }

  p {
    font-size: var(--text-sm);
    color: var(--color-dark-600);
    line-height: 1.7;
    margin: 0;
    flex: 1;
  }

  .opp-apply {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    padding: var(--space-3) var(--space-5);
    background: var(--gradient-primary);
    color: white;
    font-weight: 600;
    font-size: var(--text-sm);
    border-radius: var(--radius-full);
    box-shadow: var(--shadow-md);
    transition: all var(--transition-base);
    text-decoration: none;
    align-self: flex-start;

    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);
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

