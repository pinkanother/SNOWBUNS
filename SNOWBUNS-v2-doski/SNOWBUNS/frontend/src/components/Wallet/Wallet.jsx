import { useState, useEffect } from "react";
import { getWalletBalance, addMoneyToWallet } from "../../actions/walletAction"; // Import actions
import "./Wallet.scss";

const Wallet = () => {
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingMoney, setIsAddingMoney] = useState(false); // State to control the amount prompt modal
  const [amount, setAmount] = useState(""); // State to store the amount entered by the user
  const [selectedCrypto, setSelectedCrypto] = useState(""); // State to store the selected cryptocurrency
  const [error, setError] = useState(""); // State to handle errors

  // Cryptocurrency options
  const cryptoOptions = ["SOL", "ETH", "BTC", "USDT", "TRX", "XMR"];

  // Function to fetch balance
  const fetchBalance = async () => {
    try {
      const balance = await getWalletBalance();
      setBalance(balance);
    } catch (error) {
      console.error("Failed to fetch wallet balance:", error);
    }
  };

  // Fetch balance on mount and set up polling
  useEffect(() => {
    fetchBalance(); // Fetch balance immediately on mount

    const interval = setInterval(() => {
      fetchBalance(); // Fetch balance every 5 seconds
    }, 5000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  // Handle adding money
  const handleAddMoney = async () => {
    if (!amount || isNaN(amount)) {
      setError("Please enter a valid amount.");
      return;
    }

    if (!selectedCrypto) {
      setError("Please select a cryptocurrency.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await addMoneyToWallet(parseFloat(amount).toFixed(2), selectedCrypto); // Pass the amount and selected crypto to the action
      //window.location.href = response; // Open the payment link in current tab
      window.open(response, "_blank"); // Open the payment link in a new tab
      setIsAddingMoney(false); // Close the modal after successful addition
      setAmount(""); // Reset the amount input
      setSelectedCrypto(""); // Reset the selected cryptocurrency
    } catch (error) {
      console.error("Failed to add money:", error);
      setError("Failed to add money. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="wallet-container">
      <div className="balance-card">
        <h2>Wallet Balance</h2>
        <h1>${balance.toFixed(2)}</h1>
      </div>

      <button
        className="add-money-button"
        onClick={() => setIsAddingMoney(true)} // Open the amount prompt modal
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Add Funds with Crypto"}
      </button>

      {/* Amount Prompt Modal */}
      {isAddingMoney && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add Funds</h3>
            <input
              type="number"
              placeholder="Enter amount (USD)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className="crypto-options">
              {cryptoOptions.map((crypto) => (
                <button
                  key={crypto}
                  className={`crypto-button ${selectedCrypto === crypto ? "selected" : ""}`}
                  onClick={() => setSelectedCrypto(crypto)}
                >
                  {crypto}
                </button>
              ))}
            </div>
            {error && <p className="error-message">{error}</p>}
            <div className="modal-buttons">
              <button
                className="confirm-button"
                onClick={handleAddMoney}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Confirm"}
              </button>
              <button
                className="cancel-button"
                onClick={() => {
                  setIsAddingMoney(false);
                  setAmount("");
                  setSelectedCrypto("");
                  setError("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        className="withdraw-money-button"
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Withdraw funds from Wallet"}
      </button>
    </div>
  );
};

export default Wallet;