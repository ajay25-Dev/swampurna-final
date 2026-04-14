import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo.jpeg";
import { FaInstagram, FaYoutube } from "react-icons/fa";

const Footer1 = () => {
  const footerLinks = {
    about: {
      title: "",
      links: [
        { name: "About SWAMPURNA", path: "/Missionvision" },
        { name: "Why SWAMPURNA", path: "/Missionvision" },
        { name: "Our Mission", path: "/Missionvision" },
        { name: "Our Vision", path: "/Missionvision" },
        { name: "Our Team", path: "/Ourteam" },
        { name: "Contact Us", path: "/Contactus" },
        { name: "SWAMPURNA App", path: "https://play.google.com/store/apps", external: true },
      ]
    },
    programs: {
      title: "",
      links: [
        { name: "Awareness Workshops", path: "/Guidetomenstrualhealth" },
        { name: "Community Outreach", path: "/Guidetomenstrualhealth" },
        { name: "Digital Learning App", path: "/Guidetomenstrualhealth" },
        { name: "Share the knowledge", path: "/Faqs" },
        { name: "Research Activities", path: "/Governmentinitiatives" },
        { name: "Health Education Materials", path: "/Menstrualproducts" },
      ]
    },
    resources: {
      title: "",
      links: [
        { name: "Blog/Articles", path: "/Newsarticles" },
        { name: "Menstrual Hygiene Tips", path: "/Faqs" },
        { name: "Period Tracker", path: "/Periodtracker" },
        { name: "Health Resources", path: "/Menstrualproducts" },
        { name: "FAQs", path: "/Faqs" },
        { name: "Education Videos", path: "/Guidetomenstrualhealth" },
        { name: "Support Center", path: "/Missionvision" },
      ]
    },
    legal: {
      title: "",
      links: [
        { name: "Privacy Policy", path: "/Privacypolicy" },
        { name: "Terms of Service", path: "/Termsconditions" },
        { name: "Data Protection & Security", path: "/Privacypolicy" },
        { name: "Content Usage Policy", path: "/Privacypolicy" },
        { name: "Content usage policy", path: "/Termsconditions" },
      ]
    }
  };

  const socialLinks = [
    { icon: <FaYoutube />, url: "https://youtube.com/@swampurnaofficial?si=hJTq0FeEsElMevi6", label: "YouTube", color: "#FF0000" },
    { icon: <FaInstagram />, url: "https://www.instagram.com/swampurna_official/", label: "Instagram", color: "#E1306C" },
  ];

  return (
    <FooterTop>
      <div className="footer-container">
        {/* Brand Column */}
        <div className="brand-column">
          <NavLink to="/" className="brand-link">
            <div className="logo-wrapper">
              <img src={logo} alt="Swampurna" className="brand-logo" />
            </div>
            <div className="brand-text">
              <span className="brand-name">Swampurna</span>
              <span className="brand-tagline">Empowering Health</span>
            </div>
          </NavLink>
          
          <p className="brand-description">
            Empowering women with knowledge and tools to manage menstrual health. 
            Join millions who trust Swampurna for their health journey.
          </p>
          
          <div className="social-section">
            <span className="social-label">Follow Us</span>
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <a 
                  key={index} 
                  href={social.url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={social.label}
                  style={{ '--hover-color': social.color }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Link Columns */}
        <div className="links-grid">
          {Object.values(footerLinks).map((section, index) => (
            <div key={index} className="link-column">
              <ul className="link-list">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.external ? (
                      <a href={link.path} target="_blank" rel="noopener noreferrer" className="footer-link">
                        <span className="link-dot"></span>
                        <span className="link-text">{link.name}</span>
                      </a>
                    ) : (
                      <NavLink to={link.path} className="footer-link">
                        <span className="link-dot"></span>
                        <span className="link-text">{link.name}</span>
                      </NavLink>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </FooterTop>
  );
};

const FooterTop = styled.div`
  .footer-container {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.4fr 2fr;
    gap: var(--space-16);
  }

  /* Brand Column */
  .brand-column {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
  }

  .brand-link {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    text-decoration: none;
    transition: transform var(--transition-base);

    &:hover {
      transform: translateX(4px);
    }
  }

  .logo-wrapper {
    width: 52px;
    height: 52px;
    border-radius: var(--radius-xl);
    overflow: hidden;
    background: white;
    box-shadow: 0 4px 20px rgba(217, 118, 82, 0.2);
  }

  .brand-logo {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .brand-text {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .brand-name {
    font-family: var(--font-heading);
    font-size: var(--text-2xl);
    font-weight: 600;
    color: white;
    line-height: 1;
  }

  .brand-tagline {
    font-size: 0.65rem;
    font-weight: 600;
    color: var(--color-primary-400);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .brand-description {
    font-size: var(--text-sm);
    color: var(--color-dark-400);
    line-height: 1.8;
    max-width: 320px;
  }

  /* Social Section */
  .social-section {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .social-label {
    font-size: var(--text-xs);
    font-weight: 600;
    color: var(--color-dark-400);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .social-links {
    display: flex;
    gap: var(--space-2);
  }

  .social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: var(--radius-lg);
    color: var(--color-dark-400);
    font-size: 1rem;
    transition: all var(--transition-base);

    &:hover {
      background: var(--hover-color);
      border-color: var(--hover-color);
      color: white;
      transform: translateY(-3px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    }
  }

  /* Newsletter */
  .newsletter {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    margin-top: var(--space-2);
  }

  .newsletter-label {
    font-size: var(--text-xs);
    font-weight: 600;
    color: var(--color-dark-400);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .newsletter-form {
    display: flex;
    gap: var(--space-2);
  }

  .newsletter-input {
    flex: 1;
    padding: var(--space-3) var(--space-4);
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: var(--radius-lg);
    color: white;
    font-size: var(--text-sm);
    transition: all var(--transition-base);

    &::placeholder {
      color: var(--color-dark-500);
    }

    &:focus {
      outline: none;
      border-color: var(--color-primary-500);
      background: rgba(255, 255, 255, 0.08);
    }
  }

  .newsletter-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    background: var(--gradient-primary);
    border-radius: var(--radius-lg);
    color: white;
    font-size: 1.1rem;
    transition: all var(--transition-base);

    &:hover {
      transform: translateY(-2px) rotate(45deg);
      box-shadow: 0 8px 24px rgba(217, 118, 82, 0.3);
    }
  }

  /* Links Grid */
  .links-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-8);
  }

  .link-column {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
  }

  .column-title {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    font-weight: 700;
    color: white;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin: 0;
    padding-bottom: var(--space-3);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .link-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .footer-link {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-sm);
    color: var(--color-dark-400);
    text-decoration: none;
    transition: all var(--transition-base);

    .link-dot {
      width: 4px;
      height: 4px;
      background: var(--color-dark-600);
      border-radius: 50%;
      transition: all var(--transition-base);
    }

    &:hover {
      color: white;

      .link-dot {
        background: var(--color-primary-500);
        transform: scale(1.5);
      }

      .link-text {
        transform: translateX(4px);
      }
    }
  }

  .link-text {
    transition: transform var(--transition-base);
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .footer-container {
      grid-template-columns: 1fr;
      gap: var(--space-12);
    }

    .brand-column {
      align-items: center;
      text-align: center;
    }

    .brand-description {
      max-width: 450px;
    }

    .newsletter-form {
      max-width: 350px;
    }

    .links-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 640px) {
    .links-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-6);
    }

    .social-links {
      justify-content: center;
    }

    .newsletter-form {
      width: 100%;
      max-width: none;
    }
  }
`;

export default Footer1;
