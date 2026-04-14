import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FiChevronDown } from 'react-icons/fi';

const Dropdown = ({ title, links, hasborder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  
  // Check if any link is active
  const isActiveRoute = links.some(link => location.pathname === link.path);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <DropdownWrapper 
      ref={dropdownRef} 
      $hasBorder={hasborder}
      $isActive={isActiveRoute}
    >
      <button
        className={`dropdown-trigger ${isOpen ? 'open' : ''} ${isActiveRoute ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="trigger-text">{title}</span>
        <FiChevronDown className="chevron-icon" />
        <span className="trigger-indicator"></span>
      </button>

      <div className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
        <div className="dropdown-content">
          <div className="menu-header">
            <span className="menu-title">{title}</span>
          </div>
          <div className="menu-items">
            {links.map((link, index) => (
              <NavLink
                key={index}
                to={link.path}
                className="menu-item"
                onClick={() => setIsOpen(false)}
                style={{ animationDelay: `${index * 40}ms` }}
              >
                <span className="item-indicator"></span>
                <span className="item-text">{link.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </DropdownWrapper>
  );
};

const DropdownWrapper = styled.div`
  position: relative;

  /* Dropdown Trigger */
  .dropdown-trigger {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    padding: var(--space-2-5) var(--space-4);
    font-size: var(--text-sm);
    font-weight: 500;
    color: var(--color-dark-600);
    background: ${({ $hasBorder }) => 
      $hasBorder ? 'var(--color-dark-900)' : 'transparent'
    };
    color: ${({ $hasBorder }) => 
      $hasBorder ? 'white' : 'var(--color-dark-600)'
    };
    border-radius: ${({ $hasBorder }) => 
      $hasBorder ? 'var(--radius-full)' : 'var(--radius-lg)'
    };
    transition: all var(--transition-base);
    position: relative;
    overflow: hidden;

    .trigger-text {
      position: relative;
      z-index: 1;
    }

    .chevron-icon {
      font-size: 1rem;
      transition: transform var(--transition-base);
      position: relative;
      z-index: 1;
    }

    .trigger-indicator {
      position: absolute;
      bottom: ${({ $hasBorder }) => $hasBorder ? 'auto' : '6px'};
      left: 50%;
      transform: translateX(-50%) scaleX(0);
      width: calc(100% - 24px);
      height: 2px;
      background: ${({ $hasBorder }) => 
        $hasBorder ? 'white' : 'var(--gradient-primary)'
      };
      border-radius: var(--radius-full);
      transition: transform var(--transition-base);
      display: ${({ $hasBorder }) => $hasBorder ? 'none' : 'block'};
    }

    &:hover {
      color: ${({ $hasBorder }) => 
        $hasBorder ? 'white' : 'var(--color-dark-900)'
      };
      background: ${({ $hasBorder }) => 
        $hasBorder ? 'var(--color-dark-800)' : 'transparent'
      };

      .trigger-indicator {
        transform: translateX(-50%) scaleX(1);
      }
    }

    &.open {
      .chevron-icon {
        transform: rotate(180deg);
      }
    }

    &.active:not([class*="hasBorder"]) {
      color: var(--color-primary-600);
      background: ${({ $hasBorder }) => 
        $hasBorder ? 'var(--color-dark-800)' : 'var(--color-primary-50)'
      };

      .trigger-indicator {
        transform: translateX(-50%) scaleX(1);
        background: var(--color-primary-500);
      }
    }
  }

  /* Dropdown Menu */
  .dropdown-menu {
    position: absolute;
    top: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    min-width: 240px;
    background: white;
    border-radius: var(--radius-2xl);
    box-shadow: var(--shadow-xl), 0 0 0 1px rgba(26, 24, 21, 0.04);
    opacity: 0;
    visibility: hidden;
    transform: translateX(-50%) translateY(-8px);
    transition: all var(--transition-base);
    z-index: var(--z-dropdown);
    overflow: hidden;

    &.open {
      opacity: 1;
      visibility: visible;
      transform: translateX(-50%) translateY(0);
    }
  }

  .dropdown-content {
    padding: var(--space-2);
  }

  .menu-header {
    padding: var(--space-3) var(--space-4);
    border-bottom: 1px solid var(--color-dark-100);
    margin-bottom: var(--space-2);
  }

  .menu-title {
    font-size: var(--text-xs);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--color-dark-400);
  }

  .menu-items {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  .menu-item {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-3) var(--space-4);
    color: var(--color-dark-700);
    text-decoration: none;
    border-radius: var(--radius-xl);
    font-size: var(--text-sm);
    font-weight: 500;
    transition: all var(--transition-base);
    animation: slideIn 0.3s ease-out forwards;
    opacity: 0;

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateX(-8px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .item-indicator {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--color-dark-200);
      transition: all var(--transition-base);
    }

    .item-text {
      flex: 1;
    }

    &:hover {
      background: var(--color-dark-50);
      color: var(--color-dark-900);

      .item-indicator {
        background: var(--color-primary-500);
        transform: scale(1.2);
      }
    }

    &.active {
      background: var(--color-primary-50);
      color: var(--color-primary-700);

      .item-indicator {
        background: var(--color-primary-500);
        box-shadow: 0 0 8px var(--color-primary-400);
      }
    }
  }

  /* Mobile Styles */
  @media (max-width: 1024px) {
    width: 100%;

    .dropdown-trigger {
      width: 100%;
      justify-content: space-between;
      padding: var(--space-4);
      background: var(--color-dark-50);
      color: var(--color-dark-700);
      border-radius: var(--radius-xl);
      font-size: var(--text-base);

      .trigger-indicator {
        display: none;
      }

      &:hover {
        background: var(--color-dark-100);
      }

      &.open {
        background: var(--color-dark-100);
        border-radius: var(--radius-xl) var(--radius-xl) 0 0;
      }

      &.active {
        background: var(--color-primary-100);
        color: var(--color-primary-700);
      }
    }

    .dropdown-menu {
      position: static;
      transform: none;
      width: 100%;
      min-width: auto;
      box-shadow: none;
      border-radius: 0 0 var(--radius-xl) var(--radius-xl);
      background: var(--color-dark-50);
      max-height: 0;
      padding: 0;
      margin-top: -1px;

      &.open {
        max-height: 500px;
        opacity: 1;
        visibility: visible;
        transform: none;
      }
    }

    .dropdown-content {
      padding: 0 var(--space-4) var(--space-4);
    }

    .menu-header {
      display: none;
    }

    .menu-items {
      gap: var(--space-1);
    }

    .menu-item {
      padding: var(--space-3) var(--space-4);
      background: white;
      border-radius: var(--radius-lg);

      &:hover {
        background: var(--color-dark-100);
      }

      &.active {
        background: var(--color-primary-100);
      }
    }
  }
`;

export default Dropdown;
