import React from 'react';
import styled from 'styled-components';
import { FiAward, FiDollarSign, FiUsers, FiStar, FiGift, FiArrowRight } from 'react-icons/fi';

const Prizerecognition = () => {
  const mainPrizes = [
    {
      place: '1st Place',
      emoji: '🏆',
      amount: '₹25,000',
      extras: ['6-Month Mentorship Program', 'Incubation Support', 'Media Coverage', 'Certificate of Excellence'],
      color: 'gold'
    },
    {
      place: '2nd Place',
      emoji: '🥈',
      amount: '₹15,000',
      extras: ['3-Month Mentorship', 'Industry Connections', 'Media Feature', 'Certificate'],
      color: 'silver'
    },
    {
      place: '3rd Place',
      emoji: '🥉',
      amount: '₹10,000',
      extras: ['1-Month Mentorship', 'Networking Event Access', 'Certificate'],
      color: 'bronze'
    },
  ];

  const specialAwards = [
    {
      icon: FiStar,
      title: 'Best Innovation',
      prize: '₹5,000',
      description: 'Most creative and novel solution approach'
    },
    {
      icon: FiUsers,
      title: 'Best Social Impact',
      prize: '₹5,000',
      description: 'Solution with highest potential for community impact'
    },
    {
      icon: FiGift,
      title: "People's Choice",
      prize: '₹5,000',
      description: 'Voted by participants and public audience'
    },
  ];

  const allParticipants = [
    'Certificate of Participation',
    'SWAMPURNA Swag Kit',
    'Access to Workshop Recordings',
    'Networking Opportunities',
    'LinkedIn Badge'
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
        <span className="section-eyebrow">Rewards</span>
        <h1 className="hero-title">
          Prizes & <span className="title-accent">Recognition</span>
        </h1>
        <p className="hero-description">
          Win exciting prizes, gain recognition, and get the support you need to 
          take your solution to the next level. Total prize pool worth ₹75,000+!
        </p>
      </HeroSection>

      {/* Main Prizes */}
      <MainPrizesSection>
        <div className="section-label">
          <span className="label-line"></span>
          <span className="label-text">Main Prizes</span>
          <span className="label-line"></span>
        </div>
        <PrizesGrid>
          {mainPrizes.map((prize, index) => (
            <PrizeCard key={index} className={`place-${index + 1}`}>
              <div className="prize-emoji">{prize.emoji}</div>
              <span className="prize-place">{prize.place}</span>
              <span className="prize-amount">{prize.amount}</span>
              <div className="prize-extras">
                {prize.extras.map((extra, i) => (
                  <div key={i} className="extra-item">
                    <FiAward className="extra-icon" />
                    <span>{extra}</span>
                  </div>
                ))}
              </div>
            </PrizeCard>
          ))}
        </PrizesGrid>
      </MainPrizesSection>

      {/* Special Awards */}
      <SpecialAwardsSection>
        <div className="section-label">
          <span className="label-line"></span>
          <span className="label-text">Special Awards</span>
          <span className="label-line"></span>
        </div>
        <AwardsGrid>
          {specialAwards.map((award, index) => (
            <AwardCard key={index}>
              <div className="award-icon">
                <award.icon />
              </div>
              <h3>{award.title}</h3>
              <span className="award-prize">{award.prize}</span>
              <p>{award.description}</p>
            </AwardCard>
          ))}
        </AwardsGrid>
      </SpecialAwardsSection>

      {/* All Participants */}
      <ParticipantsSection>
        <div className="section-content">
          <div className="section-icon">
            <FiGift />
          </div>
          <h3>For All Participants</h3>
          <p>Every participant who submits a valid project will receive:</p>
          <div className="perks-list">
            {allParticipants.map((perk, index) => (
              <div key={index} className="perk-item">
                <FiStar className="perk-icon" />
                <span>{perk}</span>
              </div>
            ))}
          </div>
        </div>
      </ParticipantsSection>

      {/* CTA Section */}
      <CTASection>
        <h2>Ready to Compete?</h2>
        <p>Register now and stand a chance to win amazing prizes!</p>
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
    background: radial-gradient(circle, rgba(245, 180, 24, 0.1) 0%, transparent 70%);
  }

  .circle-2 {
    width: 400px;
    height: 400px;
    bottom: 20%;
    left: -150px;
    background: radial-gradient(circle, rgba(217, 118, 82, 0.08) 0%, transparent 70%);
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
    color: var(--color-accent-700);
    padding: var(--space-2) var(--space-5);
    background: var(--color-accent-50);
    border-radius: var(--radius-full);
    border: 1px solid var(--color-accent-100);
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

const MainPrizesSection = styled.section`
  margin-bottom: var(--space-12);
`;

const PrizesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PrizeCard = styled.div`
  background: white;
  border-radius: var(--radius-3xl);
  padding: var(--space-8);
  text-align: center;
  box-shadow: var(--shadow-soft);
  border: 2px solid var(--color-dark-100);
  transition: all var(--transition-slow);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-soft-lg);
  }

  &.place-1 {
    border-color: rgba(245, 180, 24, 0.5);
    background: linear-gradient(180deg, rgba(245, 180, 24, 0.05) 0%, white 50%);

    .prize-amount {
      color: #D99A06;
    }
  }

  &.place-2 {
    border-color: rgba(192, 192, 192, 0.5);
    background: linear-gradient(180deg, rgba(192, 192, 192, 0.1) 0%, white 50%);

    .prize-amount {
      color: #8F847A;
    }
  }

  &.place-3 {
    border-color: rgba(205, 127, 50, 0.3);
    background: linear-gradient(180deg, rgba(205, 127, 50, 0.05) 0%, white 50%);

    .prize-amount {
      color: #A34829;
    }
  }

  .prize-emoji {
    font-size: 4rem;
    margin-bottom: var(--space-4);
  }

  .prize-place {
    display: block;
    font-family: var(--font-heading);
    font-size: var(--text-lg);
    font-weight: 600;
    color: var(--color-dark-600);
    margin-bottom: var(--space-2);
  }

  .prize-amount {
    display: block;
    font-family: var(--font-heading);
    font-size: var(--text-4xl);
    font-weight: 700;
    margin-bottom: var(--space-6);
  }

  .prize-extras {
display: flex;
flex-direction: column;
    gap: var(--space-3);
    text-align: left;
  }

  .extra-item {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    font-size: var(--text-sm);
    color: var(--color-dark-600);
    padding: var(--space-2) var(--space-3);
    background: var(--color-cream-100);
    border-radius: var(--radius-lg);

    .extra-icon {
      color: var(--color-accent-500);
      flex-shrink: 0;
    }
  }
`;

const SpecialAwardsSection = styled.section`
  margin-bottom: var(--space-10);
`;

const AwardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AwardCard = styled.div`
  background: white;
  border-radius: var(--radius-2xl);
  padding: var(--space-6);
  text-align: center;
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--color-dark-100);
  transition: all var(--transition-base);

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-soft-lg);
    border-color: var(--color-secondary-200);
  }

  .award-icon {
    width: 56px;
    height: 56px;
    border-radius: var(--radius-xl);
    background: var(--color-secondary-100);
    color: var(--color-secondary-600);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    margin: 0 auto var(--space-4);
  }

  h3 {
    font-family: var(--font-heading);
    font-size: var(--text-lg);
    font-weight: 600;
    color: var(--color-dark-900);
    margin-bottom: var(--space-2);
  }

  .award-prize {
    display: block;
    font-family: var(--font-heading);
    font-size: var(--text-2xl);
    font-weight: 700;
    color: var(--color-secondary-600);
    margin-bottom: var(--space-3);
  }

  p {
    font-size: var(--text-sm);
    color: var(--color-dark-500);
    line-height: 1.6;
  }
`;

const ParticipantsSection = styled.section`
  background: var(--gradient-secondary);
  border-radius: var(--radius-3xl);
  padding: var(--space-8);
  margin-bottom: var(--space-10);
  color: white;

  .section-content {
    text-align: center;
  }

  .section-icon {
    width: 64px;
    height: 64px;
    border-radius: var(--radius-xl);
    background: rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    margin: 0 auto var(--space-4);
  }

  h3 {
    font-family: var(--font-heading);
    font-size: var(--text-2xl);
    font-weight: 600;
    margin-bottom: var(--space-2);
  }

  p {
    font-size: var(--text-base);
    opacity: 0.85;
    margin-bottom: var(--space-6);
  }

  .perks-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--space-3);
  }

  .perk-item {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-4);
    background: rgba(255, 255, 255, 0.15);
    border-radius: var(--radius-full);
    font-size: var(--text-sm);

    .perk-icon {
      font-size: 0.75rem;
    }
  }
`;

const CTASection = styled.section`
  background: var(--gradient-dark);
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
    color: rgba(255, 255, 255, 0.75);
    margin-bottom: var(--space-6);
  }

  .cta-button {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-4) var(--space-8);
    background: var(--gradient-accent);
    color: var(--color-dark-900);
    font-weight: 600;
    border-radius: var(--radius-full);
    box-shadow: var(--shadow-lg), var(--shadow-glow-accent);
    transition: all var(--transition-base);

    &:hover {
      transform: translateY(-2px);
    }
  }
`;

export default Prizerecognition;
