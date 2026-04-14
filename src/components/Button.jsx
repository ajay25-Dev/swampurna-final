import React from 'react';
import styled from 'styled-components';
import { FiArrowRight } from 'react-icons/fi';

const Button = ({ 
  text, 
  variant = 'primary', 
  size = 'md', 
  icon = true, 
  onClick,
  disabled = false,
  fullWidth = false,
  className = '',
  ...props 
}) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      onClick={onClick}
      disabled={disabled}
      className={className}
      {...props}
    >
      <span className="btn-text">{text}</span>
      {icon && (
        <span className="btn-icon">
          <FiArrowRight />
        </span>
      )}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  font-family: var(--font-body);
  font-weight: 600;
  border-radius: var(--radius-full);
  cursor: pointer;
  border: none;
  transition: all var(--transition-base);
  white-space: nowrap;
  width: ${({ $fullWidth }) => $fullWidth ? '100%' : 'auto'};

  /* Size Variants */
  ${({ $size }) => {
    switch ($size) {
      case 'sm':
        return `
          padding: var(--space-2) var(--space-4);
          font-size: var(--text-xs);
        `;
      case 'lg':
        return `
          padding: var(--space-4) var(--space-8);
          font-size: var(--text-base);
        `;
      default:
        return `
          padding: var(--space-3) var(--space-6);
          font-size: var(--text-sm);
        `;
    }
  }}

  /* Style Variants */
  ${({ $variant }) => {
    switch ($variant) {
      case 'secondary':
        return `
          background: var(--color-dark-900);
          color: white;
          box-shadow: var(--shadow-md);

          &:hover {
            background: var(--color-dark-800);
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg);
          }
        `;
      case 'outline':
        return `
          background: transparent;
          color: var(--color-dark-800);
          border: 2px solid var(--color-dark-200);

          &:hover {
            border-color: var(--color-primary-400);
            color: var(--color-primary-600);
            background: var(--color-primary-50);
          }
        `;
      case 'ghost':
        return `
          background: transparent;
          color: var(--color-dark-700);

          &:hover {
            background: var(--color-dark-100);
          }
        `;
      case 'gradient-secondary':
        return `
          background: var(--gradient-secondary);
          color: white;
          box-shadow: var(--shadow-md), var(--shadow-glow-purple);

          &:hover {
            transform: translateY(-3px);
            box-shadow: var(--shadow-lg), 0 0 40px rgba(204, 93, 232, 0.3);
          }
        `;
      case 'gradient-accent':
        return `
          background: var(--gradient-accent);
          color: white;
          box-shadow: var(--shadow-md), var(--shadow-glow-teal);

          &:hover {
            transform: translateY(-3px);
            box-shadow: var(--shadow-lg), 0 0 40px rgba(32, 201, 151, 0.3);
          }
        `;
      default: // primary
        return `
          background: var(--gradient-primary);
          color: white;
          box-shadow: var(--shadow-md), var(--shadow-glow);

          &:hover {
            transform: translateY(-3px);
            box-shadow: var(--shadow-lg), 0 0 40px rgba(255, 107, 107, 0.3);
          }
        `;
    }
  }}

  .btn-text {
    position: relative;
    z-index: 1;
  }

  .btn-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform var(--transition-base);

    svg {
      font-size: 1em;
    }
  }

  &:hover .btn-icon {
    transform: translateX(4px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;

    &:hover {
      transform: none;
    }
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
  }
`;

export default Button;
