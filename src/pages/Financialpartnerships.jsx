import React from 'react';
import styled from 'styled-components';
import { FiDollarSign, FiAward, FiUsers, FiTrendingUp, FiShield } from 'react-icons/fi';

const Financialpartnerships = () => {
  const supportTiers = [
    {
      tier: 'Pillar of Change',
      impact: 'Supports the development of one new Interactive Gamified Module for the app.',
      recognition: 'Featured as a "Digital Innovation Partner" on the website.',
      icon: FiAward,
      color: 'primary'
    },
    {
      tier: 'Community Champion',
      impact: 'Funds a full MHH Sensitization Workshop for an entire village/slum community, including male sensitization.',
      recognition: 'Prominent logo placement on our website, in progress reports, and outreach materials.',
      icon: FiUsers,
      color: 'secondary'
    },
    {
      tier: 'Sustainability Partner',
      impact: 'Provides long-term support for establishing and monitoring local Self-Help Groups (SHGs) for one year.',
      recognition: 'Opportunity for joint press releases and case studies showcasing your commitment to Public Health and the UN-SDGs.',
      icon: FiTrendingUp,
      color: 'accent'
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
        <div className="hero-icon">
          <FiDollarSign />
        </div>
        <span className="section-eyebrow">Support Us</span>
        <h1 className="hero-title">
          Get <span className="title-accent">Involved</span>
        </h1>
        <p className="hero-description">
          Your financial contribution provides the bedrock for our sustained impact, ensuring we can deliver high-quality, scientifically backed interventions.
        </p>
      </HeroSection>

      {/* Support Tiers Section */}
      <TiersSection>
        <h2 className="section-title">Support Tiers</h2>
        <TiersTable>
          <thead>
            <tr>
              <th>Support Tier</th>
              <th>Direct Impact</th>
              <th>Recognition</th>
            </tr>
          </thead>
          <tbody>
            {supportTiers.map((tier, index) => (
              <tr key={index} className={`color-${tier.color}`}>
                <td className="tier-name">
                  <div className={`tier-name-content color-${tier.color}`}>
                    <div className="icon-wrapper">
                      <tier.icon />
                    </div>
                    <span>{tier.tier}</span>
                  </div>
                </td>
                <td className="tier-impact">{tier.impact}</td>
                <td className="tier-recognition">{tier.recognition}</td>
              </tr>
            ))}
          </tbody>
        </TiersTable>
      </TiersSection>

      {/* Accountability Section */}
      <AccountabilitySection>
        <h2>Our Accountability to You</h2>
        <p>
          As a DST-funded project led by esteemed faculty from BIT Mesra and AIIMS, New Delhi, we adhere to the highest standards of transparency and rigorous scientific methodology.
        </p>
        <ul>
          <li>
            <strong>Measurable Impact:</strong> Your support is tied directly to our Approved Objectives (Psychometric Screening, Tech Intervention, Community Sensitization). We provide detailed progress reports and evidence of behavior change through our longitudinal research design.
          </li>
          <li>
            <strong>Sustainable Model:</strong> We are building a model that can be replicated across India, ensuring your investment creates a lasting change that extends far beyond the life of the initial grant.
          </li>
        </ul>
      </AccountabilitySection>

      {/* Collaboration Section */}
      <CollaborationSection>
        <h2>Institutional & Academic Collaboration</h2>
        <p>
          We seek partnerships with organizations that share our commitment to evidence-based public health:
        </p>
        <ul>
          <li>
            <strong>Technology & Data:</strong> Collaborate on integrating advanced tools (like AR/VR features) or providing Data Science support for our large-scale cognitive mapping efforts.
          </li>
          <li>
            <strong>Community Outreach:</strong> Partner with NGOs and governmental bodies to utilize their established networks for scaling up the on-ground deployment of the SWAMPURNA model.
          </li>
          <li>
            <strong>Research & Publication:</strong> Co-author papers and participate in joint research projects to further validate the Psychometric Screening Tool and mHealth efficacy.
          </li>
        </ul>
      </CollaborationSection>
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

const TiersSection = styled.section`
  margin-bottom: var(--space-12);

  .section-title {
    font-family: var(--font-heading);
    font-size: var(--text-2xl);
    font-weight: 600;
    color: var(--color-dark-900);
    margin-bottom: var(--space-6);
  }
`;

const TiersTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--color-dark-100);

  thead {
    background: var(--gradient-primary);
    color: white;

    th {
      padding: var(--space-5) var(--space-6);
      text-align: left;
      font-family: var(--font-heading);
      font-size: var(--text-base);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;

      &:first-child {
        width: 30%;
      }
    }
  }

  tbody {
    tr {
      border-bottom: 1px solid var(--color-dark-100);
      transition: all var(--transition-base);

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        background: var(--color-dark-50);
      }

      &.color-primary {
        border-left: 4px solid var(--color-primary-500);
      }

      &.color-secondary {
        border-left: 4px solid var(--color-secondary-500);
      }

      &.color-accent {
        border-left: 4px solid var(--color-accent-500);
      }
    }

    td {
      padding: var(--space-6);
      vertical-align: top;
      font-size: var(--text-base);
      color: var(--color-dark-600);
      line-height: 1.7;
    }

    .tier-name {
      font-weight: 600;
      color: var(--color-dark-900);

      .tier-name-content {
        display: flex;
        align-items: center;
        gap: var(--space-3);

        .icon-wrapper {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          flex-shrink: 0;
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
    }

    .tier-impact,
    .tier-recognition {
      color: var(--color-dark-600);
    }
  }

  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;

    thead,
    tbody,
    tr,
    td,
    th {
      display: block;
    }

    thead {
      display: none;
    }

    tr {
      margin-bottom: var(--space-4);
      border: 1px solid var(--color-dark-100);
      border-radius: var(--radius-xl);
      padding: var(--space-4);
      background: white;
    }

    td {
      padding: var(--space-3) 0;
      border: none;
      text-align: left;

      &::before {
        content: attr(data-label);
        font-weight: 600;
        color: var(--color-dark-900);
        display: block;
        margin-bottom: var(--space-2);
        font-size: var(--text-sm);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
    }

    .tier-name {
      font-size: var(--text-lg);
      margin-bottom: var(--space-3);
    }
  }
`;

const AccountabilitySection = styled.section`
  background: var(--color-cream-100);
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
  margin-bottom: var(--space-10);
  border: 1px solid var(--color-dark-100);

  h2 {
    font-family: var(--font-heading);
    font-size: var(--text-2xl);
    font-weight: 600;
    color: var(--color-dark-900);
    margin-bottom: var(--space-4);
  }

  p {
    font-size: var(--text-base);
    color: var(--color-dark-600);
    line-height: 1.8;
    margin-bottom: var(--space-5);
  }

  ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-4);

    li {
      font-size: var(--text-base);
      color: var(--color-dark-600);
      line-height: 1.8;
      padding-left: var(--space-6);
      position: relative;

      &::before {
        content: '•';
        position: absolute;
        left: 0;
        color: var(--color-primary-500);
        font-size: 1.5rem;
        line-height: 1;
      }

      strong {
        color: var(--color-dark-900);
        font-weight: 600;
      }
    }
  }
`;

const CollaborationSection = styled.section`
  background: white;
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
  border: 1px solid var(--color-dark-100);

  h2 {
    font-family: var(--font-heading);
    font-size: var(--text-2xl);
    font-weight: 600;
    color: var(--color-dark-900);
    margin-bottom: var(--space-4);
  }

  p {
    font-size: var(--text-base);
    color: var(--color-dark-600);
    line-height: 1.8;
    margin-bottom: var(--space-5);
  }

  ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-4);

    li {
      font-size: var(--text-base);
      color: var(--color-dark-600);
      line-height: 1.8;
      padding-left: var(--space-6);
      position: relative;

      &::before {
        content: '•';
        position: absolute;
        left: 0;
        color: var(--color-primary-500);
        font-size: 1.5rem;
        line-height: 1;
      }

      strong {
        color: var(--color-dark-900);
        font-weight: 600;
      }
    }
  }
`;

export default Financialpartnerships;

