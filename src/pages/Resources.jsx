import React from 'react';
import styled from 'styled-components';
import { FiDownload, FiExternalLink, FiBook, FiVideo, FiFileText, FiCode, FiArrowRight } from 'react-icons/fi';

const Resources = () => {
  const resourceCategories = [
    {
      icon: FiBook,
      title: 'Design Guidelines',
      description: 'Brand assets, UI kits, and design specifications for SWAMPURNA projects.',
      items: ['Brand Guidelines PDF', 'Logo Package', 'Color Palette', 'Typography Guide'],
      color: 'primary'
    },
    {
      icon: FiCode,
      title: 'Technical Resources',
      description: 'APIs, SDKs, and documentation for developers building menstrual health solutions.',
      items: ['API Documentation', 'Sample Code', 'SDK Downloads', 'Integration Guides'],
      color: 'secondary'
    },
    {
      icon: FiVideo,
      title: 'Training Materials',
      description: 'Video tutorials and workshops on menstrual health education best practices.',
      items: ['Workshop Videos', 'Training Presentations', 'Facilitator Guides', 'Activity Templates'],
      color: 'accent'
    },
    {
      icon: FiFileText,
      title: 'Research Papers',
      description: 'Academic research and reports on menstrual health in India.',
      items: ['Research Reports', 'Survey Data', 'Impact Studies', 'Policy Briefs'],
      color: 'primary'
    },
  ];

  const quickLinks = [
    { title: 'Hackathon Starter Kit', icon: FiCode, description: 'Everything you need to start building' },
    { title: 'Educational Posters', icon: FiFileText, description: 'Print-ready awareness materials' },
    { title: 'App Prototype', icon: FiDownload, description: 'Mobile app design files' },
    { title: 'Partner Toolkit', icon: FiBook, description: 'Resources for partner organizations' },
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
        <span className="section-eyebrow">Resources Hub</span>
        <h1 className="hero-title">
          Hackathon <span className="title-accent">Resources</span>
        </h1>
        <p className="hero-description">
          Access all the tools, documentation, and materials you need to build 
          innovative solutions for menstrual health during the SWAMPURNA Hackathon.
        </p>
      </HeroSection>

      {/* Quick Access */}
      <QuickAccessSection>
        <h3>Quick Access</h3>
        <div className="quick-grid">
          {quickLinks.map((link, index) => (
            <QuickCard key={index}>
              <link.icon className="quick-icon" />
              <div className="quick-content">
                <span className="quick-title">{link.title}</span>
                <span className="quick-desc">{link.description}</span>
              </div>
              <FiDownload className="download-icon" />
            </QuickCard>
          ))}
        </div>
      </QuickAccessSection>

      {/* Resource Categories */}
      <ResourcesGrid>
        {resourceCategories.map((category, index) => (
          <ResourceCard key={index} className={`color-${category.color}`}>
            <div className={`resource-icon color-${category.color}`}>
              <category.icon />
            </div>
            <h3>{category.title}</h3>
            <p>{category.description}</p>
            <ul className="resource-items">
              {category.items.map((item, i) => (
                <li key={i}>
                  <FiFileText className="item-icon" />
                  <span>{item}</span>
                  <FiDownload className="download" />
                </li>
              ))}
            </ul>
            <button className={`view-all color-${category.color}`}>
              <span>View All</span>
              <FiArrowRight />
            </button>
          </ResourceCard>
        ))}
      </ResourcesGrid>

      {/* CTA Section */}
      <CTASection>
        <h2>Need Something Specific?</h2>
        <p>Can't find the resource you're looking for? Let us know and we'll help you out.</p>
        <button className="cta-button">
          <span>Contact Support</span>
          <FiExternalLink />
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

const QuickAccessSection = styled.section`
  margin-bottom: var(--space-10);

  h3 {
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    font-weight: 600;
    color: var(--color-dark-900);
    margin-bottom: var(--space-5);
  }

  .quick-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-4);

    @media (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
    }
  }
`;

const QuickCard = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4);
  background: white;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--color-dark-100);
  cursor: pointer;
  transition: all var(--transition-base);

  &:hover {
    border-color: var(--color-primary-200);
    transform: translateY(-2px);

    .download-icon {
      color: var(--color-primary-500);
    }
  }

  .quick-icon {
    font-size: 1.5rem;
    color: var(--color-primary-500);
    flex-shrink: 0;
  }

  .quick-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .quick-title {
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-dark-900);
  }

  .quick-desc {
    font-size: var(--text-xs);
    color: var(--color-dark-400);
  }

  .download-icon {
    color: var(--color-dark-300);
    transition: color var(--transition-base);
  }
`;

const ResourcesGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);
  margin-bottom: var(--space-10);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ResourceCard = styled.div`
  background: white;
  border-radius: var(--radius-2xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--color-dark-100);

  .resource-icon {
    width: 56px;
    height: 56px;
    border-radius: var(--radius-xl);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    margin-bottom: var(--space-4);

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
    margin-bottom: var(--space-2);
  }

  p {
    font-size: var(--text-sm);
    color: var(--color-dark-500);
    line-height: 1.6;
    margin-bottom: var(--space-5);
  }

  .resource-items {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    margin-bottom: var(--space-5);
  }

  .resource-items li {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-3);
    background: var(--color-cream-100);
    border-radius: var(--radius-lg);
    font-size: var(--text-sm);
    color: var(--color-dark-600);
    cursor: pointer;
    transition: all var(--transition-base);

    &:hover {
      background: var(--color-cream-200);

      .download {
        color: var(--color-primary-500);
      }
    }

    .item-icon {
      color: var(--color-dark-400);
    }

    span {
      flex: 1;
    }

    .download {
      color: var(--color-dark-300);
      transition: color var(--transition-base);
    }
  }

  .view-all {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
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
      gap: var(--space-3);
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
`;

export default Resources;
