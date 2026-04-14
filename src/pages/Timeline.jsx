import React from 'react';
import styled from 'styled-components';
import { FiCalendar, FiClock, FiCheck, FiArrowRight } from 'react-icons/fi';

const Timeline = () => {
  const timeline = [
    {
      date: 'October 15, 2024',
      title: 'Registration Opens',
      description: 'Sign up and create your profile. Start forming your team early!',
      status: 'completed',
      type: 'milestone'
    },
    {
      date: 'October 20-25, 2024',
      title: 'Pre-Hackathon Workshops',
      description: 'Join our online workshops on menstrual health, design thinking, and tech tools.',
      status: 'completed',
      type: 'event'
    },
    {
      date: 'November 1, 2024',
      title: 'Team Formation Deadline',
      description: 'Finalize your team of 2-4 members. Solo participants will be matched with teams.',
      status: 'current',
      type: 'milestone'
    },
    {
      date: 'November 5, 2024',
      title: 'Mentor Matching',
      description: 'Get paired with industry mentors who will guide you throughout the hackathon.',
      status: 'upcoming',
      type: 'event'
    },
    {
      date: 'November 10, 2024 - 9:00 AM',
      title: 'Hackathon Kickoff',
      description: 'Opening ceremony, challenge briefings, and the official start of hacking!',
      status: 'upcoming',
      type: 'milestone'
    },
    {
      date: 'November 10-11, 2024',
      title: 'Building Phase',
      description: '48 hours of coding, designing, and building. Mentor office hours available.',
      status: 'upcoming',
      type: 'event'
    },
    {
      date: 'November 12, 2024 - 12:00 PM',
      title: 'Submission Deadline',
      description: 'Submit your project including demo, code, and documentation.',
      status: 'upcoming',
      type: 'milestone'
    },
    {
      date: 'November 12, 2024 - 3:00 PM',
      title: 'Presentations Begin',
      description: 'Top teams present their solutions to the judging panel.',
      status: 'upcoming',
      type: 'event'
    },
    {
      date: 'November 15, 2024',
      title: 'Winners Announced',
      description: 'Award ceremony and celebration. Winners receive prizes and recognition!',
      status: 'upcoming',
      type: 'milestone'
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
        <span className="section-eyebrow">Event Schedule</span>
        <h1 className="hero-title">
          Hackathon <span className="title-accent">Timeline</span>
        </h1>
        <p className="hero-description">
          Stay on track with all the important dates and milestones for the 
          SWAMPURNA Hackathon 2024. Don't miss any deadlines!
        </p>
      </HeroSection>

      {/* Legend */}
      <Legend>
        <div className="legend-item">
          <span className="status-dot completed"></span>
          <span>Completed</span>
        </div>
        <div className="legend-item">
          <span className="status-dot current"></span>
          <span>Current</span>
        </div>
        <div className="legend-item">
          <span className="status-dot upcoming"></span>
          <span>Upcoming</span>
        </div>
      </Legend>

      {/* Timeline Section */}
      <TimelineSection>
        <div className="timeline-line"></div>
        {timeline.map((item, index) => (
          <TimelineItem key={index} className={`${item.status} ${item.type}`}>
            <div className="timeline-dot">
              {item.status === 'completed' && <FiCheck />}
            </div>
            <div className="timeline-card">
              <div className="card-header">
                <div className="date-badge">
                  <FiCalendar />
                  <span>{item.date}</span>
                </div>
                {item.type === 'milestone' && (
                  <span className="milestone-badge">Milestone</span>
                )}
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </TimelineItem>
        ))}
      </TimelineSection>

      {/* CTA Section */}
      <CTASection>
        <h2>Ready to Start Building?</h2>
        <p>Register now to secure your spot and receive important updates</p>
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
  max-width: 900px;
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
  margin-bottom: var(--space-8);

  .section-eyebrow {
    display: inline-block;
    padding: var(--space-2) var(--space-5);
    background: var(--color-secondary-50);
    color: var(--color-secondary-700);
    font-size: var(--text-xs);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    border-radius: var(--radius-full);
    margin-bottom: var(--space-5);
    border: 1px solid var(--color-secondary-100);
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
    background: var(--gradient-secondary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-description {
    font-size: var(--text-lg);
    color: var(--color-dark-500);
    line-height: 1.8;
  }

  @media (max-width: 768px) {
    .hero-title {
      font-size: var(--text-4xl);
    }
  }
`;

const Legend = styled.div`
  display: flex;
  justify-content: center;
  gap: var(--space-6);
  margin-bottom: var(--space-8);

  .legend-item {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-sm);
    color: var(--color-dark-500);
  }

  .status-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;

    &.completed {
      background: var(--color-secondary-500);
    }

    &.current {
      background: var(--color-primary-500);
      animation: pulse 2s infinite;
    }

    &.upcoming {
      background: var(--color-dark-300);
    }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(1.2); }
  }
`;

const TimelineSection = styled.section`
  position: relative;
  margin-bottom: var(--space-12);

  .timeline-line {
    position: absolute;
    left: 24px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, 
      var(--color-secondary-300) 0%, 
      var(--color-primary-300) 50%, 
      var(--color-dark-200) 100%
    );

    @media (max-width: 640px) {
      left: 16px;
    }
  }
`;

const TimelineItem = styled.div`
  position: relative;
  padding-left: 70px;
  margin-bottom: var(--space-6);

  @media (max-width: 640px) {
    padding-left: 50px;
  }

  .timeline-dot {
    position: absolute;
    left: 12px;
    top: var(--space-5);
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    border: 3px solid white;
    box-shadow: var(--shadow-md);

    @media (max-width: 640px) {
      left: 4px;
      width: 20px;
      height: 20px;
    }
  }

  &.completed .timeline-dot {
    background: var(--color-secondary-500);
    color: white;
  }

  &.current .timeline-dot {
    background: var(--color-primary-500);
    animation: pulse 2s infinite;
  }

  &.upcoming .timeline-dot {
    background: var(--color-dark-300);
  }

  .timeline-card {
    background: white;
    border-radius: var(--radius-2xl);
    padding: var(--space-5);
    box-shadow: var(--shadow-soft);
    border: 1px solid var(--color-dark-100);
    transition: all var(--transition-base);
  }

  &.current .timeline-card {
    border-color: var(--color-primary-200);
    box-shadow: var(--shadow-soft-lg);
  }

  &.milestone .timeline-card {
    background: linear-gradient(135deg, white, var(--color-cream-100));
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-3);
  }

  .date-badge {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-sm);
    color: var(--color-dark-500);
  }

  .milestone-badge {
    font-size: var(--text-xs);
    font-weight: 600;
    padding: var(--space-1) var(--space-3);
    background: var(--color-accent-100);
    color: var(--color-accent-700);
    border-radius: var(--radius-full);
  }

  h3 {
    font-family: var(--font-heading);
    font-size: var(--text-lg);
    font-weight: 600;
    color: var(--color-dark-900);
    margin-bottom: var(--space-2);
  }

  p {
    font-size: var(--text-sm);
    color: var(--color-dark-500);
    line-height: 1.6;
  }
`;

const CTASection = styled.section`
  background: var(--gradient-primary);
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
    color: var(--color-primary-700);
    font-weight: 600;
    border-radius: var(--radius-full);
    box-shadow: var(--shadow-lg);
    transition: all var(--transition-base);

    &:hover {
      transform: translateY(-2px);
    }
  }
`;

export default Timeline;
