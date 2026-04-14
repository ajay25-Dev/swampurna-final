import React from 'react';
import styled from 'styled-components';
import ImpactStoryImg1 from '../assets/images/images1/ImpactStoryimg1.jpg';
import ImpactStoryImg2 from '../assets/images/images1/ImpactStoryimg2.jpg';

const Impactstory = () => {
  const stories = [
    {
      title: "The Shift in the Shack: Nadia, Akhtar, and the Power of Listening",
      image: ImpactStoryImg1,
      description: `Nadia (29) and Akhtar (34) live in a temporary settlement near a busy construction site. Akhtar spends his days carrying heavy loads, and Nadia manages the home, her fatigue mirroring his own.

The Challenge

Nadia often struggled during her period. The heavy physical labor exacerbated her pain, leading to irritability and exhaustion. Akhtar, like many men we met, was largely ignorant of his wife's experience. His attitude was often dismissive or purely avoidance based.

"When I was in pain, I just wanted him to see I was suffering. But he would just walk away or tell me to be quiet," Nadia shared.

The core issue was a desperate need for emotional and physical support that was simply not part of their social script. For Akhtar, menstruation was a 'women's secret,' something he was taught to ignore.

The SWAMPURNA Intervention

Our facilitator didn't start with a lecture on biology. We used Participatory Communication to talk about shared family stress. We gently guided Akhtar to understand that Nadia's irritation during her period was a physiological reaction, not a personal attack. Using simple visual aids (like the ones in our SWAMPURNA App prototype), we explained the hormonal cycle and the immense physical toll it takes on a woman's body—especially one who performs hard labor.

The Transformation

The change was tangible. During a follow-up visit, Nadia beamed as she described a recent shift:

• Accommodation: Akhtar started volunteering to take on simple chores, like fetching water, during the first two days of her cycle.

• Open Dialogue: He admitted: "I didn't know. No one ever told me. Now I understand that it's not her fault, and I need to be more accommodating."

• Shared Responsibility: Akhtar agreed to engage in meaningful discussions about MHH, transforming their relationship from one of distant silence to one of shared understanding and mutual support.

The conversation had shifted the household dynamic, proving that gender inclusivity is the key to sustainable well-being.`,
      color: 'primary'
    },
    {
      title: "From Fear to Fact: Komal, Lata, and Medication Awareness",
      image: ImpactStoryImg2,
      description: `Komal (37) and Lata (26) are neighbors in the same settlement, both mothers who work alongside their husbands. They represent the demographic that often treats menstrual pain with silent endurance or easily available home remedies, fearing expensive medical intervention.

The Challenge

Both women reported being ill-informed about managing pain and heavy bleeding. They were not sufficiently aware of the safe, effective medication available to them at local dispensaries or through the government health system. This lack of knowledge meant that severe pain often led to lost workdays, deepening their financial constraints. They simply did not know that a simple, low-cost solution could mitigate their suffering and restore their income.

The SWAMPURNA Intervention

Our focus with Komal and Lata was to improve their Cognitive Awareness (Objective 2 of our project). We used interactive, Gamified Learning modules (like those integrated into our app) to:

• Demystify Medication: We clearly explained the difference between safe pain relievers and harmful traditional practices.

• Empower Self-Care: We provided practical guidance on when to seek help, when to rest, and how to use basic hygiene and medicinal supplements effectively.

The Transformation

The women gained confidence and control over their bodies. Komal began keeping a small, low-cost stock of medicine, no longer suffering through painful days. Lata, a new mother, learned how to integrate her self-care practices with her demanding work schedule.

"Before, I would just suffer and lose a day's pay. Now, I know what to take and when. I don't feel afraid of my period anymore," said Lata.

This small shift—from ignorance to knowledge about medication—restored their ability to earn a wage and significantly improved their quality of life.`,
      color: 'secondary'
    },
    {
      title: "The Next Generation: Samina (9-Year-Old)",
      image: null,
      description: `Samina (9-Year-Old) is the daughter of a construction worker family. She is our youngest participant and represents the future we are aiming to protect. Our interaction with her family ensures the cycle of silence is broken before menarche even begins.

The Impact

By engaging her mother, Komal, and by participating in our colorful, activity-based sessions, Samina is growing up in an environment where her father and mother are already talking about menstruation scientifically and openly. Her story shows the project's long-term success: breaking the intergenerational transmission of stigma and misinformation.`,
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
        <span className="section-eyebrow">Media</span>
        <h1 className="hero-title">
          Impact <span className="title-accent">Story</span>
        </h1>
        <p className="hero-description">
          Get in Touch with SWAMPURNA. Whether you have questions about our programs, want to volunteer, or are interested in collaborating with us, we'd love to hear from you! Use any of the options below to reach us, and we'll get back to you as soon as possible.
        </p>
      </HeroSection>

      {/* Stories Grid */}
      <StoriesGrid>
        {stories.map((story, index) => (
          <StoryCard key={index} className={`color-${story.color}`}>
            {story.image && (
              <div className="story-image">
                <img src={story.image} alt={story.title} />
              </div>
            )}
            <div className="story-content">
              <h3 className="story-title">{story.title}</h3>
              <p className="story-description">{story.description}</p>
            </div>
          </StoryCard>
        ))}
      </StoriesGrid>
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
    margin-bottom: var(--space-5);
    line-height: 1.1;
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
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    .hero-title {
      font-size: var(--text-4xl);
    }
  }
`;

const StoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-8);
  margin-bottom: var(--space-12);

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
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
    padding: var(--space-6);
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .story-title {
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    font-weight: 600;
    color: var(--color-dark-900);
    margin: 0;
    line-height: 1.3;
  }

  .story-description {
    font-size: var(--text-base);
    color: var(--color-dark-600);
    line-height: 1.8;
    margin: 0;
  }

  @media (max-width: 768px) {
    .story-image {
      aspect-ratio: 4 / 3;
    }

    .story-content {
      padding: var(--space-5);
    }
  }
`;

export default Impactstory;

