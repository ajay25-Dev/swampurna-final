import React from 'react';
import styled from 'styled-components';
import { FiSmartphone, FiMessageCircle, FiTrendingUp, FiGlobe, FiHeart } from 'react-icons/fi';
import image1 from '../assets/images/img18.png';
import image2 from '../assets/images/img19.png';
import image3 from '../assets/images/img20.png';
import image4 from '../assets/images/img21.png';
import image5 from '../assets/images/img22.png';

const Ourapproach = () => {
  const approaches = [
    {
      icon: FiSmartphone,
      title: '🧠 Psychometric Screening & Cognitive Mapping',
      description: 'We aim to move beyond generic surveys by developing a validated Psychometric Screening Tool tailored to unique socio-cultural parameters. The Science: Using the AKAB (Awareness, Knowledge, Attitude & Behaviour) mapping technique, we assess the psychological issues and awareness levels regarding Menstrual Health and Hygiene (MHH). The Method: The tool stratifies the population into three distinct cognitive levels to ensure help is directed where it is needed most: Level 1: Normal (Sufficient awareness & well-being). Level 2: Mild to Moderate concerns. Level 3: Severe (Low awareness & well-being).',
      image: image1,
      color: 'primary'
    },
    {
      icon: FiMessageCircle,
      title: '📲 Tech-Driven Cognitive Intervention',
      description: 'Our goal is to design scientifically tailored, age-specific, and interactive technological interventions to improve the cognitive levels of people living in rural and semi-rural areas. Innovation: We integrate state-of-the-art tools including Android Applications, Gaming, Animation, and AR/VR (Augmented/Virtual Reality). Holistic Wellness: Beyond information, we provide response-based mechanisms to address mental health and social stigmas. This includes "Cycle Syncing", personalized learning modules, and other techniques designed to alleviate menstrual distress for those with mild to moderate issues.',
      image: image2,
      color: 'secondary'
    },
    {
      icon: FiTrendingUp,
      title: '🤝 Community Sensitization & Mobilization',
      description: 'Technology cannot work in isolation. A primary objective is to sensitize and mobilize the entire community to ensure wider and sustained acceptance of the program for a lasting impact. Participatory Communication: We use a "bottom-up" approach, engaging the community through specific algorithms like Head Count, Head Nod, and Full-Fledged Participation to build trust. Inclusivity: We actively include male members in sensitization drives to mitigate the patriarchal stigma surrounding menstruation, improving the mental well-being of the entire family unit. Sustainability: We aim to form Self Help Groups (SHGs) from Level 1 participants to create self-sustainable models of peer support within villages.',
      image: image3,
      color: 'accent'
    },
    {
      icon: FiGlobe,
      title: '🛡️ Safety, Efficacy & Scalability',
      description: 'We are committed to rigorous scientific validation. Our final objective is to strictly test the safety and efficacy of the tools and technology designed for this purpose. Validation: Through baseline evaluations and follow-ups (2-5 weeks post-intervention), we measure behavioural change and the effectiveness of our digital tools. National Scalability: By creating a "response-based mechanism," we are developing a prototype that serves as a scalable model for national menstrual health strategies, ready to be replicated across diverse Indian states.',
      image: image4,
      color: 'primary'
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
        <span className="section-eyebrow">Our Methodology</span>
        <h1 className="hero-title">
          Our Core <span className="title-accent">Objectives</span>
        </h1>
        <p className="hero-description">
          At SWAMPURNA, we have four core objectives that guide our research and intervention strategies. These objectives ensure that our approach is scientifically rigorous, culturally sensitive, and scalable across diverse communities in India.
        </p>
      </HeroSection>

      {/* Approaches Section */}
      <ApproachesSection>
        {approaches.map((approach, index) => (
          <ApproachCard key={index} className={index % 2 === 0 ? 'image-left' : 'image-right'}>
            <div className="image-container">
              <img src={approach.image} alt={approach.title} />
              <div className={`image-overlay color-${approach.color}`}></div>
            </div>
            <div className="content-container">
              <div className={`icon-wrapper color-${approach.color}`}>
                <approach.icon />
              </div>
              <span className="approach-number">{String(index + 1).padStart(2, '0')}</span>
              <h3>{approach.title}</h3>
              <p>{approach.description}</p>
              <div className={`accent-line color-${approach.color}`}></div>
            </div>
          </ApproachCard>
        ))}
      </ApproachesSection>

      {/* Quote Section */}
      <QuoteSection>
        <div className="quote-content">
          <div className="quote-icon">"</div>
          <blockquote>
          Our core objective is rooted in innovation, inclusion, and sustainability. By 
            integrating technology, community participation, and behavioral change 
            communication, we aim to create lasting change in how menstrual health 
            is perceived and managed. SWAMPURNA is more than a project—it's a movement 
            towards a healthier and more empowered future for adolescent girls.
          </blockquote>
        </div>
      </QuoteSection>
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
    bottom: 30%;
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
    max-width: 700px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    .hero-title {
      font-size: var(--text-4xl);
    }
  }
`;

const ApproachesSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  margin-bottom: var(--space-12);
`;

const ApproachCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-8);
  align-items: center;
  background: white;
  border-radius: var(--radius-3xl);
  overflow: hidden;
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--color-dark-100);
  transition: all var(--transition-slow);

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-soft-lg);
  }

  &.image-right {
    .image-container {
      order: 2;
    }
    .content-container {
      order: 1;
    }
  }

  .image-container {
    position: relative;
    height: 100%;
    min-height: 350px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .image-overlay {
      position: absolute;
      inset: 0;
      opacity: 0.1;

      &.color-primary {
        background: var(--gradient-primary);
      }

      &.color-secondary {
        background: var(--gradient-secondary);
      }

      &.color-accent {
        background: var(--gradient-accent);
      }
    }
  }

  .content-container {
    padding: var(--space-8);
    position: relative;

    .approach-number {
      position: absolute;
      top: var(--space-6);
      right: var(--space-6);
      font-family: var(--font-heading);
      font-size: var(--text-4xl);
      font-weight: 700;
      color: var(--color-dark-100);
    }
  }

  .icon-wrapper {
    width: 56px;
    height: 56px;
    border-radius: var(--radius-xl);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    margin-bottom: var(--space-5);

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
    font-size: var(--text-2xl);
    font-weight: 600;
    color: var(--color-dark-900);
    margin-bottom: var(--space-4);
  }

  p {
    font-size: var(--text-base);
    color: var(--color-dark-500);
    line-height: 1.8;
    margin-bottom: var(--space-5);
  }

  .accent-line {
    width: 60px;
    height: 4px;
    border-radius: var(--radius-full);

    &.color-primary {
      background: var(--gradient-primary);
    }

    &.color-secondary {
      background: var(--gradient-secondary);
    }

    &.color-accent {
      background: var(--gradient-accent);
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;

    &.image-right {
      .image-container {
        order: 1;
      }
      .content-container {
        order: 2;
      }
    }

    .image-container {
      min-height: 250px;
    }

    .content-container {
      padding: var(--space-6);
    }
  }
`;

const QuoteSection = styled.section`
  background: var(--gradient-secondary);
  border-radius: var(--radius-3xl);
  padding: var(--space-10);
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50px;
    right: -50px;
    width: 200px;
    height: 200px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
  }

  .quote-content {
    position: relative;
    z-index: 1;
  }

  .quote-icon {
    font-family: var(--font-heading);
    font-size: 5rem;
    color: white;
    line-height: 1;
    margin-bottom: var(--space-4);
    opacity: 0.3;
  }

  blockquote {
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    font-weight: 400;
    font-style: italic;
    color: white;
    line-height: 1.8;
    max-width: 800px;
    margin: 0 auto;
  }
`;

export default Ourapproach;
