import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiCalendar, FiMapPin, FiArrowRight } from 'react-icons/fi';
import { useContentItems } from '../hooks/useContentItems';
import image1 from '../assets/images/img34.png';
import image2 from '../assets/images/img35.png';
import image3 from '../assets/images/img36.png';

const fallbackEvents = [
  {
    title: 'Hackathon for Health',
    subtitle: 'November 10th, 2026',
    description: 'Join our virtual hackathon where participants collaborate on digital menstrual health solutions.',
    image_url: image1,
    tag: 'upcoming',
    sort_order: 0,
    link_url: 'https://docs.google.com/forms/d/e/1FAIpQLSfC8IFaUgQpJCX3ZrVSZZy92KeunqW6KIdTuScYWoM8e1FgaQ/viewform',
    meta: { location: 'Virtual', buttonText: 'Register Now', color: 'primary' },
  },
  {
    title: 'Poster & Mascot Design Competition',
    subtitle: 'October 25th, 2026',
    description: 'Unleash your creativity and design campaign mascot/poster to raise awareness.',
    image_url: image2,
    tag: 'active',
    sort_order: 1,
    link_url: 'https://docs.google.com/forms/d/e/1FAIpQLSfC8IFaUgQpJCX3ZrVSZZy92KeunqW6KIdTuScYWoM8e1FgaQ/viewform',
    meta: { location: 'Open to all (Submit online)', buttonText: 'Submit Your Design', color: 'secondary' },
  },
  {
    title: 'Storytelling and Short Film Festival',
    subtitle: 'December 15th, 2026',
    description: 'Share compelling stories around menstrual health and social stigma via short films.',
    image_url: image3,
    tag: 'upcoming',
    sort_order: 2,
    link_url: 'https://docs.google.com/forms/d/e/1FAIpQLSfC8IFaUgQpJCX3ZrVSZZy92KeunqW6KIdTuScYWoM8e1FgaQ/viewform',
    meta: { location: 'Online and In-Person', buttonText: 'Submit Your Film', color: 'accent' },
  },
];

function slugify(text = '') {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function eventSlug(event, index) {
  if (event?.meta?.slug) return event.meta.slug;
  const base = slugify(event?.title) || `event-${index + 1}`;
  if (event?.id) {
    const short = String(event.id).split('-')[0];
    return `${base}-${short}`;
  }
  return base;
}

const Compitionevent = () => {
  const { items } = useContentItems({
    page: 'Compitionevent',
    section: 'competition_events',
    fallback: fallbackEvents,
  });

  const events = items || [];

  return (
    <PageWrapper>
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

      <EventsGrid>
        {events.map((event, index) => {
          const color = event.meta?.color || 'primary';
          const status = event.tag || 'upcoming';
          return (
            <EventCard key={eventSlug(event, index)} className={`color-${color}`}>
              <div className="event-image">
                <img src={event.image_url || image1} alt={event.title} />
                <span className={`status-badge ${status}`}>
                  {status === 'active' ? 'Active Now' : status === 'closed' ? 'Closed' : 'Upcoming'}
                </span>
              </div>
              <div className="event-content">
                <h3>{event.title}</h3>
                <div className="event-meta">
                  <div className="meta-item"><FiCalendar /><span>{event.subtitle}</span></div>
                  <div className="meta-item"><FiMapPin /><span>{event.meta?.location || 'TBA'}</span></div>
                </div>
                <p>{event.description}</p>
                <Link to={`/Compitionevent/${eventSlug(event, index)}`} className={`event-button color-${color}`}>
                  <span>{event.meta?.buttonText || 'View Details'}</span>
                  <FiArrowRight />
                </Link>
              </div>
            </EventCard>
          );
        })}
      </EventsGrid>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  padding: var(--space-8) var(--space-6) var(--space-16);
  max-width: 1200px;
  margin: 0 auto;
`;
const HeroSection = styled.section`
  text-align: center;
  margin-bottom: var(--space-8);
  .section-eyebrow { display: inline-block; padding: var(--space-2) var(--space-5); background: var(--color-accent-50); color: var(--color-accent-700); font-size: var(--text-xs); font-weight: 600; border-radius: var(--radius-full); margin-bottom: var(--space-5); }
  .hero-title { font-family: var(--font-heading); font-size: var(--text-5xl); margin-bottom: var(--space-5); }
  .title-accent { background: var(--gradient-accent); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .hero-description { color: var(--color-dark-500); max-width: 650px; margin: 0 auto; }
`;
const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`;
const EventCard = styled.article`
  background: white;
  border-radius: var(--radius-2xl);
  overflow: hidden;
  border: 1px solid var(--color-dark-100);
  display: flex;
  flex-direction: column;
  .event-image { position: relative; height: 180px; }
  .event-image img { width: 100%; height: 100%; object-fit: cover; }
  .status-badge { position: absolute; top: var(--space-3); right: var(--space-3); padding: 4px 10px; border-radius: var(--radius-full); font-size: 0.75rem; font-weight: 600; }
  .status-badge.active { background: var(--color-secondary-500); color: #fff; }
  .status-badge.upcoming { background: var(--color-accent-500); color: var(--color-dark-900); }
  .status-badge.closed { background: var(--color-dark-200); color: var(--color-dark-700); }
  .event-content { padding: var(--space-5); display: grid; gap: var(--space-3); height: 100%; }
  h3 { font-family: var(--font-heading); font-size: var(--text-lg); margin: 0; }
  .event-meta { display: grid; gap: 6px; }
  .meta-item { display: flex; gap: 6px; align-items: center; color: var(--color-dark-500); font-size: var(--text-sm); }
  p { color: var(--color-dark-500); line-height: 1.7; margin: 0; }
  .event-button { margin-top: auto; display: inline-flex; align-items: center; gap: 8px; padding: var(--space-3) var(--space-5); border-radius: var(--radius-full); color: #fff; font-weight: 600; }
  .event-button.color-primary { background: var(--gradient-primary); }
  .event-button.color-secondary { background: var(--gradient-secondary); }
  .event-button.color-accent { background: var(--gradient-accent); color: var(--color-dark-900); }
`;

export default Compitionevent;
