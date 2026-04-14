import React from 'react';
import styled from 'styled-components';
import { FiHeart, FiUsers, FiDollarSign, FiArrowRight, FiCheck, FiGift } from 'react-icons/fi';
import imgVolunteer from '../assets/images/img28.png';

const Volunteerdonate = () => {
  const volunteerBenefits = [
    'Digital Content Creation: Help design our animated reels, social media campaigns, and creative content for the app.',
    'Field Support: Assist our research team in conducting surveys, organizing workshops, and facilitating focus group discussions (FGDs) in Delhi-NCR.',
    'Software Development: Contribute to the development and testing of the SWAMPURNA Android Application and web interface'
  ];

  const donationTiers = [
    {
      amount: 'Pillar of Change',
      title: 'Digital Innovation Partner',
      description: 'Supports the development of one new Interactive Gamified Module for the app.',
      recognition: 'Featured as a "Digital Innovation Partner" on the website.',
      icon: FiGift,
      popular: false
    },
    {
      amount: 'Community Champion',
      title: 'Community Champion',
      description: 'Funds a full MHH Sensitization Workshop for an entire village/slum community, including male sensitization.',
      recognition: 'Prominent logo placement on our website, in progress reports, and outreach materials.',
      icon: FiUsers,
      popular: true
    },
    {
      amount: 'Sustainability Partner',
      title: 'Sustainability Partner',
      description: 'Provides long-term support for establishing and monitoring local Self-Help Groups (SHGs) for one year.',
      recognition: 'Opportunity for joint press releases and case studies showcasing your commitment to Public Health and the UN-SDGs.',
      icon: FiHeart,
      popular: false
    },
  ];

  const impactNumbers = [
    { number: '12,000+', label: 'Girls Educated' },
    { number: '500+', label: 'Workshops Conducted' },
    { number: '50+', label: 'Active Volunteers' },
    { number: '100%', label: 'Transparency' },
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
        <span className="section-eyebrow">Join The SWAMPURNA Movement</span>
        <h1 className="hero-title">
          Volunteer & <span className="title-accent">Donate</span>
        </h1>
        <p className="hero-description">
          The SWAMPURNA project is driven by a critical mission: to transform menstrual health from a source of stigma and fear into one of dignity and scientific understanding. While we are proudly funded by the Department of Science and Technology (DST) - Cognitive Science Research Initiative (CSRI), sustaining and scaling this innovative work requires a community of committed partners. Your support directly helps us bridge the digital and cognitive gaps for adolescent girls in India's most marginalized communities.
        </p>
      </HeroSection>

      {/* Why Support Section */}
      <WhySupportSection>
        <h2>Why Your Support is Crucial</h2>
        <p>Our research has developed a powerful, scalable prototype: a mHealth solution integrated with rigorous psychometric screening and participatory communication. To move from a successful prototype to a sustainable, national movement, we need help in key areas:</p>
        <ul>
          <li><strong>Scaling the App:</strong> Expanding the SWAMPURNA Android App to cover more regional languages and integrate more specialized mental health support modules.</li>
          <li><strong>On-Ground Operations:</strong> Funding our Field Teams for continuous community engagement, running Self-Help Groups (SHGs), and conducting essential follow-up studies in remote areas.</li>
          <li><strong>Infrastructure & Product Access:</strong> Sponsoring the provision of basic hygiene infrastructure and affordable menstrual products in the most vulnerable locations where we work.</li>
          <li><strong>Research to Policy:</strong> Transforming our validated data into policy recommendations to ensure MHH is integrated into national social and educational structures.</li>
        </ul>
      </WhySupportSection>

      {/* Impact Numbers */}
      <ImpactBar>
        {impactNumbers.map((item, index) => (
          <div key={index} className="impact-item">
            <span className="impact-number">{item.number}</span>
            <span className="impact-label">{item.label}</span>
          </div>
        ))}
      </ImpactBar>

      {/* Two Column Layout */}
      <ContentGrid>
        {/* Volunteer Section */}
        <VolunteerCard>
          <div className="card-header">
            <div className="icon-wrapper">
              <FiUsers />
            </div>
            <h2>Become a Volunteer</h2>
          </div>
          <p className="card-description">
            Join our team of dedicated volunteers and make a tangible difference in 
            the lives of adolescent girls. Your time and skills can help us reach 
            more communities.
          </p>
          <div className="benefits-section">
            <span className="benefits-title">Volunteer & Internship Opportunities:</span>
            <div className="benefits-list">
              {volunteerBenefits.map((benefit, index) => (
                <div key={index} className="benefit-item">
                  <FiCheck className="check-icon" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="collaboration-section">
            <h3>Institutional & Academic Collaboration</h3>
            <p>We seek partnerships with organizations that share our commitment to evidence-based public health:</p>
            <ul>
              <li><strong>Technology & Data:</strong> Collaborate on integrating advanced tools (like AR/VR features) or providing Data Science support for our large-scale cognitive mapping efforts.</li>
              <li><strong>Community Outreach:</strong> Partner with NGOs and governmental bodies to utilize their established networks for scaling up the on-ground deployment of the SWAMPURNA model.</li>
              <li><strong>Research & Publication:</strong> Co-author papers and participate in joint research projects to further validate the Psychometric Screening Tool and mHealth efficacy.</li>
            </ul>
          </div>
          <button className="action-button volunteer">
            <span>Apply to Volunteer</span>
            <FiArrowRight />
          </button>
        </VolunteerCard>

        {/* Donate Section */}
        <DonateCard>
          <div className="card-header">
            <div className="icon-wrapper">
              <FiDollarSign />
            </div>
            <h2>Make a Donation</h2>
          </div>
          <p className="card-description">
            Your financial support enables us to expand our programs, reach more 
            girls, and create sustainable change in menstrual health education.
          </p>
          <div className="donation-tiers">
            {donationTiers.map((tier, index) => (
              <div key={index} className={`tier-card ${tier.popular ? 'popular' : ''}`}>
                {tier.popular && <span className="popular-badge">Most Popular</span>}
                <div className="tier-icon">
                  <tier.icon />
                </div>
                <span className="tier-amount">{tier.amount}</span>
                <span className="tier-title">{tier.title}</span>
                <span className="tier-description">{tier.description}</span>
                <span className="tier-recognition">{tier.recognition}</span>
              </div>
            ))}
          </div>
          <div className="accountability-section">
            <h3>Our Accountability to You</h3>
            <p>As a DST-funded project led by esteemed faculty from BIT Mesra and AIIMS, New Delhi, we adhere to the highest standards of transparency and rigorous scientific methodology.</p>
            <ul>
              <li><strong>Measurable Impact:</strong> Your support is tied directly to our Approved Objectives (Psychometric Screening, Tech Intervention, Community Sensitization). We provide detailed progress reports and evidence of behavior change through our longitudinal research design.</li>
              <li><strong>Sustainable Model:</strong> We are building a model that can be replicated across India, ensuring your investment creates a lasting change that extends far beyond the life of the initial grant.</li>
            </ul>
          </div>
          <button className="action-button donate">
            <span>Donate Now</span>
            <FiArrowRight />
          </button>
        </DonateCard>
      </ContentGrid>

      {/* Featured Image */}
      <FeaturedImage>
        <img src={imgVolunteer} alt="SWAMPURNA Team" />
        <div className="image-overlay">
          <h3>Join Our Growing Family</h3>
          <p>Be part of a movement that's changing lives every day</p>
        </div>
      </FeaturedImage>

      {/* Quote Section */}
      <QuoteSection>
        <div className="quote-content">
          <div className="quote-icon">"</div>
          <blockquote>
            We invite you to join our mission—whether through your time or financial 
            support, every contribution counts. Together, we can ensure that menstrual 
            health is a right for all.
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
    bottom: 20%;
    left: -150px;
    background: radial-gradient(circle, rgba(90, 148, 112, 0.06) 0%, transparent 70%);
  }

  @media (max-width: 768px) {
    padding: var(--space-6) var(--space-4) var(--space-12);
  }
`;

const WhySupportSection = styled.section`
  background: white;
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--color-dark-100);
  margin-bottom: var(--space-10);

  h2 {
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
    margin-bottom: var(--space-4);
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      font-size: var(--text-base);
      color: var(--color-dark-600);
      line-height: 1.8;
      margin-bottom: var(--space-3);
      padding-left: var(--space-5);
      position: relative;

      &::before {
        content: '•';
        position: absolute;
        left: 0;
        color: var(--color-primary-500);
        font-weight: bold;
        font-size: 1.5rem;
      }
    }
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
    max-width: 700px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    .hero-title {
      font-size: var(--text-4xl);
    }
  }
`;

const ImpactBar = styled.div`
  display: flex;
  justify-content: center;
  gap: var(--space-10);
  padding: var(--space-6);
  background: white;
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--color-dark-100);
  margin-bottom: var(--space-10);

  .impact-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-1);
  }

  .impact-number {
    font-family: var(--font-heading);
    font-size: var(--text-3xl);
    font-weight: 600;
    color: var(--color-primary-600);
  }

  .impact-label {
    font-size: var(--text-sm);
    color: var(--color-dark-400);
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: var(--space-6);

    .impact-item {
      flex: 1;
      min-width: 120px;
    }

    .impact-number {
      font-size: var(--text-2xl);
    }
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);
  margin-bottom: var(--space-10);

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const VolunteerCard = styled.div`
  background: white;
  border-radius: var(--radius-3xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--color-dark-100);
  display: flex;
  flex-direction: column;

  .card-header {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    margin-bottom: var(--space-4);
  }

  .icon-wrapper {
    width: 56px;
    height: 56px;
    border-radius: var(--radius-xl);
    background: var(--color-secondary-100);
    color: var(--color-secondary-600);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
  }

  h2 {
    font-family: var(--font-heading);
    font-size: var(--text-2xl);
    font-weight: 600;
    color: var(--color-dark-900);
  }

  .card-description {
    font-size: var(--text-base);
    color: var(--color-dark-500);
    line-height: 1.8;
    margin-bottom: var(--space-6);
  }

  .benefits-section {
    background: var(--color-secondary-50);
    border-radius: var(--radius-xl);
    padding: var(--space-5);
    margin-bottom: var(--space-6);
    flex: 1;
  }

  .benefits-title {
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-dark-700);
    display: block;
    margin-bottom: var(--space-4);
  }

  .benefits-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .benefit-item {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    font-size: var(--text-sm);
    color: var(--color-dark-600);

    .check-icon {
      color: var(--color-secondary-500);
      flex-shrink: 0;
    }
  }

  .action-button.volunteer {
    background: var(--gradient-secondary);
    color: white;
    box-shadow: var(--shadow-md), var(--shadow-glow-secondary);
  }
`;

const DonateCard = styled.div`
  background: white;
  border-radius: var(--radius-3xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--color-dark-100);
  display: flex;
  flex-direction: column;

  .card-header {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    margin-bottom: var(--space-4);
  }

  .icon-wrapper {
    width: 56px;
    height: 56px;
    border-radius: var(--radius-xl);
    background: var(--color-primary-100);
    color: var(--color-primary-600);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
  }

  h2 {
    font-family: var(--font-heading);
    font-size: var(--text-2xl);
    font-weight: 600;
    color: var(--color-dark-900);
  }

  .card-description {
    font-size: var(--text-base);
    color: var(--color-dark-500);
    line-height: 1.8;
    margin-bottom: var(--space-6);
  }

  .donation-tiers {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-4);
    margin-bottom: var(--space-6);
    flex: 1;

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
    }
  }

  .tier-card {
    position: relative;
    padding: var(--space-5);
    background: var(--color-cream-100);
    border-radius: var(--radius-xl);
    text-align: center;
    border: 2px solid transparent;
    transition: all var(--transition-base);
    cursor: pointer;

    &:hover {
      border-color: var(--color-primary-200);
    }

    &.popular {
      border-color: var(--color-primary-400);
      background: var(--color-primary-50);
    }

    .popular-badge {
      position: absolute;
      top: -10px;
      left: 50%;
      transform: translateX(-50%);
      padding: var(--space-1) var(--space-3);
      background: var(--gradient-primary);
      color: white;
      font-size: var(--text-xs);
      font-weight: 600;
      border-radius: var(--radius-full);
      white-space: nowrap;
    }

    .tier-icon {
      width: 40px;
      height: 40px;
      border-radius: var(--radius-lg);
      background: white;
      color: var(--color-primary-500);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      margin: 0 auto var(--space-3);
    }

    .tier-amount {
      display: block;
      font-family: var(--font-heading);
      font-size: var(--text-2xl);
      font-weight: 700;
      color: var(--color-dark-900);
      margin-bottom: var(--space-1);
    }

    .tier-title {
      display: block;
      font-size: var(--text-sm);
      font-weight: 600;
      color: var(--color-primary-600);
      margin-bottom: var(--space-2);
    }

    .tier-description {
      font-size: var(--text-xs);
      color: var(--color-dark-500);
      line-height: 1.5;
      margin-bottom: var(--space-2);
    }

    .tier-recognition {
      font-size: var(--text-xs);
      color: var(--color-primary-600);
      font-weight: 600;
      font-style: italic;
      line-height: 1.4;
    }
  }

  .accountability-section {
    margin-top: var(--space-6);
    padding: var(--space-5);
    background: var(--color-primary-50);
    border-radius: var(--radius-xl);
    border-left: 3px solid var(--color-primary-500);

    h3 {
      font-family: var(--font-heading);
      font-size: var(--text-lg);
      font-weight: 600;
      color: var(--color-dark-900);
      margin-bottom: var(--space-3);
    }

    p {
      font-size: var(--text-sm);
      color: var(--color-dark-700);
      line-height: 1.7;
      margin-bottom: var(--space-3);
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        font-size: var(--text-sm);
        color: var(--color-dark-700);
        line-height: 1.7;
        margin-bottom: var(--space-2);
        padding-left: var(--space-4);
        position: relative;

        &::before {
          content: '•';
          position: absolute;
          left: 0;
          color: var(--color-primary-500);
          font-weight: bold;
        }
      }
    }
  }

  .collaboration-section {
    margin-top: var(--space-4);
    padding: var(--space-4);
    background: var(--color-secondary-50);
    border-radius: var(--radius-xl);
    border-left: 3px solid var(--color-secondary-500);

    h3 {
      font-family: var(--font-heading);
      font-size: var(--text-base);
      font-weight: 600;
      color: var(--color-dark-900);
      margin-bottom: var(--space-2);
    }

    p {
      font-size: var(--text-sm);
      color: var(--color-dark-700);
      line-height: 1.7;
      margin-bottom: var(--space-3);
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        font-size: var(--text-sm);
        color: var(--color-dark-700);
        line-height: 1.7;
        margin-bottom: var(--space-2);
        padding-left: var(--space-4);
        position: relative;

        &::before {
          content: '•';
          position: absolute;
          left: 0;
          color: var(--color-secondary-500);
          font-weight: bold;
        }
      }
    }
  }

  .action-button.donate {
    background: var(--gradient-primary);
    color: white;
    box-shadow: var(--shadow-md), var(--shadow-glow-primary);
  }
`;

const FeaturedImage = styled.div`
  position: relative;
  border-radius: var(--radius-3xl);
  overflow: hidden;
  margin-bottom: var(--space-10);

  img {
    width: 100%;
    height: 350px;
    object-fit: cover;
  }

  .image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 0%, rgba(26, 24, 21, 0.8) 100%);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: var(--space-8);
  }

  h3 {
    font-family: var(--font-heading);
    font-size: var(--text-3xl);
    font-weight: 600;
    color: white;
    margin-bottom: var(--space-2);
  }

  p {
    font-size: var(--text-lg);
    color: rgba(255, 255, 255, 0.8);
  }
`;

const QuoteSection = styled.section`
  background: var(--gradient-dark);
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
    background: radial-gradient(circle, rgba(245, 180, 24, 0.2) 0%, transparent 70%);
  }

  .quote-content {
    position: relative;
    z-index: 1;
  }

  .quote-icon {
    font-family: var(--font-heading);
    font-size: 5rem;
    color: var(--color-accent-500);
    line-height: 1;
    margin-bottom: var(--space-4);
    opacity: 0.5;
  }

  blockquote {
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    font-weight: 400;
    font-style: italic;
    color: white;
    line-height: 1.8;
    max-width: 700px;
    margin: 0 auto;
  }
`;

// Action button shared styles
const ActionButtonStyles = `
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-4) var(--space-6);
  font-weight: 600;
  font-size: var(--text-base);
  border-radius: var(--radius-full);
  width: fit-content;
  transition: all var(--transition-base);

  &:hover {
    transform: translateY(-2px);
  }
`;

export default Volunteerdonate;
