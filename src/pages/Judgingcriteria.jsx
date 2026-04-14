import React from 'react';
import styled from 'styled-components';
import { FiTarget, FiZap, FiTrendingUp, FiHeart, FiCode, FiStar, FiArrowRight } from 'react-icons/fi';

const Judgingcriteria = () => {
  const criteria = [
    {
      icon: FiTarget,
      title: 'Impact & Relevance',
      weight: '25%',
      description: 'How effectively does the solution address menstrual health challenges? Does it have the potential to create real-world impact?',
      points: ['Addresses a real problem', 'Scalable solution', 'Clear target audience', 'Measurable outcomes'],
      color: 'primary'
    },
    {
      icon: FiZap,
      title: 'Innovation & Creativity',
      weight: '25%',
      description: 'Is the approach novel and creative? Does it bring fresh perspectives to menstrual health education or access?',
      points: ['Unique approach', 'Creative use of technology', 'Original features', 'Differentiation from existing solutions'],
      color: 'secondary'
    },
    {
      icon: FiCode,
      title: 'Technical Implementation',
      weight: '20%',
      description: 'Is the solution well-built and functional? Is the code clean, maintainable, and properly documented?',
      points: ['Working prototype', 'Code quality', 'Technical complexity', 'Documentation'],
      color: 'accent'
    },
    {
      icon: FiHeart,
      title: 'User Experience',
      weight: '15%',
      description: 'Is the solution user-friendly and accessible? Does it consider the needs of the target audience?',
      points: ['Intuitive design', 'Accessibility features', 'Cultural sensitivity', 'Visual appeal'],
      color: 'primary'
    },
    {
      icon: FiTrendingUp,
      title: 'Sustainability & Viability',
      weight: '15%',
      description: 'Can the solution be sustained long-term? Is there a clear plan for implementation and growth?',
      points: ['Business model', 'Long-term viability', 'Resource requirements', 'Partnership potential'],
      color: 'secondary'
    },
  ];

  const judges = [
    { name: 'Dr. Suparna Dutta', role: 'Principal Investigator, SWAMPURNA' },
    { name: 'Tech Industry Expert', role: 'To be announced' },
    { name: 'Health Professional', role: 'To be announced' },
    { name: 'Design Expert', role: 'To be announced' },
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
        <span className="section-eyebrow">Evaluation</span>
        <h1 className="hero-title">
          Judging <span className="title-accent">Criteria</span>
        </h1>
        <p className="hero-description">
          Understand how your submission will be evaluated. Our judging panel will 
          assess projects based on five key criteria to ensure fair and comprehensive evaluation.
        </p>
      </HeroSection>

      {/* Criteria Section */}
      <CriteriaSection>
        {criteria.map((item, index) => (
          <CriteriaCard key={index} className={`color-${item.color}`}>
            <div className="card-header">
              <div className={`criteria-icon color-${item.color}`}>
                <item.icon />
              </div>
              <span className="weight-badge">{item.weight}</span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div className="points-list">
              {item.points.map((point, i) => (
                <div key={i} className="point-item">
                  <FiStar className="point-icon" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </CriteriaCard>
        ))}
      </CriteriaSection>

      {/* Judges Section */}
      <JudgesSection>
        <h2>Our Judging Panel</h2>
        <p className="judges-intro">
          Your projects will be evaluated by industry experts, healthcare professionals, 
          and technology leaders who are passionate about menstrual health innovation.
        </p>
        <div className="judges-grid">
          {judges.map((judge, index) => (
            <div key={index} className="judge-card">
              <div className="judge-avatar">{judge.name.charAt(0)}</div>
              <div className="judge-info">
                <span className="judge-name">{judge.name}</span>
                <span className="judge-role">{judge.role}</span>
              </div>
            </div>
          ))}
        </div>
      </JudgesSection>

      {/* Tips Section */}
      <TipsSection>
        <h3>Tips for Success</h3>
        <div className="tips-grid">
          <div className="tip-item">
            <span className="tip-number">01</span>
            <p>Focus on a specific problem and solve it well rather than trying to do everything.</p>
          </div>
          <div className="tip-item">
            <span className="tip-number">02</span>
            <p>Demonstrate a working prototype, even if basic. Functionality matters more than polish.</p>
          </div>
          <div className="tip-item">
            <span className="tip-number">03</span>
            <p>Show your research and understanding of the target audience and their needs.</p>
          </div>
          <div className="tip-item">
            <span className="tip-number">04</span>
            <p>Present a clear vision for how your solution can scale and create lasting impact.</p>
          </div>
        </div>
      </TipsSection>
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
  margin-bottom: var(--space-10);

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
    background: var(--gradient-accent);
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

const CriteriaSection = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);
  margin-bottom: var(--space-12);

  & > *:last-child {
    grid-column: span 2;

    @media (max-width: 768px) {
      grid-column: span 1;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CriteriaCard = styled.div`
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

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-4);
  }

  .criteria-icon {
    width: 56px;
    height: 56px;
    border-radius: var(--radius-xl);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;

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

  .weight-badge {
    font-family: var(--font-heading);
    font-size: var(--text-2xl);
    font-weight: 700;
    color: var(--color-primary-500);
  }

  h3 {
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    font-weight: 600;
    color: var(--color-dark-900);
    margin-bottom: var(--space-3);
  }

  p {
    font-size: var(--text-sm);
    color: var(--color-dark-500);
    line-height: 1.7;
    margin-bottom: var(--space-4);
  }

  .points-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .point-item {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-sm);
    color: var(--color-dark-600);

    .point-icon {
      color: var(--color-accent-500);
      font-size: 0.75rem;
    }
  }
`;

const JudgesSection = styled.section`
  background: var(--gradient-dark);
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
  margin-bottom: var(--space-10);
  color: white;

  h2 {
    font-family: var(--font-heading);
    font-size: var(--text-2xl);
    font-weight: 600;
    margin-bottom: var(--space-3);
    text-align: center;
  }

  .judges-intro {
    font-size: var(--text-base);
    text-align: center;
    opacity: 0.8;
    margin-bottom: var(--space-6);
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .judges-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-4);

    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .judge-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-4);
    background: rgba(255, 255, 255, 0.1);
    border-radius: var(--radius-xl);
    text-align: center;
  }

  .judge-avatar {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: var(--gradient-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    font-weight: 600;
  }

  .judge-info {
display: flex;
flex-direction: column;
    gap: 2px;
  }

  .judge-name {
    font-size: var(--text-sm);
    font-weight: 600;
  }

  .judge-role {
    font-size: var(--text-xs);
    opacity: 0.7;
  }
`;

const TipsSection = styled.section`
  background: linear-gradient(135deg, var(--color-cream-100), var(--color-cream-200));
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
  border: 1px solid var(--color-dark-100);

  h3 {
    font-family: var(--font-heading);
    font-size: var(--text-2xl);
    font-weight: 600;
    color: var(--color-dark-900);
    margin-bottom: var(--space-6);
    text-align: center;
  }

  .tips-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-5);

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
    }
  }

  .tip-item {
    display: flex;
    gap: var(--space-4);
    padding: var(--space-4);
    background: white;
    border-radius: var(--radius-xl);
    border: 1px solid var(--color-dark-100);
  }

  .tip-number {
    font-family: var(--font-heading);
    font-size: var(--text-2xl);
    font-weight: 700;
    color: var(--color-primary-300);
    flex-shrink: 0;
  }

  .tip-item p {
    font-size: var(--text-sm);
    color: var(--color-dark-600);
    line-height: 1.6;
  }
`;

export default Judgingcriteria;
