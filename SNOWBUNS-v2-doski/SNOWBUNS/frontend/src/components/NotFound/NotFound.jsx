import React from "react";
import "./NotFound.scss";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="glitch-wrapper">
        <div className="glitch" data-text="404">
          404
        </div>
      </div>
      <h2 className="not-found-title">Page Not Found</h2>
      <p className="not-found-text">
        The page you're looking for has vanished into the digital void.
      </p>
      <a href="/" className="home-button">
        Return to Home
      </a>
    </div>
  );
};

export default NotFound;
