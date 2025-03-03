const mongoose = require("mongoose");
const { Decimal128 } = mongoose.Schema.Types;
const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    channelName: { type: String, required: true },
    aboutChannel: { type: String, required: true },
    subscriptionPrice: { type: Number },
    subscriptionType: { type: String },
    profileImage: { type: String },
    bannerImage: { type: String },
    country: { type: String },
    isConfirmed: { type: Boolean, required: true, default: 1 },
    confirmOTP: { type: String, required: false },
    status: { type: Boolean, required: true, default: 1 },
    walletBalance: {type: Decimal128, required: true, default: 0.00 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
