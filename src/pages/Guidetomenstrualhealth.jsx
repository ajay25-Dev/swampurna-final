import React from 'react';
import styled from 'styled-components';
import { FiBookOpen } from 'react-icons/fi';

const Guidetomenstrualhealth = () => {
  const menstrualTerms = [
    'Amenorrhea: Not getting your first period by age 15, or missing periods for three months or more.',
    'Cramps: Pain in the lower stomach during periods. It can be mild or very painful.',
    'Dysmenorrhea: Painful periods. It can happen on its own or because of other conditions.',
    'Endometriosis: A condition where tissue like the lining of the uterus grows outside it.',
    'Feminine Hygiene Products: Items like pads, tampons, menstrual cups used during periods.',
    'Follicular Phase: The first half of the menstrual cycle when the egg starts developing.',
    'Free Bleeding: Choosing not to use any menstrual products.',
    'Luteal Phase: The second half of the cycle when the uterus prepares for pregnancy.',
    'Menarche: Your first period.',
    'Menopause: When you stop having periods for one full year.',
    'Menorrhagia: Very heavy or long periods.',
    'Manses: Another word for period or menstrual blood.',
    'Menstrual Cup: A reusable cup placed in the vagina to collect period blood.',
    'NSAIDs: Medicines like ibuprofen are used to reduce period pain.',
    'Ovulation: The release of an egg from the ovary.',
    'Perimenopause: The time before menopause when hormone levels start changing.',
    'Period Panties: Underwear designed to absorb period blood.',
    'Period Poverty: Not having enough money to buy menstrual products.',
    'PCOS: A hormonal problem that affects periods and fertility.',
    'PMDD: A very severe form of PMS with emotional and physical symptoms.',
    'PMS: Physical and emotional symptoms before and at the start of a period.',
    'Prostaglandins: Body chemicals that cause cramps and inflammation.',
    'Puberty: The time when the body starts developing into an adult.',
    'Spotting: Light bleeding between periods.',
    'Tampon: A product inserted into the vagina to absorb period blood.',
    'Uterus: The organ where menstrual blood forms and where pregnancy occurs.',
    'Uterine Fibroids: Non-cancerous growth in the uterus that may affect periods.'
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
        <span className="section-eyebrow">Resources</span>
        <h1 className="hero-title">
          Guide to <span className="title-accent">Menstrual Health</span>
        </h1>
        <p className="hero-subtitle">
          "Understanding Menstruation: Simple Meanings of Common Symptoms, Medical Tests, Treatments, and Other Important Terms"
        </p>
        <p className="hero-description">
          Menstruation is about all healthy preteen to midlife women experiences nearly every month from menarche to menopause that women face. But even though one is intimately familiar with one's own period or menstruation or menstrual cycle yet its stigmatized. You may not know the language used to describe its process, products, and problems hence, this glossary of menstrual terms will helpful.
        </p>
      </HeroSection>

      {/* Content Section */}
      <ContentSection>
        <div className="terms-list">
          <h4>Glossary of Terms:</h4>
          <ul>
            {menstrualTerms.map((term, i) => (
              <li key={i}>{term}</li>
            ))}
          </ul>
        </div>
      </ContentSection>
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
    margin-bottom: var(--space-4);
    line-height: 1.1;
  }

  .title-accent {
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-subtitle {
    font-size: var(--text-lg);
    color: var(--color-dark-600);
    font-weight: 500;
    font-style: italic;
    margin-bottom: var(--space-5);
    line-height: 1.6;
  }

  .hero-description {
    font-size: var(--text-base);
    color: var(--color-dark-600);
    line-height: 1.8;
    max-width: 800px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    .hero-title {
      font-size: var(--text-4xl);
    }
  }
`;

const ContentSection = styled.section`
  background: white;
  border-radius: var(--radius-3xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--color-dark-100);

  .terms-list {
    h4 {
      font-family: var(--font-heading);
      font-size: var(--text-2xl);
      font-weight: 600;
      color: var(--color-dark-900);
      margin-bottom: var(--space-6);
    }

    ul {
      list-style: none;
      padding: 0;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: var(--space-3);

      li {
        font-size: var(--text-sm);
        color: var(--color-dark-600);
        line-height: 1.7;
        padding-left: var(--space-4);
        position: relative;

        &::before {
          content: '•';
          position: absolute;
          left: 0;
          color: var(--color-primary-500);
          font-weight: bold;
          font-size: 1.2rem;
        }
      }
    }
  }

  @media (max-width: 768px) {
    padding: var(--space-6);

    .terms-list ul {
      grid-template-columns: 1fr;
    }
  }
`;

export default Guidetomenstrualhealth;



