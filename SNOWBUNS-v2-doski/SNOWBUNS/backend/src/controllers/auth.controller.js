const UserModel = require("../models/user.model");
const { body, validationResult } = require("express-validator");
const fs = require('fs');
const psth = require('path');
const apiResponse = require("../helpers/apiResponse");
const utility = require("../helpers/utility");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailer = require("../helpers/mailer");
const { constants } = require("../helpers/constants");

function convertToBase64(file) {
  return file.buffer.toString("base64"); // Convert buffer to Base64
}
/**
 * User registration.
 *
 * @param {string} email
 * @param {string} password
 * @returns {Object}
 */



exports.register = [
  // Validate and sanitize fields.
  body("email")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Email must be specified.")
    .isEmail()
    .withMessage("Email must be a valid email address.")
    .custom(async (value) => {
      const user = await UserModel.findOne({ email: value });
      if (user) {
        throw new Error("E-mail already in use");
      }
    }),
  body("password")
    .isLength({ min: 6 })
    .trim()
    .withMessage("Password must be 6 characters or greater."),
  body("channelName")
    .isLength({ min: 1 })
    .trim()
    .withMessage("ChannelName must be 1 characters or greater."),
  body("aboutChannel")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Channel description must be 1 characters or greater."),
  body("email").escape(),
  body("password").escape(),
  body("channelName").escape(),
  body("aboutChannel").escape(),

  async (req, res) => {
    try {
      // Validate request.
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
      }

      // Hash password and generate OTP.
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const otp = utility.randomNumber(4);

      // Create user object.
      const user = new UserModel({
        email: req.body.email,
        password: hashedPassword,
        channelName: req.body.channelName,
        aboutChannel: req.body.aboutChannel,
        confirmOTP: otp,
      });

      // Prepare and send confirmation email.
      const html = `<p>Please Confirm your Account.</p><p>OTP: ${otp}</p>`;
      await mailer.sendMail(constants.confirmEmails.from, req.body.email, "Confirm Account", html);

      // Save user to the database.
      await user.save();

      // Return success response.
      const userData = {
        _id: user._id,
        email: user.email,
      };
      return apiResponse.successResponseWithData(res, "Registration Success.", userData);
    } catch (err) {
      console.error("Registration Error:", err);
      return apiResponse.ErrorResponse(res, err.message || "Internal Server Error");
    }
  },
];

/**
 * User login.
 *
 * @param {string} email
 * @param {string} password
 * @returns {Object}
 */
exports.login = [
  // Validate and sanitize fields.
  body("email")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Email must be specified.")
    .isEmail()
    .withMessage("Email must be a valid email address."),
  body("password")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Password must be specified."),
  body("email").escape(),
  body("password").escape(),

  async (req, res) => {
    try {
      // Validate request.
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
      }

      // Find user by email.
      const user = await UserModel.findOne({ email: req.body.email });
      if (!user) {
        return apiResponse.unauthorizedResponse(res, "Account doesn't exist");
      }

      // Compare passwords.
      const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
      if (!isPasswordValid) {
        return apiResponse.unauthorizedResponse(res, "Email or Password wrong.");
      }

      // Check if account is confirmed.
      if (!user.isConfirmed) {
        return apiResponse.unauthorizedResponse(res, "Account is not confirmed. Please confirm your account.");
      }

      // Check if account is active.
      if (!user.status) {
        return apiResponse.unauthorizedResponse(res, "Account is not active. Please contact admin.");
      }

      // Generate JWT token.
      const userData = {
        _id: user._id,
        email: user.email,
      };
      const token = jwt.sign(userData, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_TIMEOUT_DURATION,
      });
      console.log(process.env.JWT_TIMEOUT_DURATION);
      // Return success response with token.
      return apiResponse.successResponseWithData(res, "Login Successfully", { user: userData, token});
    } catch (err) {
      console.error("Login Error:", err);
      return apiResponse.ErrorResponse(res, err.message || "Internal Server Error");
    }
  },
];

/**
 * Verify confirmation OTP.
 *
 * @param {string} email
 * @param {string} otp
 * @returns {Object}
 */
exports.verifyConfirm = [
  // Validate and sanitize fields.
  body("email")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Email must be specified.")
    .isEmail()
    .withMessage("Email must be a valid email address."),
  body("otp")
    .isLength({ min: 1 })
    .trim()
    .withMessage("OTP must be specified."),
  body("email").escape(),
  body("otp").escape(),

  async (req, res) => {
    try {
      // Validate request.
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
      }

      // Find user by email.
      const user = await UserModel.findOne({ email: req.body.email });
      if (!user) {
        return apiResponse.unauthorizedResponse(res, "Specified email not found.");
      }

      // Check if account is already confirmed.
      if (user.isConfirmed) {
        return apiResponse.unauthorizedResponse(res, "Account already confirmed.");
      }

      // Verify OTP.
      if (user.confirmOTP !== req.body.otp) {
        return apiResponse.unauthorizedResponse(res, "OTP does not match.");
      }

      // Update user as confirmed.
      user.isConfirmed = true;
      user.confirmOTP = null;
      await user.save();

      // Return success response.
      return apiResponse.successResponse(res, "Account confirmed successfully.");
    } catch (err) {
      console.error("Verify Confirm Error:", err);
      return apiResponse.ErrorResponse(res, err.message || "Internal Server Error");
    }
  },
];

/**
 * Resend confirmation OTP.
 *
 * @param {string} email
 * @returns {Object}
 */
exports.resendConfirmOtp = [
  // Validate and sanitize fields.
  body("email")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Email must be specified.")
    .isEmail()
    .withMessage("Email must be a valid email address."),
  body("email").escape(),

  async (req, res) => {
    try {
      // Validate request.
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
      }

      // Find user by email.
      const user = await UserModel.findOne({ email: req.body.email });
      if (!user) {
        return apiResponse.unauthorizedResponse(res, "Specified email not found.");
      }

      // Check if account is already confirmed.
      if (user.isConfirmed) {
        return apiResponse.unauthorizedResponse(res, "Account already confirmed.");
      }

      // Generate new OTP.
      const otp = utility.randomNumber(4);
      user.confirmOTP = otp;
      await user.save();

      // Prepare and send confirmation email.
      const html = `<p>Please Confirm your Account.</p><p>OTP: ${otp}</p>`;
      await mailer.sendMail(constants.confirmEmails.from, req.body.email, "Confirm Account", html);

      // Return success response.
      return apiResponse.successResponse(res, "Confirm OTP sent.");
    } catch (err) {
      console.error("Resend Confirm OTP Error:", err);
      return apiResponse.ErrorResponse(res, err.message || "Internal Server Error");
    }
  },
];

exports.allUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    return apiResponse.successResponseWithData(res, "Users fetched successfully", users);
  } catch (err) {
    console.error("Fetch Error:", err);
    return apiResponse.ErrorResponse(res, "Failed to fetch users");
  }
};

exports.getUser = async (req, res) => {
  try {
    const users = await UserModel.find();
    return apiResponse.successResponseWithData(res, "Users fetched successfully", users);
  } catch (err) {
    console.error("Fetch Error:", err);
    return apiResponse.ErrorResponse(res, "Failed to fetch users");
  }
};

exports.updateUser = async (req, res) => {
  try {
    const {
      channelName,
      aboutChannel,
      subscriptionPrice,
      subscriptionType,
      country,
    } = req.body;    

    const updateData = {
      $set: {
        channelName: channelName,
        aboutChannel: aboutChannel,
        subscriptionPrice: subscriptionPrice,
        subscriptionType: subscriptionType,
        country: country,
        profileImage: req.files?.profileImage? convertToBase64(req.files.profileImage[0]) : null,
        bannerImage: req.files?.bannerImage? convertToBase64(req.files.bannerImage[0]) : null,
      }
    }
    console.log(req.user);
    await UserModel.updateOne({ _id: req.user._id }, updateData);
    return apiResponse.successResponseWithData(res, "User updated successfully", updateData);
  } catch (err) {
    console.error("Fetch Error:", err);
    return apiResponse.ErrorResponse(res, "Failed to fetch users");
  }
};