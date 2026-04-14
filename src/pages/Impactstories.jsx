import React from 'react';
import styled from 'styled-components';
import { FiArrowRight } from 'react-icons/fi';
import Storyimg1 from '../assets/images/images1/Storyimg1.jpg';
import Storyimg2 from '../assets/images/images1/Storyimg2.jpg';
import Storyimg3 from '../assets/images/images1/Storyimg3.jpg';
import Storyimg4 from '../assets/images/images1/Storyimg4.jpg';

const Impactstories = () => {
  const stories = [
    {
      title: '🏫 The Students of Govt. Sarvodaya Kanya Vidyalaya, Dallupura',
      image: null,
      story: `In the bustling lanes of Dallupura, where socio-economic vulnerabilities often shadow daily life, we found sparks of incredible resilience.`,
      color: 'primary',
      isHeader: true
    },
    {
      title: 'Neha (16-Year-Old) & Sonali (14-Year-Old)',
      image: Storyimg1,
      story: `Class 8 & Class 7 For students like Neha (16) and Sonali (14), the journey to understanding menstrual health is often filled with hesitation. Being slightly older for their respective grades, they represent a critical demographic that often faces the highest pressure to drop out due to puberty-related challenges.

• The Interaction: During our "Icebreaking" sessions and "Comic Strip Storytelling" workshops, girls in this age group moved from shy head-nods to raising their hands. They are the prime users for our Gamified Learning Interface, proving that when learning is fun, the fear disappears.`,
      color: 'primary'
    },
    {
      title: 'Anshu Chaudhary (17-Year-Old)',
      image: Storyimg2,
      story: `Class 11 At 17, Anshu stands on the threshold of adulthood. As a senior student, she represents the "Level 1" cognitive awareness we strive for - someone who is not just learning for herself but has the potential to become a Peer Educator or "MHH Champion".

The Vision: We see Anshu as a future leader who can influence the younger girls in her community, helping us sustain the Self-Help Groups (SHGs) that SWAMPURNA aims to build.`,
      color: 'primary'
    },
    {
      title: '🌟 The Rising Stars of Inter-Colleges',
      image: null,
      story: `Moving beyond the city limits to areas like Kaimrala, we see how the digital divide is being bridged by curiosity.`,
      color: 'secondary',
      isHeader: true
    },
    {
      title: 'Alice (14-Year-Old)',
      image: Storyimg3,
      story: `Class 10, Shri Ram Inter College, Kaimrala

Alice is 14 and already in Class 10, showing sharp academic progress. Students like Alice are our "Early Adopters." They are quick to grasp the SWAMPURNA Android App, navigating through the cycle trackers and myth-busting quizzes with ease.

Insight: Alice represents the aspirational spirit of the semi-rural adolescent - hungry for information and ready to embrace technology to manage her health.`,
      color: 'secondary'
    },
    {
      title: 'Vartika Bhati (13-Year-Old)',
      image: Storyimg4,
      story: `Class 8, MD Inter College Young and impressionable, Vartika (13) is at the perfect age for intervention. By reaching girls like Vartika early, before misinformation sets in, we can prevent the "fear, confusion, and shame" that often accompanies menarche.

The Goal: To ensure Vartika manages her menstruation with dignity, ensuring it never becomes a barrier to her education or her dreams.`,
      color: 'secondary'
    },
    {
      title: 'Why Their Stories Matter',
      image: null,
      story: `"These names - Neha, Vartika, Anshu, Alice, Sonali - represent the thousands of girls in the "Bottom of the Pyramid" population.

When we met them, we didn't just ask survey questions. We played games, we drew comics, and we shared stories. We learned that despite the lack of resources and adequate sanitation facilities, their cognitive capability to accept and adopt scientific information is high."`,
      color: 'accent'
    }
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
        <span className="section-eyebrow">Stories</span>
        <h1 className="hero-title">
          Stories From <span className="title-accent">The Field</span>
        </h1>
        <p className="hero-description">
          "At SWAMPURNA, our research isn't just about data points; it is about people. It is about the girls of Dallupura, Bilaspur, Masjid-Moth, Kaimrala and other areas of NCR who are breaking centuries of silence.
        </p>
        <p className="hero-description">
          Through our "Reversal of Learning" approach, we didn't just teach - we listened. We walked into Government Sarvodaya Kanya Vidyalayas and Inter Colleges, not as lecturers, but as partners. We met bright, resilient young women who are eager to trade confusion for confidence."
        </p>
        <p className="hero-description" style={{ fontWeight: '600', marginTop: 'var(--space-6)' }}>
          Meet some of the changemakers we've had the privilege to bond with:
        </p>
      </HeroSection>

      {/* Stories List */}
      <StoriesList>
        {stories.map((story, index) => (
          <StoryCard key={index} className={`color-${story.color} ${!story.image ? 'no-image' : ''}`}>
            {story.image && (
              <div className="story-image">
                <img src={story.image} alt={story.title} />
              </div>
            )}
            <div className="story-content">
              <h3 className="story-title">{story.title}</h3>
              <div className="story-text">
                {story.story.split('\n').map((paragraph, i) => (
                  paragraph.trim() && (
                    <p key={i}>
                      {paragraph.trim().startsWith('•') ? (
                        <span className="bullet-point">{paragraph.trim()}</span>
                      ) : paragraph.trim().startsWith('The ') || paragraph.trim().startsWith('Our ') || paragraph.trim().startsWith('When ') || paragraph.trim().startsWith('"') ? (
                        <strong>{paragraph.trim()}</strong>
                      ) : (
                        paragraph.trim()
                      )}
                    </p>
                  )
                ))}
              </div>
            </div>
          </StoryCard>
        ))}
      </StoriesList>

      {/* CTA Section */}
      <CTASection>
        <div className="cta-content">
          <h2>Share Your Story</h2>
          <p>
            Has SWAMPURNA made a difference in your life or community? We'd love 
            to hear from you and share your journey with others.
          </p>
          <button className="cta-button">
            <span>Submit Your Story</span>
            <FiArrowRight />
          </button>
        </div>
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
    margin-bottom: var(--space-4);
    line-height: 1.2;
  }

  .hero-subtitle {
    font-family: var(--font-heading);
    font-size: var(--text-2xl);
    font-weight: 500;
    color: var(--color-primary-600);
    margin-bottom: var(--space-6);
  }

  .title-accent {
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-description {
    font-size: var(--text-lg);
    color: var(--color-dark-600);
    line-height: 1.8;
    max-width: 900px;
    margin: 0 auto var(--space-4);
    text-align: left;
  }

  @media (max-width: 768px) {
    .hero-title {
      font-size: var(--text-4xl);
    }
    
    .hero-subtitle {
      font-size: var(--text-xl);
    }
    
    .hero-description {
      font-size: var(--text-base);
      text-align: center;
    }
  }
`;

const StoriesList = styled.section`
  display: flex;
  flex-direction: column;
  gap: var(--space-10);
  margin-bottom: var(--space-12);
`;

const StoryCard = styled.article`
  background: white;
  border-radius: var(--radius-3xl);
  overflow: hidden;
  box-shadow: var(--shadow-soft-lg);
  border: 1px solid var(--color-dark-100);
  transition: all var(--transition-slow);
  display: flex;
  flex-direction: column;
  gap: 0;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-soft-lg);
  }

  &.color-primary {
    border-top: 4px solid var(--color-primary-500);
  }

  &.color-secondary {
    border-top: 4px solid var(--color-secondary-500);
  }

  &.color-accent {
    border-top: 4px solid var(--color-accent-500);
  }

  .story-image {
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-dark-50);

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: center;
    }
  }

  .story-content {
    padding: var(--space-8);
    display: flex;
    flex-direction: column;
  }

  .story-title {
    font-family: var(--font-heading);
    font-size: var(--text-2xl);
    font-weight: 600;
    color: var(--color-dark-900);
    margin-bottom: var(--space-6);
    line-height: 1.3;
  }

  .story-text {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);

    p {
      font-size: var(--text-base);
      color: var(--color-dark-600);
      line-height: 1.8;

      strong {
        font-weight: 600;
        color: var(--color-dark-900);
        display: block;
        margin-bottom: var(--space-2);
      }

      .bullet-point {
        display: block;
        padding-left: var(--space-4);
        margin-bottom: var(--space-2);
      }
    }
  }

  @media (max-width: 768px) {
    .story-image {
      aspect-ratio: 4 / 3;
    }

    .story-content {
      padding: var(--space-6);
    }
  }
`;


const CTASection = styled.section`
  background: var(--gradient-primary);
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

  .cta-content {
    position: relative;
    z-index: 1;
  }

  h2 {
    font-family: var(--font-heading);
    font-size: var(--text-3xl);
    font-weight: 600;
    color: white;
    margin-bottom: var(--space-4);
  }

  p {
    font-size: var(--text-base);
    color: rgba(255, 255, 255, 0.85);
    line-height: 1.8;
    max-width: 500px;
    margin: 0 auto var(--space-6);
  }

  .cta-button {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-4) var(--space-8);
    background: white;
    color: var(--color-primary-700);
    font-weight: 600;
    font-size: var(--text-base);
    border-radius: var(--radius-full);
    box-shadow: var(--shadow-lg);
    transition: all var(--transition-base);

    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-xl);
    }
  }
`;

export default Impactstories;
