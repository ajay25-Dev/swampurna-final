import React from 'react';
import styled from 'styled-components';
import { FiHeart, FiTarget, FiUsers, FiTrendingUp } from 'react-icons/fi';
import Slider3 from '../assets/images/images1/Slider3.jpg';

const Joinmovement = () => {
  return (
    <PageWrapper>
      {/* Background Decoration */}
      <div className="bg-decoration">
        <div className="deco-circle circle-1"></div>
        <div className="deco-circle circle-2"></div>
      </div>

      {/* Hero Section with Image */}
      <HeroSection>
        <div className="hero-image-container">
          <img src={Slider3} alt="Join The SWAMPURNA Movement" />
        </div>
        <div className="hero-content">
          <span className="section-eyebrow">Support Us</span>
          <h1 className="hero-title">
            Join The <span className="title-accent">SWAMPURNA Movement</span>
          </h1>
          <p className="hero-description">
            The SWAMPURNA project is driven by a critical mission: to transform menstrual health from a source of stigma and fear into one of dignity and scientific understanding. While we are proudly funded by the Department of Science and Technology (DST) - Cognitive Science Research Initiative (CSRI), sustaining and scaling this innovative work requires a community of committed partners.
          </p>
          <p className="hero-description">
            Your support directly helps us bridge the digital and cognitive gaps for adolescent girls in India's most marginalized communities.
          </p>
        </div>
      </HeroSection>

      {/* Why Support Section */}
      <SupportSection>
        <h2 className="section-title">Why Your Support is Crucial</h2>
        <p className="section-intro">
          Our research has developed a powerful, scalable prototype: a mHealth solution integrated with rigorous psychometric screening and participatory communication. To move from a successful prototype to a sustainable, national movement, we need help in key areas:
        </p>

        <SupportAreasGrid>
          <SupportCard className="color-primary">
            <div className="icon-wrapper">
              <FiTrendingUp />
            </div>
            <h3>Scaling the App</h3>
            <p>Expanding the SWAMPURNA Android App to cover more regional languages and integrate more specialized mental health support modules.</p>
          </SupportCard>

          <SupportCard className="color-secondary">
            <div className="icon-wrapper">
              <FiUsers />
            </div>
            <h3>On-Ground Operations</h3>
            <p>Funding our Field Teams for continuous community engagement, running Self-Help Groups (SHGs), and conducting essential follow-up studies in remote areas.</p>
          </SupportCard>

          <SupportCard className="color-accent">
            <div className="icon-wrapper">
              <FiTarget />
            </div>
            <h3>Infrastructure & Product Access</h3>
            <p>Sponsoring the provision of basic hygiene infrastructure and affordable menstrual products in the most vulnerable locations where we work.</p>
          </SupportCard>

          <SupportCard className="color-primary">
            <div className="icon-wrapper">
              <FiHeart />
            </div>
            <h3>Research to Policy</h3>
            <p>Transforming our validated data into policy recommendations to ensure MHH is integrated into national social and educational structures.</p>
          </SupportCard>
        </SupportAreasGrid>
      </SupportSection>
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-8);
  margin-bottom: var(--space-12);
  align-items: center;

  .hero-image-container {
    border-radius: var(--radius-3xl);
    overflow: hidden;
    box-shadow: var(--shadow-soft-lg);
    border: 1px solid var(--color-dark-100);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  .hero-content {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
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
    width: fit-content;
    border: 1px solid var(--color-primary-100);
  }

  .hero-title {
    font-family: var(--font-heading);
    font-size: var(--text-4xl);
    font-weight: 600;
    color: var(--color-dark-900);
    line-height: 1.2;
  }

  .title-accent {
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-description {
    font-size: var(--text-base);
    color: var(--color-dark-500);
    line-height: 1.8;
  }

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;

    .hero-image-container {
      min-height: 300px;
    }
  }

  @media (max-width: 768px) {
    .hero-title {
      font-size: var(--text-3xl);
    }
  }
`;

const SupportSection = styled.section`
  margin-bottom: var(--space-12);

  .section-title {
    font-family: var(--font-heading);
    font-size: var(--text-3xl);
    font-weight: 600;
    color: var(--color-dark-900);
    text-align: center;
    margin-bottom: var(--space-5);
  }

  .section-intro {
    font-size: var(--text-lg);
    color: var(--color-dark-500);
    line-height: 1.8;
    text-align: center;
    max-width: 900px;
    margin: 0 auto var(--space-10);
  }
`;

const SupportAreasGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SupportCard = styled.div`
  background: white;
  border-radius: var(--radius-2xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--color-dark-100);
  transition: all var(--transition-base);

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-soft-lg);
  }

  .icon-wrapper {
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

  &.color-primary .icon-wrapper {
    background: var(--color-primary-100);
    color: var(--color-primary-600);
  }

  &.color-secondary .icon-wrapper {
    background: var(--color-secondary-100);
    color: var(--color-secondary-600);
  }

  &.color-accent .icon-wrapper {
    background: var(--color-accent-100);
    color: var(--color-accent-700);
  }

  h3 {
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    font-weight: 600;
    color: var(--color-dark-900);
    margin-bottom: var(--space-3);
  }

  p {
    font-size: var(--text-base);
    color: var(--color-dark-500);
    line-height: 1.7;
  }
`;

export default Joinmovement;



