import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiArrowLeft, FiArrowRight, FiX } from 'react-icons/fi';
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import slider1 from '../assets/images/images1/Slider1.jpg';
import slider2 from '../assets/images/images1/Slider2.jpg';
import slider3 from '../assets/images/images1/Slider3.jpg';
import ApeComingSoon from '../assets/images/ApeComingSoon.gif';
import { useContentItems } from '../hooks/useContentItems';

const HomeOne = () => {
  const fallbackImages = [slider1, slider2, slider3];
  const { items } = useContentItems({
    page: "home",
    section: "hero_images",
    fallback: fallbackImages.map((img, index) => ({ image_url: img, sort_order: index })),
  });
  const heroImages = items && items.length > 0 ? items : fallbackImages.map((img) => ({ image_url: img }));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showComingSoon, setShowComingSoon] = useState(false);

  // Auto-play carousel
  useEffect(() => {
    if (!heroImages.length) return undefined;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  useEffect(() => {
    if (currentIndex >= heroImages.length) {
      setCurrentIndex(0);
    }
  }, [currentIndex, heroImages.length]);

  const goToPrevious = () => {
    if (!heroImages.length) return;
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? heroImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    if (!heroImages.length) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <HeroSection>
      <div className="hero-container">
        {/* Left Content */}
        <div className="hero-content">
          <h1 className="hero-title">
            Empower Your Cycle{' '}
            <span className="title-accent">Empower Your Life</span>
          </h1>
          
          <p className="hero-promo">
            Discover Personalized Insights, Track Your Menstrual Health And Take Control Of Your Well-Being With SWAMPURNA.
          </p>

          <div className="hero-actions">
            <button className="btn-store" onClick={() => setShowComingSoon(true)}>
              <FaGooglePlay className="store-icon" />
              <div className="store-info">
                <span className="store-small">Get it on</span>
                <span className="store-name">Play Store</span>
              </div>
            </button>
            <button className="btn-store" onClick={() => setShowComingSoon(true)}>
              <FaApple className="store-icon" />
              <div className="store-info">
                <span className="store-small">Download on</span>
                <span className="store-name">App Store</span>
              </div>
            </button>
          </div>
        </div>

        {/* Right Visual */}
        <div className="hero-visual">
          <div className="image-container">
            <div className="carousel-container">
              <div 
                className="carousel-track"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {heroImages.map((img, index) => (
                  <div key={index} className="carousel-item">
                    <img src={img.image_url} alt={`SWAMPURNA ${index + 1}`} className="hero-image" />
                  </div>
                ))}
              </div>
              
              {/* Navigation Buttons */}
              <button 
                className="carousel-nav carousel-nav-prev" 
                onClick={goToPrevious}
                aria-label="Previous image"
              >
                <FiArrowLeft />
              </button>
              <button 
                className="carousel-nav carousel-nav-next" 
                onClick={goToNext}
                aria-label="Next image"
              >
                <FiArrowRight />
              </button>

              {/* Dot Indicators */}
              <div className="carousel-indicators">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Coming Soon Modal */}
      {showComingSoon && (
        <ComingSoonModal>
          <div className="modal-backdrop" onClick={() => setShowComingSoon(false)}></div>
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowComingSoon(false)}>
              <FiX />
            </button>
            <div className="modal-icon">
              <img src={ApeComingSoon} alt="Coming Soon" />
            </div>
            <h2 className="modal-title">Coming Soon!</h2>
            <p className="modal-message">
              The SWAMPURNA app will be available on the App Store and Google Play Store soon.
              Stay tuned for updates!
            </p>
            <button className="modal-button" onClick={() => setShowComingSoon(false)}>
              Got it
            </button>
          </div>
        </ComingSoonModal>
      )}
    </HeroSection>
  );
};

const HeroSection = styled.section`
  position: relative;
  min-height: calc(100vh - 80px);
  padding: 0 var(--space-6) var(--space-4);
  background: var(--color-primary-50);
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  padding-top: var(--space-2);

  .hero-container {
    position: relative;
    z-index: 1;
    max-width: 1400px;
    width: 100%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-16);
    align-items: center;
    overflow: hidden;
  }

  /* Hero Content */
  .hero-content {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
  }

  .hero-title {
    font-family: var(--font-heading);
    font-size: var(--text-6xl);
    font-weight: 600;
    color: var(--color-dark-900);
    line-height: 1.1;
    margin: 0;
  }

  .title-accent {
    display: block;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-promo {
    font-size: var(--text-lg);
    color: var(--color-dark-600);
    line-height: 1.6;
    margin: 0;
  }

  .hero-actions {
    display: flex;
    gap: var(--space-4);
    flex-wrap: wrap;
    margin-top: var(--space-2);
  }

  .btn-store {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-3) var(--space-4);
    background: #000000;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: var(--radius-xl);
    color: white;
    transition: all var(--transition-base);
    cursor: pointer;

    &:hover {
      background: #1a1a1a;
      border-color: var(--color-primary-500);
      transform: translateY(-2px);
    }

    .store-icon {
      font-size: 1.5rem;
      color: white;
      opacity: 0.8;
    }

    .store-info {
      display: flex;
      flex-direction: column;
      text-align: left;
    }

    .store-small {
      font-size: 0.6rem;
      color: rgba(255, 255, 255, 0.7);
      line-height: 1;
      margin-bottom: 2px;
    }

    .store-name {
      font-size: var(--text-sm);
      font-weight: 600;
      color: white;
      line-height: 1;
    }
  }

  /* Hero Visual */
  .hero-visual {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 600px;
    max-width: 100%;
    overflow: hidden;
  }

  .image-container {
    position: relative;
    width: 550px;
    max-width: 100%;
    height: 400px;
    border-radius: var(--radius-xl);
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    border: 2px solid var(--color-dark-200);
    background: transparent;
    z-index: 2;
  }

  .carousel-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .carousel-track {
    display: flex;
    height: 100%;
    transition: transform 0.5s ease-in-out;
  }

  .carousel-item {
    min-width: 100%;
    width: 100%;
    height: 100%;
    flex-shrink: 0;
    overflow: hidden;
    margin: 0;
    padding: 0;
  }

  .hero-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
  }

  .carousel-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: white;
    border: 1px solid var(--color-dark-200);
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    color: var(--color-primary-600);
    font-size: 1.25rem;

    &:hover {
      background: var(--color-primary-600);
      color: white;
      border-color: var(--color-primary-600);
      box-shadow: 0 6px 20px rgba(3, 121, 199, 0.25);
      transform: translateY(-50%) scale(1.1);
    }

    &:active {
      transform: translateY(-50%) scale(0.95);
    }
  }

  .carousel-nav-prev {
    left: 12px;
  }

  .carousel-nav-next {
    right: 12px;
  }

  .carousel-indicators {
    position: absolute;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    z-index: 10;
  }

  .carousel-indicator {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: none;
    background: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0;

    &:hover {
      background: rgba(255, 255, 255, 0.8);
      transform: scale(1.2);
    }

    &.active {
      background: white;
      width: 24px;
      border-radius: 5px;
    }
  }

  /* Review Badge (Trustpilot style) */
  .review-badge {
    position: absolute;
    left: -80px;
    top: 50%;
    transform: translateY(-50%);
    background: white;
    padding: var(--space-4) var(--space-5);
    border-radius: var(--radius-xl);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    min-width: 180px;
    z-index: 3;
  }

  .review-header {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }

  .review-rating {
    font-weight: 600;
    color: #00B67A;
    font-size: var(--text-lg);
  }

  .review-stars {
    display: flex;
    gap: 2px;
  }

  .star-icon {
    color: #00B67A;
    font-size: 0.875rem;
    fill: #00B67A;
  }

  .review-text {
    font-size: var(--text-xs);
    color: var(--color-dark-500);
  }

  .review-logo {
    font-size: var(--text-xs);
    font-weight: 600;
    color: var(--color-dark-700);
    margin-top: var(--space-1);
  }

  /* Awards Stack (G2 style) */
  .awards-stack {
    position: absolute;
    right: -60px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    z-index: 3;
  }

  .award-badge {
    background: white;
    padding: var(--space-3) var(--space-4);
    border-radius: var(--radius-lg);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    min-width: 200px;
    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%);
  }

  .award-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-2);
  }

  .award-title {
    font-weight: 600;
    font-size: var(--text-sm);
    color: var(--color-dark-900);
  }

  .award-category {
    font-size: var(--text-xs);
    font-weight: 600;
    padding: var(--space-1) var(--space-2);
    border-radius: var(--radius-sm);
    
    &.blue {
      background: #E6F4FC;
      color: #0379C7;
    }
    
    &.red {
      background: #FEE2E2;
      color: #DC2626;
    }
    
    &.yellow {
      background: #FEF3C7;
      color: #D97706;
    }
  }

  .award-period {
    font-size: var(--text-xs);
    color: var(--color-dark-400);
    font-weight: 500;
  }

  /* Responsive */
  @media (max-width: 1200px) {
    .review-badge {
      left: -40px;
    }

    .awards-stack {
      right: -30px;
    }
  }

  @media (max-width: 1024px) {
    padding: 0 var(--space-6) var(--space-8);
    
    .hero-container {
      grid-template-columns: 1fr;
      gap: var(--space-10);
    }

    .hero-content {
      text-align: center;
      align-items: center;
    }

    .hero-title {
      font-size: var(--text-5xl);
    }

    .hero-actions {
      justify-content: center;
    }

    .hero-visual {
      order: -1;
      min-height: 400px;
    }

    .image-container {
      width: 100%;
      max-width: 500px;
      height: 400px;
    }

    .carousel-nav {
      width: 36px;
      height: 36px;
      font-size: 1rem;
    }

    .carousel-nav-prev {
      left: 8px;
    }

    .carousel-nav-next {
      right: 8px;
    }

    .review-badge {
      left: 20px;
      top: auto;
      bottom: 20px;
      transform: none;
    }

    .awards-stack {
      right: 20px;
      top: auto;
      bottom: 20px;
      transform: none;
    }
  }

  @media (max-width: 768px) {
    .hero-title {
      font-size: var(--text-4xl);
    }

    .hero-promo {
      font-size: var(--text-base);
    }

    .btn-store {
      height: 70px;
      width: 180px;
    }

    .image-container {
      width: 100%;
      max-width: 400px;
      height: 300px;
    }

    .carousel-nav {
      width: 32px;
      height: 32px;
      font-size: 0.875rem;
    }

    .carousel-indicators {
      bottom: 12px;
    }

    .review-badge,
    .awards-stack {
      position: relative;
      left: auto;
      right: auto;
      top: auto;
      bottom: auto;
      transform: none;
      margin-top: var(--space-4);
    }

    .awards-stack {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
    }
  }

  @media (max-width: 640px) {
    padding: 0 var(--space-4) var(--space-6);

    .hero-title {
      font-size: var(--text-3xl);
    }

    .hero-actions {
      flex-direction: row;
      justify-content: center;
      flex-wrap: nowrap;
      width: 100%;
      gap: var(--space-3);
    }

    .btn-store {
      flex: 1;
      max-width: 160px;
      height: 65px;
      padding: var(--space-2) var(--space-3);
    }

    .image-container {
      width: 280px;
      height: 200px;
    }

    .carousel-nav {
      width: 28px;
      height: 28px;
      font-size: 0.75rem;
    }

    .carousel-indicators {
      bottom: 8px;
      gap: 6px;
    }

    .carousel-indicator {
      width: 8px;
      height: 8px;

      &.active {
        width: 20px;
      }
    }
  }
`;

const ComingSoonModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-4);

  .modal-backdrop {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
  }

  .modal-content {
    position: relative;
    background: white;
    border-radius: var(--radius-3xl);
    padding: var(--space-8);
    max-width: 500px;
    width: 100%;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    text-align: center;
    animation: modalSlideIn 0.3s ease-out;

    @keyframes modalSlideIn {
      from {
        opacity: 0;
        transform: translateY(-20px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
  }

  .modal-close {
    position: absolute;
    top: var(--space-4);
    right: var(--space-4);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: none;
    background: var(--color-dark-100);
    color: var(--color-dark-600);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all var(--transition-base);
    font-size: 1.25rem;

    &:hover {
      background: var(--color-dark-200);
      color: var(--color-dark-900);
      transform: rotate(90deg);
    }
  }

  .modal-icon {
    width: 120px;
    height: 120px;
    margin: 0 auto var(--space-6);
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .modal-title {
    font-family: var(--font-heading);
    font-size: var(--text-3xl);
    font-weight: 600;
    color: var(--color-dark-900);
    margin-bottom: var(--space-4);
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .modal-message {
    font-size: var(--text-base);
    color: var(--color-dark-600);
    line-height: 1.7;
    margin-bottom: var(--space-6);
  }

  .modal-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-4) var(--space-8);
    background: var(--gradient-primary);
    color: white;
    border: none;
    border-radius: var(--radius-full);
    font-weight: 600;
    font-size: var(--text-base);
    cursor: pointer;
    transition: all var(--transition-base);
    box-shadow: 0 4px 16px rgba(3, 121, 199, 0.2);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 32px rgba(3, 121, 199, 0.3);
    }

    &:active {
      transform: translateY(0);
    }
  }

  @media (max-width: 640px) {
    padding: var(--space-4);

    .modal-content {
      padding: var(--space-6);
    }

    .modal-icon {
      width: 100px;
      height: 100px;
      margin-bottom: var(--space-4);
    }

    .modal-title {
      font-size: var(--text-2xl);
    }

    .modal-message {
      font-size: var(--text-sm);
    }
  }
`;

export default HomeOne;
