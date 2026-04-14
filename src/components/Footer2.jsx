import React from 'react';
import styled from 'styled-components';
import { FaApple, FaGooglePlay, FaHeart } from 'react-icons/fa';

const Footer2 = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterBottom>
      <div className="footer-container">
        {/* Left: App Download */}
        <div className="download-section">
          <div className="download-header">
            <span className="download-label">Get the App</span>
            <span className="download-badge">Free</span>
          </div>
          <div className="store-buttons">
            <button className="store-btn">
              <FaApple className="store-icon" />
              <div className="store-info">
                <span className="store-small">Download on</span>
                <span className="store-name">App Store</span>
              </div>
            </button>
            <button className="store-btn">
              <FaGooglePlay className="store-icon" />
              <div className="store-info">
                <span className="store-small">Get it on</span>
                <span className="store-name">Play Store</span>
              </div>
            </button>
          </div>
        </div>

        {/* Center: DST Badge */}
        <div className="dst-section">
          <div className="dst-badge">
            <div className="badge-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
              </svg>
            </div>
            <div className="badge-text">
              <span className="badge-title">DST Funded Project</span>
              <span className="badge-subtitle">Govt. of India</span>
            </div>
          </div>
        </div>

        {/* Right: Copyright */}
        <div className="copyright-section">
          <div className="copyright-text-wrapper">
            <p className="copyright-text">
              © {currentYear} Swampurna. All rights reserved.
            </p>
            <p className="made-with">
              Made with <FaHeart className="heart-icon" /> in India
            </p>
          </div>
        </div>

      </div>
    </FooterBottom>
  );
};

const FooterBottom = styled.div`
  .footer-container {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: var(--space-10);
    align-items: center;
    justify-content: space-between;
  }

  /* Download Section */
  .download-section {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .download-header {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }

  .download-label {
    font-size: var(--text-sm);
    font-weight: 600;
    color: white;
  }

  .download-badge {
    padding: 2px 8px;
    background: var(--color-secondary-600);
    color: white;
    font-size: 0.6rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-radius: var(--radius-full);
  }

  .store-buttons {
    display: flex;
    gap: var(--space-3);
  }

  .store-btn {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-3) var(--space-4);
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: var(--radius-xl);
    color: white;
    transition: all var(--transition-base);

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: var(--color-primary-500);
      transform: translateY(-2px);
    }
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
    color: var(--color-dark-400);
    line-height: 1;
    margin-bottom: 2px;
  }

  .store-name {
    font-size: var(--text-sm);
    font-weight: 600;
    color: white;
    line-height: 1;
  }

  /* DST Section - Center */
  .dst-section {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .dst-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-3);
    padding: var(--space-3) var(--space-5);
    background: linear-gradient(135deg, rgba(217, 118, 82, 0.15), rgba(90, 148, 112, 0.15));
    border: 1px solid rgba(217, 118, 82, 0.2);
    border-radius: var(--radius-2xl);
  }

  /* Copyright Section */
  .copyright-section {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    gap: var(--space-5);
    text-align: right;
    width: 100%;
  }

  .badge-icon {
    color: var(--color-accent-400);
    font-size: 1.25rem;
    display: flex;
  }

  .badge-text {
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 2px;
  }

  .badge-title {
    font-size: var(--text-sm);
    font-weight: 600;
    color: white;
    line-height: 1;
  }

  .badge-subtitle {
    font-size: 0.65rem;
    color: var(--color-dark-400);
    line-height: 1;
  }

  .copyright-text-wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  .copyright-text {
    font-size: var(--text-sm);
    color: var(--color-dark-400);
    margin: 0;
  }

  .made-with {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-size: var(--text-xs);
    color: var(--color-dark-500);
    margin: 0;
  }

  .heart-icon {
    color: var(--color-primary-500);
    font-size: 0.8rem;
    animation: heartbeat 1.5s ease-in-out infinite;
  }

  @keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    25% { transform: scale(1.2); }
    50% { transform: scale(1); }
  }

  /* Region Section */
  .region-section {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: var(--space-2);
  }

  .language-selector {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-4);
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: var(--radius-lg);
    transition: all var(--transition-base);

    &:hover {
      border-color: var(--color-primary-500);
    }

    &:focus-within {
      border-color: var(--color-primary-500);
      box-shadow: 0 0 0 3px rgba(217, 118, 82, 0.15);
    }
  }

  .globe-icon {
    color: var(--color-dark-400);
    font-size: 1rem;
  }

  .region-select {
    background: transparent;
    border: none;
    color: white;
    font-size: var(--text-sm);
    cursor: pointer;
    padding-right: var(--space-2);

    &:focus {
      outline: none;
    }

    option {
      background: var(--color-dark-900);
      color: white;
      padding: var(--space-2);
    }
  }

  .region-note {
    font-size: var(--text-xs);
    color: var(--color-dark-500);
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .footer-container {
      grid-template-columns: 1fr;
      gap: var(--space-8);
      text-align: center;
    }

    .download-section {
      align-items: center;
    }

    .store-buttons {
      justify-content: center;
    }

    .dst-section {
      order: 1;
    }

    .copyright-section {
      align-items: center;
      text-align: center;
      order: 2;
    }
  }

  @media (max-width: 640px) {
    .store-buttons {
      flex-direction: column;
      width: 100%;
      max-width: 250px;
    }

    .store-btn {
      justify-content: center;
    }
  }
`;

export default Footer2;
