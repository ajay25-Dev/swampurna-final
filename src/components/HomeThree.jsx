import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiPlus, FiMinus, FiExternalLink } from 'react-icons/fi';
import { useContentItems } from '../hooks/useContentItems';

const HomeThree = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const fallbackAccordion = [
    { title: "Our Vision", emoji: "✨", color: "primary", description: "Our vision is to build an inclusive society where marginalized communities adopt scientific, sustainable, and dignified attitudes toward menstruation, leading to healthier outcomes and long-term development." },
    { title: "Our Mission", emoji: "🎯", color: "secondary", description: "Our mission is to create awareness, promote positive attitudes, and encourage sustainable menstrual practices within marginalized communities. We aim to empower individuals with knowledge, confidence, and dignity while supporting India’s health goals and the Sustainable Development Agenda." },
    { title: "Our Story", emoji: "💫", color: "primary", description: "Our story began with a simple goal — to support girls in marginalized communities who face confusion, stigma, and silence around menstruation. Through workshops, community engagement, and digital tools, SWAMPURNA aims to provide safe, scientific, and dignified menstrual health education for all." },
  ];

  const { items: headerItems } = useContentItems({
    page: "home",
    section: "home_about_header",
    fallback: [
      {
        title: "Know Who We Are",
        subtitle: "Discover our journey, mission, and the impact we're making in menstrual health education",
        tag: "About Swampurna",
      },
    ],
  });

  const { items: accordionItems } = useContentItems({
    page: "home",
    section: "home_about_accordion",
    fallback: fallbackAccordion.map((item, idx) => ({
      title: item.title,
      description: item.description,
      tag: item.emoji,
      meta: { color: item.color },
      sort_order: idx,
    })),
  });

  const { items: videoItems } = useContentItems({
    page: "home",
    section: "home_about_video",
    fallback: [
      {
        title: "Watch Our Story",
        subtitle: "Learn about our mission to transform menstrual health education across India",
        link_url: "https://www.youtube.com/watch?v=jRBR-64Y5Ns",
        image_url: "https://www.youtube.com/embed/jRBR-64Y5Ns",
      },
    ],
  });

  const header = headerItems?.[0] || {};
  const video = videoItems?.[0] || {};

  return (
    <SectionWrapper>
      <div className="bg-decoration">
        <div className="deco-circle circle-1"></div>
        <div className="deco-circle circle-2"></div>
      </div>
      
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <Link to="/Missionvision" className="section-eyebrow eyebrow-button">
            {header.tag || "About Swampurna"}
          </Link>
          <h2 className="section-title">
            {header.title ? (
              <>
                {header.title.split(" ").slice(0, -2).join(" ")}{" "}
                <span className="title-accent">
                  {header.title.split(" ").slice(-2).join(" ")}
                </span>
              </>
            ) : (
              <>Know Who <span className="title-accent">We Are</span></>
            )}
          </h2>
          <p className="section-subtitle">
            {header.subtitle || "Discover our journey, mission, and the impact we're making in menstrual health education"}
          </p>
        </div>

        <div className="content-grid">
          {/* Accordion */}
          <div className="accordion-wrapper">
            {accordionItems.map((item, index) => (
              <div 
                className={`accordion-item ${activeIndex === index ? 'active' : ''} color-${item.meta?.color || "primary"}`} 
                key={index}
              >
                <button
                  className="accordion-header"
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={activeIndex === index}
                >
                  <div className="header-content">
                    <span className="item-emoji">{item.tag || "✨"}</span>
                    <span className="item-title">{item.title}</span>
                  </div>
                  <div className="toggle-icon">
                    {activeIndex === index ? <FiMinus /> : <FiPlus />}
                  </div>
                </button>
                <div className={`accordion-content ${activeIndex === index ? 'show' : ''}`}>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Video Section */}
          <div className="video-wrapper">
            <div className="video-card">
              <iframe
                src={video.image_url || "https://www.youtube.com/embed/jRBR-64Y5Ns"}
                title={video.title || "Swampurna Introduction"}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            
            <div className="video-info">
              <h4 className="video-title">{video.title || "Watch Our Story"}</h4>
              <p className="video-description">
                {video.subtitle || "Learn about our mission to transform menstrual health education across India"}
              </p>
              <a 
                href={video.link_url || "https://www.youtube.com/watch?v=jRBR-64Y5Ns"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="video-link"
              >
                <span>Full Documentary</span>
                <FiExternalLink />
              </a>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

const SectionWrapper = styled.section`
  padding: var(--space-24) var(--space-6);
  position: relative;
  overflow: hidden;

  /* Background Decoration */
  .bg-decoration {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: -1;
  }

  .deco-circle {
    position: absolute;
    border-radius: 50%;
    border: 1px solid var(--color-dark-100);
  }

  .circle-1 {
    width: 600px;
    height: 600px;
    top: -200px;
    left: -200px;
    border: 1px dashed var(--color-secondary-200);
  }

  .circle-2 {
    width: 400px;
    height: 400px;
    bottom: -100px;
    right: -100px;
    border: 1px dashed var(--color-primary-200);
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
    background: var(--color-secondary-50);
    color: var(--color-secondary-700);
    font-size: var(--text-xs);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    border-radius: var(--radius-full);
    margin-bottom: var(--space-5);
    border: 1px solid var(--color-secondary-100);
    text-decoration: none;
    transition: all var(--transition-base);
  }

  .eyebrow-button {
    cursor: pointer;
    
    &:hover {
      background: var(--color-secondary-100);
      border-color: var(--color-secondary-200);
      transform: translateY(-1px);
      box-shadow: var(--shadow-soft);
    }

    &:active {
      transform: translateY(0);
    }
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
    background: var(--gradient-secondary);
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

  /* Content Grid */
  .content-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-12);
    align-items: start;
  }

  /* Accordion */
  .accordion-wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .accordion-item {
    background: white;
    border-radius: var(--radius-2xl);
    overflow: hidden;
    box-shadow: var(--shadow-soft);
    border: 1px solid var(--color-dark-100);
    transition: all var(--transition-base);

    &:hover:not(.active) {
      border-color: var(--color-dark-200);
      box-shadow: var(--shadow-soft-lg);
    }

    &.active {
      box-shadow: var(--shadow-lg);
    }

    &.active.color-primary {
      border-color: var(--color-primary-200);
      
      .accordion-header {
        background: var(--gradient-primary);
      }
    }

    &.active.color-secondary {
      border-color: var(--color-secondary-200);
      
      .accordion-header {
        background: var(--gradient-secondary);
      }
    }

    &.active.color-accent {
      border-color: var(--color-accent-200);
      
      .accordion-header {
        background: var(--gradient-accent);
      }
    }
  }

  .accordion-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-5) var(--space-6);
    background: transparent;
    border: none;
    cursor: pointer;
    transition: all var(--transition-base);
    color: var(--color-dark-800);

    .accordion-item.active & {
      color: white;
    }
  }

  .header-content {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }

  .item-emoji {
    font-size: 1.5rem;
    line-height: 1;
  }

  .item-title {
    font-size: var(--text-lg);
    font-weight: 600;
    font-family: var(--font-heading);
  }

  .toggle-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: var(--color-dark-100);
    border-radius: var(--radius-lg);
    color: var(--color-dark-600);
    font-size: 1rem;
    transition: all var(--transition-base);

    .accordion-item.active & {
      background: rgba(255, 255, 255, 0.2);
      color: white;
    }
  }

  .accordion-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height var(--transition-slow), padding var(--transition-slow);

    &.show {
      max-height: 300px;
      padding: 0 var(--space-6) var(--space-6);
    }

    p {
      font-size: var(--text-sm);
      color: var(--color-dark-600);
      line-height: 1.9;
      padding-left: calc(var(--space-3) + 1.5rem);
    }
  }

  /* Video Section */
  .video-wrapper {
    position: sticky;
    top: 120px;
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
  }

  .video-card {
    position: relative;
    border-radius: var(--radius-3xl);
    overflow: hidden;
    box-shadow: var(--shadow-xl);
    background: var(--color-dark-900);
    aspect-ratio: 16 / 10;

    iframe {
      width: 100%;
      height: 100%;
      display: block;
    }
  }


  .video-info {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    padding: 0 var(--space-2);
  }

  .video-title {
    font-family: var(--font-heading);
    font-size: var(--text-2xl);
    font-weight: 600;
    color: var(--color-dark-900);
    margin: 0;
  }

  .video-description {
    font-size: var(--text-base);
    color: var(--color-dark-500);
    line-height: 1.6;
    margin: 0;
  }

  .video-link {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    color: var(--color-secondary-600);
    font-size: var(--text-sm);
    font-weight: 600;
    transition: all var(--transition-base);
    margin-top: var(--space-2);
    width: fit-content;

    &:hover {
      color: var(--color-secondary-700);
      gap: var(--space-3);
    }
  }

  /* Responsive */
  @media (max-width: 1024px) {
    padding: var(--space-16) var(--space-6);
    
    .content-grid {
      grid-template-columns: 1fr;
      gap: var(--space-10);
    }

    .video-wrapper {
      position: relative;
      top: 0;
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

    .accordion-header {
      padding: var(--space-4) var(--space-5);
    }

    .item-title {
      font-size: var(--text-base);
    }
  }
`;

export default HomeThree;
