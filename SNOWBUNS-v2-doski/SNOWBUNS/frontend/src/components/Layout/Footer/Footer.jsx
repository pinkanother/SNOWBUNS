import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="bottom-header">
        <nav className="footer-nav">
          <a href="/contact">Contact</a>
          <a href="/terms">Terms</a>
          <a href="/privacy">Privacy</a>
        </nav>
      </div>
      <footer className="main-footer">
        <p>&copy; {new Date().getFullYear()} SNOWBUNS. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Footer;
