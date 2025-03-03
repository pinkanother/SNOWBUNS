const express = require("express");
const AuthController = require("../controllers/auth.controller");
const auth = require('../middlewares/jwt');
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/verify-otp", AuthController.verifyConfirm);
router.post("/resend-verify-otp", AuthController.resendConfirmOtp);
router.get("/", AuthController.allUsers);
router.put(
    "/",
    auth,
    upload.fields([
        { name: "bannerImage", maxCount: 1 },
        { name: "profileImage", maxCount: 1 },
    ]),
    AuthController.updateUser
);

module.exports = router;
