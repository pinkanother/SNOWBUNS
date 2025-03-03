import React from "react";
import "./Country.scss";

const Country = () => {
  return (
    <div className="country">
      <h1 className="country-header">
        <i className="fa fa-globe"></i>&nbsp;Countries
      </h1>
      <div className="country-container">
        <div className="country-section">
          <h2
            className="country-section-title"
            onClick="togglecountry-section(this)"
          >
            <img
              src="IMGES/united-states.png"
              alt="United States Flag"
              className="country-flag-icon"
            />{" "}
            United States
          </h2>
          <div className="country-matches">
            <div className="country-match">
              <span className="country-team">country-team A vs country-team B</span>
              <span className="country-odds">2.5 - 3.1</span>
            </div>
            <div className="country-match">
              <span className="country-team">country-team C vs country-team D</span>
              <span className="country-odds">1.8 - 4.0</span>
            </div>
          </div>
        </div>

        <div className="country-section">
          <h2
            className="country-section-title"
            onClick="togglecountry-section(this)"
          >
            <img
              src="IMGES/russia.png"
              alt="United States Flag"
              className="country-flag-icon"
            />{" "}
            Russia
          </h2>
          <div className="country-matches">
            <div className="country-match">
              <span className="country-team">country-team E vs country-team F</span>
              <span className="country-odds">2.2 - 2.8</span>
            </div>
            <div className="country-match">
              <span className="country-team">country-team G vs country-team H</span>
              <span className="country-odds">3.0 - 2.1</span>
            </div>
          </div>
        </div>

        <div className="country-section">
          <h2
            className="country-section-title"
            onClick="togglecountry-section(this)"
          >
            <img
              src="IMGES/australia.png"
              alt="United States Flag"
              className="country-flag-icon"
            />{" "}
            Australia
          </h2>
          <div className="country-matches">
            <div className="country-match">
              <span className="country-team">country-team A vs country-team B</span>
              <span className="country-odds">2.5 - 3.1</span>
            </div>
            <div className="country-match">
              <span className="country-team">country-team C vs country-team D</span>
              <span className="country-odds">1.8 - 4.0</span>
            </div>
          </div>
        </div>

        <div className="country-section">
          <h2
            className="country-section-title"
            onClick="togglecountry-section(this)"
          >
            <img
              src="IMGES/united-kingdom.png"
              alt="United States Flag"
              className="country-flag-icon"
            />{" "}
            United Kingdom
          </h2>
          <div className="country-matches">
            <div className="country-match">
              <span className="country-team">country-team E vs country-team F</span>
              <span className="country-odds">2.2 - 2.8</span>
            </div>
            <div className="country-match">
              <span className="country-team">country-team G vs country-team H</span>
              <span className="country-odds">3.0 - 2.1</span>
            </div>
          </div>
        </div>

        <div className="country-section">
          <h2
            className="country-section-title"
            onClick="togglecountry-section(this)"
          >
            <img
              src="IMGES/brazil-.png"
              alt="United States Flag"
              className="country-flag-icon"
            />{" "}
            Brazil
          </h2>
          <div className="country-matches">
            <div className="country-match">
              <span className="country-team">country-team A vs country-team B</span>
              <span className="country-odds">2.5 - 3.1</span>
            </div>
            <div className="country-match">
              <span className="country-team">country-team C vs country-team D</span>
              <span className="country-odds">1.8 - 4.0</span>
            </div>
          </div>
        </div>

        <div className="country-section">
          <h2
            className="country-section-title"
            onClick="togglecountry-section(this)"
          >
            <img
              src="IMGES/czech-republic.png"
              alt="United States Flag"
              className="country-flag-icon"
            />{" "}
            Czech Republic
          </h2>
          <div className="country-matches">
            <div className="country-match">
              <span className="country-team">country-team E vs country-team F</span>
              <span className="country-odds">2.2 - 2.8</span>
            </div>
            <div className="country-match">
              <span className="country-team">country-team G vs country-team H</span>
              <span className="country-odds">3.0 - 2.1</span>
            </div>
          </div>
        </div>

        <div className="country-section">
          <h2
            className="country-section-title"
            onClick="togglecountry-section(this)"
          >
            <img
              src="IMGES/hungary.png"
              alt="United States Flag"
              className="country-flag-icon"
            />{" "}
            Hungary
          </h2>
          <div className="country-matches">
            <div className="country-match">
              <span className="country-team">country-team A vs country-team B</span>
              <span className="country-odds">2.5 - 3.1</span>
            </div>
            <div className="country-match">
              <span className="country-team">country-team C vs country-team D</span>
              <span className="country-odds">1.8 - 4.0</span>
            </div>
          </div>
        </div>

        <div className="country-section">
          <h2
            className="country-section-title"
            onClick="togglecountry-section(this)"
          >
            <img
              src="IMGES/romania.png"
              alt="United States Flag"
              className="country-flag-icon"
            />{" "}
            Romania
          </h2>
          <div className="country-matches">
            <div className="country-match">
              <span className="country-team">Ema Karter</span>
              <span className="country-odds">Rank 17</span>
            </div>
            <div className="country-match">
              <span className="country-team">country-team G vs country-team H</span>
              <span className="country-odds">Rank 17</span>
            </div>
          </div>
        </div>

        <div className="country-section">
          <h2
            className="country-section-title"
            onClick="togglecountry-section(this)"
          >
            <img
              src="IMGES/canada.png"
              alt="United States Flag"
              className="country-flag-icon"
            />{" "}
            Canada
          </h2>
          <div className="country-matches">
            <div className="country-match">
              <span className="country-team">Ema Karter</span>
              <span className="country-odds">17</span>
            </div>
            <div className="country-match">
              <span className="country-team">country-team C vs country-team D</span>
              <span className="country-odds">1.8 - 4.0</span>
            </div>
          </div>
        </div>

        <div className="country-section">
          <h2
            className="country-section-title"
            onClick="togglecountry-section(this)"
          >
            <img
              src="IMGES/colombia.png"
              alt="United States Flag"
              className="country-flag-icon"
            />{" "}
            Colombia
          </h2>
          <div className="country-matches">
            <div className="country-match">
              <span className="country-team">country-team E vs country-team F</span>
              <span className="country-odds">2.2 - 2.8</span>
            </div>
            <div className="country-match">
              <span className="country-team">country-team G vs country-team H</span>
              <span className="country-odds">3.0 - 2.1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Country;
