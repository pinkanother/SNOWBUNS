const express = require("express");
const WalletController = require("../controllers/wallet.controller"); // Adjust path if needed
const router = express.Router();

router.get("/balance", WalletController.getWalletBalance);
router.post("/balance/add", WalletController.invoiceNowPayment);
router.post("/balance/withdraw", WalletController.withdrawBalance);
module.exports = router;

