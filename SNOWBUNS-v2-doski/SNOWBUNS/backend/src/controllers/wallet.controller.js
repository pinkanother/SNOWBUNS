const UserModel = require("../models/user.model");
const apiResponse = require("../helpers/apiResponse");
const axios = require("axios");

exports.getWalletBalance = async (req, res) => {
    try {
        const _id = req.userId;

        const user = await UserModel.findOne({ _id: _id });

        if (!user) {
            return apiResponse.notFoundResponse(res, "User not found");
        }

        // Convert Decimal128 to a regular number
        const walletBalance = parseFloat(user.walletBalance.toString());
        console.log(walletBalance);
        return apiResponse.successResponseWithData(res, "Wallet balance retrieved successfully", { walletBalance });
    } catch (err) {
        console.error("Wallet balance gathering error:", err);
        return apiResponse.ErrorResponse(res, err.message || "Internal Server Error");
    }
};

exports.invoiceNowPayment = async (req, res) => {
    try {
      const { amount, coin } = req.body; // Retrieve amount and coin from the request body
      const _id = req.userId; // Retrieve user ID from the request
  
      // Validate the amount
      const amountRegex = /^\d+\.\d{2}$/; // Matches 0.00 format
      if (!amountRegex.test(amount)) {
        return apiResponse.ErrorResponse(res, "Amount must be in the format 0.00.");
      }
  
      const amountNumber = parseFloat(amount);
      if (amountNumber < 5) {
        return apiResponse.ErrorResponse(res, "Minimum amount is $5.00.");
      }
  
      // Validate the coin
      const validCoins = ["SOL", "ETH", "BTC", "USDT", "TRX", "XMR"];
      if (!validCoins.includes(coin.toUpperCase())) {
        return apiResponse.ErrorResponse(
          res,
          "Invalid coin. Supported coins: SOL, ETH, BTC, USDT, TRX, XMR."
        );
      }
  
      const API_KEY = process.env.NOWPAYMENTS_API_KEY;
      const orderId = `user_${_id}_order_${Date.now()}`; // Unique order ID with user ID
  
      const payload = {
        price_amount: amountNumber, // Amount in USD
        price_currency: "usd", // Fiat currency
        pay_currency: coin.toLowerCase(), // Cryptocurrency
        ipn_callback_url: `${process.env.WEBSITE_URL}/api/callback/nowpayments`, // Callback URL
        order_id: orderId, // Unique order ID with user ID
        order_description: `Wallet top-up for user ${_id}`, // Order description
      };
      console.log(payload.ipn_callback_url);
      // Call NOWPayments API to create an invoice
      const response = await axios.post(process.env.NOWPAYMENTS_URL, payload, {
        headers: {
          "x-api-key": API_KEY,
          "Content-Type": "application/json",
        },
      });
      console.log("NOWPAYMENT invoice response:", response.data);
      // Return the payment URL to the frontend
      return apiResponse.successResponseWithData(res, "Payment invoice created.", {
        paymentUrl: response.data.invoice_url,
      });
    } catch (error) {
      console.error("NOWPAYMENT invoice error:", error);
      return apiResponse.ErrorResponse(
        res,
        error.response?.data?.message || error.message || "Internal Server Error"
      );
    }
  };

  exports.withdrawBalance = async (req, res) => {
      

  }