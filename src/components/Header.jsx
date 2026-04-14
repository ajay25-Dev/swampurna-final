import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/images/logo.jpeg";
import styled from "styled-components";
import Dropdown from "./Dropdown";
import Menubar from "./Menubar";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { FaGamepad } from "react-icons/fa6";
import { FiArrowUpRight } from "react-icons/fi";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);
      
      // Calculate scroll progress for the progress bar
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min((scrollY / docHeight) * 100, 100);
      setScrollProgress(progress);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleResize();
    
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [location.pathname]);

  return (
    <Nav $isScrolled={isScrolled}>
      {/* Scroll Progress Bar */}
      <div className="progress-bar" style={{ width: `${scrollProgress}%` }} />
      
      <div className="nav-container">
        {/* Logo */}
        <NavLink to="/" className="logo-link">
          <div className="logo-wrapper">
            <img src={logo} alt="Swampurna" className="logo" />
          </div>
          <div className="logo-text-group">
            <span className="logo-text">Swampurna</span>
            <span className="logo-tagline">Empowering Health</span>
          </div>
        </NavLink>

        {/* Desktop Navigation */}
        {!isMobile && (
          <div className="desktop-nav">
            <Menubar />
          </div>
        )}

        {/* Right Actions */}
        <div className="right-actions">
          <button className="play-game-btn" onClick={() => navigate("/PlayGames")}>
            <span className="btn-bg"></span>
            <FaGamepad className="game-icon" />
            <span className="btn-text">Play Games</span>
            <FiArrowUpRight className="arrow-icon" />
          </button>

          {/* Hackathon dropdown hidden
          {!isMobile && (
            <div className="hackathon-dropdown">
              <Dropdown
                title="Hackathon"
                hasborder={true}
                links={[
                  { label: "How to Participate", path: "/Howtoparticipate" },
                  { label: "Challenges", path: "/Challenges" },
                  { label: "Timeline", path: "/Timeline" },
                  { label: "Prize Recognition", path: "/Prizerecognition" },
                  { label: "Judging Criteria", path: "/Judgingcriteria" },
                  { label: "Resource Support", path: "/Resources" },
                  { label: "FAQ", path: "/Faq" },
                ]}
              />
            </div>
          )}
          */}

          {isMobile && (
            <button
              className={`menu-toggle ${isMenuOpen ? 'open' : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <span className="toggle-line line-1"></span>
              <span className="toggle-line line-2"></span>
              <span className="toggle-line line-3"></span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-backdrop" onClick={() => setIsMenuOpen(false)} />
        <div className="mobile-menu-content">
          <div className="mobile-menu-header">
            <span className="menu-title">Menu</span>
            <button 
              className="close-btn"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <IoClose />
            </button>
          </div>
          <div className="mobile-menu-body">
            <Menubar />
            {/* Mobile hackathon section hidden
            <div className="mobile-hackathon">
              <span className="mobile-section-title">Hackathon</span>
              <Dropdown
                title="Hackathon"
                hasborder={false}
                links={[
                  { label: "How to Participate", path: "/Howtoparticipate" },
                  { label: "Challenges", path: "/Challenges" },
                  { label: "Timeline", path: "/Timeline" },
                  { label: "Prize Recognition", path: "/Prizerecognition" },
                  { label: "Judging Criteria", path: "/Judgingcriteria" },
                  { label: "Resource Support", path: "/Resources" },
                  { label: "FAQ", path: "/Faq" },
                ]}
              />
            </div>
            */}
          </div>
          <div className="mobile-menu-footer">
            <button 
              className="mobile-game-btn"
              onClick={() => {
                navigate("/PlayGames");
                setIsMenuOpen(false);
              }}
            >
              <FaGamepad />
              <span>Play Games</span>
              <FiArrowUpRight />
            </button>
          </div>
        </div>
      </div>
    </Nav>
  );
};

const Nav = styled.header`
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  padding: var(--space-4) var(--space-6);
  background: ${({ $isScrolled }) => 
    $isScrolled 
      ? 'rgba(253, 251, 247, 0.85)' 
      : 'transparent'
  };
  backdrop-filter: ${({ $isScrolled }) => 
    $isScrolled ? 'blur(20px) saturate(180%)' : 'none'
  };
  -webkit-backdrop-filter: ${({ $isScrolled }) => 
    $isScrolled ? 'blur(20px) saturate(180%)' : 'none'
  };
  border-bottom: ${({ $isScrolled }) => 
    $isScrolled 
      ? '1px solid rgba(26, 24, 21, 0.06)' 
      : '1px solid transparent'
  };
  transition: all var(--transition-slow);

  /* Progress Bar */
  .progress-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background: var(--gradient-primary);
    transition: width 0.1s linear;
    border-radius: 0 var(--radius-full) var(--radius-full) 0;
  }

  .nav-container {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-6);
  }

  /* Logo */
  .logo-link {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    text-decoration: none;
    transition: transform var(--transition-base);

    &:hover {
      transform: translateY(-1px);
      
      .logo-wrapper {
        box-shadow: var(--shadow-lg), var(--shadow-glow-primary);
      }
    }
  }

  .logo-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: var(--radius-xl);
    overflow: hidden;
    box-shadow: var(--shadow-md);
    transition: box-shadow var(--transition-base);
    background: white;
  }

  .logo {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .logo-text-group {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .logo-text {
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    font-weight: 600;
    color: var(--color-dark-900);
    letter-spacing: -0.02em;
    line-height: 1;
  }

  .logo-tagline {
    font-size: 0.65rem;
    font-weight: 500;
    color: var(--color-primary-600);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    line-height: 1;
  }

  /* Desktop Nav */
  .desktop-nav {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  /* Right Actions */
  .right-actions {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }

  /* Play Game Button */
  .play-game-btn {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2-5) var(--space-5);
    background: transparent;
    color: white;
    border-radius: var(--radius-full);
    font-size: var(--text-sm);
    font-weight: 600;
    overflow: hidden;
    transition: all var(--transition-base);

    .btn-bg {
      position: absolute;
      inset: 0;
      background: var(--gradient-primary);
      border-radius: var(--radius-full);
      z-index: 0;
      transition: transform var(--transition-base);
    }

    .game-icon, .btn-text, .arrow-icon {
      position: relative;
      z-index: 1;
    }

    .game-icon {
      font-size: 1rem;
      transition: transform var(--transition-base);
    }

    .arrow-icon {
      font-size: 0.9rem;
      opacity: 0;
      transform: translateX(-8px);
      transition: all var(--transition-base);
    }

    &:hover {
      .btn-bg {
        transform: scale(1.05);
      }
      
      .arrow-icon {
        opacity: 1;
        transform: translateX(0);
      }
      
      .game-icon {
        transform: rotate(-10deg);
      }
    }

    @media (max-width: 540px) {
      padding: var(--space-2-5) var(--space-3);
      
      .btn-text {
        display: none;
      }
      
      .arrow-icon {
        display: none;
      }
    }
  }

  /* Hackathon Dropdown Container */
  .hackathon-dropdown {
    position: relative;
  }

  /* Menu Toggle */
  .menu-toggle {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 44px;
    height: 44px;
    background: var(--color-dark-100);
    border-radius: var(--radius-xl);
    gap: 5px;
    transition: all var(--transition-base);

    &:hover {
      background: var(--color-dark-200);
    }

    .toggle-line {
      display: block;
      width: 20px;
      height: 2px;
      background: var(--color-dark-700);
      border-radius: var(--radius-full);
      transition: all var(--transition-base);
      transform-origin: center;
    }

    &.open {
      background: var(--color-primary-600);

      .toggle-line {
        background: white;
      }

      .line-1 {
        transform: translateY(7px) rotate(45deg);
      }
      
      .line-2 {
        opacity: 0;
        transform: scaleX(0);
      }
      
      .line-3 {
        transform: translateY(-7px) rotate(-45deg);
      }
    }
  }

  /* Mobile Menu */
  .mobile-menu {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: var(--z-modal);
    visibility: hidden;
    pointer-events: none;
  }

  .mobile-menu.open {
    visibility: visible;
    pointer-events: auto;
  }

  .mobile-menu-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(26, 24, 21, 0.4);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    opacity: 0;
    transition: opacity var(--transition-slow);
  }

  .mobile-menu.open .mobile-menu-backdrop {
    opacity: 1;
  }

  .mobile-menu-content {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: min(380px, 85vw);
    background: var(--color-background);
    display: flex;
    flex-direction: column;
    transform: translateX(100%);
    transition: transform var(--transition-slow) cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: -20px 0 60px rgba(26, 24, 21, 0.15);
  }

  .mobile-menu.open .mobile-menu-content {
    transform: translateX(0);
  }

  .mobile-menu-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-6);
    border-bottom: 1px solid var(--color-dark-100);
  }

  .menu-title {
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    font-weight: 600;
    color: var(--color-dark-900);
  }

  .close-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: var(--color-dark-100);
    border-radius: var(--radius-lg);
    color: var(--color-dark-600);
    font-size: 1.4rem;
    transition: all var(--transition-base);

    &:hover {
      background: var(--color-primary-600);
      color: white;
    }
  }

  .mobile-menu-body {
    flex: 1;
    overflow-y: auto;
    padding: var(--space-4) var(--space-6);
  }

  .mobile-hackathon {
    margin-top: var(--space-6);
    padding-top: var(--space-6);
    border-top: 1px solid var(--color-dark-100);
  }

  .mobile-section-title {
    display: block;
    font-size: var(--text-xs);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--color-dark-400);
    margin-bottom: var(--space-4);
  }

  .mobile-menu-footer {
    padding: var(--space-6);
    border-top: 1px solid var(--color-dark-100);
  }

  .mobile-game-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-3);
    width: 100%;
    padding: var(--space-4);
    background: var(--gradient-primary);
    color: white;
    font-size: var(--text-base);
    font-weight: 600;
    border-radius: var(--radius-2xl);
    transition: all var(--transition-base);
    box-shadow: var(--shadow-md), var(--shadow-glow-primary);

    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg), 0 12px 48px rgba(217, 118, 82, 0.35);
    }
  }

  /* Responsive */
  @media (max-width: 1024px) {
    padding: var(--space-3) var(--space-4);

    .logo-tagline {
      display: none;
    }
  }

  @media (max-width: 768px) {
    .logo-text-group {
      display: none;
    }

    .logo-wrapper {
      width: 44px;
      height: 44px;
    }
  }
`;

export default Header;
