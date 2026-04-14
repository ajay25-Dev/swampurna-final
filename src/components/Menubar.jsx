import React from 'react';
import styled from 'styled-components';
import Dropdown from './Dropdown';
import { NavLink } from 'react-router-dom';

const Menubar = () => {
  return (
    <MenuWrapper>
      <NavLink to="/" className="nav-link">
        <span className="link-text">Home</span>
        <span className="link-indicator"></span>
      </NavLink>

      <Dropdown
        title="About Us"
        hasborder={false}
        links={[
          { label: 'Who We Are', path: '/Whoweare' },
          { label: 'Mission & Vision', path: '/Missionvision' },
          { label: 'Our Team', path: '/Ourteam' },
          { label: 'Our Partners', path: '/Ourpartner' },
        ]}
      />

      <Dropdown
        title="Our Work"
        hasborder={false}
        links={[
          { label: 'Program Initiative', path: '/Programinitiative' },
          { label: 'Our Core Objectives', path: '/Ourapproach' },
          { label: 'Stories From The Field', path: '/Impactstories' },
        ]}
      />

      <Dropdown
        title="Resources"
        hasborder={false}
        links={[
          { label: 'Guide to Menstrual Health', path: '/Guidetomenstrualhealth' },
          { label: 'Period Tracker', path: '/Periodtracker' },
          { label: 'Menstrual Health & Hygiene Products', path: '/Menstrualproducts' },
          { label: 'Government Initiatives', path: '/Governmentinitiatives' },
          { label: 'Myths & Taboos', path: '/Mythstaboos' },
          { label: 'Competitions & Events', path: '/Compitionevent' },
          { label: 'FAQs', path: '/Faqs' },
        ]}
      />

      <Dropdown
        title="Support Us"
        hasborder={false}
        links={[
          { label: 'Join The SWAMPURNA Movement', path: '/Joinmovement' },
          { label: 'Get Involved', path: '/Financialpartnerships' },
          { label: 'Volunteer & Internship Opportunities', path: '/Volunteerinternship' },
          { label: 'Get In Touch', path: '/Contactus' },
        ]}
      />

      <Dropdown
        title="Media"
        hasborder={false}
        links={[
          { label: 'Impact story', path: '/Impactstory' },
          { label: 'News & Articles', path: '/Newsarticles' },
          { label: 'Photo Gallery', path: '/Photogallery' },
          { label: 'Video Gallery', path: '/Videogallery' },
        ]}
      />
    </MenuWrapper>
  );
};

const MenuWrapper = styled.nav`
  display: flex;
  align-items: center;
  gap: var(--space-1);

  .nav-link {
    position: relative;
    display: flex;
    align-items: center;
    padding: var(--space-2-5) var(--space-4);
    font-size: var(--text-sm);
    font-weight: 500;
    color: var(--color-dark-600);
    text-decoration: none;
    border-radius: var(--radius-lg);
    transition: all var(--transition-base);
    overflow: hidden;

    .link-text {
      position: relative;
      z-index: 1;
    }

    .link-indicator {
      position: absolute;
      bottom: 6px;
      left: 50%;
      transform: translateX(-50%) scaleX(0);
      width: calc(100% - 24px);
      height: 2px;
      background: var(--gradient-primary);
      border-radius: var(--radius-full);
      transition: transform var(--transition-base);
    }

    &:hover {
      color: var(--color-dark-900);

      .link-indicator {
        transform: translateX(-50%) scaleX(1);
      }
    }

    &.active {
      color: var(--color-primary-600);
      background: var(--color-primary-50);

      .link-indicator {
        transform: translateX(-50%) scaleX(1);
        background: var(--color-primary-500);
      }
    }
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: stretch;
    gap: var(--space-2);
    width: 100%;

    .nav-link {
      padding: var(--space-4);
      background: var(--color-dark-50);
      border-radius: var(--radius-xl);
      font-size: var(--text-base);
      font-weight: 500;

      .link-indicator {
        display: none;
      }

      &:hover {
        background: var(--color-dark-100);
      }

      &.active {
        background: var(--color-primary-100);
        color: var(--color-primary-700);
      }
    }
  }
`;

export default Menubar;
