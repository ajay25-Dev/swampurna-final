import React from 'react';
import styled from 'styled-components';
import { FiFlag, FiSearch, FiCode, FiUsers, FiAward, FiZap, FiTrendingUp } from 'react-icons/fi';

const Projecthistory = () => {
  const milestones = [
    {
      icon: FiFlag,
      year: '2023',
      title: 'Conceptualization and Inception',
      description: 'SWAMPURNA began as a research-driven initiative under the Department of Science and Technology, aimed at addressing the menstrual health challenges faced by adolescent girls in marginalized communities.',
      keyEvent: 'Formation of the core project team led by Dr. Suparna Dutta.',
      outcome: 'To develop a sustainable model for menstrual health education using behavior change communication and technology.',
      color: 'primary'
    },
    {
      icon: FiSearch,
      year: 'Jan-Mar 2024',
      title: 'Initial Research and Development',
      description: 'In the early stages, the project focused on research to understand the needs of adolescent girls and communities regarding menstrual health. This phase involved detailed surveys and focus group discussions.',
      keyEvent: 'Comprehensive needs assessment in target communities.',
      outcome: 'Identified gaps in menstrual health education and access to hygiene products.',
      color: 'secondary'
    },
    {
      icon: FiCode,
      year: 'April 2024',
      title: 'Prototype Development',
      description: 'The next phase saw the development of innovative tools to support menstrual health education. This included creating prototypes for mobile applications, interactive content, and educational materials.',
      keyEvent: 'Launch of prototype tools integrating state-of-the-art technology.',
      outcome: 'Initial pilot testing with target groups to gather feedback.',
      color: 'accent'
    },
    {
      icon: FiUsers,
      year: 'May-Aug 2024',
      title: 'Community Outreach',
      description: 'SWAMPURNA expanded its reach with community engagement activities, workshops, and participatory communication efforts. The team worked closely with local leaders and schools.',
      keyEvent: 'First round of community workshops and educational programs.',
      outcome: 'Positive feedback from girls and community leaders; greater awareness.',
      color: 'primary'
    },
    {
      icon: FiAward,
      year: 'Sep 2024',
      title: 'Partnership Expansion',
      description: 'Recognizing the need to scale the project, SWAMPURNA established partnerships with government agencies, NGOs, and private organizations to strengthen resources and expand its reach.',
      keyEvent: 'Official partnership with the Department of Science and Technology (DST).',
      outcome: 'Increased funding and technical support for scaling the project.',
      color: 'secondary'
    },
    {
      icon: FiZap,
      year: 'Oct 2024',
      title: 'Hackathons & Competitions',
      description: 'To engage the community and foster innovation, SWAMPURNA introduced creative competitions such as hackathons, mascot-making, and short-film contests focused on menstrual health.',
      keyEvent: 'Launch of the first SWAMPURNA Hackathon.',
      outcome: 'New ideas and creative solutions developed for further implementation.',
      color: 'accent'
    },
    {
      icon: FiTrendingUp,
      year: '2024+',
      title: 'Present and Future',
      description: 'Today, SWAMPURNA continues to grow, with plans to scale its programs to more regions, expand partnerships, and integrate new technologies to make menstrual health education more accessible.',
      keyEvent: 'Expansion of the SWAMPURNA initiative to additional communities.',
      outcome: 'To create a national movement for menstrual health awareness.',
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
        <span className="section-eyebrow">Our Journey</span>
        <h1 className="hero-title">
          The Journey of <span className="title-accent">SWAMPURNA</span>
        </h1>
        <p className="hero-description">
          SWAMPURNA was born from a vision to empower adolescent girls with knowledge, 
          tools, and a supportive community to manage menstrual health with dignity. 
          Over the years, we've evolved from a small initiative into a comprehensive 
          program integrating state-of-the-art technology, education, and participatory communication.
        </p>
      </HeroSection>

      {/* Timeline Section */}
      <TimelineSection>
        <div className="timeline-line"></div>
        {milestones.map((milestone, index) => (
          <TimelineItem key={index} className={index % 2 === 0 ? 'left' : 'right'}>
            <div className={`timeline-card color-${milestone.color}`}>
              <div className="card-header">
                <div className={`icon-wrapper color-${milestone.color}`}>
                  <milestone.icon />
                </div>
                <span className="year-badge">{milestone.year}</span>
              </div>
              <h3>{milestone.title}</h3>
              <p className="description">{milestone.description}</p>
              <div className="details">
                <div className="detail-item">
                  <span className="detail-label">Key Event</span>
                  <span className="detail-text">{milestone.keyEvent}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Outcome</span>
                  <span className="detail-text">{milestone.outcome}</span>
                </div>
              </div>
            </div>
            <div className={`timeline-dot color-${milestone.color}`}></div>
          </TimelineItem>
        ))}
      </TimelineSection>

      {/* Quote Section */}
      <QuoteSection>
        <div className="quote-content">
          <div className="quote-icon">"</div>
          <blockquote>
            As we reflect on our journey, we remain committed to our vision of empowering 
            every adolescent girl with the knowledge and tools to manage menstruation with 
            confidence and dignity. The road ahead is filled with opportunities, and we 
            invite everyone to be part of this transformative journey.
          </blockquote>
        </div>
      </QuoteSection>
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
    left: -200px;
    background: radial-gradient(circle, rgba(217, 118, 82, 0.08) 0%, transparent 70%);
  }

  .circle-2 {
    width: 400px;
    height: 400px;
    bottom: 20%;
    right: -150px;
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
    background: var(--color-accent-50);
    color: var(--color-accent-700);
    font-size: var(--text-xs);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    border-radius: var(--radius-full);
    margin-bottom: var(--space-5);
    border: 1px solid var(--color-accent-100);
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
    max-width: 800px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    .hero-title {
      font-size: var(--text-4xl);
    }
  }
`;

const TimelineSection = styled.section`
  position: relative;
  padding: var(--space-8) 0;
  margin-bottom: var(--space-12);

  .timeline-line {
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, var(--color-primary-200) 0%, var(--color-secondary-200) 50%, var(--color-accent-200) 100%);
    transform: translateX(-50%);

    @media (max-width: 768px) {
      left: 20px;
    }
  }
`;

const TimelineItem = styled.div`
  position: relative;
  display: flex;
  margin-bottom: var(--space-8);

  &.left {
    justify-content: flex-start;
    padding-right: calc(50% + var(--space-8));

    .timeline-dot {
      right: calc(50% - 8px);
    }

    @media (max-width: 768px) {
      padding-right: 0;
      padding-left: 50px;

      .timeline-dot {
        left: 12px;
        right: auto;
      }
    }
  }

  &.right {
    justify-content: flex-end;
    padding-left: calc(50% + var(--space-8));

    .timeline-dot {
      left: calc(50% - 8px);
    }

    @media (max-width: 768px) {
      padding-left: 50px;
      padding-right: 0;

      .timeline-dot {
        left: 12px;
      }
    }
  }

  .timeline-dot {
    position: absolute;
    top: var(--space-6);
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 3px solid white;
    box-shadow: var(--shadow-md);

    &.color-primary {
      background: var(--color-primary-500);
    }

    &.color-secondary {
      background: var(--color-secondary-500);
    }

    &.color-accent {
      background: var(--color-accent-500);
    }
  }
`;

const TimelineCard = styled.div`
  background: white;
  border-radius: var(--radius-2xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--color-dark-100);
  transition: all var(--transition-slow);
  max-width: 500px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-soft-lg);
  }

  &.color-primary:hover {
    border-color: var(--color-primary-200);
  }

  &.color-secondary:hover {
    border-color: var(--color-secondary-200);
  }

  &.color-accent:hover {
    border-color: var(--color-accent-200);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-4);
  }

  .icon-wrapper {
    width: 48px;
    height: 48px;
    border-radius: var(--radius-xl);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;

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

  .year-badge {
    font-family: var(--font-heading);
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-dark-500);
    padding: var(--space-1) var(--space-3);
    background: var(--color-dark-100);
    border-radius: var(--radius-full);
  }

  h3 {
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    font-weight: 600;
    color: var(--color-dark-900);
    margin-bottom: var(--space-3);
  }

  .description {
    font-size: var(--text-sm);
    color: var(--color-dark-500);
    line-height: 1.7;
    margin-bottom: var(--space-4);
  }

  .details {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .detail-item {
    padding: var(--space-3);
    background: var(--color-cream-100);
    border-radius: var(--radius-lg);
    border-left: 3px solid var(--color-primary-400);
  }

  .detail-label {
    display: block;
    font-size: var(--text-xs);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-dark-600);
    margin-bottom: var(--space-1);
  }

  .detail-text {
    font-size: var(--text-sm);
    color: var(--color-dark-600);
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const QuoteSection = styled.section`
  background: var(--gradient-dark);
  border-radius: var(--radius-3xl);
  padding: var(--space-10);
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50px;
    right: -50px;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(217, 118, 82, 0.2) 0%, transparent 70%);
  }

  .quote-content {
    position: relative;
    z-index: 1;
  }

  .quote-icon {
    font-family: var(--font-heading);
    font-size: 5rem;
    color: var(--color-primary-500);
    line-height: 1;
    margin-bottom: var(--space-4);
    opacity: 0.5;
  }

  blockquote {
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    font-weight: 400;
    font-style: italic;
    color: white;
    line-height: 1.8;
    max-width: 800px;
    margin: 0 auto;
  }
`;

export default Projecthistory;
