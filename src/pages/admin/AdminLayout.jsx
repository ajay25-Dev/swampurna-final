import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { adminApi } from "../../lib/adminApi";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [openMenu, setOpenMenu] = useState("about");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const slug = location.pathname.split("/admin/pages/")[1] || "";
    if (
      ["Whoweare", "Missionvision", "Ourteam", "Ourpartner", "Projecthistory"].includes(slug)
    ) {
      setOpenMenu("about");
    } else if (["Programinitiative", "Ourapproach", "Impactstories"].includes(slug)) {
      setOpenMenu("work");
    } else if (
      ["Guidetomenstrualhealth", "Menstrualproducts", "Governmentinitiatives", "Mythstaboos", "Compitionevent", "Faqs"].includes(slug)
    ) {
      setOpenMenu("resources");
    } else if (["Newsarticles", "Photogallery", "Videogallery", "Impactstory"].includes(slug)) {
      setOpenMenu("media");
    }
  }, [location.pathname]);

  useEffect(() => {
    adminApi
      .me()
      .then((res) => setUser(res.user))
      .catch(() => navigate("/admin/login"))
      .finally(() => setLoading(false));
  }, [navigate]);

  const onLogout = async () => {
    await adminApi.logout();
    navigate("/admin/login");
  };

  if (loading) {
    return <div style={{ padding: 24 }}>Loading...</div>;
  }

  return (
    <Wrap>
      <header>
        <div className="brand">
          <button
            className="menu-btn"
            onClick={() => setSidebarOpen((s) => !s)}
            aria-label="Toggle navigation"
          >
            ☰
          </button>
          <span>Swampurna Admin</span>
        </div>
        <div className="right">
          <span className="user">{user?.email}</span>
          <button onClick={onLogout}>Logout</button>
        </div>
      </header>
      <div className="body">
        <div
          className={`sidebar-backdrop ${sidebarOpen ? "open" : ""}`}
          onClick={() => setSidebarOpen(false)}
        />
        <aside className={sidebarOpen ? "open" : ""}>
          <div className="nav-section">
            <div className="nav-title">Navigation</div>
            <NavLink to="/admin" className="nav-link" end onClick={() => setSidebarOpen(false)}>
              Dashboard
            </NavLink>
            <NavLink to="/admin/customers" className="nav-link" onClick={() => setSidebarOpen(false)}>
              Customers
            </NavLink>
            <NavLink style={{ marginBottom:"10px" }} to="/admin/pages/Home" className="nav-link" onClick={() => setSidebarOpen(false)}>
              Home Banner
            </NavLink>
          </div>

          <div className="nav-section">
            <button
              className={`nav-toggle ${openMenu === "about" ? "open" : ""}`}
              onClick={() => setOpenMenu(openMenu === "about" ? "" : "about")}
            >
              <span>About Us</span>
              <span className="chev">▾</span>
            </button>
            <div className={`submenu ${openMenu === "about" ? "open" : ""}`}>
              <NavLink to="/admin/pages/Whoweare" className="nav-link" onClick={() => setSidebarOpen(false)}>Whoweare</NavLink>
              <NavLink to="/admin/pages/Missionvision" className="nav-link" onClick={() => setSidebarOpen(false)}>Missionvision</NavLink>
              <NavLink to="/admin/pages/Ourteam" className="nav-link" onClick={() => setSidebarOpen(false)}>Ourteam</NavLink>
              <NavLink to="/admin/pages/Ourpartner" className="nav-link" onClick={() => setSidebarOpen(false)}>Ourpartner</NavLink>
              <NavLink to="/admin/pages/Projecthistory" className="nav-link" onClick={() => setSidebarOpen(false)}>Projecthistory</NavLink>
            </div>
          </div>

          <div className="nav-section">
            <button
              className={`nav-toggle ${openMenu === "work" ? "open" : ""}`}
              onClick={() => setOpenMenu(openMenu === "work" ? "" : "work")}
            >
              <span>Our Work</span>
              <span className="chev">▾</span>
            </button>
            <div className={`submenu ${openMenu === "work" ? "open" : ""}`}>
              <NavLink to="/admin/pages/Programinitiative" className="nav-link" onClick={() => setSidebarOpen(false)}>Programinitiative</NavLink>
              <NavLink to="/admin/pages/Ourapproach" className="nav-link" onClick={() => setSidebarOpen(false)}>Ourapproach</NavLink>
              <NavLink to="/admin/pages/Impactstories" className="nav-link" onClick={() => setSidebarOpen(false)}>Impactstories</NavLink>
            </div>
          </div>

          <div className="nav-section">
            <button
              className={`nav-toggle ${openMenu === "resources" ? "open" : ""}`}
              onClick={() => setOpenMenu(openMenu === "resources" ? "" : "resources")}
            >
              <span>Resources</span>
              <span className="chev">▾</span>
            </button>
            <div className={`submenu ${openMenu === "resources" ? "open" : ""}`}>
              <NavLink to="/admin/pages/Guidetomenstrualhealth" className="nav-link" onClick={() => setSidebarOpen(false)}>Guidetomenstrualhealth</NavLink>
              <NavLink to="/admin/pages/Menstrualproducts" className="nav-link" onClick={() => setSidebarOpen(false)}>Menstrualproducts</NavLink>
              <NavLink to="/admin/pages/Governmentinitiatives" className="nav-link" onClick={() => setSidebarOpen(false)}>Governmentinitiatives</NavLink>
              <NavLink to="/admin/pages/Mythstaboos" className="nav-link" onClick={() => setSidebarOpen(false)}>Mythstaboos</NavLink>
              <NavLink to="/admin/pages/Compitionevent" className="nav-link" onClick={() => setSidebarOpen(false)}>Compitionevent</NavLink>
              <NavLink to="/admin/pages/Faqs" className="nav-link" onClick={() => setSidebarOpen(false)}>Faqs</NavLink>
            </div>
          </div>

          <div className="nav-section">
            <button
              className={`nav-toggle ${openMenu === "media" ? "open" : ""}`}
              onClick={() => setOpenMenu(openMenu === "media" ? "" : "media")}
            >
              <span>Media</span>
              <span className="chev">▾</span>
            </button>
            <div className={`submenu ${openMenu === "media" ? "open" : ""}`}>
              <NavLink to="/admin/pages/Newsarticles" className="nav-link" onClick={() => setSidebarOpen(false)}>Newsarticles</NavLink>
              <NavLink to="/admin/pages/Photogallery" className="nav-link" onClick={() => setSidebarOpen(false)}>Photogallery</NavLink>
              <NavLink to="/admin/pages/Videogallery" className="nav-link" onClick={() => setSidebarOpen(false)}>Videogallery</NavLink>
              <NavLink to="/admin/pages/Impactstory" className="nav-link" onClick={() => setSidebarOpen(false)}>Impactstory</NavLink>
            </div>
          </div>
        </aside>
        <main onClick={() => setSidebarOpen(false)}>{children}</main>
      </div>
    </Wrap>
  );
};

const Wrap = styled.div`
  min-height: 100vh;
  height: 100vh;
  overflow: hidden;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-4) var(--space-6);
    background: white;
    border-bottom: 1px solid var(--color-dark-100);
    position: sticky;
    top: 0;
    z-index: var(--z-sticky);
  }

  .brand {
    font-weight: 600;
    font-size: var(--text-lg);
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }

  .menu-btn {
    display: none;
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: var(--color-dark-100);
    font-size: 1.1rem;
  }

  .right {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }

  .user {
    font-size: var(--text-sm);
    color: var(--color-dark-500);
  }

  button {
    padding: var(--space-2) var(--space-4);
    border-radius: var(--radius-full);
    background: var(--color-dark-100);
  }

  .body {
    display: flex;
    align-items: stretch;
    height: calc(100vh - 64px);
  }

  aside {
    background: #0f1115;
    color: #cdd3d8;
    padding: var(--space-6) var(--space-4);
    border-right: none;
    overflow-y: auto;
    height: 100%;
    flex: 0 0 260px;
  }

  .nav-section {
    display: grid;
    gap: var(--space-2);
    margin-bottom: 0px;
  }

  .nav-title {
    font-size: 0.7rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #8f98a3;
    margin-bottom: var(--space-2);
  }

  .nav-toggle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 12px;
    border-radius: 10px;
    background: #121722;
    color: #cdd3d8;
    font-weight: 600;
    transition: all 0.2s ease;
  }

  .nav-toggle:hover {
    background: #1a202a;
    color: white;
  }

  .nav-toggle .chev {
    transition: transform 0.2s ease;
  }

  .nav-toggle.open .chev {
    transform: rotate(180deg);
  }

  .submenu {
    display: grid;
    gap: 6px;
    padding-left: 8px;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.25s ease;
  }

  .submenu.open {
    max-height: 400px;
  }

  .nav-link {
    color: #cdd3d8;
    text-decoration: none;
    padding: 10px 12px;
    border-radius: 10px;
    transition: all 0.2s ease;
  }

  .nav-link:hover {
    background: #1a202a;
    color: white;
  }

  .nav-link.active {
    background: #202838;
    color: white;
  }

  main {
    padding: var(--space-6);
    background: #f6f7f9;
    overflow-y: auto;
    height: 100%;
    flex: 1 1 auto;
  }

  @media (min-width: 769px) {
    aside {
      position: relative;
      width: 260px;
      transform: none;
      box-shadow: none;
    }
  }

  @media (max-width: 768px) {
    .menu-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .body {
      display: block;
      position: relative;
    }

    .sidebar-backdrop {
      position: fixed;
      inset: 64px 0 0 0;
      background: rgba(0, 0, 0, 0.35);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease;
      z-index: 30;
    }

    .sidebar-backdrop.open {
      opacity: 1;
      pointer-events: auto;
    }

    aside {
      position: fixed;
      top: 64px;
      left: 0;
      bottom: 0;
      width: 260px;
      transform: translateX(-100%);
      transition: transform 0.2s ease;
      z-index: 40;
      box-shadow: 12px 0 24px rgba(0, 0, 0, 0.3);
    }

    aside.open {
      transform: translateX(0);
    }
  }
`;

export default AdminLayout;
