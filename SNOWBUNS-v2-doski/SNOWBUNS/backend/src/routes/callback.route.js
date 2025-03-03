const express = require("express");
const router = express.Router();
const CallbackController = require("../controllers/callback.controller");
module.exports = router;

router.post("/nowpayments", CallbackController.nowpaymentsCallback)