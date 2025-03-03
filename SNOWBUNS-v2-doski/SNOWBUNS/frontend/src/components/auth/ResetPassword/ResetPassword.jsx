import React from "react";
import { Link } from "react-router-dom";
import "./ResetPassword.scss";

const ResetPassword = () => {
  return (
    <div className="reset-password-container">
      <div className="reset-password-card">
        <h1 className="reset-password-title">Reset Password</h1>

        <div className="password-input-group">
          <div className="input-field">
            <label>New Password</label>
            <input type="password" placeholder="Enter new password" />
          </div>

          <div className="input-field">
            <label>Confirm Password</label>
            <input type="password" placeholder="Confirm new password" />
          </div>
        </div>

        <div className="action-buttons">
          <Link to="/forgot-password" className="back-link">
            Back
          </Link>
          <button className="submit-button">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
