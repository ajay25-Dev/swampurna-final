import React, { useState } from 'react';
import styled from 'styled-components';
import { FiPlus, FiMinus, FiHelpCircle } from 'react-icons/fi';
import { useContentItems } from '../hooks/useContentItems';

const fallbackFaqs = [
  { title: 'What is menstruation?', description: 'Menstruation is a natural monthly process in which the uterus sheds its lining.', tag: 'active', sort_order: 0 },
  { title: 'How long does a normal menstrual cycle last?', description: 'A typical cycle lasts 21–35 days, with bleeding for 3–7 days.', tag: 'active', sort_order: 1 },
  { title: 'Can girls go to school during periods?', description: 'Absolutely. With proper products and facilities, periods should not stop girls from attending school.', tag: 'active', sort_order: 2 },
  { title: 'How often should sanitary pads be changed?', description: 'Every 4–6 hours to prevent infection and maintain hygiene.', tag: 'active', sort_order: 3 },
  { title: 'How should used pads be disposed of?', description: 'Wrap in paper and throw in a dustbin. Do not flush. Use incinerators where available.', tag: 'active', sort_order: 4 },
];

const Faqs = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const { items } = useContentItems({
    page: 'Faqs',
    section: 'faq_items',
    fallback: fallbackFaqs,
  });

  const faqs = (items || []).filter((item) => (item.tag || 'active') === 'active');

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <PageWrapper>
      <div className="bg-decoration">
        <div className="deco-circle circle-1"></div>
        <div className="deco-circle circle-2"></div>
      </div>

      <HeroSection>
        <div className="hero-icon">
          <FiHelpCircle />
        </div>
        <span className="section-eyebrow">Help Center</span>
        <h1 className="hero-title">
          Frequently Asked <span className="title-accent">Questions</span>
        </h1>
        <p className="hero-description">
          Have questions about menstrual health, hygiene practices, or SWAMPURNA's
          programs? We're here to help. Find answers to the most commonly asked questions below.
        </p>
      </HeroSection>

      <FAQSection>
        <CategoryBlock>
          <div className="category-header">
            <h2>Frequently Asked Questions</h2>
            <span className="faq-count">{faqs.length} questions</span>
          </div>
          <div className="faqs-list">
            {faqs.map((faq, index) => (
              <FAQItem key={faq.id || index} className={activeIndex === index ? 'active' : ''}>
                <button
                  className="faq-header"
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={activeIndex === index}
                >
                  <span className="faq-title">{index + 1}. {faq.title}</span>
                  <div className="toggle-icon">
                    {activeIndex === index ? <FiMinus /> : <FiPlus />}
                  </div>
                </button>
                <div className={`faq-content ${activeIndex === index ? 'show' : ''}`}>
                  <p>{faq.description}</p>
                </div>
              </FAQItem>
            ))}
          </div>
        </CategoryBlock>
      </FAQSection>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  position: relative;
  padding: var(--space-8) var(--space-6) var(--space-16);
  overflow: hidden;
  min-height: 100vh;
  max-width: 900px;
  margin: 0 auto;

  .bg-decoration { position: absolute; inset: 0; pointer-events: none; z-index: -1; }
  .deco-circle { position: absolute; border-radius: 50%; }
  .circle-1 { width: 500px; height: 500px; top: -150px; right: -200px; background: radial-gradient(circle, rgba(217, 118, 82, 0.08) 0%, transparent 70%); }
  .circle-2 { width: 400px; height: 400px; bottom: 20%; left: -150px; background: radial-gradient(circle, rgba(90, 148, 112, 0.06) 0%, transparent 70%); }
`;

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: var(--space-12);
  .hero-icon { width: 72px; height: 72px; border-radius: var(--radius-2xl); background: var(--gradient-primary); color: white; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto var(--space-5); }
  .section-eyebrow { display: inline-block; padding: var(--space-2) var(--space-5); background: var(--color-primary-50); color: var(--color-primary-700); font-size: var(--text-xs); font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; border-radius: var(--radius-full); margin-bottom: var(--space-5); border: 1px solid var(--color-primary-100); }
  .hero-title { font-family: var(--font-heading); font-size: var(--text-5xl); font-weight: 600; color: var(--color-dark-900); margin-bottom: var(--space-5); line-height: 1.1; }
  .title-accent { background: var(--gradient-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .hero-description { font-size: var(--text-lg); color: var(--color-dark-500); line-height: 1.8; }
`;

const FAQSection = styled.section`display: flex; flex-direction: column; gap: var(--space-10);`;

const CategoryBlock = styled.div`
  .category-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4); padding-bottom: var(--space-3); border-bottom: 1px solid var(--color-dark-200); }
  h2 { font-family: var(--font-heading); font-size: var(--text-xl); font-weight: 600; color: var(--color-dark-900); }
  .faq-count { font-size: var(--text-sm); color: var(--color-dark-400); }
  .faqs-list { display: flex; flex-direction: column; gap: var(--space-3); }
`;

const FAQItem = styled.div`
  background: white;
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--color-dark-100);
  transition: all var(--transition-base);
  &.active { border-color: var(--color-primary-200); box-shadow: var(--shadow-soft-lg); }
  .faq-header { width: 100%; display: flex; justify-content: space-between; align-items: center; padding: var(--space-5); text-align: left; background: transparent; cursor: pointer; gap: var(--space-4); }
  .faq-title { font-size: var(--text-base); font-weight: 500; color: var(--color-dark-800); line-height: 1.5; }
  .toggle-icon { width: 32px; height: 32px; border-radius: var(--radius-lg); background: var(--color-primary-100); color: var(--color-primary-600); display: flex; align-items: center; justify-content: center; font-size: 1rem; flex-shrink: 0; }
  &.active .toggle-icon { background: var(--gradient-primary); color: white; }
  .faq-content { max-height: 0; overflow: hidden; transition: max-height var(--transition-slow), padding var(--transition-slow); }
  .faq-content.show { max-height: 1200px; }
  .faq-content p { padding: 0 var(--space-5) var(--space-5); font-size: var(--text-sm); color: var(--color-dark-500); line-height: 1.8; }
`;

export default Faqs;
