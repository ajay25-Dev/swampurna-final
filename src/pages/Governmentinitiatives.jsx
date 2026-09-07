import React from 'react';
import styled from 'styled-components';
import { useContentItems } from '../hooks/useContentItems';

const fallbackTimeline = [
  {
    subtitle: '2011',
    title: 'Launch of the Menstrual Hygiene Scheme',
    meta: { government: 'Ministry of Health & Family Welfare', status: 'Continued under NHM; not discontinued', beneficiaries: 'Rural adolescent girls (10–19 years)' },
    description: 'The Government of India launched the Menstrual Hygiene Scheme to improve access to affordable sanitary pads for girls in rural areas. ASHA workers supplied low-cost sanitary napkins and conducted awareness sessions on hygiene and safe disposal. The scheme also supported training for frontline workers and created the first structured menstrual health programme at the national level.',
    sort_order: 0,
  },
  {
    subtitle: '2014',
    title: 'Swachh Bharat Mission and Inclusion of MHM in School Sanitation',
    meta: { government: 'Ministry of Jal Shakti (then Drinking Water & Sanitation)', status: 'Ongoing national mission', beneficiaries: 'School-going girls and women in rural & urban areas' },
    description: 'The launch of Swachh Bharat Mission (SBM) strengthened menstrual hygiene indirectly by improving toilets, water facilities, and sanitation infrastructure. Separate toilets for girls, waste-disposal units, and better school sanitation made it easier for girls to manage their periods with dignity.',
    sort_order: 1,
  },
  {
    subtitle: '2015',
    title: 'National MHM Guidelines and Inclusion under Beti Bachao Beti Padhao (BBBP)',
    meta: { government: 'Ministry of Drinking Water & Sanitation; Ministry of Women & Child Development', status: 'Guidelines remain in place', beneficiaries: 'School-going girls and adolescent girls' },
    description: 'The first-ever National Guidelines on Menstrual Hygiene Management (MHM) were released in 2015. These guidelines helped schools, districts, and states understand how to provide safe toilets, disposal systems, awareness education, and stigma-free environments for menstruating girls. MHM was also added under BBBP to promote awareness and empowerment.',
    sort_order: 2,
  },
  {
    subtitle: '2016 – 2020',
    title: 'Advancing Menstrual Health Services',
    meta: { government: 'Ministry of Health & Family Welfare; State NHM units', status: 'Continued', beneficiaries: 'Adolescent girls (10–19), especially in rural areas' },
    description: 'During this period, states expanded pad distribution under NHM and supported the production of low-cost pads by Self-Help Groups (SHGs). Schools received incinerators and disposal bins, and large-scale awareness drives were conducted. Training for ASHAs, Anganwadi Workers, and school teachers strengthened menstrual education at community level.',
    sort_order: 3,
  },
  {
    subtitle: '2018',
    title: 'National Reviews',
    meta: { government: 'Independent reviews + NHM evaluations', status: 'Ongoing', beneficiaries: 'Girls in remote, marginalised, or low-income areas' },
    description: 'National reviews revealed that despite strong policies, implementation remained uneven. Many schools lacked functional toilets, disposal units, and regular pad supply. Stigma, poor awareness, and lack of monitoring slowed progress. These findings pushed for stronger, rights-based and infrastructure-focused menstrual health policies.',
    sort_order: 4,
  },
  {
    subtitle: '2022',
    title: 'Reinforcing of Menstrual Hygiene Scheme via ASHAs',
    meta: { government: 'Ministry of Health & Family Welfare', status: 'Active', beneficiaries: 'Rural adolescent girls dependent on subsidised pads' },
    description: 'In 2022, the government reiterated its commitment to continue the Menstrual Hygiene Scheme through ASHA workers. Pad distribution, awareness sessions, and adolescent health counselling remained active in states that opted for the programme.',
    sort_order: 5,
  },
  {
    subtitle: '2023',
    title: 'Release of the Draft National Menstrual Hygiene Policy',
    meta: { government: 'Ministry of Health & Family Welfare, Ministry of Women & Child Development', status: 'Draft', beneficiaries: 'All menstruators across India' },
    description: "The government released India's first national-level draft policy aimed at unifying menstrual health efforts across sectors health, sanitation, education, and gender. The draft emphasised affordable products, safe disposal, stigma removal, school sanitation, funding, and coordination between ministries.",
    sort_order: 6,
  },
  {
    subtitle: '2024',
    title: 'Menstrual Hygiene Policy for School-Going Girls (Classes 6–12)',
    meta: { government: 'Union Health Ministry (as directed by Supreme Court)', status: 'Approved in November 2024, implementation to follow', beneficiaries: 'Girls in Classes 6–12 in Government and aided schools' },
    description: 'The government framed a dedicated policy to ensure regular access to sanitary pads, disposal units, clean toilets, and menstrual education for schoolgirls. This policy aims to reduce absenteeism, support menstrual dignity, and guarantee that no girl misses school because of her period.',
    sort_order: 7,
  },
  {
    subtitle: '2025',
    title: 'Continued State-Level Innovations and Eco-Friendly Approaches',
    meta: { government: 'State governments + local bodies + NGOs', status: 'Ongoing', beneficiaries: 'Schoolgirls, adolescent girls, women in both rural and urban settings' },
    description: 'By 2025, multiple states are running innovative programmes including eco-friendly reusable pads, community-level pad banks, improved disposal and waste-management systems, and school MHM strengthening. Many states focus on sustainability, dignity, and reaching the most vulnerable girls in remote or tribal regions.',
    sort_order: 8,
  },
];

const Governmentinitiatives = () => {
  const { items } = useContentItems({
    page: 'Governmentinitiatives',
    section: 'government_timeline',
    fallback: fallbackTimeline,
  });

  const timeline = [...(items || [])].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));

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
          Government <span className="title-accent">Initiatives</span>
        </h1>
        <p className="hero-subtitle">National Menstrual Hygiene Policy</p>
        <p className="hero-description">
          According to the Ministry of Health & Family Welfare, the draft Menstrual Hygiene Policy (MHP) has been formulated through extensive stakeholder consultations. The policy adopts a comprehensive, lifecycle approach that addresses menstrual health needs from menarche to menopause, with special emphasis on underserved and vulnerable populations.
        </p>
      </HeroSection>

      {/* Content Section */}
      <ContentSection>
        <div className="government-initiatives">
          <h4>Key Interventions by Ministry of Health & Family Welfare</h4>
          <p>Scheme for Promotion of Menstrual Hygiene (2011–present): Enhances awareness among adolescent girls; improves access to high-quality sanitary napkins; ensures environmentally safe disposal. Teachers, ANMs, ASHAs and AWWs are oriented under Rashtriya Kishor Swasthya Karyakram (RKSK).</p>
          <p>Beti Bachao Beti Padhao (Mission Shakti): Includes menstrual hygiene awareness and promotion of sanitary napkin use.</p>
          <p>Department of Health Research: Conducts studies on new and sustainable menstrual hygiene methods, assessing safety, affordability, acceptability, and feasibility.</p>
          <p>National Health Mission (NHM): Supports the Menstrual Hygiene Scheme via State PIPs since 2015–16. States procure sanitary napkin packs through competitive bidding. In 2021–22, approx. 34.92 lakh adolescent girls received sanitary napkin packs monthly (HMIS). NHM also undertakes capacity-building of health functionaries and supports communication campaigns. ASHAs conduct monthly meetings on menstrual hygiene and provide subsidised napkin packs.</p>
          
          <h4>Initiatives of Other Ministries and Departments</h4>
          <p>Ministry of Drinking Water & Sanitation: Under Swachh Bharat Abhiyan, developed National Guidelines on Menstrual Hygiene Management (MHM) to strengthen awareness and behaviour change in rural areas.</p>
          <p>Ministry of Education (Department of School Education & Literacy): Through Samagra Shiksha, supports State projects on menstrual hygiene, including installation of sanitary napkin vending machines and incinerators in schools.</p>
          <p>Ministry of Women & Child Development: Implements the Scheme for Adolescent Girls (SAG) to improve health and nutritional status of adolescent girls and encourage their participation in formal schooling, including menstrual hygiene awareness.</p>
          <p>Ministry of Chemicals & Fertilizers: Through Pradhan Mantri Bharatiya Janaushadhi Pariyojana (PMBJP), ensures access to affordable menstrual hygiene products. Over 9000 Janaushadhi Kendras supply oxo-biodegradable napkins 'Suvidha' at ₹1 per pad.</p>
        </div>
      </ContentSection>

      {/* Timeline Section */}
      <TimelineSection>
        <h2 className="timeline-title">Timeline of Government Initiatives</h2>
        <TimelineContainer>
          {timeline.map((milestone, i) => (
            <TimelineItem key={milestone.id || i}>
              <TimelineYear>{milestone.subtitle}</TimelineYear>
              <TimelineContent>
                <h3>{milestone.title}</h3>
                <div className="timeline-meta">
                  {milestone.meta?.government && (
                    <span className="meta-item"><strong>Government:</strong> {milestone.meta.government}</span>
                  )}
                  {milestone.meta?.status && (
                    <span className="meta-item"><strong>Status:</strong> {milestone.meta.status}</span>
                  )}
                  {milestone.meta?.beneficiaries && (
                    <span className="meta-item"><strong>Beneficiaries:</strong> {milestone.meta.beneficiaries}</span>
                  )}
                </div>
                <p>{milestone.description}</p>
              </TimelineContent>
            </TimelineItem>
          ))}
        </TimelineContainer>
      </TimelineSection>
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
    font-size: var(--text-xl);
    color: var(--color-dark-600);
    font-weight: 500;
    margin-bottom: var(--space-5);
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

const TimelineSection = styled.section`
  margin-bottom: var(--space-12);
  background: white;
  border-radius: var(--radius-3xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--color-dark-100);

  .timeline-title {
    font-family: var(--font-heading);
    font-size: var(--text-3xl);
    font-weight: 600;
    color: var(--color-dark-900);
    margin-bottom: var(--space-8);
    text-align: center;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (max-width: 768px) {
    padding: var(--space-6);
    margin-bottom: var(--space-8);

    .timeline-title {
      font-size: var(--text-2xl);
      margin-bottom: var(--space-6);
    }
  }
`;

const TimelineContainer = styled.div`
  position: relative;
  padding-left: 44px;

  &::before {
    content: '';
    position: absolute;
    left: 20px;
    top: 4px;
    bottom: 4px;
    width: 2px;
    background: linear-gradient(180deg,
      var(--color-primary-300) 0%,
      var(--color-primary-500) 50%,
      var(--color-secondary-500) 100%
    );
  }

  @media (max-width: 768px) {
    padding-left: 36px;

    &::before {
      left: 16px;
    }
  }
`;

const TimelineItem = styled.div`
  position: relative;
  margin-bottom: var(--space-10);

  &::before {
    content: '';
    position: absolute;
    left: -31px;
    top: 12px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--gradient-primary);
    border: 3px solid white;
    box-shadow: 0 0 0 2px var(--color-primary-500);
    z-index: 2;
  }

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    margin-bottom: var(--space-8);

    &::before {
      left: -26px;
      width: 14px;
      height: 14px;
      top: 10px;
    }
  }
`;

const TimelineYear = styled.div`
  display: inline-block;
  padding: var(--space-2) var(--space-4);
  background: var(--gradient-primary);
  color: white;
  font-size: var(--text-lg);
  font-weight: 600;
  border-radius: var(--radius-full);
  margin-bottom: var(--space-4);
  box-shadow: var(--shadow-md);

  @media (max-width: 768px) {
    font-size: var(--text-base);
    padding: var(--space-1-5) var(--space-3);
  }
`;

const TimelineContent = styled.div`
  background: var(--color-background);
  border-radius: var(--radius-2xl);
  padding: var(--space-6);
  border: 1px solid var(--color-dark-100);
  transition: all var(--transition-base);

  &:hover {
    box-shadow: var(--shadow-soft);
    border-color: var(--color-primary-200);
  }

  h3 {
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    font-weight: 600;
    color: var(--color-dark-900);
    margin-bottom: var(--space-4);
    line-height: 1.3;
  }

  .timeline-meta {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    margin-bottom: var(--space-4);
    padding: var(--space-4);
    background: var(--color-primary-50);
    border-radius: var(--radius-xl);
    border-left: 3px solid var(--color-primary-500);
  }

  .meta-item {
    font-size: var(--text-sm);
    color: var(--color-dark-700);
    line-height: 1.6;

    strong {
      color: var(--color-dark-900);
      font-weight: 600;
    }
  }

  p {
    font-size: var(--text-base);
    color: var(--color-dark-600);
    line-height: 1.8;
    margin: 0;
  }

  @media (max-width: 768px) {
    padding: var(--space-4);

    h3 {
      font-size: var(--text-lg);
    }

    .timeline-meta {
      padding: var(--space-3);
    }

    .meta-item {
      font-size: var(--text-xs);
    }

    p {
      font-size: var(--text-sm);
    }
  }
`;

const ContentSection = styled.section`
  background: white;
  border-radius: var(--radius-3xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--color-dark-100);

  .government-initiatives {
    h4 {
      font-family: var(--font-heading);
      font-size: var(--text-2xl);
      font-weight: 600;
      color: var(--color-dark-900);
      margin-bottom: var(--space-4);
      margin-top: var(--space-6);

      &:first-child {
        margin-top: 0;
      }
    }

    p {
      font-size: var(--text-base);
      color: var(--color-dark-600);
      line-height: 1.8;
      margin-bottom: var(--space-4);
    }
  }

  @media (max-width: 768px) {
    padding: var(--space-6);
  }
`;

export default Governmentinitiatives;



