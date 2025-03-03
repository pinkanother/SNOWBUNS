import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ForgotPassword.scss";

const ForgotPassword = () => {
  const navigate = useNavigate();

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h1>Forgot Password</h1>
        <div className="input-group">
          <input
            type="email"
            placeholder="Enter your email"
            className="email-input"
          />
        </div>
        <div className="button-container">
          <Link to="/login" className="back-link">
            Back
          </Link>
          <button
            className="send-button"
            onClick={() => {
              navigate("/reset-password");
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
