const express = require("express");
const VideoController = require("../controllers/video.controller");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();
router.post("/upload", upload.single("file"), VideoController.uploadVideo);
router.get("/:id", VideoController.getChannelVideos);
router.put("/:id", VideoController.increaseNum);

module.exports = router;
