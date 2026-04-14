import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiBookOpen, FiArrowUpRight, FiExternalLink } from 'react-icons/fi';
import Newsimg1 from '../assets/images/images1/Newsimg1.jpg';
import Newsimg2 from '../assets/images/images1/Newsimg2.jpg';
import Newsimg3 from '../assets/images/images1/Newsimg3.jpg';
import { useContentItems } from '../hooks/useContentItems';

const HomeFive = () => {
  const fallbackPosts = [
    { image_url: Newsimg1, title: 'Breaking menstrual stigma', tag: 'News', link_url: 'https://www.millenniumpost.in/features/breaking-menstrual-stigma-354737', meta: { featured: true } },
    { image_url: Newsimg2, title: 'My friend, Period.', tag: 'Opinion', link_url: 'https://www.millenniumpost.in/opinion/my-friend-period-565619', meta: { featured: false } },
    { image_url: Newsimg3, title: "23 Million Women Drop Out Of School Every Year When They Start Menstruating In India | Women's Day", tag: 'Research', link_url: 'https://swachhindia.ndtv.com/23-million-women-drop-out-of-school-every-year-when-they-start-menstruating-in-india-17838/', meta: { featured: false } },
  ];

  const { items: headerItems } = useContentItems({
    page: "home",
    section: "home_articles_header",
    fallback: [
      {
        title: "Recent Articles",
        subtitle: "Stay informed with the latest news, research, and articles about menstrual health and hygiene from around the world.",
        tag: "From Our Blog",
      },
    ],
  });

  const { items: posts } = useContentItems({
    page: "home",
    section: "home_articles",
    fallback: fallbackPosts,
  });

  const header = headerItems?.[0] || {};

  return (
    <PostsSection>
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
            <div className="header-left">
              <span className="section-eyebrow">
                <FiBookOpen />
                <span>{header.tag || "From Our Blog"}</span>
              </span>
              <h2 className="section-title">
                {header.title || "Recent Articles"}
              </h2>
              <p className="section-subtitle">
                {header.subtitle || "Stay informed with the latest news, research, and articles about menstrual health and hygiene from around the world."}
              </p>
            </div>
          <Link to="/Newsarticles" className="view-all-btn desktop-only">
            <span>View All Articles</span>
            <FiArrowRight />
          </Link>
        </div>

        {/* Posts Grid */}
        <div className="posts-grid">
          {posts.map((post, index) => (
            <article 
              key={post.id || index} 
              className={`post-card ${post.meta?.featured ? 'featured' : ''}`}
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <div className="post-image-wrapper">
                <img src={post.image_url} alt={post.title} className="post-image" />
                <div className="image-overlay"></div>
              </div>
              
              <div className="post-content">
                <h3 className="post-title">{post.title}</h3>
                
                {post.link_url ? (
                  <a 
                    href={post.link_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="read-more-btn"
                  >
                    <span>Read Full Article</span>
                    <FiExternalLink />
                  </a>
                ) : (
                  <button className="read-more-btn">
                    <span>Read Article</span>
                    <FiArrowUpRight />
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Mobile View All Button */}
        <Link to="/Newsarticles" className="view-all-btn mobile-only">
          <span>View All Articles</span>
          <FiArrowRight />
        </Link>
      </div>
    </PostsSection>
  );
};

const PostsSection = styled.section`
  padding: var(--space-24) var(--space-6);
  position: relative;

  .section-container {
    max-width: 1200px;
    margin: 0 auto;
  }

  /* Section Header */
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: var(--space-12);
    gap: var(--space-8);
  }

  .header-left {
    flex: 1;
  }

  .section-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-4);
    background: var(--color-primary-50);
    color: var(--color-primary-700);
    font-size: var(--text-xs);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    border-radius: var(--radius-full);
    margin-bottom: var(--space-5);
    border: 1px solid var(--color-primary-100);

    svg {
      font-size: 0.9rem;
    }
  }

  .section-title {
    font-family: var(--font-heading);
    font-size: var(--text-5xl);
    font-weight: 600;
    color: var(--color-dark-900);
    margin-bottom: var(--space-3);
    line-height: 1.1;
  }

  .title-accent {
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .section-subtitle {
    font-size: var(--text-lg);
    color: var(--color-dark-500);
    max-width: 500px;
    line-height: 1.7;
  }

  .view-all-btn {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-3-5) var(--space-7);
    background: var(--gradient-primary);
    color: white;
    font-size: var(--text-sm);
    font-weight: 600;
    border-radius: var(--radius-full);
    transition: all var(--transition-base);
    box-shadow: var(--shadow-md), var(--shadow-glow-primary);
    white-space: nowrap;

    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg), 0 12px 48px rgba(217, 118, 82, 0.35);

      svg {
        transform: translateX(4px);
      }
    }

    svg {
      transition: transform var(--transition-base);
    }

    &.mobile-only {
      display: none;
    }

    &.desktop-only {
      display: flex;
    }
  }

  /* Posts Grid */
  .posts-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-8);
  }

  /* Post Card */
  .post-card {
    background: white;
    border-radius: var(--radius-3xl);
    overflow: hidden;
    box-shadow: var(--shadow-soft);
    border: 1px solid var(--color-dark-100);
    transition: all var(--transition-base);
    animation: fadeInUp 0.6s ease-out forwards;
    opacity: 0;
    display: flex;
    flex-direction: column;

    &:hover {
      transform: translateY(-8px);
      box-shadow: var(--shadow-xl);

      .post-image {
        transform: scale(1.08);
      }

      .image-overlay {
        opacity: 0.3;
      }

    }

    &.featured {
      border-color: var(--color-primary-200);

      .post-category {
        background: var(--gradient-primary);
        color: white;
      }
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(24px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .post-image-wrapper {
    position: relative;
    overflow: hidden;
    aspect-ratio: 16 / 11;
    padding: var(--space-4);
  }

  .post-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .image-overlay {
    position: absolute;
    inset: 0;
    background: var(--gradient-primary);
    opacity: 0;
    transition: opacity var(--transition-base);
    pointer-events: none;
  }

  .post-category {
    position: absolute;
    top: var(--space-4);
    left: var(--space-4);
    padding: var(--space-1-5) var(--space-3);
    background: white;
    color: var(--color-dark-700);
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-radius: var(--radius-full);
    box-shadow: var(--shadow-md);
    z-index: 2;
  }

  .post-content {
    padding: var(--space-6);
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    flex: 1;
  }

  .post-meta {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-xs);
    color: var(--color-dark-400);
  }

  .post-read-time {
    display: flex;
    align-items: center;
    gap: 4px;

    svg {
      font-size: 0.75rem;
    }
  }

  .meta-divider {
    opacity: 0.4;
  }

  .post-title {
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    font-weight: 600;
    color: var(--color-dark-900);
    line-height: 1.35;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .post-excerpt {
    font-size: var(--text-sm);
    color: var(--color-dark-500);
    line-height: 1.7;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    flex: 1;
  }

  .read-more-btn {
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
    margin-top: auto;
    transition: all var(--transition-base);
    cursor: pointer;
    text-decoration: none;
    border: none;

    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md), var(--shadow-glow-primary);
    }

    svg {
      transition: transform var(--transition-base);
    }

    &:hover svg {
      transform: translate(3px, -3px);
    }
  }

  /* Responsive */
  @media (max-width: 1024px) {
    padding: var(--space-16) var(--space-6);
    
    .posts-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 768px) {
    .section-header {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--space-6);
    }

    .view-all-btn {
      &.desktop-only {
        display: none;
      }

      &.mobile-only {
        display: flex;
        width: 100%;
        justify-content: center;
        margin-top: var(--space-10);
      }
    }

    .posts-grid {
      grid-template-columns: 1fr;
      gap: var(--space-6);
    }
  }

  @media (max-width: 640px) {
    padding: var(--space-12) var(--space-4);

    .section-title {
      font-size: var(--text-4xl);
    }

    .section-subtitle {
      font-size: var(--text-base);
    }

    .post-content {
      padding: var(--space-5);
    }

    .post-title {
      font-size: var(--text-lg);
    }
  }
`;

export default HomeFive;
