import React from 'react';
import styled from 'styled-components';
import { FiMail, FiAward, FiUsers, FiHeart } from 'react-icons/fi';
import Member1 from '../assets/images/images1/Member1.jpg';
import Member2 from '../assets/images/images1/Member2.jpg';
import Member3 from '../assets/images/images1/Member3.jpg';
import Member4 from '../assets/images/images1/Member4.jpg';
import Member5 from '../assets/images/images1/Member5.jpg';
import Member6 from '../assets/images/images1/Member6.jpg';

const Ourteam = () => {
  const teamMembers = [
    {
      profileImage: Member1,
      name: 'Dr. Suparna Dutta',
      qualification: 'Ph.D.',
      designation: 'Associate Professor, Humanities (Communication)',
      email: 's.dutta@bitmesra.ac.in',
      role: 'Principal Investigator',
      color: 'primary',
      description: 'P.I. (Project Investigator): Dr. Suparna Dutta is an Associate professor (Humanities) in the Department of Management at BIT Mesra Noida Campus, India. She teaches various aspects of the "Communication" subject to students of UG/PG and has guided research scholars and students in their research studies. She has organized various international and national conferences. Her papers have been published in national and international journals, proceedings and books etc. She has authored a book "Business Communication" published by PHI publisher & her edited volume on Communication was published by MacMillan India. She is eager to help students with career development, personality development and social challenges. Her area of Interest are Development & Gender studies, Participatory & Social Behavior Change, Communication for social Outreach, and Animation & Cognitive Science communication tools and technologies.'
    },
    {
      profileImage: Member2,
      name: 'Dr. K Aparna Sharma',
      qualification: 'Ph.D.',
      designation: 'Professor Department of Obstetrics and Gynaecology AIIMS New Delhi',
      email: '',
      role: 'Co-Principal Investigator',
      color: 'secondary',
      description: 'Co-Principal Investigator: Dr. K Aparna Sharma is a Professor in the Department of Obstetrics and Gynaecology at AIIMS New Delhi, bringing extensive medical expertise to the SWAMPURNA project.'
    },
    {
      profileImage: Member3,
      name: 'Vibhu Acharya',
      qualification: 'Integrated master\'s degree (Birla Institute of Technology, Mesra) and Master\'s in Sociology',
      designation: 'Senior Research Fellow',
      email: 'v.acharya3204@gmail.com',
      role: 'Senior Research Fellow',
      color: 'accent',
      description: 'Senior Research Fellow: Vibhu\'s research interest lies at the critical intersection of science, technology, innovation (STI) policy, society, and development, making them instrumental in designing a solution that is both technologically advanced and culturally sensitive. Vibhu is uniquely positioned to bridge the gap between hard science and social context. Their experience is reinforced by a proficiency in Quantitative & Qualitative tools like STATA, NVivo, ensuring our research is rigorously supported by data analysis.'
    },
    {
      profileImage: Member4,
      name: 'Puja Gupta',
      qualification: 'Masters in political science, Delhi university',
      designation: 'Junior Research Fellow',
      email: 'pujagupta.gupta88@gmail.com',
      role: 'Junior Research Fellow',
      color: 'primary',
      description: 'Junior Research Fellow: The Junior Research Fellow supports research activities on menstrual health and hygiene. She conducts field surveys, interviews, and focuses group discussions, and ensures accurate and ethical data collection. She reviews literature and helps analyse qualitative and quantitative data. She prepares short reports, research notes, and documentation for project meetings. She coordinates with field teams, schools, community groups, and partner organisations to ensure smooth implementation.'
    },
    {
      profileImage: Member5,
      name: 'Annu Kumari',
      qualification: 'Bachelors in physical and computer science, Delhi University',
      designation: 'Project Assistant',
      email: 'annunandan2003@gmail.com',
      role: 'Project Assistant',
      color: 'secondary',
      description: 'Project Assistant: She supports field implementation, awareness activities, and community engagement focused on menstrual hygiene and women\'s health. Mobilises adolescent girls and women\'s groups and coordinates the distribution of menstrual hygiene products. She collects field data, maintains records, assists in monitoring activities, and prepares brief reports.'
    },
    {
      profileImage: Member6,
      name: 'Sandeep Gorai',
      qualification: 'Masters in computer science',
      designation: 'Data entry operator',
      email: 'maxjmabitmca@gmail.com',
      role: 'Data Entry Operator',
      color: 'accent',
      description: 'Data entry operator: He manages all data related tasks for the menstrual health project, ensuring accurate, timely, and confidential entry of beneficiary records, session details, distribution logs, and monitoring data. He maintains digital databases, verifies information, and supports reporting needs. In addition to data entry, he oversees the project\'s website and app development. He updates menstrual health content, uploads reports and photos, manages dashboards, and ensures the platform functions smoothly.'
    },
  ];

  const values = [
    { icon: FiUsers, title: 'Collaboration', description: 'We work together across disciplines to find the best solutions for menstrual health challenges.' },
    { icon: FiHeart, title: 'Dedication', description: 'Every member is committed to making a tangible difference in the lives of adolescent girls.' },
    { icon: FiAward, title: 'Innovation', description: 'Our team constantly seeks out new ways to leverage technology and participatory communication for sustainable change.' },
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
        <span className="section-eyebrow">Our People</span>
        <h1 className="hero-title">
          Meet the <span className="title-accent">SWAMPURNA Team</span>
        </h1>
        <p className="hero-description">
          At the heart of SWAMPURNA is a passionate, multi-disciplinary team dedicated 
          to improving menstrual health and hygiene for adolescent girls and their 
          communities. Our team brings together expertise in health, technology, 
          education, and community engagement to create lasting, sustainable impact.
        </p>
      </HeroSection>

      {/* Team Grid */}
      <div className="section-label">
        <span className="label-line"></span>
        <span className="label-text">Team Members</span>
        <span className="label-line"></span>
      </div>

      <TeamGrid>
        {teamMembers.map((member, index) => (
          <TeamCard key={index} className={`color-${member.color}`}>
            <div className="card-header">
              <div className="image-wrapper">
                <img src={member.profileImage} alt={member.name} />
                <div className="role-badge">{member.role}</div>
              </div>
            </div>
            <div className="card-content">
              <h3>{member.name}</h3>
              <span className="qualification">{member.qualification}</span>
              <p className="designation">{member.designation}</p>
              {member.email && (
                <a href={`mailto:${member.email}`} className="email-link">
                  <FiMail />
                  <span>{member.email}</span>
                </a>
              )}
              {member.description && (
                <p className="member-description">{member.description}</p>
              )}
            </div>
          </TeamCard>
        ))}
      </TeamGrid>

      {/* Values Section */}
      <ValuesSection>
        <div className="section-label">
          <span className="label-line"></span>
          <span className="label-text">Our Team Values</span>
          <span className="label-line"></span>
        </div>
        <ValuesGrid>
          {values.map((value, index) => (
            <ValueCard key={index}>
              <div className="value-icon">
                <value.icon />
              </div>
              <h4>{value.title}</h4>
              <p>{value.description}</p>
            </ValueCard>
          ))}
        </ValuesGrid>
      </ValuesSection>

      {/* Quote Section */}
      <QuoteSection>
        <div className="quote-content">
          <div className="quote-icon">"</div>
          <blockquote>
            Empowering communities and transforming lives through innovative menstrual 
            health solutions is our mission, and we are committed to this cause every day.
          </blockquote>
          <cite>– Dr. Suparna Dutta, Principal Investigator</cite>
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
    bottom: 10%;
    left: -150px;
    background: radial-gradient(circle, rgba(90, 148, 112, 0.06) 0%, transparent 70%);
  }

  .section-label {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    margin-bottom: var(--space-8);
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
    background: var(--gradient-primary);
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

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);
  margin-bottom: var(--space-16);
  align-items: stretch;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TeamCard = styled.div`
  background: white;
  border-radius: var(--radius-3xl);
  overflow: hidden;
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--color-dark-100);
  transition: all var(--transition-slow);
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-soft-lg);
  }

  &.color-primary .role-badge {
    background: var(--gradient-primary);
  }

  &.color-secondary .role-badge {
    background: var(--gradient-secondary);
  }

  &.color-accent .role-badge {
    background: var(--gradient-accent);
    color: var(--color-dark-900);
  }

  .card-header {
    position: relative;
  }

  .image-wrapper {
    position: relative;
    width: 100%;
    max-width: 280px;
    aspect-ratio: 3 / 4;
    margin: 0 auto;
    overflow: hidden;
    background: var(--color-dark-50);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center center;
      display: block;
    }

    .role-badge {
      position: absolute;
      bottom: var(--space-4);
      right: var(--space-4);
      padding: var(--space-2) var(--space-4);
      color: white;
      font-size: var(--text-xs);
      font-weight: 600;
      border-radius: var(--radius-full);
      box-shadow: var(--shadow-md);
      z-index: 2;
    }
  }

  .card-content {
    padding: var(--space-6);
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  h3 {
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    font-weight: 600;
    color: var(--color-dark-900);
    margin-bottom: var(--space-1);
  }

  .qualification {
    font-size: var(--text-sm);
    color: var(--color-primary-600);
    font-weight: 500;
    display: block;
    margin-bottom: var(--space-3);
  }

  .designation {
    font-size: var(--text-sm);
    color: var(--color-dark-500);
    line-height: 1.6;
    margin-bottom: var(--space-4);
  }

  .email-link {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-sm);
    color: var(--color-secondary-600);
    font-weight: 500;
    transition: color var(--transition-base);
    margin-bottom: var(--space-4);

    &:hover {
      color: var(--color-secondary-700);
    }
  }

  .member-description {
    font-size: var(--text-sm);
    color: var(--color-dark-600);
    line-height: 1.7;
    margin-top: var(--space-4);
    text-align: justify;
    flex: 1;
  }
`;

const ValuesSection = styled.section`
  margin-bottom: var(--space-12);
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ValueCard = styled.div`
  background: linear-gradient(135deg, var(--color-cream-100), var(--color-cream-200));
  border-radius: var(--radius-2xl);
  padding: var(--space-6);
  text-align: center;
  border: 1px solid var(--color-dark-100);
  transition: all var(--transition-base);

  &:hover {
    border-color: var(--color-secondary-200);
  }

  .value-icon {
    width: 56px;
    height: 56px;
    border-radius: var(--radius-xl);
    background: var(--gradient-secondary);
    color: white;
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
    background: radial-gradient(circle, rgba(217, 118, 82, 0.2) 0%, transparent 70%);
  }

  .quote-content {
    position: relative;
    z-index: 1;
  }

  .quote-icon {
    font-family: var(--font-heading);
    font-size: 5rem;
    color: var(--color-primary-500);
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
    margin-bottom: var(--space-6);
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
  }

  cite {
    font-size: var(--text-base);
    color: var(--color-primary-400);
    font-weight: 600;
    font-style: normal;
  }
`;

export default Ourteam;
