import React from 'react';
import styled from 'styled-components';
import { FiTarget, FiSmartphone, FiUsers, FiHeart, FiGlobe, FiTrendingUp, FiArrowRight } from 'react-icons/fi';

const Challenges = () => {
  const challenges = [
    {
      icon: FiSmartphone,
      title: 'Digital Education Platform',
      description: 'Build an engaging mobile or web platform that educates adolescent girls about menstrual health in regional languages.',
      difficulty: 'Intermediate',
      prize: '₹15,000',
      tags: ['Mobile App', 'Education', 'Localization'],
      color: 'primary'
    },
    {
      icon: FiUsers,
      title: 'Community Support Network',
      description: 'Create a solution that connects girls with peer mentors, health workers, and support groups in their community.',
      difficulty: 'Advanced',
      prize: '₹20,000',
      tags: ['Social Network', 'Community', 'Support'],
      color: 'secondary'
    },
    {
      icon: FiHeart,
      title: 'Period Tracking & Health',
      description: 'Develop an intelligent period tracker with health insights, predictions, and personalized recommendations.',
      difficulty: 'Intermediate',
      prize: '₹15,000',
      tags: ['Health Tech', 'AI/ML', 'Tracking'],
      color: 'accent'
    },
    {
      icon: FiGlobe,
      title: 'Sustainable Products Marketplace',
      description: 'Build a platform connecting users with eco-friendly menstrual product manufacturers and local distributors.',
      difficulty: 'Beginner',
      prize: '₹10,000',
      tags: ['E-commerce', 'Sustainability', 'Marketplace'],
      color: 'primary'
    },
    {
      icon: FiTrendingUp,
      title: 'Stigma-Breaking Campaign Tool',
      description: 'Create interactive tools or games that help break menstrual taboos and encourage open conversations.',
      difficulty: 'Beginner',
      prize: '₹10,000',
      tags: ['Gamification', 'Awareness', 'Social Impact'],
      color: 'secondary'
    },
    {
      icon: FiTarget,
      title: 'Open Innovation',
      description: 'Have a unique idea that doesn\'t fit the above categories? Pitch your own solution to menstrual health challenges.',
      difficulty: 'All Levels',
      prize: '₹25,000',
      tags: ['Innovation', 'Creative', 'Open Track'],
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
        <span className="section-eyebrow">Problem Statements</span>
        <h1 className="hero-title">
          Hackathon <span className="title-accent">Challenges</span>
        </h1>
        <p className="hero-description">
          Choose from these exciting challenges and build innovative solutions 
          that address real problems in menstrual health education and access.
        </p>
      </HeroSection>

      {/* Challenges Grid */}
      <ChallengesGrid>
        {challenges.map((challenge, index) => (
          <ChallengeCard key={index} className={`color-${challenge.color}`}>
            <div className="card-header">
              <div className={`challenge-icon color-${challenge.color}`}>
                <challenge.icon />
              </div>
              <div className="prize-badge">
                <span className="prize-label">Prize</span>
                <span className="prize-amount">{challenge.prize}</span>
              </div>
            </div>
            <h3>{challenge.title}</h3>
            <p>{challenge.description}</p>
            <div className="tags">
              {challenge.tags.map((tag, i) => (
                <span key={i} className="tag">{tag}</span>
              ))}
            </div>
            <div className="card-footer">
              <span className={`difficulty ${challenge.difficulty.toLowerCase().replace(' ', '-')}`}>
                {challenge.difficulty}
              </span>
              <button className={`select-btn color-${challenge.color}`}>
                <span>Select Challenge</span>
                <FiArrowRight />
              </button>
            </div>
          </ChallengeCard>
        ))}
      </ChallengesGrid>

      {/* Info Section */}
      <InfoSection>
        <div className="info-content">
          <h3>Can't Decide?</h3>
          <p>
            You can choose any challenge that resonates with your skills and interests. 
            Teams are also welcome to combine multiple challenges or propose their own 
            unique solution under the Open Innovation track.
          </p>
          <button className="learn-more">
            <span>View Judging Criteria</span>
            <FiArrowRight />
          </button>
        </div>
      </InfoSection>
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
    max-width: 600px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    .hero-title {
      font-size: var(--text-4xl);
    }
  }
`;

const ChallengesGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
  margin-bottom: var(--space-10);

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const ChallengeCard = styled.div`
  background: white;
  border-radius: var(--radius-2xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--color-dark-100);
  display: flex;
  flex-direction: column;
  transition: all var(--transition-slow);

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
    align-items: flex-start;
    margin-bottom: var(--space-4);
  }

  .challenge-icon {
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

  .prize-badge {
display: flex;
flex-direction: column;
    align-items: flex-end;
    gap: 2px;
  }

  .prize-label {
    font-size: var(--text-xs);
    color: var(--color-dark-400);
  }

  .prize-amount {
    font-family: var(--font-heading);
    font-size: var(--text-lg);
    font-weight: 700;
    color: var(--color-accent-600);
  }

  h3 {
    font-family: var(--font-heading);
    font-size: var(--text-lg);
    font-weight: 600;
    color: var(--color-dark-900);
    margin-bottom: var(--space-3);
  }

  p {
    font-size: var(--text-sm);
    color: var(--color-dark-500);
    line-height: 1.7;
    margin-bottom: var(--space-4);
    flex: 1;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    margin-bottom: var(--space-5);
  }

  .tag {
    padding: var(--space-1) var(--space-3);
    background: var(--color-cream-200);
    border-radius: var(--radius-full);
    font-size: var(--text-xs);
    color: var(--color-dark-600);
    font-weight: 500;
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .difficulty {
    font-size: var(--text-xs);
    font-weight: 600;
    padding: var(--space-1) var(--space-3);
    border-radius: var(--radius-full);

    &.beginner {
      background: var(--color-secondary-100);
      color: var(--color-secondary-700);
    }

    &.intermediate {
      background: var(--color-accent-100);
      color: var(--color-accent-700);
    }

    &.advanced {
      background: var(--color-primary-100);
      color: var(--color-primary-700);
    }

    &.all-levels {
      background: var(--color-dark-100);
      color: var(--color-dark-600);
    }
  }

  .select-btn {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    font-size: var(--text-sm);
    font-weight: 600;
    transition: all var(--transition-base);

    &.color-primary {
      color: var(--color-primary-600);
    }

    &.color-secondary {
      color: var(--color-secondary-600);
    }

    &.color-accent {
      color: var(--color-accent-700);
    }

    &:hover {
      gap: var(--space-2);
    }
  }
`;

const InfoSection = styled.section`
  background: linear-gradient(135deg, var(--color-cream-100), var(--color-cream-200));
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
  text-align: center;
  border: 1px solid var(--color-dark-100);

  h3 {
    font-family: var(--font-heading);
    font-size: var(--text-2xl);
    font-weight: 600;
    color: var(--color-dark-900);
    margin-bottom: var(--space-3);
  }

  p {
    font-size: var(--text-base);
    color: var(--color-dark-500);
    line-height: 1.8;
    max-width: 600px;
    margin: 0 auto var(--space-5);
  }

  .learn-more {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-3) var(--space-6);
    background: var(--gradient-secondary);
    color: white;
    font-weight: 600;
    font-size: var(--text-sm);
    border-radius: var(--radius-full);
    transition: all var(--transition-base);

    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);
    }
  }
`;

export default Challenges;
