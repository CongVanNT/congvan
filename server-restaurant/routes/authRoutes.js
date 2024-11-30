const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../utils/upload-file");
const upload = multer({ storage: storage });

const {
  Login,
  Register,
  RefreshToken,
  ResetPassword,
} = require("../controllers/authControllers");

// đăng nhập
router.post("/login", Login);

// đăng ký
router.post("/register", upload.single("image"), Register);

// refresh token
router.post("/refresh-token", RefreshToken);

// forget password
router.post("/forget-password", ResetPassword);

module.exports = router;
