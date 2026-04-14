import React from 'react';
import styled from 'styled-components';
import { FiHeart, FiUsers, FiZap, FiGlobe, FiTarget, FiBookOpen, FiMessageCircle, FiShare2, FiTrendingUp } from 'react-icons/fi';

const Missionvision = () => {
  const coreValues = [
    { icon: FiHeart, title: 'Empowerment', description: 'Building confidence and self-awareness in adolescent girls through education and engagement.' },
    { icon: FiUsers, title: 'Inclusion', description: 'Creating a safe space for marginalized communities to participate, learn, and benefit from menstrual health initiatives.' },
    { icon: FiZap, title: 'Innovation', description: 'Leveraging cutting-edge technology and creative communication strategies to revolutionize menstrual health education.' },
    { icon: FiGlobe, title: 'Sustainability', description: 'Promoting environmentally friendly and long-lasting menstrual hygiene practices and products.' },
    { icon: FiShare2, title: 'Community Engagement', description: 'Encouraging collective action through participatory methods, ensuring that the solutions we develop are embraced and sustained by the community.' },
  ];

  const strategicGoals = [
    { icon: FiTarget, title: 'Increase Awareness', description: 'Through educational programs and tools, ensure that every adolescent girl and her family have access to accurate menstrual health information.' },
    { icon: FiTrendingUp, title: 'Behavioral Change', description: 'Foster a cultural shift in attitudes toward menstruation, breaking down harmful taboos and misconceptions.' },
    { icon: FiHeart, title: 'Promote Access', description: 'Provide affordable, sustainable, and environmentally friendly menstrual hygiene products to underserved communities.' },
    { icon: FiUsers, title: 'Engage Stakeholders', description: 'Work with local communities, governments, NGOs, and corporate partners to expand the reach and impact of the SWAMPURNA project.' },
    { icon: FiZap, title: 'Innovative Solutions', description: 'Develop and deploy new technologies, such as mobile apps, games, and participatory communication tools, to enhance menstrual health education.' },
  ];

  const approaches = [
    { icon: FiMessageCircle, title: 'Participatory Communication', description: 'Engaging the community, especially girls, in interactive workshops, storytelling sessions, and creative competitions.' },
    { icon: FiZap, title: 'Technology Integration', description: 'Using mobile applications, interactive websites, and social media to deliver personalized menstrual health education.' },
    { icon: FiTrendingUp, title: 'Behavior Change Communication', description: 'Developing targeted campaigns and content that resonate with adolescent girls and their communities, encouraging positive health behaviors.' },
    { icon: FiShare2, title: 'Partner Collaborations', description: 'Collaborating with organizations in health, education, and technology to amplify our efforts.' },
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
        <span className="section-eyebrow">Our Foundation</span>
        <h1 className="hero-title">
          Mission & <span className="title-accent">Vision</span>
        </h1>
        <p className="hero-description">
        Augment cognition of adolescent girls and community on menstrual health and hygiene on prototype through the integration of state-of- the-art tools and emerging technologies with behavior change and participatory communication for sustainable development.
        Sponsored by DST under the Cognitive Science Research Initiative (CSRI), this Action Research project aims to strengthen the will and skills of learning among adolescent girls and their community from the marginalized section of our population on menstrual health & hygiene. We are designing and developing a dedicated software tool and enhancing it with the latest cognitive technologies to make it engaging and effective. The project is envisioned on a Pan-India scale.
        </p>
      </HeroSection>

      {/* Vision & Mission Cards */}
      <VisionMissionGrid>
        <VisionCard>
          <div className="card-icon">✨</div>
          <h3>Our Vision</h3>
          <p>
            To foster an inclusive society where marginalized communities embrace scientific, sustainable, and dignified attitudes toward menstruation, enabling healthier reproductive outcomes and contributing to a circular economy aligned with national and global development goals.
          </p>
        </VisionCard>
        <MissionCard>
          <div className="card-icon">🎯</div>
          <h3>Our Mission</h3>
          <p>
            To promote and augment social and behavioral change among marginalized communities at the base of the population pyramid by promoting awareness, scientific understanding, and positive attitudes towards menstruation. To encourage sustainable and eco-friendly menstrual practices through psycho-social interventions that enhance dignity, confidence, and overall well-being of menstruating individuals. To support national reproductive health goals and strengthen India's alignment with the Sustainable Development Goals (SDGs) by enabling community-level behavioral and environmental transformation. To understand and map the cognitive ecosystem of the marginalized communities and design curated learning materials for them.
          </p>
        </MissionCard>
      </VisionMissionGrid>

      {/* Core Values Section */}
      <Section>
        <div className="section-label">
          <span className="label-line"></span>
          <span className="label-text">Core Values</span>
          <span className="label-line"></span>
        </div>
        <ValuesGrid>
          {coreValues.map((value, index) => (
            <ValueCard key={index} className={`color-${index % 3}`}>
              <div className="icon-wrapper">
                <value.icon />
              </div>
              <h4>{value.title}</h4>
              <p>{value.description}</p>
            </ValueCard>
          ))}
        </ValuesGrid>
      </Section>

      {/* Strategic Goals Section */}
      <Section>
        <div className="section-label">
          <span className="label-line"></span>
          <span className="label-text">Strategic Goals</span>
          <span className="label-line"></span>
        </div>
        <GoalsGrid>
          {strategicGoals.map((goal, index) => (
            <GoalCard key={index}>
              <div className="goal-number">{String(index + 1).padStart(2, '0')}</div>
              <div className="goal-content">
                <div className="goal-icon">
                  <goal.icon />
                </div>
                <h4>{goal.title}</h4>
                <p>{goal.description}</p>
              </div>
            </GoalCard>
          ))}
        </GoalsGrid>
      </Section>

      {/* How We Achieve This Section */}
      <Section>
        <div className="section-label">
          <span className="label-line"></span>
          <span className="label-text">How We Achieve This</span>
          <span className="label-line"></span>
        </div>
        <ApproachGrid>
          {approaches.map((approach, index) => (
            <ApproachCard key={index}>
              <div className="approach-icon">
                <approach.icon />
              </div>
              <div className="approach-content">
                <h4>{approach.title}</h4>
                <p>{approach.description}</p>
              </div>
            </ApproachCard>
          ))}
        </ApproachGrid>
      </Section>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  position: relative;
  padding: var(--space-8) var(--space-6) var(--space-16);
  overflow: hidden;
  min-height: 100vh;

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
    width: 600px;
    height: 600px;
    top: -200px;
    right: -200px;
    background: radial-gradient(circle, rgba(217, 118, 82, 0.08) 0%, transparent 70%);
  }

  .circle-2 {
    width: 500px;
    height: 500px;
    bottom: 20%;
    left: -200px;
    background: radial-gradient(circle, rgba(90, 148, 112, 0.06) 0%, transparent 70%);
  }

  @media (max-width: 768px) {
    padding: var(--space-6) var(--space-4) var(--space-12);
  }
`;

const HeroSection = styled.section`
  max-width: 800px;
  margin: 0 auto var(--space-12);
  text-align: center;

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
    background: var(--gradient-primary);
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

const VisionMissionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);
  max-width: 1000px;
  margin: 0 auto var(--space-16);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const VisionCard = styled.div`
  background: white;
  border-radius: var(--radius-3xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--color-dark-100);
  transition: all var(--transition-slow);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-soft-lg);
    border-color: var(--color-secondary-200);
  }

  .card-icon {
    font-size: 2.5rem;
    margin-bottom: var(--space-4);
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
    color: var(--color-dark-600);
    line-height: 1.8;
  }
`;

const MissionCard = styled(VisionCard)`
  &:hover {
    border-color: var(--color-primary-200);
  }
`;

const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto var(--space-16);

  .section-label {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    margin-bottom: var(--space-10);
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
    color: var(--color-primary-600);
    padding: var(--space-2) var(--space-5);
    background: var(--color-primary-50);
    border-radius: var(--radius-full);
    white-space: nowrap;
    border: 1px solid var(--color-primary-100);
  }
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const ValueCard = styled.div`
  background: white;
  border-radius: var(--radius-2xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--color-dark-100);
  transition: all var(--transition-slow);
  text-align: center;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-soft-lg);
  }

  &.color-0 .icon-wrapper {
    background: var(--color-primary-100);
    color: var(--color-primary-600);
  }

  &.color-1 .icon-wrapper {
    background: var(--color-secondary-100);
    color: var(--color-secondary-600);
  }

  &.color-2 .icon-wrapper {
    background: var(--color-accent-100);
    color: var(--color-accent-700);
  }

  .icon-wrapper {
    width: 56px;
    height: 56px;
    border-radius: var(--radius-xl);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    margin: 0 auto var(--space-4);
  }

  h4 {
    font-family: var(--font-heading);
    font-size: var(--text-lg);
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

const GoalsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const GoalCard = styled.div`
  display: flex;
  gap: var(--space-5);
  background: white;
  border-radius: var(--radius-2xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--color-dark-100);
  transition: all var(--transition-slow);

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-soft-lg);
    border-color: var(--color-primary-200);
  }

  .goal-number {
    font-family: var(--font-heading);
    font-size: var(--text-4xl);
    font-weight: 700;
    color: var(--color-primary-200);
    line-height: 1;
  }

  .goal-content {
    flex: 1;
  }

  .goal-icon {
    width: 40px;
    height: 40px;
    border-radius: var(--radius-lg);
    background: var(--color-secondary-100);
    color: var(--color-secondary-600);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    margin-bottom: var(--space-3);
  }

  h4 {
    font-family: var(--font-heading);
    font-size: var(--text-lg);
    font-weight: 600;
    color: var(--color-dark-900);
    margin-bottom: var(--space-2);
  }

  p {
    font-size: var(--text-sm);
    color: var(--color-dark-500);
    line-height: 1.7;
  }
`;

const ApproachGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ApproachCard = styled.div`
  display: flex;
  gap: var(--space-4);
  padding: var(--space-5);
  background: linear-gradient(135deg, var(--color-cream-100), var(--color-cream-200));
  border-radius: var(--radius-2xl);
  border: 1px solid var(--color-dark-100);
  transition: all var(--transition-base);

  &:hover {
    border-color: var(--color-secondary-200);
    transform: translateX(4px);
  }

  .approach-icon {
    width: 48px;
    height: 48px;
    border-radius: var(--radius-xl);
    background: var(--gradient-secondary);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    flex-shrink: 0;
  }

  .approach-content {
    flex: 1;
  }

  h4 {
    font-family: var(--font-heading);
    font-size: var(--text-base);
    font-weight: 600;
    color: var(--color-dark-900);
    margin-bottom: var(--space-2);
  }

  p {
    font-size: var(--text-sm);
    color: var(--color-dark-600);
    line-height: 1.6;
  }
`;

export default Missionvision;
