import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { 
  FiMenu, 
  FiX, 
  FiCalendar, 
  FiHelpCircle, 
  FiShare2, 
  FiMessageCircle 
} from "react-icons/fi";

const FloatingMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const menuItems = [
    { 
      icon: <FiCalendar />, 
      label: "Period Tracker",
      route: "/period-tracker",
      color: "#D97652",
      bgColor: "rgba(217, 118, 82, 0.1)"
    },
    { 
      icon: <FiHelpCircle />, 
      label: "FAQs",
      route: "/Faqs",
      color: "#5A9470",
      bgColor: "rgba(90, 148, 112, 0.1)"
    },
    { 
      icon: <FiShare2 />, 
      label: "Share",
      route: null,
      action: () => {
        if (navigator.share) {
          navigator.share({
            title: 'Swampurna',
            text: 'Check out Swampurna - Your menstrual health companion',
            url: window.location.href,
          });
        } else {
          navigator.clipboard.writeText(window.location.href);
        }
      },
      color: "#F5B418",
      bgColor: "rgba(245, 180, 24, 0.1)"
    },
    { 
      icon: <FiMessageCircle />, 
      label: "Contact",
      route: "/Contactus",
      color: "#5AA3B4",
      bgColor: "rgba(90, 163, 180, 0.1)"
    },
  ];

  const handleItemClick = (item) => {
    if (item.route) {
      navigate(item.route);
    } else if (item.action) {
      item.action();
    }
    setIsOpen(false);
  };

  return (
    <MenuWrapper $isOpen={isOpen}>
      {/* Backdrop */}
      <div 
        className={`menu-backdrop ${isOpen ? 'visible' : ''}`} 
        onClick={() => setIsOpen(false)}
      />

      {/* Menu Items */}
      <div className="menu-items">
        {menuItems.map((item, index) => {
          const springProps = useSpring({
            transform: isOpen 
              ? (isMobile 
                  ? 'translateY(0px) scale(1)' 
                  : `translateY(${-(index + 1) * 64}px) scale(1)`)
              : 'translateY(20px) scale(0.8)',
            opacity: isOpen ? 1 : 0,
            config: { 
              tension: 400 - index * 30, 
              friction: 20 
            },
          });

          return (
            <animated.div 
              style={springProps} 
              key={index} 
              className="menu-item-wrapper"
            >
              <button
                className="menu-item"
                onClick={() => handleItemClick(item)}
                style={{ 
                  '--item-color': item.color,
                  '--item-bg': item.bgColor 
                }}
                aria-label={item.label}
              >
                <span className="item-icon">{item.icon}</span>
                <span className="item-label">{item.label}</span>
                <span className="item-arrow">→</span>
              </button>
            </animated.div>
          );
        })}
      </div>

      {/* Toggle Button */}
      <button
        className={`toggle-button ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close menu" : "Open quick actions"}
      >
        <span className="button-bg"></span>
        <span className="toggle-icon">
          {isOpen ? <FiX /> : <FiMenu />}
        </span>
        {!isOpen && <span className="button-ping"></span>}
      </button>
    </MenuWrapper>
  );
};

const MenuWrapper = styled.div`
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: var(--z-fixed);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  pointer-events: none;

  /* Backdrop */
  .menu-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(26, 24, 21, 0.2);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    opacity: 0;
    visibility: hidden;
    transition: all var(--transition-slow);
    z-index: calc(var(--z-fixed) - 1);

    &.visible {
      opacity: 1;
      visibility: visible;
    }
  }

  /* Toggle Button */
  .toggle-button {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    border-radius: var(--radius-2xl);
    border: none;
    cursor: pointer;
    z-index: var(--z-fixed);
    overflow: visible;
    transition: transform var(--transition-base);
    pointer-events: auto;

    &:hover {
      transform: scale(1.05);
    }

    &:active {
      transform: scale(0.98);
    }
  }

  .button-bg {
    position: absolute;
    inset: 0;
    background: var(--gradient-primary);
    border-radius: var(--radius-2xl);
    transition: all var(--transition-base);
    box-shadow: var(--shadow-lg), var(--shadow-glow-primary);

    .toggle-button.open & {
      background: var(--color-dark-800);
      box-shadow: var(--shadow-lg);
    }
  }

  .button-ping {
    position: absolute;
    inset: -4px;
    background: var(--gradient-primary);
    border-radius: var(--radius-2xl);
    z-index: -1;
    opacity: 0.4;
    animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
  }

  @keyframes ping {
    0% {
      transform: scale(1);
      opacity: 0.4;
    }
    75%, 100% {
      transform: scale(1.3);
      opacity: 0;
    }
  }

  .toggle-icon {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.4rem;
    transition: transform var(--transition-base);
  }

  .toggle-button.open .toggle-icon {
    transform: rotate(90deg);
  }

  /* Menu Items */
  .menu-items {
    position: relative;
    height: 0;
    z-index: calc(var(--z-fixed) + 1);
    pointer-events: ${({ $isOpen }) => $isOpen ? 'auto' : 'none'};
  }

  .menu-item-wrapper {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: calc(var(--z-fixed) + 1);
    pointer-events: auto;
  }

  .menu-item {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-3) var(--space-4);
    background: white;
    border-radius: var(--radius-2xl);
    border: 1px solid var(--color-dark-100);
    cursor: pointer;
    box-shadow: var(--shadow-lg);
    transition: all var(--transition-base);
    white-space: nowrap;
    position: relative;
    z-index: calc(var(--z-fixed) + 1);
    pointer-events: auto;
    min-width: 180px;

    &:hover {
      transform: translateX(-8px);
      box-shadow: var(--shadow-xl);
      border-color: var(--item-color);
      
      .item-icon {
        background: var(--item-color);
        color: white;
        transform: scale(1.1);
      }

      .item-arrow {
        opacity: 1;
        transform: translateX(0);
      }
    }

    &:active {
      transform: translateX(-4px) scale(0.98);
    }
  }

  .item-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: var(--item-bg);
    border-radius: var(--radius-xl);
    color: var(--item-color);
    font-size: 1.1rem;
    transition: all var(--transition-base);
  }

  .item-label {
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-dark-700);
  }

  .item-arrow {
    font-size: var(--text-sm);
    color: var(--item-color);
    opacity: 0;
    transform: translateX(-8px);
    transition: all var(--transition-base);
    margin-left: var(--space-2);
  }

  /* Responsive */
  @media (max-width: 768px) {
    bottom: 24px;
    right: 24px;
    z-index: calc(var(--z-fixed) + 10);

    .toggle-button {
      width: 56px;
      height: 56px;
      z-index: calc(var(--z-fixed) + 10);
    }

    .menu-items {
      position: fixed;
      bottom: 100px;
      left: 50%;
      right: auto;
      transform: translateX(-50%);
      width: calc(100% - 48px);
      max-width: 320px;
      z-index: calc(var(--z-fixed) + 11);
      padding: 0;
      height: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-3);
    }

    .menu-item-wrapper {
      position: relative;
      width: 100%;
      bottom: auto;
      right: auto;
      z-index: calc(var(--z-fixed) + 11);
      transform: none !important;
    }

    .menu-item {
      padding: var(--space-3) var(--space-4);
      z-index: calc(var(--z-fixed) + 11);
      min-width: 100%;
      width: 100%;
      max-width: 100%;
    }

    .item-icon {
      width: 36px;
      height: 36px;
      font-size: 1rem;
    }

    .item-label {
      font-size: var(--text-sm);
    }

    .menu-backdrop {
      z-index: calc(var(--z-fixed) - 1);
    }
  }

  @media (max-width: 480px) {
    bottom: 20px;
    right: 20px;
    z-index: calc(var(--z-fixed) + 10);

    .toggle-button {
      width: 52px;
      height: 52px;
      z-index: calc(var(--z-fixed) + 10);
    }

    .toggle-icon {
      font-size: 1.25rem;
    }

    .menu-items {
      bottom: 90px;
      width: calc(100% - 40px);
      max-width: 280px;
    }

    .menu-item {
      min-width: 100%;
      width: 100%;
      padding: var(--space-2-5) var(--space-3);
    }
  }
`;

export default FloatingMenu;
