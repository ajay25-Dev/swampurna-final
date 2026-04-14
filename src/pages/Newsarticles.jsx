import React from 'react';
import styled from 'styled-components';
import { FiExternalLink } from 'react-icons/fi';
import Newsimg1 from '../assets/images/images1/Newsimg1.jpg';
import Newsimg2 from '../assets/images/images1/Newsimg2.jpg';
import Newsimg3 from '../assets/images/images1/Newsimg3.jpg';
import Newsimg4 from '../assets/images/images1/Newsimg4.jpg';

const Newsarticles = () => {
  const articles = [
    {
      img: Newsimg1,
      title: 'Breaking menstrual stigma',
      link: 'https://www.millenniumpost.in/features/breaking-menstrual-stigma-354737',
      category: 'News'
    },
    {
      img: Newsimg2,
      title: 'My friend, Period.',
      link: 'https://www.millenniumpost.in/opinion/my-friend-period-565619',
      category: 'Opinion'
    },
    {
      img: Newsimg3,
      title: '23 Million Women Drop Out Of School Every Year When They Start Menstruating In India | Women\'s Day',
      link: 'https://swachhindia.ndtv.com/23-million-women-drop-out-of-school-every-year-when-they-start-menstruating-in-india-17838/',
      category: 'Research'
    },
    {
      img: Newsimg4,
      title: 'Period product usage among women across wealth index and caste',
      description: 'Source: Karan Babbar, Vandana, and Ashu Arora',
      category: 'Data'
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
        <span className="section-eyebrow">Media</span>
        <h1 className="hero-title">
          News & <span className="title-accent">Articles</span>
        </h1>
        <p className="hero-description">
          Stay informed with the latest news, research, and articles about menstrual health and hygiene from around the world.
        </p>
      </HeroSection>

      {/* Articles Grid */}
      <ArticlesSection>
        <ArticlesGrid>
          {articles.map((article, index) => (
            <ArticleCard key={index}>
              <div className="article-image">
                <img src={article.img} alt={article.title} />
                
              </div>
              <div className="article-content">
                <h3>{article.title}</h3>
                {article.description && (
                  <p className="article-description">{article.description}</p>
                )}
                {article.link ? (
                  <a href={article.link} target="_blank" rel="noopener noreferrer" className="read-more">
                    <span>Read Full Article</span>
                    <FiExternalLink />
                  </a>
                ) : (
                  <div className="read-more disabled">
                    <span>View Article</span>
                  </div>
                )}
              </div>
            </ArticleCard>
          ))}
        </ArticlesGrid>
      </ArticlesSection>
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

const ArticlesSection = styled.section`
  margin-bottom: var(--space-12);
`;

const ArticlesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ArticleCard = styled.article`
  background: white;
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--color-dark-100);
  transition: all var(--transition-slow);
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-soft-lg);
  }

  .article-image {
    position: relative;
    height: 250px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform var(--transition-slow);
    }

    .category-badge {
      position: absolute;
      top: var(--space-4);
      left: var(--space-4);
      padding: var(--space-2) var(--space-4);
      background: var(--gradient-primary);
      color: white;
      font-size: var(--text-xs);
      font-weight: 600;
      border-radius: var(--radius-full);
      z-index: 1;
    }
  }

  &:hover .article-image img {
    transform: scale(1.05);
  }

  .article-content {
    padding: var(--space-6);
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  h3 {
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    font-weight: 600;
    color: var(--color-dark-900);
    margin-bottom: var(--space-3);
    line-height: 1.4;
  }

  .article-description {
    font-size: var(--text-sm);
    color: var(--color-dark-500);
    line-height: 1.7;
    margin-bottom: var(--space-4);
    flex: 1;
  }

  .read-more {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-3) var(--space-5);
    background: var(--gradient-primary);
    color: white;
    font-weight: 600;
    font-size: var(--text-sm);
    border-radius: var(--radius-full);
    width: fit-content;
    transition: all var(--transition-base);
    margin-top: auto;

    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md), var(--shadow-glow-primary);
    }

    &.disabled {
      background: var(--color-dark-200);
      color: var(--color-dark-500);
      cursor: not-allowed;
      pointer-events: none;
    }
  }
`;

export default Newsarticles;

