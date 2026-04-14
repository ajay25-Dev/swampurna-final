import React from 'react';
import styled from 'styled-components';
import { FiCalendar, FiMapPin, FiArrowRight, FiAward, FiUsers, FiZap } from 'react-icons/fi';
import image1 from '../assets/images/img34.png';
import image2 from '../assets/images/img35.png';
import image3 from '../assets/images/img36.png';

const Compitionevent = () => {
  const events = [
    {
      image: image1,
      title: 'Hackathon for Health',
      date: 'November 10th, 2024',
      location: 'Virtual',
      description: 'Join our virtual hackathon where participants will collaborate on building digital solutions that enhance menstrual health education. Top teams will win exciting prizes and mentorship opportunities.',
      buttonText: 'Register Now',
      icon: FiZap,
      color: 'primary',
      status: 'upcoming'
    },
    {
      image: image2,
      title: 'Poster & Mascot Design Competition',
      date: 'October 25th, 2024',
      location: 'Open to all (Submit online)',
      description: 'Unleash your creativity and help design our next campaign mascot or create an inspiring digital poster! This competition aims to raise awareness about menstrual hygiene and sustainable practices.',
      buttonText: 'Submit Your Design',
      icon: FiAward,
      color: 'secondary',
      status: 'active'
    },
    {
      image: image3,
      title: 'Storytelling and Short Film Festival',
      date: 'December 15th, 2024',
      location: 'Online and In-Person (City Halls)',
      description: 'Share compelling stories about menstrual health, social stigma, and solutions through short films. The festival will feature live screenings and awards for the best stories.',
      buttonText: 'Submit Your Film',
      icon: FiUsers,
      color: 'accent',
      status: 'upcoming'
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
        <span className="section-eyebrow">Events & Competitions</span>
        <h1 className="hero-title">
          SWAMPURNA <span className="title-accent">Competitions</span>
        </h1>
        <p className="hero-description">
          Join our exciting competitions and events designed to foster innovation, 
          creativity, and awareness around menstrual health. Participate, compete, 
          and win amazing prizes while making a difference!
        </p>
      </HeroSection>

      {/* Events Section */}
      <div className="section-label">
        <span className="label-line"></span>
        <span className="label-text">Upcoming Events</span>
        <span className="label-line"></span>
      </div>

      <EventsGrid>
        {events.map((event, index) => (
          <EventCard key={index} className={`color-${event.color}`}>
            <div className="event-image">
              <img src={event.image} alt={event.title} />
              <span className={`status-badge ${event.status}`}>
                {event.status === 'active' ? 'Active Now' : 'Upcoming'}
              </span>
            </div>
            <div className="event-content">
              <div className={`event-icon color-${event.color}`}>
                <event.icon />
              </div>
              <h3>{event.title}</h3>
              <div className="event-meta">
                <div className="meta-item">
                  <FiCalendar />
                  <span>{event.date}</span>
                </div>
                <div className="meta-item">
                  <FiMapPin />
                  <span>{event.location}</span>
                </div>
              </div>
              <p>{event.description}</p>
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSfC8IFaUgQpJCX3ZrVSZZy92KeunqW6KIdTuScYWoM8e1FgaQ/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className={`event-button color-${event.color}`}
              >
                <span>{event.buttonText}</span>
                <FiArrowRight />
              </a>
            </div>
          </EventCard>
        ))}
      </EventsGrid>
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
    white-space: nowrap;
    border: 1px solid var(--color-accent-100);
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
    max-width: 650px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    .hero-title {
      font-size: var(--text-4xl);
    }
  }
`;

const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
  margin-bottom: var(--space-12);

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const EventCard = styled.article`
  background: white;
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--color-dark-100);
  transition: all var(--transition-slow);
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-6px);
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

  .event-image {
    position: relative;
    height: 180px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .status-badge {
      position: absolute;
      top: var(--space-3);
      right: var(--space-3);
      padding: var(--space-1) var(--space-3);
      border-radius: var(--radius-full);
      font-size: var(--text-xs);
      font-weight: 600;

      &.active {
        background: var(--color-secondary-500);
        color: white;
      }

      &.upcoming {
        background: var(--color-accent-500);
        color: var(--color-dark-900);
      }
    }
  }

  .event-content {
    padding: var(--space-5);
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .event-icon {
    width: 44px;
    height: 44px;
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    margin-bottom: var(--space-3);

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
    font-size: var(--text-lg);
    font-weight: 600;
    color: var(--color-dark-900);
    margin-bottom: var(--space-3);
  }

  .event-meta {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    margin-bottom: var(--space-4);
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-sm);
    color: var(--color-dark-400);
  }

  p {
    font-size: var(--text-sm);
    color: var(--color-dark-500);
    line-height: 1.7;
    margin-bottom: var(--space-5);
    flex: 1;
  }

  .event-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    padding: var(--space-3) var(--space-5);
    border-radius: var(--radius-full);
    font-weight: 600;
    font-size: var(--text-sm);
    color: white;
    transition: all var(--transition-base);
    text-decoration: none;
    border: none;
    cursor: pointer;

    &.color-primary {
      background: var(--gradient-primary);
    }

    &.color-secondary {
      background: var(--gradient-secondary);
    }

    &.color-accent {
      background: var(--gradient-accent);
      color: var(--color-dark-900);
    }

    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);
    }
  }
`;

export default Compitionevent;
