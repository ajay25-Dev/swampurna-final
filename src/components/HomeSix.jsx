import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FiShield, FiHeart, FiLock } from "react-icons/fi";
import { useContentItems } from "../hooks/useContentItems";

const HomeSix = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const trackRef = useRef(null);

  const fallbackFeatures = [
    { title: "Reliable Predictions", description: "Our AI-powered algorithm provides accurate cycle prediction based on your unique patterns and health data.", tag: "primary", meta: { icon: "shield" } },
    { title: "Trusted Medical Expertise", description: "Our team of 100+ doctors and health specialists provides well-researched medical content and personalized advice.", tag: "secondary", meta: { icon: "heart" } },
    { title: "Data Security", description: "Your privacy is our priority. We implement top-notch encryption and security measures to protect your health data.", tag: "accent", meta: { icon: "lock" } },
  ];

  const { items: headerItems } = useContentItems({
    page: "home",
    section: "home_features_header",
    fallback: [
      {
        title: "Why Millions of Women Choose Swampurna?",
        subtitle: "Trusted by women across India for reliable, secure, and personalized menstrual health tracking",
        tag: "Why Choose Us",
      },
    ],
  });

  const { items: features } = useContentItems({
    page: "home",
    section: "home_features",
    fallback: fallbackFeatures,
  });

  const header = headerItems?.[0] || {};

  const maxIndex = Math.max(features.length - 3, 0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    if (maxIndex === 0) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex]);

  return (
    <FeaturesSection>
      <div className="bg-pattern">
        <div className="pattern-grid"></div>
      </div>
      
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">{header.tag || "Why Choose Us"}</span>
          <h2 className="section-title">
            {header.title || "Why Millions of Women Choose Swampurna?"}
          </h2>
          <p className="section-subtitle">
            {header.subtitle || "Trusted by women across India for reliable, secure, and personalized menstrual health tracking"}
          </p>
        </div>

        {/* Features Carousel */}
        <div 
          className="carousel-wrapper"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="carousel-container">
            <div 
              ref={trackRef}
              className="carousel-track"
              style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
            >
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className={`feature-card ${feature.tag || "primary"}`}
                >
                  <div className="card-inner">
                    <div className={`feature-icon ${feature.tag || "primary"}`}>
                      {feature.meta?.icon === "heart" ? <FiHeart /> : feature.meta?.icon === "lock" ? <FiLock /> : <FiShield />}
                    </div>
                    <h3 className="feature-title">{feature.title}</h3>
                    <p className="feature-description">{feature.description}</p>
                    <div className={`card-accent ${feature.tag || "primary"}`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Carousel Progress */}
        <div className="carousel-progress">
          <div className="progress-track">
            <div 
              className="progress-fill"
              style={{ width: `${((currentIndex + 1) / (maxIndex + 1)) * 100}%` }}
            ></div>
          </div>
          <div className="progress-dots">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                className={`dot ${currentIndex === index ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </FeaturesSection>
  );
};

const FeaturesSection = styled.section`
  padding: var(--space-24) var(--space-6);
  position: relative;
  overflow: hidden;

  /* Background */
  .bg-pattern {
    position: absolute;
    inset: 0;
    z-index: -1;
    background: linear-gradient(180deg, 
      var(--color-background) 0%, 
      var(--color-cream-200) 30%,
      var(--color-cream-200) 70%,
      var(--color-background) 100%
    );
  }

  .pattern-grid {
    position: absolute;
    inset: 0;
    background-image: 
      radial-gradient(circle at center, var(--color-dark-200) 1px, transparent 1px);
    background-size: 40px 40px;
    opacity: 0.4;
    mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
    -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }

  .section-container {
    max-width: 1200px;
    margin: 0 auto;
  }

  /* Section Header */
  .section-header {
    text-align: center;
    margin-bottom: var(--space-12);
  }

  .section-eyebrow {
    display: inline-block;
    padding: var(--space-2) var(--space-5);
    background: linear-gradient(135deg, var(--color-primary-50), var(--color-secondary-50));
    color: var(--color-dark-700);
    font-size: var(--text-xs);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    border-radius: var(--radius-full);
    margin-bottom: var(--space-5);
    border: 1px solid var(--color-dark-100);
  }

  .section-title {
    font-family: var(--font-heading);
    font-size: var(--text-5xl);
    font-weight: 600;
    color: var(--color-dark-900);
    margin-bottom: var(--space-4);
    line-height: 1.15;
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
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.7;
  }

  /* Carousel */
  .carousel-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--space-4);
  }

  .carousel-container {
    flex: 1;
    overflow: hidden;
    border-radius: var(--radius-3xl);
  }

  .carousel-track {
    display: flex;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .carousel-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    background: white;
    border-radius: var(--radius-2xl);
    color: var(--color-dark-700);
    font-size: 1.25rem;
    box-shadow: var(--shadow-soft-lg);
    border: 1px solid var(--color-dark-100);
    transition: all var(--transition-base);
    flex-shrink: 0;
    z-index: 10;

    &:hover {
      background: var(--color-primary-500);
      color: white;
      border-color: transparent;
      transform: scale(1.05);
      box-shadow: var(--shadow-lg), var(--shadow-glow-primary);
    }
  }

  /* Feature Card */
  .feature-card {
    min-width: calc(100% / 3);
    padding: var(--space-4);
  }

  .card-inner {
    background: white;
    border-radius: var(--radius-3xl);
    box-shadow: var(--shadow-soft);
    border: 1px solid var(--color-dark-100);
    transition: all var(--transition-base);
    padding: var(--space-8);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: var(--space-4);
    height: 100%;
    position: relative;
    overflow: hidden;
  }

  .feature-card:hover .card-inner {
    transform: translateY(-6px);
    box-shadow: var(--shadow-xl);
  }

  .feature-card.primary:hover .card-inner {
    border-color: var(--color-primary-200);
  }

  .feature-card.secondary:hover .card-inner {
    border-color: var(--color-secondary-200);
  }

  .feature-card.accent:hover .card-inner {
    border-color: var(--color-accent-200);
  }

  .card-accent {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    transform: scaleX(0);
    transition: transform var(--transition-base);
    transform-origin: left;

    &.primary { background: var(--gradient-primary); }
    &.secondary { background: var(--gradient-secondary); }
    &.accent { background: var(--gradient-accent); }
  }

  .feature-card:hover .card-accent {
    transform: scaleX(1);
  }

  .feature-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 72px;
    height: 72px;
    border-radius: var(--radius-2xl);
    font-size: 1.75rem;
    transition: transform var(--transition-base);

    &.primary {
      background: linear-gradient(135deg, var(--color-primary-100), var(--color-primary-50));
      color: var(--color-primary-600);
    }

    &.secondary {
      background: linear-gradient(135deg, var(--color-secondary-100), var(--color-secondary-50));
      color: var(--color-secondary-600);
    }

    &.accent {
      background: linear-gradient(135deg, var(--color-accent-100), var(--color-accent-50));
      color: var(--color-accent-700);
    }
  }

  .feature-card:hover .feature-icon {
    transform: scale(1.05);
  }

  .feature-title {
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    font-weight: 600;
    color: var(--color-dark-900);
    margin: 0;
    line-height: 1.3;
  }

  .feature-description {
    font-size: var(--text-sm);
    color: var(--color-dark-500);
    line-height: 1.8;
    margin: 0;
  }

  /* Carousel Progress */
  .carousel-progress {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-4);
    margin-top: var(--space-10);
  }

  .progress-track {
    width: 200px;
    height: 3px;
    background: var(--color-dark-200);
    border-radius: var(--radius-full);
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: var(--gradient-primary);
    border-radius: var(--radius-full);
    transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .progress-dots {
    display: flex;
    gap: var(--space-2);
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--color-dark-200);
    border: none;
    cursor: pointer;
    transition: all var(--transition-base);

    &.active {
      background: var(--color-primary-500);
      transform: scale(1.2);
    }

    &:hover:not(.active) {
      background: var(--color-dark-300);
    }
  }

  /* Responsive */
  @media (max-width: 1024px) {
    padding: var(--space-16) var(--space-6);

    .feature-card {
      min-width: calc(100% / 2);
    }
  }

  @media (max-width: 768px) {
    padding: var(--space-12) var(--space-4);

    .section-title {
      font-size: var(--text-4xl);

      br {
        display: none;
      }
    }

    .feature-card {
      min-width: 100%;
    }

    .card-inner {
      padding: var(--space-6);
    }

    .carousel-btn {
      display: none;
    }
  }

  @media (max-width: 480px) {
    .section-subtitle {
      font-size: var(--text-base);
    }
  }
`;

export default HomeSix;
