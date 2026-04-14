import React from 'react';
import styled from 'styled-components';
import Member1 from '../assets/images/images1/Member1.jpg';
import { FiAward, FiBookOpen, FiUsers } from 'react-icons/fi';
import { useContentItems } from '../hooks/useContentItems';

const HomeTwo = () => {
  const defaultProfile = {
    title: "Dr. Suparna Dutta",
    subtitle: "Ph.D.\nAssociate Professor, Humanities Communication, Principal Investigator",
    description:
      "Dr. Suparna Dutta is an Associate Professor at BIT Mesra (Noida Campus) with 26+ years of teaching and research experience. She holds a PhD in Communication (JNTU Hyderabad) and master’s degrees in English Literature from BHU, Varanasi. Her Experience includes Communication for Development, Behavior Change and Participatory Communication, Gender & Media Studies, and Soft Skills. With 25+ publications, she is the author of a Communication textbook (Prentice Hall of India) and editor of an anthology published by Macmillan India. She is the founder faculty coordinator of the Animation & Multimedia Program at BIT Mesra (Noida and subsequently the Jaipur Campus of BIT, Mesra) and has mentored award-winning student films. Dr. Dutta also contributes to national academic and industry forums through advisory roles as a communication expert with some NCR universities and other organizations.",
    image_url: Member1,
    meta: {
      label: "Principal Investigator",
      stats: [
        { label: "Publications", value: "25+" },
        { label: "Years Exp", value: "26+" },
      ],
    },
  };

  const { items: profileItems } = useContentItems({
    page: "home",
    section: "principal_investigator",
    fallback: [defaultProfile],
  });

  const profile = profileItems?.[0] || defaultProfile;
  const label = profile?.meta?.label || "Principal Investigator";
  const stats = profile?.meta?.stats || defaultProfile.meta.stats;

  return (
    <ProfileSection>
      <div className="section-container">
        {/* Section Label */}
        <div className="section-label">
          <span className="label-line"></span>
          <span className="label-text">{label}</span>
          <span className="label-line"></span>
        </div>

        <div className="profile-layout">
          {/* Left: Image */}
            <div className="profile-image-section">
              <div className="image-wrapper">
                <img src={profile.image_url || Member1} alt={profile.title || "Profile"} className="profile-image" />
                <div className="image-frame"></div>
              </div>
            
            {/* Quick Stats */}
            <div className="quick-stats">
              {stats.map((s, idx) => (
                <div className="stat-card" key={idx}>
                  {idx === 0 ? <FiBookOpen className="stat-icon" /> : <FiUsers className="stat-icon" />}
                  <div className="stat-content">
                    <span className="stat-number">{s.value}</span>
                    <span className="stat-label">{s.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Content */}
          <div className="profile-content">
            <div className="content-header">
              <h2 className="profile-name">{profile.title}</h2>
              <p className="profile-title">
                {(profile.subtitle || "").split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            </div>
            
            <div className="bio-content">
              <p className="bio-text">
              {profile.description}
              </p>
            </div>

            {/* Project Badge */}
           
          </div>
        </div>
      </div>
    </ProfileSection>
  );
};

const ProfileSection = styled.section`
  padding: var(--space-8) var(--space-6);
  position: relative;
  overflow: hidden;

  .section-container {
    max-width: 1200px;
    margin: 0 auto;
  }

  /* Section Label */
  .section-label {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    margin-bottom: var(--space-12);
  }

  .label-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, 
      transparent, 
      var(--color-dark-200) 20%, 
      var(--color-dark-200) 80%, 
      transparent
    );
  }

  .label-text {
    font-size: var(--text-xs);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--color-secondary-600);
    padding: var(--space-2) var(--space-5);
    background: var(--color-secondary-50);
    border-radius: var(--radius-full);
    white-space: nowrap;
    border: 1px solid var(--color-secondary-100);
  }

  /* Profile Layout */
  .profile-layout {
    display: grid;
    grid-template-columns: 380px 1fr;
    gap: var(--space-12);
    align-items: start;
  }

  /* Image Section */
  .profile-image-section {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
  }

  .image-wrapper {
    position: relative;
    width: 100%;
    overflow: hidden;
  }

  .profile-image {
    position: relative;
    z-index: 2;
    width: 100%;
    height: auto;
    border-radius: var(--radius-3xl);
    box-shadow: var(--shadow-xl);
  }

  .image-frame {
    position: absolute;
    top: 16px;
    left: 16px;
    right: -16px;
    bottom: -16px;
    background: var(--gradient-primary);
    border-radius: var(--radius-3xl);
    z-index: 1;
    opacity: 0.15;
  }

  /* Quick Stats */
  .quick-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-4);
  }

  .stat-card {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-4);
    background: white;
    border-radius: var(--radius-2xl);
    box-shadow: var(--shadow-soft);
    border: 1px solid var(--color-dark-100);
    transition: all var(--transition-base);

    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-soft-lg);
    }
  }

  .stat-icon {
    font-size: 1.5rem;
    color: var(--color-secondary-500);
  }

  .stat-content {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .stat-number {
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    font-weight: 600;
    color: var(--color-dark-900);
    line-height: 1;
  }

  .stat-label {
    font-size: var(--text-xs);
    color: var(--color-dark-400);
    font-weight: 500;
  }

  /* Profile Content */
  .profile-content {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
  }

  .content-header {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .profile-name {
    font-family: var(--font-heading);
    font-size: var(--text-4xl);
    font-weight: 600;
    color: var(--color-dark-900);
    line-height: 1.1;
    margin: 0;
  }

  .profile-title {
    font-size: var(--text-lg);
    color: var(--color-secondary-600);
    font-weight: 500;
    margin: 0;
  }

  /* Bio Content */
  .bio-content {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
  }

  .bio-text {
    font-size: var(--text-base);
    color: var(--color-dark-600);
    line-height: 1.9;
    margin: 0;
  }

  .highlight-box {
    display: flex;
    gap: var(--space-4);
    padding: var(--space-5);
    background: linear-gradient(135deg, var(--color-primary-50), var(--color-cream-200));
    border-radius: var(--radius-2xl);
    border: 1px solid var(--color-primary-100);
  }

  .highlight-indicator {
    width: 4px;
    flex-shrink: 0;
    background: var(--gradient-primary);
    border-radius: var(--radius-full);
  }

  .highlight-text {
    font-size: var(--text-sm);
    color: var(--color-dark-700);
    line-height: 1.8;
    margin: 0;
    font-style: italic;
  }

  /* Project Badge */
  .project-badge {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    padding: var(--space-4) var(--space-5);
    background: var(--gradient-secondary);
    border-radius: var(--radius-2xl);
    color: white;
    margin-top: var(--space-2);
  }

  .badge-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: var(--radius-xl);
    font-size: 1.25rem;
  }

  .badge-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .badge-title {
    font-weight: 600;
    font-size: var(--text-base);
  }

  .badge-year {
    font-size: var(--text-sm);
    opacity: 0.85;
  }

  .badge-status {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-3);
    background: rgba(255, 255, 255, 0.15);
    border-radius: var(--radius-full);
    font-size: var(--text-xs);
    font-weight: 600;
  }

  .status-dot {
    width: 8px;
    height: 8px;
    background: #4ade80;
    border-radius: 50%;
    animation: pulse 2s infinite;
    box-shadow: 0 0 8px #4ade80;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  /* Responsive */
  @media (max-width: 1024px) {
    padding: var(--space-16) var(--space-6);
    overflow-x: hidden;
    
    .section-container {
      overflow-x: hidden;
    }

    .profile-layout {
      grid-template-columns: 1fr;
      gap: var(--space-10);
    }

    .profile-image-section {
      max-width: 400px;
      margin: 0 auto;
      width: 100%;
      overflow-x: hidden;
    }

    .image-wrapper {
      overflow: hidden;
      width: 100%;
      max-width: 100%;
    }

    .image-frame {
      right: 0;
      left: 8px;
      top: 8px;
      bottom: -8px;
    }
  }

  @media (max-width: 640px) {
    padding: var(--space-12) var(--space-4);
    overflow-x: hidden;

    .section-container {
      overflow-x: hidden;
      width: 100%;
    }

    .profile-image-section {
      max-width: 100%;
      width: 100%;
      overflow-x: hidden;
    }

    .image-wrapper {
      overflow: hidden;
      width: 100%;
      max-width: 100%;
    }

    .image-frame {
      right: 0;
      left: 8px;
      top: 8px;
      bottom: -8px;
    }

    .profile-name {
      font-size: var(--text-3xl);
    }

    .quick-stats {
      grid-template-columns: 1fr;
    }

    .project-badge {
      flex-wrap: wrap;
    }

    .badge-status {
      width: 100%;
      justify-content: center;
    }
  }
`;

export default HomeTwo;
