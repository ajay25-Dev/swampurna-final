import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiX } from 'react-icons/fi';

const FirstVisitPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check if user has seen the popup before
    const hasSeenPopup = localStorage.getItem('swampurna_popup_seen');
    
    if (!hasSeenPopup) {
      // Show popup after a short delay for better UX
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setShowPopup(false);
    localStorage.setItem('swampurna_popup_seen', 'true');
  };

  const handleFillForm = () => {
    window.open(
      'https://docs.google.com/forms/d/e/1FAIpQLSeodwz7hq7uxwmxKCODQgCnurNubUZEY6-J-ro8wlbxVW0J6w/viewform',
      '_blank',
      'noopener,noreferrer'
    );
    handleClose();
  };

  if (!showPopup) return null;

  return (
    <PopupOverlay onClick={handleClose}>
      <PopupContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={handleClose} aria-label="Close popup">
          <FiX />
        </CloseButton>
        <PopupBody>
          <h3>Your voice matters</h3>
          <p>Help us shape a healthier tomorrow.</p>
          <FormButton onClick={handleFillForm}>
            Take the survey Now
          </FormButton>
        </PopupBody>
      </PopupContent>
    </PopupOverlay>
  );
};

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  animation: fadeIn 0.3s ease-out;
  backdrop-filter: blur(4px);

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const PopupContent = styled.div`
  position: relative;
  background: white;
  border-radius: var(--radius-3xl);
  padding: var(--space-8);
  max-width: 400px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 640px) {
    padding: var(--space-6);
    max-width: 350px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  width: 32px;
  height: 32px;
  border-radius: var(--radius-full);
  border: none;
  background: var(--color-dark-100);
  color: var(--color-dark-700);
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
`;

const PopupBody = styled.div`
  text-align: center;
  padding-top: var(--space-2);

  h3 {
    font-family: var(--font-heading);
    font-size: var(--text-2xl);
    font-weight: 600;
    color: var(--color-dark-900);
    margin-bottom: var(--space-4);
  }

  p {
    font-size: var(--text-base);
    color: var(--color-dark-600);
    line-height: 1.7;
    margin-bottom: var(--space-6);
  }
`;

const FormButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-4) var(--space-8);
  background: var(--gradient-primary);
  color: white;
  font-weight: 600;
  font-size: var(--text-base);
  border-radius: var(--radius-full);
  border: none;
  cursor: pointer;
  transition: all var(--transition-base);
  box-shadow: var(--shadow-md), var(--shadow-glow-primary);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg), 0 12px 48px rgba(217, 118, 82, 0.35);
  }

  &:active {
    transform: translateY(0);
  }
`;

export default FirstVisitPopup;


