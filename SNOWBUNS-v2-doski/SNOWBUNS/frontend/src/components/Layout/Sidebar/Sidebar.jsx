import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.scss";

const Sidebar = ({ sidebar, setSidebar }) => {
  useEffect(() => {
    const handleResize = () => {
      if (sidebar) {
        console.log(sidebar, window.innerWidth);
        // setSidebar(sidebar || window.innerWidth <= 768);
      } else {
        // console.log(sidebar);
        // setSidebar(window.innerWidth <= 768);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [sidebar]);

  const primaryNavLinks = [
    { path: "/popular", icon: "fa fa-star", label: "Popular" },
    { path: "/trending", icon: "fa fa-fire", label: "Trending" },
    { path: "/ranking", icon: "fa fa-bolt", label: "Ranking" },
    { path: "/country", icon: "fa fa-globe", label: "Country" },
    { path: "/faqs", icon: "fa fa-info-circle", label: "FAQs" },
    { path: "/channel", icon: "fa fa-video-camera", label: "Channel" },
    { path: "/settings", icon: "fa fa-cog", label: "Settings" },
  ];

  const secondaryNavLinks = [
    { path: "/profile", icon: "fa fa-user", label: "Profile" },
    { path: "/wallet", icon: "fa fa-money", label: "Wallet" },
    { path: "/login", icon: "fa fa-sign-in", label: "Login" },
  ];

  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <div className="sidebar-container">
      <aside className={`sidebar ${sidebar ? "collapsed" : ""}`}>
        <header className="sidebar-header">
          <button className="sidebar-toggler" onClick={toggleSidebar}>
            <i className="fa fa-bars" />
          </button>
        </header>

        <nav className="sidebar-nav">
          <ul className="nav-list primary-nav">
            {primaryNavLinks.map((link, index) => (
              <li key={index} className="nav-item">
                <NavLink to={link.path} className="nav-link">
                  <i className={`${link.icon}`}></i>
                  <span className="nav-label">{link.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          <ul className="nav-list secondary-nav">
            {secondaryNavLinks.map((link, index) => (
              <li key={index} className="nav-item">
                <NavLink to={link.path} className="nav-link">
                  <i className={`${link.icon}`}></i>
                  <span className="nav-label">{link.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
