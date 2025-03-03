const express = require("express");
const authRouter = require("./auth.route");
const videoRouter = require("./video.route");
const walletRouter = require("./wallet.route");
const callbackRouter = require("./callback.route");
const app = express();
const auth = require('../middlewares/jwt');

app.use("/auth/", authRouter);
app.use("/video/", auth, videoRouter);
app.use("/wallet/", auth, walletRouter);
app.use("/callback/", auth, callbackRouter);
module.exports = app;
 