import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiExternalLink } from 'react-icons/fi';
import { useContentItems } from '../hooks/useContentItems';
import Newsimg1 from '../assets/images/images1/Newsimg1.jpg';
import Newsimg2 from '../assets/images/images1/Newsimg2.jpg';
import Newsimg3 from '../assets/images/images1/Newsimg3.jpg';
import Newsimg4 from '../assets/images/images1/Newsimg4.jpg';

const fallbackArticles = [
  {
    title: 'Breaking menstrual stigma',
    image_url: Newsimg1,
    link_url: 'https://www.millenniumpost.in/features/breaking-menstrual-stigma-354737',
    tag: 'News',
    description: 'Breaking stigma through awareness and inclusive menstrual health education.',
    sort_order: 0,
  },
  {
    title: 'My friend, Period.',
    image_url: Newsimg2,
    link_url: 'https://www.millenniumpost.in/opinion/my-friend-period-565619',
    tag: 'Opinion',
    description: 'An opinion piece on changing attitudes around periods and women\'s health.',
    sort_order: 1,
  },
  {
    title: '23 Million Women Drop Out Of School Every Year When They Start Menstruating In India | Women\'s Day',
    image_url: Newsimg3,
    link_url: 'https://swachhindia.ndtv.com/23-million-women-drop-out-of-school-every-year-when-they-start-menstruating-in-india-17838/',
    tag: 'Research',
    description: 'Research-backed reporting on menstrual barriers in education.',
    sort_order: 2,
  },
  {
    title: 'Period product usage among women across wealth index and caste',
    image_url: Newsimg4,
    tag: 'Data',
    description: 'Source: Karan Babbar, Vandana, and Ashu Arora',
    sort_order: 3,
  },
];

function toPlainText(html = '') {
  return String(html).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

function excerpt(text, limit = 160) {
  const clean = toPlainText(text);
  if (clean.length <= limit) return clean;
  return `${clean.slice(0, limit)}...`;
}

function slugify(text = '') {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function articleSlug(article, index) {
  if (article?.meta?.slug) return article.meta.slug;
  const base = slugify(article?.title) || `article-${index + 1}`;
  if (article?.id) {
    const short = String(article.id).split('-')[0];
    return `${base}-${short}`;
  }
  return base;
}

const Newsarticles = () => {
  const { items } = useContentItems({
    page: 'Newsarticles',
    section: 'news_articles',
    fallback: fallbackArticles,
  });

  const articles = (items || []).filter((a) => a.title);

  return (
    <PageWrapper>
      <div className="bg-decoration">
        <div className="deco-circle circle-1"></div>
        <div className="deco-circle circle-2"></div>
      </div>

      <HeroSection>
        <span className="section-eyebrow">Media</span>
        <h1 className="hero-title">
          News & <span className="title-accent">Articles</span>
        </h1>
        <p className="hero-description">
          Stay informed with the latest news, research, and articles about menstrual health and hygiene.
        </p>
      </HeroSection>

      <ArticlesSection>
        <ArticlesGrid>
          {articles.map((article, index) => (
            <ArticleCard key={articleSlug(article, index)}>
              <div className="article-image">
                <img src={article.image_url || Newsimg1} alt={article.title} />
                {article.tag && <span className="category-badge">{article.tag}</span>}
              </div>
              <div className="article-content">
                <h3>{article.title}</h3>
                <p className="article-description">{excerpt(article.description)}</p>
                <div className="actions">
                  <Link to={`/Newsarticles/${articleSlug(article, index)}`} className="read-more">
                    Read Full Article
                  </Link>
                  {article.link_url ? (
                    <a href={article.link_url} target="_blank" rel="noopener noreferrer" className="source-link">
                      Source <FiExternalLink />
                    </a>
                  ) : null}
                </div>
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

  .bg-decoration { position: absolute; inset: 0; pointer-events: none; z-index: -1; }
  .deco-circle { position: absolute; border-radius: 50%; }
  .circle-1 { width: 500px; height: 500px; top: -150px; right: -200px; background: radial-gradient(circle, rgba(217, 118, 82, 0.08) 0%, transparent 70%); }
  .circle-2 { width: 400px; height: 400px; bottom: 20%; left: -150px; background: radial-gradient(circle, rgba(90, 148, 112, 0.06) 0%, transparent 70%); }
`;

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: var(--space-12);
  .section-eyebrow { display: inline-block; padding: var(--space-2) var(--space-5); background: var(--color-primary-50); color: var(--color-primary-700); font-size: var(--text-xs); font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; border-radius: var(--radius-full); margin-bottom: var(--space-5); border: 1px solid var(--color-primary-100); }
  .hero-title { font-family: var(--font-heading); font-size: var(--text-5xl); font-weight: 600; color: var(--color-dark-900); margin-bottom: var(--space-5); line-height: 1.1; }
  .title-accent { background: var(--gradient-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .hero-description { font-size: var(--text-lg); color: var(--color-dark-500); line-height: 1.8; max-width: 700px; margin: 0 auto; }
`;

const ArticlesSection = styled.section`margin-bottom: var(--space-12);`;

const ArticlesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const ArticleCard = styled.article`
  background: white;
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--color-dark-100);
  display: flex;
  flex-direction: column;

  .article-image { position: relative; height: 250px; overflow: hidden; }
  .article-image img { width: 100%; height: 100%; object-fit: cover; }
  .category-badge { position: absolute; top: var(--space-4); left: var(--space-4); padding: var(--space-2) var(--space-4); background: var(--gradient-primary); color: white; font-size: var(--text-xs); font-weight: 600; border-radius: var(--radius-full); }
  .article-content { padding: var(--space-6); display: grid; gap: var(--space-3); }
  h3 { font-family: var(--font-heading); font-size: var(--text-xl); color: var(--color-dark-900); margin: 0; }
  .article-description { color: var(--color-dark-500); line-height: 1.7; margin: 0; }
  .actions { display: flex; gap: var(--space-3); align-items: center; margin-top: var(--space-2); flex-wrap: wrap; }
  .read-more { display: inline-flex; align-items: center; padding: var(--space-3) var(--space-5); background: var(--gradient-primary); color: white; font-weight: 600; font-size: var(--text-sm); border-radius: var(--radius-full); }
  .source-link { color: var(--color-primary-700); display: inline-flex; align-items: center; gap: 6px; font-weight: 600; }
`;

export default Newsarticles;
