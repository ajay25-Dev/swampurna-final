import React from 'react';
import styled from 'styled-components';
import Footer1 from './Footer1';
import Footer2 from './Footer2';

const Footer = () => {
  return (
    <FooterWrapper>
      {/* Decorative Top Edge */}
      <div className="footer-edge">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path 
            d="M0,40 C360,100 720,-20 1080,60 C1260,80 1380,20 1440,40 L1440,80 L0,80 Z" 
            fill="url(#footer-gradient)"
          />
          <defs>
            <linearGradient id="footer-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2D2A26" />
              <stop offset="50%" stopColor="#1A1815" />
              <stop offset="100%" stopColor="#2D2A26" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      <div className="footer-content">
        <Footer1 />
        
        {/* Divider */}
        <div className="footer-divider">
          <div className="divider-line left"></div>
          <div className="divider-emblem">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="18" stroke="url(#emblem-gradient)" strokeWidth="1.5" strokeDasharray="4 4"/>
              <circle cx="20" cy="20" r="6" fill="url(#emblem-gradient)"/>
              <defs>
                <linearGradient id="emblem-gradient" x1="0" y1="0" x2="40" y2="40">
                  <stop stopColor="#D97652"/>
                  <stop offset="1" stopColor="#5A9470"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="divider-line right"></div>
        </div>
        
        <Footer2 />
      </div>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  position: relative;
  margin-top: var(--space-20);

  /* Decorative Edge */
  .footer-edge {
    position: relative;
    margin-bottom: -2px;
    
    svg {
      display: block;
      width: 100%;
      height: 50px;
    }
  }

  /* Footer Content */
  .footer-content {
    background: linear-gradient(180deg, #1A1815 0%, #0D0C0A 100%);
    padding: var(--space-14) var(--space-6);
  }

  /* Divider */
  .footer-divider {
    display: flex;
    align-items: center;
    gap: var(--space-6);
    padding: var(--space-12) 0;
    max-width: 1200px;
    margin: 0 auto;
  }

  .divider-line {
    flex: 1;
    height: 1px;
  }

  .divider-line.left {
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(217, 118, 82, 0.3) 100%
    );
  }

  .divider-line.right {
    background: linear-gradient(90deg, 
      rgba(90, 148, 112, 0.3) 0%, 
      transparent 100%
    );
  }

  .divider-emblem {
    flex-shrink: 0;
    animation: rotate 20s linear infinite;
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @media (max-width: 768px) {
    margin-top: var(--space-12);

    .footer-content {
      padding: var(--space-10) var(--space-4);
    }

    .footer-divider {
      padding: var(--space-8) 0;
    }
  }
`;

export default Footer;
