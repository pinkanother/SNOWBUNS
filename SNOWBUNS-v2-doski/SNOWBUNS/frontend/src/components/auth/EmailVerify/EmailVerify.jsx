import React, { useState } from "react";
import "./EmailVerify.scss";

const EmailVerify = () => {
  const [verificationCode, setVerificationCode] = useState("");

  return (
    <div className="email-verify-container">
      <div className="verify-card">
        <h1 className="verify-title">Email Verify</h1>
        <input
          type="text"
          className="verify-input"
          placeholder="Enter verification code"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
        />
        <div className="verify-actions">
          <div className="resend-link">Resend</div>
          <button className="verify-button">Verify</button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerify;
