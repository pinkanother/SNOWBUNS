import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaypal, faBitcoin } from "@fortawesome/free-brands-svg-icons";
import {
  faWallet,
  faCreditCard,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import "./Purchase.scss";

const Purchase = ({ sidebar, setSidebar }) => {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (modalType) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="purchase-wrapper">
      <div className="purchase-container">
        <h2 className="purchase-title">Choose Your Payment Method</h2>
        <div className="payment-buttons">
          <button
            className="purchase-button"
            onClick={() => openModal("paypal")}
          >
            <FontAwesomeIcon icon={faPaypal} />
            <span>Pay with PayPal</span>
          </button>
          <button
            className="purchase-button"
            onClick={() => openModal("wallet")}
          >
            <FontAwesomeIcon icon={faWallet} />
            <span>Pay with Wallet Balance</span>
          </button>
          <button
            className="purchase-button"
            onClick={() => openModal("crypto")}
          >
            <FontAwesomeIcon icon={faBitcoin} />
            <span>Pay with Cryptocurrency</span>
          </button>
          <button
            className="purchase-button"
            onClick={() => openModal("credit-card")}
          >
            <FontAwesomeIcon icon={faCreditCard} />
            <span>Pay with Credit Card</span>
          </button>
        </div>
      </div>

      {/* Payment Modals */}
      {activeModal === "paypal" && (
        <div className={`modal-overlay ${sidebar ? "small" : "long"}`}>
          <div className="modal">
            <button className="close-button" onClick={closeModal}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <div className="modal-content">
              <h3 className="modal-content-item">Pay with PayPal</h3>
              <p className="modal-content-item">
                Click the button below to proceed with PayPal payment.
              </p>
              <a
                href="https://www.paypal.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="pay-button"
              >
                Pay with PayPal
              </a>
            </div>
          </div>
        </div>
      )}

      {activeModal === "wallet" && (
        <div className={`modal-overlay ${sidebar ? "small" : "long"}`}>
          <div className="modal">
            <button className="close-button" onClick={closeModal}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <div className="modal-content">
              <h3 className="modal-content-item">Pay with Wallet</h3>
              <div className="wallet-info">
                <span>Balance: $100</span>
                <span>Price: $20</span>
              </div>
              <button className="pay-button">Confirm Payment</button>
            </div>
          </div>
        </div>
      )}

      {activeModal === "crypto" && (
        <div className={`modal-overlay ${sidebar ? "small" : "long"}`}>
          <div className="modal">
            <button className="close-button" onClick={closeModal}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <div className="modal-content">
              <h3 className="modal-content-item">Pay with Cryptocurrency</h3>
              <p className="modal-content-item">Coming Soon...</p>
            </div>
          </div>
        </div>
      )}

      {activeModal === "credit-card" && (
        <div className={`modal-overlay ${sidebar ? "small" : "long"}`}>
          <div className="modal">
            <button className="close-button" onClick={closeModal}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <div className="modal-content">
              <h3 className="modal-content-item">Pay with Credit Card</h3>
              <div className="credit-card-form">
                <input type="text" placeholder="Card Number" />
                <input type="text" placeholder="Expiration Date (MM/YY)" />
                <input type="number" placeholder="CVC" />
                <button className="pay-button">Pay Now</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Purchase;
