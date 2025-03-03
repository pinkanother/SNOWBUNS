const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref:"User" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    views: { type: Number, default: 0 },
    thumbnail: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", VideoSchema);
