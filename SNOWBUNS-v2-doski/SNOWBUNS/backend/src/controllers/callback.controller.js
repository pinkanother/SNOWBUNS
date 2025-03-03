const UserModel = require("../models/user.model");
const mongoose = require("mongoose");
   
 
exports.nowpaymentsCallback = async (req, res) => {
    const { payment_id, order_id, payment_status, price_amount } = req.body;
  
    try {
      // Extract userId from order_id
      const userId = order_id.split("_")[1]; // Assuming order_id is "user_12345_order_67890"
      console.log(payment_status);
      if (payment_status === "finished") {

        // Payment is completed
        console.log(`Payment completed for user ${userId}:`);
        console.log(`Amount: ${price_amount} USD`);
  
        // Update the user's balance in your database
        await updateUserBalance(userId, price_amount);
    
        // Send a success response to NOWPayments
        res.status(200).send("OK");
      } else {
        // Payment is not completed (e.g., pending, expired, etc.)
        console.log(`Payment status for user ${userId}: ${payment_status}`);
        res.status(200).send("OK"); // Still respond with 200 to acknowledge the callback
      }
    } catch (error) {
      console.error("Error processing IPN callback:", error);
      res.status(500).send("Internal Server Error");
    }
  };



  const updateUserBalance = async (userId, amount) => {
    try {
      // Find the user by _id
      const user = await UserModel.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
  
      // Convert the current walletBalance to a number
      const currentBalance = parseFloat(user.walletBalance.toString());
  
      // Calculate the new balance
      const newBalance = currentBalance + parseFloat(amount);
  
      // Update the walletBalance field (convert back to Decimal128)
      user.walletBalance = mongoose.Types.Decimal128.fromString(newBalance.toFixed(2));
  
      // Save the updated user document
      await user.save();
  
      console.log(`Updated balance for user ${userId}: ${newBalance.toFixed(2)}`);
    } catch (error) {
      console.error("Error updating user balance:", error);
      throw error;
    }
  };