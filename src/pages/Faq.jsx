import React from 'react';
import styled from 'styled-components';
import { FiCode, FiUsers, FiAward, FiCalendar, FiArrowRight, FiCheck } from 'react-icons/fi';

const Faq = () => {
  const hackathonInfo = {
    title: 'SWAMPURNA Hackathon 2024',
    subtitle: 'Innovating Menstrual Health Solutions',
    description: 'Welcome to the SWAMPURNA Hackathon, a unique opportunity for innovators, developers, and creatives to come together to build cutting-edge solutions that promote menstrual health and hygiene.',
    date: 'November 10-12, 2024',
    mode: 'Virtual + Hybrid'
  };

  const tracks = [
    {
      icon: FiCode,
      title: 'Tech Solutions',
      description: 'Build apps, platforms, or tools that help with menstrual health tracking, education, or product access.',
      color: 'primary'
    },
    {
      icon: FiUsers,
      title: 'Community Impact',
      description: 'Create solutions that help break stigma, improve awareness, and foster community support.',
      color: 'secondary'
    },
    {
      icon: FiAward,
      title: 'Sustainable Products',
      description: 'Design eco-friendly menstrual products or systems to improve product accessibility.',
      color: 'accent'
    },
  ];

  const timeline = [
    { date: 'Oct 15', event: 'Registration Opens' },
    { date: 'Nov 1', event: 'Team Formation Deadline' },
    { date: 'Nov 10', event: 'Hackathon Begins' },
    { date: 'Nov 12', event: 'Final Submissions' },
    { date: 'Nov 15', event: 'Winners Announced' },
  ];

  const prizes = [
    { place: '1st Place', amount: '₹25,000', extras: '+ Mentorship + Incubation' },
    { place: '2nd Place', amount: '₹15,000', extras: '+ Mentorship' },
    { place: '3rd Place', amount: '₹10,000', extras: '+ Certificate' },
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
        <span className="section-eyebrow">Hackathon 2024</span>
        <h1 className="hero-title">
          {hackathonInfo.title.split(' ')[0]} <span className="title-accent">{hackathonInfo.title.split(' ').slice(1).join(' ')}</span>
        </h1>
        <p className="hero-subtitle">{hackathonInfo.subtitle}</p>
        <p className="hero-description">{hackathonInfo.description}</p>
        <div className="hero-meta">
          <div className="meta-item">
            <FiCalendar />
            <span>{hackathonInfo.date}</span>
          </div>
          <div className="meta-item">
            <FiUsers />
            <span>{hackathonInfo.mode}</span>
          </div>
        </div>
        <div className="hero-actions">
          <button className="btn-primary">
            <span>Register Now</span>
            <FiArrowRight />
          </button>
          <button className="btn-outline">Learn More</button>
        </div>
      </HeroSection>

      {/* Tracks Section */}
      <Section>
        <div className="section-label">
          <span className="label-line"></span>
          <span className="label-text">Hackathon Tracks</span>
          <span className="label-line"></span>
        </div>
        <TracksGrid>
          {tracks.map((track, index) => (
            <TrackCard key={index} className={`color-${track.color}`}>
              <div className={`track-icon color-${track.color}`}>
                <track.icon />
              </div>
              <h3>{track.title}</h3>
              <p>{track.description}</p>
            </TrackCard>
          ))}
        </TracksGrid>
      </Section>

      {/* Timeline & Prizes */}
      <TwoColumnSection>
        <TimelineCard>
          <h3>Event Timeline</h3>
          <div className="timeline-list">
            {timeline.map((item, index) => (
              <div key={index} className="timeline-item">
                <span className="timeline-date">{item.date}</span>
                <span className="timeline-event">{item.event}</span>
              </div>
            ))}
          </div>
        </TimelineCard>

        <PrizesCard>
          <h3>Prizes & Recognition</h3>
          <div className="prizes-list">
            {prizes.map((prize, index) => (
              <div key={index} className={`prize-item place-${index + 1}`}>
                <span className="prize-place">{prize.place}</span>
                <span className="prize-amount">{prize.amount}</span>
                <span className="prize-extras">{prize.extras}</span>
              </div>
            ))}
          </div>
        </PrizesCard>
      </TwoColumnSection>

      {/* CTA Section */}
      <CTASection>
        <h2>Ready to Innovate?</h2>
        <p>Join hundreds of innovators in building solutions for menstrual health</p>
        <button className="cta-button">
          <span>Register for Free</span>
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
    margin-bottom: var(--space-3);
    line-height: 1.1;
  }

  .title-accent {
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-subtitle {
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    color: var(--color-secondary-600);
    margin-bottom: var(--space-4);
  }

  .hero-description {
    font-size: var(--text-lg);
    color: var(--color-dark-500);
    line-height: 1.8;
    max-width: 700px;
    margin: 0 auto var(--space-6);
  }

  .hero-meta {
    display: flex;
    justify-content: center;
    gap: var(--space-6);
    margin-bottom: var(--space-6);
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-base);
    color: var(--color-dark-600);
    font-weight: 500;
  }

  .hero-actions {
    display: flex;
    gap: var(--space-4);
    justify-content: center;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-4) var(--space-8);
    background: var(--gradient-primary);
    color: white;
    font-weight: 600;
    border-radius: var(--radius-full);
    box-shadow: var(--shadow-lg), var(--shadow-glow-primary);
    transition: all var(--transition-base);

    &:hover {
      transform: translateY(-2px);
    }
  }

  .btn-outline {
    padding: var(--space-4) var(--space-8);
    border: 2px solid var(--color-dark-200);
    border-radius: var(--radius-full);
    font-weight: 600;
    color: var(--color-dark-700);
    transition: all var(--transition-base);

    &:hover {
      border-color: var(--color-primary-400);
      color: var(--color-primary-600);
    }
  }

  @media (max-width: 768px) {
    .hero-title {
      font-size: var(--text-4xl);
    }

    .hero-actions {
      flex-direction: column;
      align-items: center;
    }
  }
`;

const Section = styled.section`
  margin-bottom: var(--space-12);

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
    border: 1px solid var(--color-secondary-100);
  }
`;

const TracksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TrackCard = styled.div`
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
  }

  .track-icon {
    width: 64px;
    height: 64px;
    border-radius: var(--radius-xl);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.75rem;
    margin: 0 auto var(--space-4);

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
    font-size: var(--text-xl);
    font-weight: 600;
    color: var(--color-dark-900);
    margin-bottom: var(--space-3);
  }

  p {
    font-size: var(--text-sm);
    color: var(--color-dark-500);
    line-height: 1.7;
  }
`;

const TwoColumnSection = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);
  margin-bottom: var(--space-12);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TimelineCard = styled.div`
  background: white;
  border-radius: var(--radius-2xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--color-dark-100);

  h3 {
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    font-weight: 600;
    color: var(--color-dark-900);
    margin-bottom: var(--space-5);
  }

  .timeline-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .timeline-item {
    display: flex;
    gap: var(--space-4);
    align-items: center;
    padding: var(--space-3);
    background: var(--color-cream-100);
    border-radius: var(--radius-lg);
    border-left: 3px solid var(--color-primary-400);
  }

  .timeline-date {
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-primary-600);
    min-width: 60px;
  }

  .timeline-event {
    font-size: var(--text-sm);
    color: var(--color-dark-600);
  }
`;

const PrizesCard = styled.div`
  background: var(--gradient-dark);
  border-radius: var(--radius-2xl);
  padding: var(--space-6);
  color: white;

  h3 {
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    font-weight: 600;
    margin-bottom: var(--space-5);
  }

  .prizes-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .prize-item {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    padding: var(--space-4);
    border-radius: var(--radius-lg);
    background: rgba(255, 255, 255, 0.1);

    &.place-1 {
      background: linear-gradient(135deg, rgba(245, 180, 24, 0.2) 0%, rgba(245, 180, 24, 0.1) 100%);
      border: 1px solid rgba(245, 180, 24, 0.3);
    }
  }

  .prize-place {
    font-size: var(--text-sm);
    font-weight: 600;
    min-width: 70px;
  }

  .prize-amount {
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    font-weight: 700;
    color: var(--color-accent-400);
  }

  .prize-extras {
    font-size: var(--text-xs);
    opacity: 0.7;
    margin-left: auto;
  }
`;

const CTASection = styled.section`
  background: var(--gradient-secondary);
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
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: var(--space-6);
  }

  .cta-button {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-4) var(--space-8);
    background: white;
    color: var(--color-secondary-700);
    font-weight: 600;
    border-radius: var(--radius-full);
    box-shadow: var(--shadow-lg);
    transition: all var(--transition-base);

    &:hover {
      transform: translateY(-2px);
    }
  }
`;

export default Faq;
