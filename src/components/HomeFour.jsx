import React, { useState } from 'react';
import styled from 'styled-components';
import { FiCalendar, FiArrowRight, FiClock, FiBell, FiTrendingUp, FiChevronRight } from 'react-icons/fi';
import { useContentItems } from '../hooks/useContentItems';

const HomeFour = () => {
  const { items: headerItems } = useContentItems({
    page: "home",
    section: "home_updates_header",
    fallback: [
      {
        title: "News & Events",
        subtitle: "Keep track of our latest activities, upcoming events, and important announcements",
        tag: "Stay Updated",
      },
    ],
  });

  const { items: events } = useContentItems({
    page: "home",
    section: "home_current_updates",
    fallback: [],
  });

  const { items: upcomingEvents } = useContentItems({
    page: "home",
    section: "home_upcoming_events",
    fallback: [],
  });

  const { items: latestUpdates } = useContentItems({
    page: "home",
    section: "home_latest_updates",
    fallback: [],
  });

  const header = headerItems?.[0] || {};

  const EventCard = ({ event, index }) => (
    <div 
      className={`event-card ${event.type}`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="event-header">
        <span className="event-category">{event.category}</span>
        <div className="event-date">
          <FiCalendar />
          <span>{event.date}</span>
        </div>
      </div>
      <p className="event-text">{event.text}</p>
      <button className="event-link">
        <span>Learn more</span>
        <FiChevronRight />
      </button>
    </div>
  );

  return (
    <UpdatesSection>
      <div className="section-bg">
        <div className="bg-gradient"></div>
      </div>
      
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">{header.tag || "Stay Updated"}</span>
          <h2 className="section-title">
            {header.title || "News & Events"}
          </h2>
          <p className="section-subtitle">
            {header.subtitle || "Keep track of our latest activities, upcoming events, and important announcements"}
          </p>
        </div>

        {/* Updates Grid */}
        <div className="updates-grid">
          {/* Current Updates */}
          <div className="update-column">
            <div className="column-header">
              <div className="header-icon current">
                <FiClock />
              </div>
              <div className="header-text">
                <h3>Current Updates</h3>
                <span className="header-count">{events.length} items</span>
              </div>
            </div>
            <div className="events-list">
              {events.length === 0 ? (
                <div className="coming-soon-message">
                  <p>Coming Soon</p>
                </div>
              ) : (
                events.map((event, index) => (
                  <EventCard event={{ ...event, type: "current", date: event.subtitle, category: event.tag, text: event.title }} index={index} key={event.id || index} />
                ))
              )}
            </div>
          </div>

          {/* Upcoming Events - Featured */}
          <div className="update-column featured">
            <div className="column-header">
              <div className="header-icon upcoming">
                <FiBell />
              </div>
              <div className="header-text">
                <h3>Upcoming Events</h3>
                <span className="header-count">{upcomingEvents.length} scheduled</span>
              </div>
            </div>
            <div className="events-list">
              {upcomingEvents.length === 0 ? (
                <div className="coming-soon-message">
                  <p>Coming Soon</p>
                </div>
              ) : (
                upcomingEvents.map((event, index) => (
                  <EventCard event={{ ...event, type: "upcoming", date: event.subtitle, category: event.tag, text: event.title }} index={index} key={event.id || index} />
                ))
              )}
            </div>
          </div>

          {/* Latest Updates */}
          <div className="update-column">
            <div className="column-header">
              <div className="header-icon update">
                <FiTrendingUp />
              </div>
              <div className="header-text">
                <h3>Latest Updates</h3>
                <span className="header-count">{latestUpdates.length} new</span>
              </div>
            </div>
            <div className="events-list">
              {latestUpdates.length === 0 ? (
                <div className="coming-soon-message">
                  <p>Coming Soon</p>
                </div>
              ) : (
                latestUpdates.map((event, index) => (
                  <EventCard event={{ ...event, type: "update", date: event.subtitle, category: event.tag, text: event.title }} index={index} key={event.id || index} />
                ))
              )}
            </div>
          </div>
        </div>

        {/* View All Button */}
        <div className="view-all-wrapper">
          <button className="view-all-btn">
            <span>View All Updates</span>
            <FiArrowRight />
          </button>
        </div>
      </div>
    </UpdatesSection>
  );
};

const UpdatesSection = styled.section`
  padding: var(--space-24) var(--space-6);
  position: relative;
  overflow: hidden;

  /* Background */
  .section-bg {
    position: absolute;
    inset: 0;
    z-index: -1;
  }

  .bg-gradient {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, 
      var(--color-cream-100) 0%, 
      var(--color-cream-200) 50%,
      var(--color-cream-100) 100%
    );
  }

  .section-container {
    max-width: 1200px;
    margin: 0 auto;
  }

  /* Section Header */
  .section-header {
    text-align: center;
    margin-bottom: var(--space-14);
  }

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

  .section-title {
    font-family: var(--font-heading);
    font-size: var(--text-5xl);
    font-weight: 600;
    color: var(--color-dark-900);
    margin-bottom: var(--space-4);
    line-height: 1.1;
  }

  .title-accent {
    background: var(--gradient-accent);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .section-subtitle {
    font-size: var(--text-lg);
    color: var(--color-dark-500);
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.7;
  }

  /* Updates Grid */
  .updates-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-6);
  }

  /* Update Column */
  .update-column {
    background: white;
    border-radius: var(--radius-3xl);
    padding: var(--space-6);
    box-shadow: var(--shadow-soft);
    border: 1px solid var(--color-dark-100);
    transition: all var(--transition-base);

    &:hover {
      box-shadow: var(--shadow-soft-lg);
      transform: translateY(-4px);
    }

    &.featured {
      background: linear-gradient(135deg, var(--color-primary-50) 0%, var(--color-cream-200) 100%);
      border-color: var(--color-primary-100);
      position: relative;

      &::before {
        content: 'Featured';
        position: absolute;
        top: var(--space-4);
        right: var(--space-4);
        padding: var(--space-1) var(--space-3);
        background: var(--color-primary-500);
        color: white;
        font-size: 0.65rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        border-radius: var(--radius-full);
      }
    }
  }

  /* Column Header */
  .column-header {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    margin-bottom: var(--space-6);
    padding-bottom: var(--space-5);
    border-bottom: 1px solid var(--color-dark-100);
  }

  .header-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: var(--radius-xl);
    font-size: 1.25rem;

    &.current {
      background: linear-gradient(135deg, var(--color-secondary-100), var(--color-secondary-50));
      color: var(--color-secondary-600);
    }

    &.upcoming {
      background: linear-gradient(135deg, var(--color-primary-100), var(--color-primary-50));
      color: var(--color-primary-600);
    }

    &.update {
      background: linear-gradient(135deg, var(--color-accent-100), var(--color-accent-50));
      color: var(--color-accent-700);
    }
  }

  .header-text {
    display: flex;
    flex-direction: column;
    gap: 2px;

    h3 {
      font-family: var(--font-heading);
      font-size: var(--text-xl);
      font-weight: 600;
      color: var(--color-dark-900);
      margin: 0;
      line-height: 1;
    }
  }

  .header-count {
    font-size: var(--text-xs);
    color: var(--color-dark-400);
    font-weight: 500;
  }

  /* Events List */
  .events-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .coming-soon-message {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-12) var(--space-6);
    text-align: center;

    p {
      font-family: var(--font-heading);
      font-size: var(--text-2xl);
      font-weight: 600;
      color: var(--color-dark-400);
      margin: 0;
    }
  }

  /* Event Card */
  .event-card {
    padding: var(--space-4);
    background: rgba(255, 255, 255, 0.7);
    border-radius: var(--radius-xl);
    border: 1px solid transparent;
    transition: all var(--transition-base);
    animation: fadeInUp 0.5s ease-out forwards;
    opacity: 0;

    &:hover {
      background: white;
      border-color: var(--color-dark-100);
      box-shadow: var(--shadow-soft);

      .event-link {
        opacity: 1;
        
        svg {
          transform: translateX(4px);
        }
      }
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .event-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--space-3);
  }

  .event-category {
    padding: var(--space-1) var(--space-2-5);
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    border-radius: var(--radius-md);
    
    .event-card.current & {
      background: var(--color-secondary-100);
      color: var(--color-secondary-700);
    }

    .event-card.upcoming & {
      background: var(--color-primary-100);
      color: var(--color-primary-700);
    }

    .event-card.update & {
      background: var(--color-accent-100);
      color: var(--color-accent-800);
    }
  }

  .event-date {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    font-size: var(--text-xs);
    color: var(--color-dark-400);

    svg {
      font-size: 0.75rem;
    }
  }

  .event-text {
    font-size: var(--text-sm);
    color: var(--color-dark-700);
    line-height: 1.6;
    margin: 0 0 var(--space-3) 0;
  }

  .event-link {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    font-size: var(--text-xs);
    font-weight: 600;
    color: var(--color-primary-600);
    opacity: 0;
    transition: all var(--transition-base);

    svg {
      transition: transform var(--transition-base);
    }
  }

  /* View All Button */
  .view-all-wrapper {
    display: flex;
    justify-content: center;
    margin-top: var(--space-12);
  }

  .view-all-btn {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-4) var(--space-8);
    background: white;
    color: var(--color-dark-700);
    font-size: var(--text-base);
    font-weight: 600;
    border-radius: var(--radius-full);
    border: 2px solid var(--color-dark-200);
    transition: all var(--transition-base);
    box-shadow: var(--shadow-soft);

    &:hover {
      border-color: var(--color-primary-400);
      color: var(--color-primary-600);
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);

      svg {
        transform: translateX(4px);
      }
    }

    svg {
      transition: transform var(--transition-base);
    }
  }

  /* Responsive */
  @media (max-width: 1024px) {
    padding: var(--space-16) var(--space-6);
    
    .updates-grid {
      grid-template-columns: 1fr;
      gap: var(--space-6);
    }

    .update-column.featured {
      order: -1;
    }
  }

  @media (max-width: 640px) {
    padding: var(--space-12) var(--space-4);

    .section-title {
      font-size: var(--text-4xl);
    }

    .section-subtitle {
      font-size: var(--text-base);
    }

    .update-column {
      padding: var(--space-5);
    }
  }
`;

export default HomeFour;
