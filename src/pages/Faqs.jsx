import React, { useState } from 'react';
import styled from 'styled-components';
import { FiPlus, FiMinus, FiHelpCircle } from 'react-icons/fi';

const Faqs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const faqCategories = [
    {
      category: 'Frequently Asked Questions',
      faqs: [
        { 
          title: '1. What is menstruation?', 
          content: 'Menstruation is a natural monthly process in which the uterus sheds its lining, resulting in bleeding from the vagina. It usually begins between ages 10–15.' 
        },
        { 
          title: '2. At what age do girls in India typically get their first period?', 
          content: 'Most Indian girls get their first period (menarche) between 11–14 years, though it may vary due to nutrition, genetics, and health.' 
        },
        { 
          title: '3. Is it normal for periods to be irregular during the first few years?', 
          content: 'Yes. It is common for the menstrual cycle to be irregular for 2–3 years after menarche as hormones settle.' 
        },
        { 
          title: '4. How long does a normal menstrual cycle last?', 
          content: 'A typical cycle lasts 21–35 days, with bleeding for 3–7 days.' 
        },
        { 
          title: '5. What menstrual products are commonly used in India?', 
          content: 'Sanitary pads, cloth pads, tampons, menstrual cups, and period underwear are used across different regions.' 
        },
        { 
          title: '6. Are cloth pads safe?', 
          content: 'Yes, if they are clean, dried in sunlight, stored properly, and washed with soap and hot water.' 
        },
        { 
          title: '7. Can girls go to school during their periods?', 
          content: 'Absolutely. With proper products and facilities, periods should not stop girls from attending school.' 
        },
        { 
          title: '8. Why do some girls drop out of school due to menstruation?', 
          content: 'Lack of toilets, stigma, fear of leakage, lack of products, or pain are major reasons in many regions of India.' 
        },
        { 
          title: '9. Can women take a bath during periods?', 
          content: 'Yes. Bathing keeps the body clean, reduces infection risk, and helps relieve cramps.' 
        },
        { 
          title: '10. What are common myths about menstruation in India?', 
          content: 'Myths include: • Girls shouldn\'t enter temples • They shouldn\'t cook • They shouldn\'t wash hair • They shouldn\'t touch pickles. These are cultural beliefs, not scientific facts.' 
        },
        { 
          title: '11. Can women enter religious places during periods?', 
          content: 'Medically, there is no restriction. Cultural rules vary, but menstruation is not impure.' 
        },
        { 
          title: '12. What causes menstrual cramps?', 
          content: 'Cramps are caused by the uterus contracting to shed its lining.' 
        },
        { 
          title: '13. How can menstrual cramps be relieved?', 
          content: 'Using heat pads, mild exercise, hot water, hydration, pain-relief medicines (if needed), and rest.' 
        },
        { 
          title: '14. Is white discharge normal?', 
          content: 'Yes. Clear or milky discharge is normal unless it smells bad, causes itching, or changes colour.' 
        },
        { 
          title: '15. When should someone seek medical help for menstrual issues?', 
          content: 'If there is very heavy bleeding, severe pain, irregular cycles for long periods, missed periods, or unusual discharge.' 
        },
        { 
          title: '16. What is PCOS and is it common in India?', 
          content: 'Polycystic Ovary Syndrome is a hormonal condition that causes irregular periods. It is increasingly common among Indian adolescent girls.' 
        },
        { 
          title: '17. Can girls play sports during menstruation?', 
          content: 'Yes. Physical activity can reduce cramps and improve mood.' 
        },
        { 
          title: '18. Do menstrual cups work for teenagers?', 
          content: 'Yes, with the correct size and proper guidance, cups are safe for teenagers.' 
        },
        { 
          title: '19. Are period products affordable in rural India?', 
          content: 'Cost is a barrier for many; government schemes and NGOs provide affordable or free pads in several states.' 
        },
        { 
          title: '20. What is the government doing to promote menstrual hygiene?', 
          content: 'Programs like the Menstrual Hygiene Scheme, Udaan, and various state initiatives distribute pads, create awareness, and improve school WASH facilities.' 
        },
        { 
          title: '21. Why is menstrual hygiene important?', 
          content: 'Good hygiene prevents infections, increases comfort, and helps girls participate confidently in school and work.' 
        },
        { 
          title: '22. What facilities should schools provide for menstruating girls?', 
          content: 'Safe toilets, dustbins, water, soap, private changing space, and emergency pads.' 
        },
        { 
          title: '23. How often should sanitary pads be changed?', 
          content: 'Every 4–6 hours to prevent infection and maintain hygiene.' 
        },
        { 
          title: '24. Are tampons safe?', 
          content: 'Yes, when used correctly and changed every 4–8 hours.' 
        },
        { 
          title: '25. Can menstrual blood be harmful?', 
          content: 'No. It is not dirty or impure; it is simply blood and tissue from the uterus.' 
        },
        { 
          title: '26. Do diet and lifestyle affect periods?', 
          content: 'Yes. Stress, poor nutrition, low weight, obesity, and intense physical activity can affect cycles.' 
        },
        { 
          title: '27. What foods help during periods?', 
          content: 'Iron-rich foods (spinach, jaggery, lentils), fruits, vegetables, warm liquids, and whole grains.' 
        },
        { 
          title: '28. Can girls fast during periods?', 
          content: 'Medically, fasting is allowed, but individuals should listen to their body. Cultural or religious rules differ.' 
        },
        { 
          title: '29. Is it normal to feel emotional during periods?', 
          content: 'Yes. Hormonal changes can cause mood swings, irritability, or sadness.' 
        },
        { 
          title: '30. How should used pads be disposed of?', 
          content: 'Wrap in paper and throw in a dustbin. Do not flush. Use incinerators where available.' 
        },
        { 
          title: '31. How do menstrual cups affect the environment?', 
          content: 'Cups are eco-friendly because one cup can last 5–10 years.' 
        },
        { 
          title: '32. Why do many Indian girls still lack menstrual knowledge?', 
          content: 'Taboos, silence in families, lack of school education, and embarrassment prevent open discussion.' 
        },
        { 
          title: '33. What role can men and boys play?', 
          content: 'They can support menstruating individuals, help reduce stigma, and promote open conversations.' 
        },
        { 
          title: '34. What is the link between menstrual hygiene and reproductive health?', 
          content: 'Poor hygiene increases the risk of infections, infertility, and other health complications.' 
        },
        { 
          title: '35. How can communities improve menstrual hygiene practices?', 
          content: 'Through awareness sessions, ensuring product availability, improving WASH facilities, addressing myths, and involving families and local leaders.' 
        },
      ]
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

      {/* FAQ Categories */}
      <FAQSection>
        {faqCategories.map((category, catIndex) => (
          <CategoryBlock key={catIndex}>
            <div className="category-header">
              <h2>{category.category}</h2>
              <span className="faq-count">{category.faqs.length} questions</span>
            </div>
            <div className="faqs-list">
              {category.faqs.map((faq, faqIndex) => (
                <FAQItem 
                  key={faqIndex} 
                  className={activeIndex === `${catIndex}-${faqIndex}` ? 'active' : ''}
                >
                  <button
                    className="faq-header"
                    onClick={() => toggleAccordion(`${catIndex}-${faqIndex}`)}
                    aria-expanded={activeIndex === `${catIndex}-${faqIndex}`}
                  >
                    <span className="faq-title">{faq.title}</span>
                    <div className="toggle-icon">
                      {activeIndex === `${catIndex}-${faqIndex}` ? <FiMinus /> : <FiPlus />}
                    </div>
                  </button>
                  <div className={`faq-content ${activeIndex === `${catIndex}-${faqIndex}` ? 'show' : ''}`}>
                    <p>{faq.content}</p>
                  </div>
                </FAQItem>
              ))}
            </div>
          </CategoryBlock>
        ))}
      </FAQSection>

      {/* Contact CTA */}
      <CTASection>
        <h3>Still have questions?</h3>
        <p>Can't find the answer you're looking for? Feel free to reach out to our team.</p>
        <button className="contact-btn">Contact Us</button>
      </CTASection>
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

  .hero-icon {
    width: 72px;
    height: 72px;
    border-radius: var(--radius-2xl);
    background: var(--gradient-primary);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    margin: 0 auto var(--space-5);
    box-shadow: var(--shadow-lg), var(--shadow-glow-primary);
  }

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
    color: var(--color-dark-500);
    line-height: 1.8;
  }

  @media (max-width: 768px) {
    .hero-title {
      font-size: var(--text-4xl);
    }
  }
`;

const FAQSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: var(--space-10);
  margin-bottom: var(--space-12);
`;

const CategoryBlock = styled.div`
  .category-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-4);
    padding-bottom: var(--space-3);
    border-bottom: 1px solid var(--color-dark-200);
  }

  h2 {
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    font-weight: 600;
    color: var(--color-dark-900);
  }

  .faq-count {
    font-size: var(--text-sm);
    color: var(--color-dark-400);
  }

  .faqs-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }
`;

const FAQItem = styled.div`
  background: white;
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--color-dark-100);
  transition: all var(--transition-base);

  &:hover {
    border-color: var(--color-dark-200);
  }

  &.active {
    border-color: var(--color-primary-200);
    box-shadow: var(--shadow-soft-lg);
  }

  .faq-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-5);
    text-align: left;
    background: transparent;
    cursor: pointer;
    gap: var(--space-4);
  }

  .faq-title {
    font-size: var(--text-base);
    font-weight: 500;
    color: var(--color-dark-800);
    line-height: 1.5;
  }

  .toggle-icon {
    width: 32px;
    height: 32px;
    border-radius: var(--radius-lg);
    background: var(--color-primary-100);
    color: var(--color-primary-600);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    flex-shrink: 0;
    transition: all var(--transition-base);
  }

  &.active .toggle-icon {
    background: var(--gradient-primary);
    color: white;
  }

  .faq-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height var(--transition-slow), padding var(--transition-slow);

    &.show {
      max-height: 2000px;
    }

    p {
      padding: 0 var(--space-5) var(--space-5);
      font-size: var(--text-sm);
      color: var(--color-dark-500);
      line-height: 1.8;
    }
  }
`;

const CTASection = styled.section`
  text-align: center;
  padding: var(--space-8);
  background: linear-gradient(135deg, var(--color-cream-100), var(--color-cream-200));
  border-radius: var(--radius-2xl);
  border: 1px solid var(--color-dark-100);

  h3 {
    font-family: var(--font-heading);
    font-size: var(--text-2xl);
    font-weight: 600;
    color: var(--color-dark-900);
    margin-bottom: var(--space-2);
  }

  p {
    font-size: var(--text-base);
    color: var(--color-dark-500);
    margin-bottom: var(--space-5);
  }

  .contact-btn {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-3) var(--space-6);
    background: var(--gradient-primary);
    color: white;
    font-weight: 600;
    font-size: var(--text-sm);
    border-radius: var(--radius-full);
    box-shadow: var(--shadow-md), var(--shadow-glow-primary);
    transition: all var(--transition-base);

    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg), 0 12px 48px rgba(217, 118, 82, 0.35);
    }
  }
`;

export default Faqs;
