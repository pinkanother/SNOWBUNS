import React from "react";
import "./SignNav.scss";

const SignNav = () => {
  return (
    <header className="sign-navbar">
      <div className="sign-navbar-brand">
        <h2 className="logo">
          <i className="fa fa-asterisk"></i>&nbsp;
          <span className="nav-text">SNOWBUNS</span>
        </h2>
      </div>
    </header>
  );
};

export default SignNav;
