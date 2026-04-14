import React from 'react';
import styled from 'styled-components';
import { FiArrowRight, FiCalendar, FiUser, FiExternalLink } from 'react-icons/fi';
import Newsimg1 from '../assets/images/images1/Newsimg1.jpg';
import Newsimg2 from '../assets/images/images1/Newsimg2.jpg';
import Newsimg3 from '../assets/images/images1/Newsimg3.jpg';
import Newsimg4 from '../assets/images/images1/Newsimg4.jpg';

const Blogannouncement = () => {
  const featuredBlog = {
    img: Newsimg1,
    title: 'Breaking menstrual stigma',
    description: 'Read about how SWAMPURNA is working to break the silence and stigma surrounding menstruation in India.',
    link: 'https://www.millenniumpost.in/features/breaking-menstrual-stigma-354737',
    category: 'News'
  };

  const blogs = [
    {
      img: Newsimg2,
      title: 'My friend, Period.',
      description: 'An opinion piece discussing the importance of normalizing conversations about menstruation.',
      link: 'https://www.millenniumpost.in/opinion/my-friend-period-565619',
      category: 'Opinion'
    },
    {
      img: Newsimg3,
      title: '23 Million Women Drop Out Of School Every Year When They Start Menstruating In India',
      description: 'A critical look at how menstruation impacts education for millions of girls in India.',
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

  const announcements = [
    {
      title: 'Upcoming Hackathon 2024',
      date: 'Dec 15, 2024',
      description: 'Join us for our annual hackathon focused on innovative menstrual health solutions.',
      type: 'event'
    },
    {
      title: 'New Mobile App Launch',
      date: 'Jan 2025',
      description: 'We\'re launching our new mobile app with enhanced features and tracking capabilities.',
      type: 'launch'
    },
    {
      title: 'Partnership with AIIMS',
      date: 'Nov 2024',
      description: 'Exciting new collaboration with AIIMS Delhi for research initiatives.',
      type: 'news'
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
        <span className="section-eyebrow">Stay Updated</span>
        <h1 className="hero-title">
          Blog & <span className="title-accent">Announcements</span>
        </h1>
        <p className="hero-description">
          Stay informed and inspired with the latest updates, stories from our 
          fieldwork, expert insights on menstrual health, and important announcements 
          about our programs.
        </p>
      </HeroSection>

      {/* Featured Blog */}
      <FeaturedSection>
        <div className="section-label">
          <span className="label-line"></span>
          <span className="label-text">Featured Post</span>
          <span className="label-line"></span>
        </div>
        <FeaturedCard>
          <div className="featured-image">
            <img src={featuredBlog.img} alt={featuredBlog.title} />
            <span className="category-badge">{featuredBlog.category}</span>
          </div>
          <div className="featured-content">
            <div className="meta">
              <span className="meta-item">
                <FiUser />
                {featuredBlog.author}
              </span>
              <span className="meta-item">
                <FiCalendar />
                {featuredBlog.date}
              </span>
              <span className="read-time">{featuredBlog.readTime}</span>
            </div>
            <h2>{featuredBlog.title}</h2>
            <p>{featuredBlog.description}</p>
            {featuredBlog.link && (
              <a href={featuredBlog.link} target="_blank" rel="noopener noreferrer" className="read-more">
                <span>Read Full Article</span>
                <FiExternalLink />
              </a>
            )}
          </div>
        </FeaturedCard>
      </FeaturedSection>

      {/* Blog Grid */}
      <BlogSection>
        <div className="section-label">
          <span className="label-line"></span>
          <span className="label-text">Latest Posts</span>
          <span className="label-line"></span>
        </div>
        <BlogGrid>
          {blogs.map((blog, index) => (
            <BlogCard key={index}>
              <div className="blog-image">
                <img src={blog.img} alt={blog.title} />
                <span className="category-badge">{blog.category}</span>
              </div>
              <div className="blog-content">
                <div className="meta">
                  <span className="meta-item">
                    <FiUser />
                    {blog.author}
                  </span>
                  <span className="meta-item">
                    <FiCalendar />
                    {blog.date}
                  </span>
                </div>
                <h3>{blog.title}</h3>
                <p>{blog.description}</p>
                {blog.link ? (
                  <a href={blog.link} target="_blank" rel="noopener noreferrer" className="read-more">
                    <span>Read More</span>
                    <FiExternalLink />
                  </a>
                ) : (
                  <button className="read-more" disabled>
                    <span>View Article</span>
                    <FiArrowRight />
                  </button>
                )}
              </div>
            </BlogCard>
          ))}
        </BlogGrid>
      </BlogSection>

      {/* Announcements */}
      <AnnouncementsSection>
        <div className="section-label">
          <span className="label-line"></span>
          <span className="label-text">Announcements</span>
          <span className="label-line"></span>
        </div>
        <AnnouncementsList>
          {announcements.map((announcement, index) => (
            <AnnouncementCard key={index} className={`type-${announcement.type}`}>
              <div className="announcement-date">{announcement.date}</div>
              <div className="announcement-content">
                <h4>{announcement.title}</h4>
                <p>{announcement.description}</p>
      </div>
              <button className="announcement-link">
                <FiArrowRight />
              </button>
            </AnnouncementCard>
          ))}
        </AnnouncementsList>
      </AnnouncementsSection>
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

  .section-label {
  display: flex;
    align-items: center;
    gap: var(--space-4);
    margin-bottom: var(--space-6);
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
    color: var(--color-secondary-600);
    padding: var(--space-2) var(--space-5);
    background: var(--color-secondary-50);
    border-radius: var(--radius-full);
    white-space: nowrap;
    border: 1px solid var(--color-secondary-100);
  }

  @media (max-width: 768px) {
    padding: var(--space-6) var(--space-4) var(--space-12);
  }
`;

const HeroSection = styled.section`
    text-align: center;
  margin-bottom: var(--space-10);

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
    background: var(--gradient-secondary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-description {
    font-size: var(--text-lg);
    color: var(--color-dark-500);
    line-height: 1.8;
    max-width: 600px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    .hero-title {
      font-size: var(--text-4xl);
    }
  }
`;

const FeaturedSection = styled.section`
  margin-bottom: var(--space-12);
`;

const FeaturedCard = styled.article`
    display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-8);
  background: white;
  border-radius: var(--radius-3xl);
  overflow: hidden;
  box-shadow: var(--shadow-soft-lg);
  border: 1px solid var(--color-dark-100);

  .featured-image {
    position: relative;
    min-height: 400px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .category-badge {
      position: absolute;
      top: var(--space-4);
      left: var(--space-4);
      padding: var(--space-2) var(--space-4);
      background: var(--gradient-secondary);
      color: white;
      font-size: var(--text-xs);
      font-weight: 600;
      border-radius: var(--radius-full);
    }
  }

  .featured-content {
    padding: var(--space-8);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .meta {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-4);
    margin-bottom: var(--space-4);
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-sm);
    color: var(--color-dark-400);
  }

  .read-time {
    font-size: var(--text-sm);
    color: var(--color-secondary-600);
    font-weight: 500;
  }

  h2 {
    font-family: var(--font-heading);
    font-size: var(--text-3xl);
    font-weight: 600;
    color: var(--color-dark-900);
    margin-bottom: var(--space-4);
    line-height: 1.3;
  }

  p {
    font-size: var(--text-base);
    color: var(--color-dark-500);
    line-height: 1.8;
    margin-bottom: var(--space-6);
  }

  .read-more {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-3) var(--space-6);
    background: var(--gradient-secondary);
    color: white;
    font-weight: 600;
    font-size: var(--text-sm);
    border-radius: var(--radius-full);
    width: fit-content;
    transition: all var(--transition-base);

    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg), var(--shadow-glow-secondary);
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;

    .featured-image {
      min-height: 250px;
    }
  }
`;

const BlogSection = styled.section`
  margin-bottom: var(--space-12);
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const BlogCard = styled.article`
  background: white;
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--color-dark-100);
  transition: all var(--transition-slow);

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-soft-lg);
  }

  .blog-image {
    position: relative;
    height: 200px;

    img {
    width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .category-badge {
      position: absolute;
      top: var(--space-3);
      left: var(--space-3);
      padding: var(--space-1) var(--space-3);
      background: var(--gradient-primary);
      color: white;
      font-size: var(--text-xs);
      font-weight: 600;
      border-radius: var(--radius-full);
    }
  }

  .blog-content {
    padding: var(--space-5);
  }

  .meta {
    display: flex;
    gap: var(--space-4);
    margin-bottom: var(--space-3);
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    font-size: var(--text-xs);
    color: var(--color-dark-400);
  }

  h3 {
    font-family: var(--font-heading);
    font-size: var(--text-lg);
    font-weight: 600;
    color: var(--color-dark-900);
    margin-bottom: var(--space-3);
    line-height: 1.4;
  }

  p {
    font-size: var(--text-sm);
    color: var(--color-dark-500);
    line-height: 1.7;
    margin-bottom: var(--space-4);
  }

  .read-more {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    color: var(--color-primary-600);
    font-size: var(--text-sm);
    font-weight: 600;
    transition: all var(--transition-base);

    &:hover {
      gap: var(--space-3);
    }
  }
`;

const AnnouncementsSection = styled.section``;

const AnnouncementsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
`;

const AnnouncementCard = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-5);
  padding: var(--space-5);
  background: white;
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--color-dark-100);
  transition: all var(--transition-base);

  &:hover {
    border-color: var(--color-primary-200);
  }

  .announcement-date {
    padding: var(--space-3) var(--space-4);
    background: var(--color-cream-200);
    border-radius: var(--radius-lg);
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-dark-600);
    white-space: nowrap;
  }

  .announcement-content {
    flex: 1;

    h4 {
      font-family: var(--font-heading);
      font-size: var(--text-lg);
      font-weight: 600;
      color: var(--color-dark-900);
      margin-bottom: var(--space-1);
    }

    p {
      font-size: var(--text-sm);
      color: var(--color-dark-500);
    }
  }

  .announcement-link {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--color-primary-100);
    color: var(--color-primary-600);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-base);

    &:hover {
      background: var(--color-primary-500);
      color: white;
    }
  }

  @media (max-width: 640px) {
    flex-direction: column;
    text-align: center;

    .announcement-date {
      width: 100%;
    }
  }
`;

export default Blogannouncement;
