import React from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import { FiExternalLink } from 'react-icons/fi';
import { useContentItems } from '../hooks/useContentItems';
import Newsimg1 from '../assets/images/images1/Newsimg1.jpg';
import Newsimg2 from '../assets/images/images1/Newsimg2.jpg';
import Newsimg3 from '../assets/images/images1/Newsimg3.jpg';
import Newsimg4 from '../assets/images/images1/Newsimg4.jpg';

const fallbackArticles = [
  { title: 'Breaking menstrual stigma', image_url: Newsimg1, link_url: 'https://www.millenniumpost.in/features/breaking-menstrual-stigma-354737', tag: 'News', description: 'Breaking stigma through awareness and inclusive menstrual health education.', sort_order: 0 },
  { title: 'My friend, Period.', image_url: Newsimg2, link_url: 'https://www.millenniumpost.in/opinion/my-friend-period-565619', tag: 'Opinion', description: 'An opinion piece on changing attitudes around periods and women\'s health.', sort_order: 1 },
  { title: '23 Million Women Drop Out Of School Every Year When They Start Menstruating In India | Women\'s Day', image_url: Newsimg3, link_url: 'https://swachhindia.ndtv.com/23-million-women-drop-out-of-school-every-year-when-they-start-menstruating-in-india-17838/', tag: 'Research', description: 'Research-backed reporting on menstrual barriers in education.', sort_order: 2 },
  { title: 'Period product usage among women across wealth index and caste', image_url: Newsimg4, tag: 'Data', description: 'Source: Karan Babbar, Vandana, and Ashu Arora', sort_order: 3 },
];

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

function toHtml(content) {
  const value = String(content || '');
  if (!value) return '';
  if (/<[a-z][\s\S]*>/i.test(value)) return value;
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br/>');
}

const NewsArticleDetail = () => {
  const { articleSlug: slugParam } = useParams();
  const { items } = useContentItems({
    page: 'Newsarticles',
    section: 'news_articles',
    fallback: fallbackArticles,
  });

  const allArticles = items || [];
  const article = allArticles.find((item, index) => articleSlug(item, index) === slugParam);

  if (!article) {
    return (
      <Wrap>
        <h1>Article not found</h1>
        <Link to="/Newsarticles" className="back-link">Back to News & Articles</Link>
      </Wrap>
    );
  }

  return (
    <Wrap>
      <Link to="/Newsarticles" className="back-link">← Back to News & Articles</Link>
      {article.image_url && <img className="hero-image" src={article.image_url} alt={article.title} />}
      {article.tag && <div className="tag">{article.tag}</div>}
      <h1>{article.title}</h1>
      <div className="content" dangerouslySetInnerHTML={{ __html: toHtml(article.description) }} />
      {article.link_url ? (
        <a className="source" href={article.link_url} target="_blank" rel="noopener noreferrer">
          Visit Source Website <FiExternalLink />
        </a>
      ) : null}
    </Wrap>
  );
};

const Wrap = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: var(--space-8) var(--space-6) var(--space-16);
  .back-link { color: var(--color-primary-700); font-weight: 600; display: inline-block; margin-bottom: var(--space-5); }
  .hero-image { width: 100%; max-height: 420px; object-fit: cover; border-radius: var(--radius-2xl); border: 1px solid var(--color-dark-100); margin-bottom: var(--space-5); }
  .tag { display: inline-block; padding: 6px 12px; border-radius: var(--radius-full); background: var(--color-primary-50); color: var(--color-primary-700); font-weight: 600; margin-bottom: var(--space-3); }
  h1 { font-family: var(--font-heading); font-size: var(--text-4xl); line-height: 1.2; margin-bottom: var(--space-5); }
  .content { color: var(--color-dark-600); line-height: 1.8; font-size: var(--text-base); }
  .content p { margin-bottom: var(--space-4); }
  .content ul, .content ol { margin: 0 0 var(--space-4) var(--space-5); }
  .source { margin-top: var(--space-6); display: inline-flex; align-items: center; gap: 8px; padding: var(--space-3) var(--space-5); border-radius: var(--radius-full); background: var(--gradient-primary); color: #fff; font-weight: 600; }
`;

export default NewsArticleDetail;
