import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import AdminLayout from "./AdminLayout";

const sections = [
  { label: "CRM", items: ["customers"] },
  { label: "App Ops", items: ["support-reports", "cycle-snaps", "testimonials", "tracker-details"] },
  { label: "Home", items: ["Home"] },
  { label: "About Us", items: ["Whoweare", "Missionvision", "Ourteam", "Ourpartner", "Projecthistory"] },
  { label: "Our Work", items: ["Programinitiative", "Ourapproach", "Impactstories"] },
  { label: "Resources", items: ["Guidetomenstrualhealth", "Menstrualproducts", "Governmentinitiatives", "Mythstaboos", "Compitionevent", "Faqs"] },
  { label: "Media", items: ["Newsarticles", "Photogallery", "Videogallery", "Impactstory"] },
];

const Dashboard = () => {
  return (
    <AdminLayout>
      <Wrap>
        <h1>Content Manager</h1>
        <p className="sub">Pick a page to manage dynamic content.</p>
        <div className="grid">
          {sections.map((section) => (
            <div key={section.label} className="card">
              <h2>{section.label}</h2>
              <div className="list">
                {section.items.map((item) => (
                  <Link
                    key={item}
                    to={
                      item === "customers"
                        ? "/admin/customers"
                        : item === "support-reports"
                          ? "/admin/support-reports"
                          : item === "cycle-snaps"
                            ? "/admin/cycle-snaps"
                            : item === "testimonials"
                              ? "/admin/testimonials"
                            : item === "tracker-details"
                              ? "/admin/tracker-details"
                            : `/admin/pages/${item}`
                    }
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Wrap>
    </AdminLayout>
  );
};

const Wrap = styled.div`
  h1 {
    font-size: var(--text-3xl);
    margin-bottom: var(--space-2);
  }

  .sub {
    color: var(--color-dark-500);
    margin-bottom: var(--space-6);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-6);
  }

  .card {
    background: white;
    border: 1px solid var(--color-dark-100);
    border-radius: var(--radius-2xl);
    padding: var(--space-6);
    box-shadow: var(--shadow-soft);
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    margin-top: var(--space-3);
  }

  a {
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-lg);
    background: var(--color-dark-50);
  }

  @media (max-width: 768px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
`;

export default Dashboard;
