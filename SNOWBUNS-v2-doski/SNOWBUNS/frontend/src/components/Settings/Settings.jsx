import React, { useState } from "react";
import "./Settings.scss";

const Setting = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    country: "",
    language: "",
    support: "",
    creatorCode: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Settings saved:", formData);
  };

  return (
    <div className="settings-page">
      <div className="settings-container">
        <h1 className="settings-title">
          <i className="fa fa-cog"></i>&nbsp;Settings
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="settings-grid">
            <div className="setting-section">
              <label htmlFor="email" className="setting-label">
                <span className="label-icon">📧</span>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="setting-input"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="setting-section">
              <label htmlFor="password" className="setting-label">
                <span className="label-icon">🔒</span>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="setting-input"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="setting-section">
              <label htmlFor="country" className="setting-label">
                <span className="label-icon">🌎</span>
                Country
              </label>
              <select
                id="country"
                name="country"
                className="setting-select"
                value={formData.country}
                onChange={handleChange}
              >
                <option value="">Select your country</option>
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="ca">Canada</option>
                <option value="au">Australia</option>
                <option value="jp">Japan</option>
              </select>
            </div>

            <div className="setting-section">
              <label htmlFor="language" className="setting-label">
                <span className="label-icon">🌐</span>
                Language
              </label>
              <select
                id="language"
                name="language"
                className="setting-select"
                value={formData.language}
                onChange={handleChange}
              >
                <option value="">Select your language</option>
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="jp">Japanese</option>
              </select>
            </div>

            <div className="setting-section">
              <label htmlFor="support" className="setting-label">
                <span className="label-icon">💬</span>
                Support
              </label>
              <input
                type="text"
                id="support"
                name="support"
                className="setting-input"
                placeholder="Enter your support code"
                value={formData.support}
                onChange={handleChange}
              />
            </div>

            <div className="setting-section">
              <label htmlFor="creator-code" className="setting-label">
                <span className="label-icon">⭐</span>
                Creator Code
              </label>
              <input
                type="text"
                id="creator-code"
                name="creatorCode"
                className="setting-input"
                placeholder="Enter your creator code"
                value={formData.creatorCode}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="save-button">
            Save Settings
          </button>
        </form>
      </div>
    </div>
  );
};

export default Setting;
