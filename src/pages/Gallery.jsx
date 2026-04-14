import React, { useState } from 'react';
import styled from 'styled-components';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import GalleryImg1 from '../assets/images/GalleryImg1.png';
import GalleryImg2 from '../assets/images/GalleryImg2.png';
import GalleryImg3 from '../assets/images/GalleryImg3.png';
import GalleryImg4 from '../assets/images/GalleryImg4.png';
import GalleryImg5 from '../assets/images/GalleryImg5.png';
import GalleryImg6 from '../assets/images/GalleryImg6.png';
import GalleryImg7 from '../assets/images/GalleryImg7.png';
import GalleryImg8 from '../assets/images/GalleryImg8.png';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  
  const images = [
    { src: GalleryImg1, category: 'Workshop', title: 'Community Workshop' },
    { src: GalleryImg2, category: 'Event', title: 'Health Awareness Camp' },
    { src: GalleryImg3, category: 'Workshop', title: 'School Session' },
    { src: GalleryImg4, category: 'Outreach', title: 'Village Outreach' },
    { src: GalleryImg5, category: 'Event', title: 'Team Activity' },
    { src: GalleryImg6, category: 'Workshop', title: 'Training Program' },
    { src: GalleryImg7, category: 'Event', title: 'Distribution Drive' },
    { src: GalleryImg8, category: 'Outreach', title: 'Community Engagement' },
  ];

  const handlePrev = () => {
    setSelectedImage(prev => prev === 0 ? images.length - 1 : prev - 1);
  };

  const handleNext = () => {
    setSelectedImage(prev => prev === images.length - 1 ? 0 : prev + 1);
  };

  return (
    <PageWrapper>
      {/* Background Decoration */}
      <div className="bg-decoration">
        <div className="deco-circle circle-1"></div>
        <div className="deco-circle circle-2"></div>
      </div>

      {/* Hero Section */}
      <HeroSection>
        <span className="section-eyebrow">Our Moments</span>
        <h1 className="hero-title">
          SWAMPURNA <span className="title-accent">Gallery</span>
        </h1>
        <p className="hero-description">
          Capturing our journey toward sustainable menstrual health education. 
          Explore photos and videos that showcase our workshops, community outreach, 
          and impactful events.
        </p>
      </HeroSection>

      {/* Stats */}
      <StatsBar>
        <div className="stat">
          <span className="stat-number">50+</span>
          <span className="stat-label">Events Captured</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat">
          <span className="stat-number">100+</span>
          <span className="stat-label">Workshop Photos</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat">
          <span className="stat-number">25+</span>
          <span className="stat-label">Communities</span>
        </div>
      </StatsBar>

      {/* Gallery Grid */}
      <GalleryGrid>
        {images.map((img, index) => (
          <GalleryItem key={index} onClick={() => setSelectedImage(index)}>
            <img src={img.src} alt={img.title} />
            <div className="overlay">
              <span className="category">{img.category}</span>
              <span className="title">{img.title}</span>
            </div>
          </GalleryItem>
        ))}
      </GalleryGrid>

      {/* Lightbox */}
      {selectedImage !== null && (
        <Lightbox>
          <div className="lightbox-backdrop" onClick={() => setSelectedImage(null)}></div>
          <div className="lightbox-content">
            <button className="close-btn" onClick={() => setSelectedImage(null)}>
              <FiX />
            </button>
            <button className="nav-btn prev" onClick={handlePrev}>
              <FiChevronLeft />
            </button>
            <div className="image-container">
              <img src={images[selectedImage].src} alt={images[selectedImage].title} />
              <div className="image-info">
                <span className="info-category">{images[selectedImage].category}</span>
                <span className="info-title">{images[selectedImage].title}</span>
              </div>
            </div>
            <button className="nav-btn next" onClick={handleNext}>
              <FiChevronRight />
            </button>
            <div className="image-counter">
              {selectedImage + 1} / {images.length}
            </div>
          </div>
        </Lightbox>
      )}
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
    bottom: 10%;
    left: -150px;
    background: radial-gradient(circle, rgba(90, 148, 112, 0.06) 0%, transparent 70%);
  }

  @media (max-width: 768px) {
    padding: var(--space-6) var(--space-4) var(--space-12);
  }
`;

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: var(--space-8);

  .section-eyebrow {
    display: inline-block;
    padding: var(--space-2) var(--space-5);
    background: var(--color-accent-50);
    color: var(--color-accent-700);
    font-size: var(--text-xs);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    border-radius: var(--radius-full);
    margin-bottom: var(--space-5);
    border: 1px solid var(--color-accent-100);
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
    background: var(--gradient-accent);
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

const StatsBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-8);
  padding: var(--space-6);
  background: white;
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--color-dark-100);
  margin-bottom: var(--space-10);

  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-1);
  }

  .stat-number {
    font-family: var(--font-heading);
    font-size: var(--text-2xl);
    font-weight: 600;
    color: var(--color-primary-600);
  }

  .stat-label {
    font-size: var(--text-sm);
    color: var(--color-dark-400);
  }

  .stat-divider {
    width: 1px;
    height: 40px;
    background: var(--color-dark-200);
  }

  @media (max-width: 640px) {
    flex-wrap: wrap;
    gap: var(--space-6);

    .stat-divider {
      display: none;
    }

    .stat {
      flex: 1;
      min-width: 100px;
    }
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-4);

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const GalleryItem = styled.div`
  position: relative;
  border-radius: var(--radius-2xl);
  overflow: hidden;
  cursor: pointer;
  aspect-ratio: 1;
  box-shadow: var(--shadow-soft);
  transition: all var(--transition-slow);

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-soft-lg);

    img {
      transform: scale(1.1);
    }

    .overlay {
      opacity: 1;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition-slow);
  }

  .overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 0%, rgba(26, 24, 21, 0.8) 100%);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: var(--space-4);
    opacity: 0;
    transition: opacity var(--transition-base);
  }

  .category {
    font-size: var(--text-xs);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--color-primary-400);
    margin-bottom: var(--space-1);
  }

  .title {
    font-family: var(--font-heading);
    font-size: var(--text-base);
    font-weight: 600;
    color: white;
  }
`;

const Lightbox = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;

  .lightbox-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(26, 24, 21, 0.95);
    backdrop-filter: blur(10px);
  }

  .lightbox-content {
    position: relative;
    z-index: 1;
    max-width: 90vw;
    max-height: 90vh;
    display: flex;
    align-items: center;
    gap: var(--space-4);
  }

  .close-btn {
    position: absolute;
    top: -50px;
    right: 0;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-base);

    &:hover {
      background: var(--color-primary-500);
    }
  }

  .nav-btn {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-base);
    flex-shrink: 0;

    &:hover {
      background: var(--color-primary-500);
    }

    @media (max-width: 640px) {
      position: absolute;
      bottom: -60px;

      &.prev {
        left: calc(50% - 60px);
      }

      &.next {
        right: calc(50% - 60px);
      }
    }
  }

  .image-container {
    position: relative;
    
    img {
      max-width: 70vw;
      max-height: 80vh;
      border-radius: var(--radius-2xl);
      box-shadow: var(--shadow-2xl);
    }

    .image-info {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: var(--space-6);
      background: linear-gradient(180deg, transparent 0%, rgba(26, 24, 21, 0.9) 100%);
      border-radius: 0 0 var(--radius-2xl) var(--radius-2xl);
    }

    .info-category {
      display: block;
      font-size: var(--text-xs);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--color-primary-400);
      margin-bottom: var(--space-1);
    }

    .info-title {
      font-family: var(--font-heading);
      font-size: var(--text-xl);
      font-weight: 600;
      color: white;
    }
  }

  .image-counter {
    position: absolute;
    bottom: -50px;
    left: 50%;
    transform: translateX(-50%);
    font-size: var(--text-sm);
    color: rgba(255, 255, 255, 0.6);
  }
`;

export default Gallery;
