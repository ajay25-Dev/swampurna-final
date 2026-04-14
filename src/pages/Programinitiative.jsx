import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiSmartphone, FiUsers, FiHeart, FiAward, FiZap, FiTrendingUp, FiShield, FiArrowRight, FiX } from 'react-icons/fi';
import Picture1 from '../assets/images/images1/Picture1.jpg';
import Picture2 from '../assets/images/images1/Picture2.jpg';
import Picture3 from '../assets/images/images1/Picture3.jpg';

const Programinitiative = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroWrapperRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroWrapperRef.current) {
        const rect = heroWrapperRef.current.getBoundingClientRect();
        const scrollPosition = window.scrollY;
        const elementTop = rect.top + window.scrollY;
        const elementHeight = rect.height;
        const windowHeight = window.innerHeight;
        
        // Calculate scroll progress: 0 when element is at top, 1 when scrolled past
        const scrollProgress = Math.max(0, Math.min(1, (scrollPosition - elementTop + windowHeight) / (elementHeight + windowHeight * 0.5)));
        setScrollY(scrollProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const programs = [
    {
      icon: FiSmartphone,
      title: 'I. The SWAMPURNA Digital Ecosystem (App & Tech)',
      description: 'At the heart of our initiative is the SWAMPURNA Android Application - a first-of-its-kind "Digital Companion" designed specifically for the marginalized "Bottom of the Pyramid" population. Unlike standard period trackers, this app is built on a Psychometric Screening Tool grounded in the AKAB (Awareness, Knowledge, Attitude & Behaviour) framework.',
      goal: 'Cognitive Mapping: The app assesses users and categorizes them into three levels: Level 1 (Normal), Level 2 (Mild to Moderate), and Level 3 (Severe), ensuring that support is personalized to their mental well-being.',
      impact: 'Smart Resource Locator: We map government and NGO health resources, embedding them into the app to help users locate nearby clinics and hygiene facilities. Multilingual Access: Breaking literacy barriers by offering content in regional languages.',
      color: 'primary',
      stat: '1',
      statLabel: 'Key Pillar'
    },
    {
      icon: FiUsers,
      title: 'II. Participatory Communication & The "Reversal of Learning"',
      description: 'We don\'t just "teach" the community; we learn from them. Our fieldwork in locations like Dallupura and Samwal Nagar relies on a unique Participatory Communication Approach that gradually builds trust.',
      goal: 'The Engagement Ladder: We move participants from a simple Head Count to a Head-Nod (passive agreement), to a Hand Raise, and finally to Full-Fledged Participation.',
      impact: 'Reversal of Learning: Through "bonding exercises" and open dialogue, we gain deep insights into the community\'s specific needs, allowing their feedback to shape our technology and curriculum.',
      color: 'secondary',
      stat: '2',
      statLabel: 'Key Pillar'
    },
    {
      icon: FiZap,
      title: 'III. "Serious Gaming" & Edutainment',
      description: 'Recognizing that lectures can be boring and intimidating, we leverage the power of Edutainment. We are developing interactive interventions that make learning about health engagement and non-threatening.',
      goal: 'Virtual Gaming: We have piloted a custom-designed virtual quiz game developed by animation students, which has shown high engagement during field trials.',
      impact: 'Comic Strip Workshops: In our field visits, we use comic strip storytelling to allow girls to visualize and narrate their menstrual experiences, turning data collection into a creative expression. Animation: We utilize animated reels and infographics to explain complex biological processes in simple, culturally relevant ways.',
      color: 'accent',
      stat: '3',
      statLabel: 'Key Pillar'
    },
    {
      icon: FiHeart,
      title: 'IV. Holistic Wellness & Cycle Syncing',
      description: 'Menstrual health is mental health. Our program goes beyond hygiene products to address the physical and emotional distress associated with menstruation.',
      goal: 'Cycle Syncing: We provide age-specific interventions that align with a woman\'s cycle. This includes tailored yoga, physical exercises, and nutritional advice to manage PMS and fatigue.',
      impact: 'Breathing Techniques: To assist those with mild to moderate anxiety or stress (Level 2), the program integrates scientifically validated breathing techniques and traditional medication advice (Ayurveda/Unani).',
      color: 'primary',
      stat: '4',
      statLabel: 'Key Pillar'
    },
    {
      icon: FiAward,
      title: 'V. The "Voices of Change" National Competition',
      description: 'SWAMPURNA is building a national repository of menstrual narratives. We launched a National Online Creative Content Competition (also named SWAMPURNA) to capture the pulse of the nation.',
      goal: 'Creative Data Collection: We invite entries in the form of short stories, poems, reels, photography, and painting from students across India - from Kendriya Vidyalaya\'s to Central Universities.',
      impact: 'Breaking the Silence: This initiative turns students into storytellers, allowing us to gauge public sentiment and document the diverse socio-cultural myths and taboos prevalent across different states.',
      color: 'secondary',
      stat: '5',
      statLabel: 'Key Pillar'
    },
    {
      icon: FiUsers,
      title: 'VI. Gender Inclusivity: Breaking the Silos',
      description: 'We recognize that in a patriarchal society, any campaign that excludes men is incomplete. To create a supportive environment for adolescent girls, we must sensitize the men who control the household dynamics.',
      goal: 'Male Sensitization: We conduct specific Focus Group Discussions (FGDs) with men and adolescent boys to improve their cognitive level and "scientific perception" of menstruation.',
      impact: 'Mitigating Stigma: By educating fathers and brothers, we aim to reduce household stigma, thereby improving the overall mental well-being of the women in the family.',
      color: 'accent',
      stat: '6',
      statLabel: 'Key Pillar'
    },
    {
      icon: FiTrendingUp,
      title: 'VII. Sustainability via Self-Help Groups (SHGs)',
      description: 'Our goal is to leave a legacy. We are not just researchers; we are community builders.',
      goal: 'Creating Champions: We identify "Level 1" participants (those with high awareness) and encourage them to form Self-Help Groups (SHGs) within their villages.',
      impact: 'Grassroots Leadership: These groups act as "MHH Champions," ensuring that the knowledge transfer continues and the support systems remain active long after the research project concludes.',
      color: 'primary',
      stat: '7',
      statLabel: 'Key Pillar'
    },
  ];

  return (
    <PageWrapper>
      {/* Background Decoration */}
      <div className="bg-decoration">
        <div className="deco-circle circle-1"></div>
        <div className="deco-circle circle-2"></div>
        <div className="deco-circle circle-3"></div>
      </div>

      {/* Hero Section with Full-Width Background */}
      <HeroSectionWrapper ref={heroWrapperRef} $scrollY={scrollY}>
      <HeroSection>
        <div className="hero-content">
          <span className="section-eyebrow">Our Impact</span>
          <h1 className="hero-title">
              Breaking Cycles of Period Poverty by <span className="title-accent">Empowering Young Women</span>
          </h1>
          <p className="hero-description">
              At SWAMPURNA, we do not believe in one-size-fits-all solutions. Our initiatives are a blend of cognitive science, digital innovation, and grassroots empathy. We address Menstrual Health and Hygiene (MHH) not just as a biological process, but as a cognitive and socio-cultural ecosystem. Here are the 7 key pillars driving our mission.
          </p>
        </div>
      </HeroSection>
      </HeroSectionWrapper>

      {/* Section Label - Below Background */}
      <div className="section-label">
        <span className="label-line"></span>
        <span className="label-text">SEVEN KEY PILLARS</span>
        <span className="label-line"></span>
      </div>

      {/* Programs Grid */}
      <ProgramsGrid>
        {programs.map((program, index) => (
          <ProgramCard key={index} className={`color-${program.color}`}>
            <div className="card-header">
              <div className={`icon-wrapper color-${program.color}`}>
                <program.icon />
              </div>
              <div className="stat-badge">
                <span className="stat-number">{program.stat}</span>
                <span className="stat-label">{program.statLabel}</span>
              </div>
            </div>
            
            <h3 className="card-title">{program.title}</h3>
            <p className="card-description">{program.description}</p>
            
            {index === 1 && (
              <button 
                className={`learn-more color-${program.color}`}
                onClick={() => setIsModalOpen(true)}
              >
              <span>Learn More</span>
              <FiArrowRight className="arrow-icon" />
            </button>
            )}
          </ProgramCard>
        ))}
      </ProgramsGrid>

      {/* Modal */}
      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h2>Service Learning</h2>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                <FiX />
              </button>
            </ModalHeader>
            <ModalBody>
              <div className="modal-image">
                <img src={Picture3} alt="Service Learning Venn Diagram" />
              </div>
              <div className="modal-text">
                <p>
                  The Venn diagram illustrates the concept of service learning. Service learning is an educational approach where students learn theories in the classroom and then volunteer with an agency to put what they have learned into practice. This diagram breaks down the components of service learning into three main categories.
                </p>
                
                <div className="section">
                  <h3>Civic Engagement</h3>
                  <p>
                    The first category is Civic Engagement, which is the cornerstone of service learning. Civic Engagement is a student's involvement in activities of public concern that are both individually life-enriching and socially beneficial to the community. This can be demonstrated by volunteering, voting, or participating in group activities.
                  </p>
                </div>

                <div className="section">
                  <h3>Practical Experience</h3>
                  <p>
                    Next, there's Practical Experience, which provides hands-on learning. Practical experience refers to the knowledge or skill that a person has from doing a particular job or activity. These experiences often lead to professional opportunities and a better understanding of the world.
                  </p>
                </div>

                <div className="section">
                  <h3>Academic Study</h3>
                  <p>
                    The final independent category is Academic Study, which provides the theoretical foundation for service learning. Academic study is the scholarly pursuit of knowledge and understanding. In this context, it's the formal classroom instruction that provides students with the theoretical framework needed for their service-learning activities.
                  </p>
                </div>

                <div className="section highlight">
                  <h3>Service Learning</h3>
                  <p>
                    Where all three components overlap is where true Service Learning happens. Service Learning combines academic study with community service, allowing students to apply classroom knowledge to real-world problems while contributing to their communities. This holistic approach fosters both personal and academic growth, creating well-rounded, socially responsible individuals.
                  </p>
                </div>
              </div>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* CTA Section */}
      <CTASection>
        <div className="cta-content">
          <h2 className="cta-title">Ready to Make a Difference?</h2>
          <p className="cta-text">
            Are you passionate about menstrual health and education? Get involved in our 
            programs today and help us create lasting change. Whether you want to volunteer, 
            collaborate, or participate, there's a place for you in SWAMPURNA's initiatives.
          </p>
          <div className="cta-buttons">
            <Link to="/Joinmovement" className="btn-primary">
              <span>Join Our Mission</span>
              <FiArrowRight />
            </Link>
            <Link to="/Contactus" className="btn-outline">
              <span>Contact Us</span>
            </Link>
          </div>
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

  /* Background Decoration */
  .bg-decoration {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: -1;
    overflow: hidden;
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

  .circle-3 {
    width: 400px;
    height: 400px;
    bottom: -100px;
    right: 10%;
    background: radial-gradient(circle, rgba(245, 180, 24, 0.05) 0%, transparent 70%);
  }


  /* Section Label Styling */
  .section-label {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    margin: var(--space-10) auto;
    max-width: 1200px;
  }

  .label-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, 
      transparent, 
      var(--color-dark-200) 20%, 
      var(--color-dark-200) 80%, 
      transparent
    );
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

  @media (max-width: 768px) {
    padding: var(--space-6) var(--space-4) var(--space-12);
  }
`;

const HeroSectionWrapper = styled.div.attrs(props => ({
  style: {
    '--scroll-y': props.$scrollY || 0,
  }
}))`
  position: relative;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  padding: var(--space-12) var(--space-6);
  overflow: hidden;
  background: linear-gradient(135deg, rgba(217, 118, 82, 0.1), rgba(90, 148, 112, 0.1));
  min-height: 500px;

  /* Background Images - Full Width with Sequential Parallax Scrolling */
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    width: 50vw;
    height: 120%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.3;
    z-index: 0;
    will-change: transform;
    transition: transform 0.1s ease-out;
  }

  &::before {
    left: 0;
    background-image: url(${Picture1});
    /* First image scrolls faster - appears first */
    transform: translateY(calc(var(--scroll-y) * -150px));
  }

  &::after {
    left: 50vw;
    background-image: url(${Picture2});
    /* Second image scrolls slower - appears after first, creating sequential effect */
    transform: translateY(calc(var(--scroll-y) * -80px));
  }

  @media (max-width: 768px) {
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    margin-right: calc(-50vw + 50%);
    padding: var(--space-8) var(--space-4);
    min-height: 400px;

    &::before,
    &::after {
      width: 50vw;
      opacity: 0.2;
      height: 100%;
      transform: translateY(0);
    }

    &::after {
      left: 50vw;
    }
  }
`;

const HeroSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;

  .hero-content {
    margin-bottom: var(--space-10);
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
  }

  .hero-title {
    font-family: var(--font-heading);
    font-size: var(--text-5xl);
    font-weight: 700;
    color: var(--color-dark-900);
    margin-bottom: var(--space-5);
    line-height: 1.1;
  }

  .title-accent {
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 700;
  }

  .hero-description {
    font-size: var(--text-lg);
    color: var(--color-dark-900);
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.8;
    font-weight: 600;
    padding: var(--space-6) var(--space-8);
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: var(--radius-2xl);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.8);
    text-shadow: 0 1px 2px rgba(255, 255, 255, 0.5);
  }

  @media (max-width: 768px) {
    .hero-title {
      font-size: var(--text-4xl);
    }
  }
`;

const ProgramsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
  max-width: 1200px;
  margin: var(--space-10) auto var(--space-16);

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const ProgramCard = styled.article`
  background: white;
  border-radius: var(--radius-3xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--color-dark-100);
  transition: all var(--transition-slow);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);

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

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .icon-wrapper {
    width: 56px;
    height: 56px;
    border-radius: var(--radius-2xl);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    transition: all var(--transition-base);

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

  &:hover .icon-wrapper {
    transform: scale(1.1) rotate(-5deg);
  }

  .stat-badge {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2px;

    .stat-number {
      font-family: var(--font-heading);
      font-size: var(--text-xl);
      font-weight: 600;
      color: var(--color-dark-800);
      line-height: 1;
    }

    .stat-label {
      font-size: var(--text-xs);
      color: var(--color-dark-400);
      font-weight: 500;
    }
  }

  .card-title {
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    font-weight: 600;
    color: var(--color-dark-900);
    line-height: 1.3;
    margin: 0;
  }

  .card-description {
    font-size: var(--text-sm);
    color: var(--color-dark-500);
    line-height: 1.7;
    margin: 0;
  }

  .tags-container {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    margin-top: auto;
  }

  .tag {
    display: flex;
    gap: var(--space-3);
    padding: var(--space-3);
    border-radius: var(--radius-xl);
    transition: all var(--transition-base);

    &.color-primary {
      background: var(--color-primary-50);
      
      .tag-indicator {
        background: var(--gradient-primary);
      }
    }

    &.color-secondary {
      background: var(--color-secondary-50);
      
      .tag-indicator {
        background: var(--gradient-secondary);
      }
    }

    &.color-accent {
      background: var(--color-accent-50);
      
      .tag-indicator {
        background: var(--gradient-accent);
      }
    }

    .tag-indicator {
      width: 4px;
      border-radius: var(--radius-full);
      flex-shrink: 0;
    }

    .tag-content {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .tag-label {
      font-size: var(--text-xs);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--color-dark-600);
    }

    .tag-text {
      font-size: var(--text-sm);
      color: var(--color-dark-600);
      line-height: 1.5;
    }
  }

  .learn-more {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-sm);
    font-weight: 600;
    margin-top: var(--space-2);
    transition: all var(--transition-base);
    width: fit-content;

    &.color-primary {
      color: var(--color-primary-600);
    }

    &.color-secondary {
      color: var(--color-secondary-600);
    }

    &.color-accent {
      color: var(--color-accent-700);
    }

    .arrow-icon {
      transition: transform var(--transition-base);
    }

    &:hover .arrow-icon {
      transform: translateX(4px);
    }
  }
`;

const CTASection = styled.section`
  max-width: 900px;
  margin: 0 auto;
  background: var(--gradient-dark);
  border-radius: var(--radius-3xl);
  padding: var(--space-12) var(--space-8);
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -100px;
    right: -100px;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(217, 118, 82, 0.2) 0%, transparent 70%);
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -50px;
    left: -50px;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(90, 148, 112, 0.15) 0%, transparent 70%);
    pointer-events: none;
  }

  .cta-content {
    position: relative;
    z-index: 1;
  }

  .cta-title {
    font-family: var(--font-heading);
    font-size: var(--text-4xl);
    font-weight: 600;
    color: white;
    margin-bottom: var(--space-4);
  }

  .cta-text {
    font-size: var(--text-base);
    color: rgba(255, 255, 255, 0.75);
    line-height: 1.8;
    margin-bottom: var(--space-8);
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .cta-buttons {
    display: flex;
    gap: var(--space-4);
    justify-content: center;
    flex-wrap: wrap;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-4) var(--space-8);
    background: var(--gradient-primary);
    color: white;
    font-weight: 600;
    font-size: var(--text-base);
    border-radius: var(--radius-full);
    box-shadow: var(--shadow-lg), var(--shadow-glow-primary);
    transition: all var(--transition-base);
    text-decoration: none;
    border: none;
    cursor: pointer;

    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-xl), 0 12px 48px rgba(217, 118, 82, 0.4);
    }
  }

  .btn-outline {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-4) var(--space-8);
    background: transparent;
    color: white;
    font-weight: 600;
    font-size: var(--text-base);
    border-radius: var(--radius-full);
    border: 2px solid rgba(255, 255, 255, 0.3);
    transition: all var(--transition-base);
    text-decoration: none;
    cursor: pointer;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.5);
      transform: translateY(-2px);
    }
  }

  @media (max-width: 768px) {
    padding: var(--space-8) var(--space-6);

    .cta-title {
      font-size: var(--text-3xl);
    }

    .cta-buttons {
      flex-direction: column;
      align-items: center;
    }

    .btn-primary, .btn-outline {
      width: 100%;
      max-width: 280px;
      justify-content: center;
    }
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 1000;
  padding: 120px var(--space-4) var(--space-4);
  animation: fadeIn 0.3s ease;
  overflow-y: auto;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalContent = styled.div`
  background: white;
  border-radius: var(--radius-3xl);
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-xl);
  animation: slideUp 0.3s ease;

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: var(--color-dark-50);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-primary-300);
    border-radius: var(--radius-full);
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-6) var(--space-8);
  border-bottom: 1px solid var(--color-dark-100);
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
  border-radius: var(--radius-3xl) var(--radius-3xl) 0 0;

  h2 {
    font-family: var(--font-heading);
    font-size: var(--text-3xl);
    font-weight: 600;
    color: var(--color-dark-900);
    margin: 0;
  }

  .close-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: var(--radius-lg);
    background: var(--color-dark-50);
    border: none;
    color: var(--color-dark-600);
    font-size: 1.5rem;
    cursor: pointer;
    transition: all var(--transition-base);

    &:hover {
      background: var(--color-primary-100);
      color: var(--color-primary-600);
      transform: rotate(90deg);
    }
  }
`;

const ModalBody = styled.div`
  padding: var(--space-8);

  .modal-image {
    width: 100%;
    max-width: 500px;
    margin: 0 auto var(--space-6);
    border-radius: var(--radius-xl);
    overflow: hidden;
    background: var(--color-dark-50);

    img {
      width: 100%;
      height: auto;
      display: block;
    }
  }

  .modal-text {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);

    > p {
      font-size: var(--text-base);
      color: var(--color-dark-600);
      line-height: 1.8;
      margin: 0;
    }

    .section {
      padding: var(--space-5);
      background: var(--color-primary-50);
      border-radius: var(--radius-xl);
      border-left: 3px solid var(--color-primary-500);

      &.highlight {
        background: var(--gradient-primary);
        color: white;
        border-left: 3px solid white;

        h3 {
          color: white;
        }

        p {
          color: rgba(255, 255, 255, 0.95);
        }
      }

      h3 {
        font-family: var(--font-heading);
        font-size: var(--text-xl);
        font-weight: 600;
        color: var(--color-primary-700);
        margin: 0 0 var(--space-3) 0;
      }

      p {
        font-size: var(--text-base);
        color: var(--color-dark-600);
        line-height: 1.8;
        margin: 0;
      }
    }
  }

  @media (max-width: 768px) {
    padding: var(--space-6);

    .modal-text .section {
      padding: var(--space-4);
    }
  }
`;

export default Programinitiative;
