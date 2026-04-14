import React from 'react';
import styled from 'styled-components';
import { FiAward, FiZap, FiTrendingUp, FiMapPin, FiUsers } from 'react-icons/fi';

const Whoweare = () => {
  return (
    <PageWrapper>
      {/* Background Decoration */}
      <div className="bg-decoration">
        <div className="deco-circle circle-1"></div>
        <div className="deco-circle circle-2"></div>
      </div>

      {/* Hero Section */}
      <HeroSection>
        <span className="section-eyebrow">About Us</span>
        <h1 className="hero-title">
          Who <span className="title-accent">We Are</span>
        </h1>
        <p className="hero-description">
          Learn about BIT Mesra's rich heritage and the Noida Campus that hosts the SWAMPURNA project.
        </p>
      </HeroSection>

      {/* Main Content */}
      <ContentSection>
        <AboutSection>
          <div className="section-header">
            <FiAward className="section-icon" />
            <h2>BIT Mesra: A Legacy of Excellence</h2>
          </div>
          <p>
            Founded in 1955 as STEM institute by the visionary industrialist Mr. B M Birla, BIT Mesra was established with a philanthropic mission and a clear vision to provide young minds with a platform where their imagination could soar, and their ideas could come to life. For over six decades, the institute has fostered a rich heritage of academic excellence, developing innovative learning frameworks that have consistently been ahead of their time.
          </p>
          <p>
            As a beacon of excellence in India's higher education landscape, BIT Mesra has boldly pioneered numerous ground breaking initiatives which includes:
          </p>
          <MilestonesList>
            <MilestoneItem>
              <FiZap className="milestone-icon" />
              <div className="milestone-content">
                <h4>Establishing India's first Department of Space Engineering & Rocketry</h4>
                <p>Pioneered in 1964, setting the foundation for India's space program</p>
              </div>
            </MilestoneItem>
            <MilestoneItem>
              <FiZap className="milestone-icon" />
              <div className="milestone-content">
                <h4>Creating the first static rocket test firing facility</h4>
                <p>A landmark achievement in India's aerospace engineering capabilities</p>
              </div>
            </MilestoneItem>
            <MilestoneItem>
              <FiTrendingUp className="milestone-icon" />
              <div className="milestone-content">
                <h4>Offering the first postgraduate program in collaboration with ISRO</h4>
                <p>Forging strong industry-academia partnerships for advanced research</p>
              </div>
            </MilestoneItem>
            <MilestoneItem>
              <FiTrendingUp className="milestone-icon" />
              <div className="milestone-content">
                <h4>Pioneering the concept of Science & Technology Entrepreneurs Park (BIT-STEP)</h4>
                <p>Long before it became a national model, BIT Mesra led the way in entrepreneurial education</p>
              </div>
            </MilestoneItem>
            <MilestoneItem>
              <FiAward className="milestone-icon" />
              <div className="milestone-content">
                <h4>Becoming the first institution to be granted autonomous status</h4>
                <p>In 1972 under the UGC Act, recognizing its academic excellence and innovation</p>
              </div>
            </MilestoneItem>
          </MilestonesList>
        </AboutSection>

        <CampusSection>
          <div className="section-header">
            <FiMapPin className="section-icon" />
            <h2>About BIT Mesra, Noida Campus</h2>
          </div>
          <div className="campus-content">
            <div className="campus-info">
              <FiUsers className="info-icon" />
              <div>
                <p>
                  Established in 1998, the Noida Campus of BIT, Mesra hosts academic programmes in Management, Computer Sciences & Animation and Multimedia offering curated MBA, MCA, BBA, BCA & B.Sc. Animation & Multimedia (BAM) Degree courses.
                </p>
                <p>
                  It is one of the widely preferred Campus due to its strategic location in the NCR of India & its proximity to the major industrial and IT hubs at Greater Noida, Gurugram, and Delhi which enable a dynamic and an academia-industry collaborative ecosystem.
                </p>
              </div>
            </div>
          </div>
        </CampusSection>
      </ContentSection>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  position: relative;
  padding: var(--space-8) var(--space-6) var(--space-16);
  overflow: hidden;
  min-height: 100vh;
  max-width: 1000px;
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

const ContentSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
`;

const AboutSection = styled.div`
  background: white;
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--color-dark-100);

  .section-header {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    margin-bottom: var(--space-6);

    .section-icon {
      font-size: 2rem;
      color: var(--color-primary-600);
    }

    h2 {
      font-family: var(--font-heading);
      font-size: var(--text-3xl);
      font-weight: 600;
      color: var(--color-dark-900);
      margin: 0;
    }
  }

  p {
    font-size: var(--text-base);
    color: var(--color-dark-600);
    line-height: 1.8;
    margin-bottom: var(--space-4);
  }
`;

const MilestonesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin-top: var(--space-6);
`;

const MilestoneItem = styled.div`
  display: flex;
  gap: var(--space-4);
  padding: var(--space-5);
  background: var(--color-primary-50);
  border-radius: var(--radius-xl);
  border-left: 4px solid var(--color-primary-500);
  transition: all var(--transition-base);

  &:hover {
    transform: translateX(4px);
    box-shadow: var(--shadow-soft);
  }

  .milestone-icon {
    font-size: 1.75rem;
    color: var(--color-primary-600);
    flex-shrink: 0;
    margin-top: var(--space-1);
  }

  .milestone-content {
    flex: 1;

    h4 {
      font-family: var(--font-heading);
      font-size: var(--text-lg);
      font-weight: 600;
      color: var(--color-dark-900);
      margin-bottom: var(--space-2);
    }

    p {
      font-size: var(--text-sm);
      color: var(--color-dark-600);
      line-height: 1.7;
      margin: 0;
    }
  }
`;

const CampusSection = styled.div`
  background: white;
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--color-dark-100);

  .section-header {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    margin-bottom: var(--space-6);

    .section-icon {
      font-size: 2rem;
      color: var(--color-secondary-600);
    }

    h2 {
      font-family: var(--font-heading);
      font-size: var(--text-3xl);
      font-weight: 600;
      color: var(--color-dark-900);
      margin: 0;
    }
  }

  .campus-content {
    .campus-info {
      display: flex;
      gap: var(--space-4);
      padding: var(--space-5);
      background: var(--color-secondary-50);
      border-radius: var(--radius-xl);
      border-left: 4px solid var(--color-secondary-500);

      .info-icon {
        font-size: 1.75rem;
        color: var(--color-secondary-600);
        flex-shrink: 0;
        margin-top: var(--space-1);
      }

      div {
        flex: 1;

        p {
          font-size: var(--text-base);
          color: var(--color-dark-600);
          line-height: 1.8;
          margin-bottom: var(--space-4);

          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }
`;

export default Whoweare;

