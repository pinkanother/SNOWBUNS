const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const path = require('path');
const { v4: uuidv4 } = require("uuid");
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath("C:/ffmpeg/bin/ffmpeg.exe");
const Video = require('../models/video.model');
const apiResponse = require("../helpers/apiResponse");
const { findOne } = require("../models/user.model");

const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

exports.uploadVideo = async (req, res) => {
  try {
    console.log(req.file);
    const { _id } = req.user;
    const { title, description } = req.body;
    const file = req.file;

    if (!file) return apiResponse.ErrorResponse(res, "No video uploaded");

    const uploadDir = path.join(__dirname, "../../uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    const fileName = `${uuidv4()}-${file.originalname}`;
    const filePath = path.join(uploadDir, fileName);

    fs.writeFileSync(filePath, file.buffer);

    const thumbnailName = `${uuidv4()}-thumbnail.jpg`;
    const thumbnailPath = path.join(uploadDir, thumbnailName);
    await new Promise((resolve, reject) => {
      ffmpeg(filePath)
        .screenshots({ timestamps: [1], filename: path.basename(thumbnailPath), folder: "uploads", size: "320x240" })
        .on("end", resolve)
        .on("error", reject);
    });

    const thumbnailBase64 = fs.readFileSync(thumbnailPath, { encoding: "base64" });

    const uploadParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: fileName,
      Body: fs.readFileSync(filePath),
      ContentType: file.mimetype,
    };
    await s3.send(new PutObjectCommand(uploadParams));

    const videoUrl = `${process.env.R2_ENDPOINT}/${process.env.BUCKET_NAME}/${fileName}`;
    const newVideo = new Video({ user: _id, url: videoUrl, thumbnail: thumbnailBase64, title: title, description: description });
    await newVideo.save();

    fs.unlinkSync(filePath);
    fs.unlinkSync(thumbnailPath);

    return apiResponse.successResponseWithData(res, "Video uploaded successfully", { videoUrl });
  } catch (err) {
    console.error("Upload Error:", err);
    return apiResponse.ErrorResponse(res, "Upload Failed");
  }
};

// exports.getVideos = async (req, res) => {
//   try {
//     const videos = await Video.find({ user: req.user._id });
//     return apiResponse.successResponseWithData(res, "Videos fetched successfully", videos);
//   } catch (err) {
//     console.error("Fetch Error:", err);
//     return apiResponse.ErrorResponse(res, "Failed to fetch videos");
//   }
// };

exports.getChannelVideos = async (req, res) => {
  try {
    const videos = await Video.find({ user: req.params.id }).populate("user");
    return apiResponse.successResponseWithData(res, "Videos fetched successfully", videos);
  } catch (err) {
    console.error("Fetch Error:", err);
    return apiResponse.ErrorResponse(res, "Failed to fetch videos");
  }
};

exports.increaseNum = async (req, res) => {
  try {
    const video = await Video.findOne({ _id: req.params.id });
    const update = { $set: { views: video.views + 1 } }
    await Video.updateOne({ _id: video._id }, update);
    return apiResponse.successResponseWithData(res, "views has increased", video);
  } catch (err) {
    console.error("Fetch Error:", err);
    return apiResponse.ErrorResponse(res, "Failed to fetch videos");
  }
};
