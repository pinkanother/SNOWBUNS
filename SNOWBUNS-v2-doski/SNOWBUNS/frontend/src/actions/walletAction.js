import apiBase from "../helpers/apiBase";

// Function to get wallet balance
export const getWalletBalance = async () => {
  const token = localStorage.getItem("token");
  console.log(token);
  if (!token) {
    throw new Error("No token found, user might not be logged in.");
  }

  try {
    const response = await apiBase.get("/api/wallet/balance", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data.walletBalance; // Correctly access walletBalance
  } catch (error) {
    console.error("Error fetching wallet balance:", error.response?.data || error.message);
    throw error;
  }
};


export const addMoneyToWallet = async (amount, coin) => {
    console.log(amount, coin);
    try {
      // Validate the amount
      const amountRegex = /^\d+\.\d{2}$/; // Matches 0.00 format
      if (!amountRegex.test(amount)) {
        throw new Error("Amount must be in the format 0.00." );
      }
  
      const amountNumber = parseFloat(amount);
      if (amountNumber < 5) {
        throw new Error("Minimum amount is $5.00.");
      }
  
      // Validate the coin
      const validCoins = ["SOL", "ETH", "BTC", "USDT", "TRX", "XMR"];
      if (!validCoins.includes(coin.toUpperCase())) {
        throw new Error("Invalid coin. Supported coins: SOL, ETH, BTC, USDT, TRX, XMR.");
      }
  
      // Get the token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found, user might not be logged in.");
      }
  
      // Send the request to your backend API
      const response = await apiBase.post(
        "/api/wallet/balance/add",
        {
          amount: amount,
          coin: coin.toUpperCase(),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      // Check if the response is successful
      if (response.data && response.data.data.paymentUrl) {
        return response.data.data.paymentUrl; // Return the payment URL
      } else {
        throw new Error("Failed to create payment. No payment URL received.");
      }
    } catch (error) {
      console.error("Error adding money to wallet:", error.response?.data || error.message);
      throw error;
    }
  };