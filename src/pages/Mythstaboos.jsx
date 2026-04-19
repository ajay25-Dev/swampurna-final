import React from 'react';
import styled from 'styled-components';
import { useContentItems } from '../hooks/useContentItems';

const fallbackItems = [
  {
    title: 'Menstruation is considered impure or unclean.',
    description: 'In many cultural settings across India, menstruation is still viewed as dirty or impure, leading to stigma and exclusion.',
    tag: 'active',
    sort_order: 0,
  },
  {
    title: 'Menstruating girls should not enter the puja room or participate in religious activities.',
    description: 'Many believe women on their periods should not enter temples or touch holy books due to assumptions of impurity.',
    tag: 'active',
    sort_order: 1,
  },
  {
    title: 'Certain foods must be avoided during menstruation.',
    description: 'Restrictions often prevent girls from consuming specific foods, even though these beliefs are not based on science.',
    tag: 'active',
    sort_order: 2,
  },
];

const Mythstaboos = () => {
  const { items } = useContentItems({
    page: 'Mythstaboos',
    section: 'myths_items',
    fallback: fallbackItems,
  });

  const mythsAndTaboos = (items || []).filter((it) => (it.tag || 'active') === 'active');

  return (
    <PageWrapper>
      <HeroSection>
        <span className="section-eyebrow">Resources</span>
        <h1 className="hero-title">
          Myths & <span className="title-accent">Taboos</span>
        </h1>
        <p className="hero-subtitle">MYTHS & TABOOS THAT SURROUND MENSTRUATION IN INDIA</p>
        <p className="hero-description">
          A "myth" is a traditional story that explains natural or social phenomena, often involving supernatural beings, while a "taboo" is a strict prohibition or restriction placed on certain behaviors, practices, or discussions within a culture, usually stemming from cultural beliefs and considered unacceptable to engage in; essentially, myths are stories that explain things, while taboos are rules about what not to do.
        </p>
      </HeroSection>

      <MythsList>
        {mythsAndTaboos.map((myth, i) => (
          <MythItem key={myth.id || i}>
            <div className="myth-number">{i + 1}</div>
            <div className="myth-content">
              <h4>{myth.title}</h4>
              <p>{myth.description}</p>
            </div>
          </MythItem>
        ))}
      </MythsList>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  padding: var(--space-8) var(--space-6) var(--space-16);
  max-width: 1200px;
  margin: 0 auto;
`;

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: var(--space-12);
  .section-eyebrow { display: inline-block; padding: var(--space-2) var(--space-5); background: var(--color-secondary-50); color: var(--color-secondary-700); font-size: var(--text-xs); font-weight: 600; border-radius: var(--radius-full); margin-bottom: var(--space-5); }
  .hero-title { font-family: var(--font-heading); font-size: var(--text-5xl); font-weight: 600; color: var(--color-dark-900); }
  .title-accent { background: var(--gradient-secondary); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .hero-subtitle { font-size: var(--text-lg); color: var(--color-dark-600); font-weight: 500; margin-top: var(--space-4); margin-bottom: var(--space-5); text-transform: uppercase; letter-spacing: 0.05em; }
  .hero-description { font-size: var(--text-base); color: var(--color-dark-600); line-height: 1.8; max-width: 900px; margin: 0 auto; }
`;

const MythsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
`;

const MythItem = styled.div`
  display: flex;
  gap: var(--space-4);
  padding: var(--space-5);
  background: var(--color-secondary-50);
  border-radius: var(--radius-lg);
  border-left: 3px solid var(--color-secondary-500);

  .myth-number {
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    font-weight: 700;
    color: var(--color-secondary-600);
    min-width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border-radius: var(--radius-lg);
  }

  .myth-content {
    flex: 1;
  }

  .myth-content h4 {
    font-family: var(--font-heading);
    font-size: var(--text-lg);
    margin-bottom: var(--space-2);
  }

  .myth-content p {
    color: var(--color-dark-600);
    line-height: 1.7;
    margin: 0;
  }
`;

export default Mythstaboos;
