const express  = require("express");
const router   = express.Router();
const { protect } = require("../middleware/auth");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

// Public routes
router.post("/register",        registerUser);
router.post("/login",           loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password",  resetPassword);

// Protected route (requires valid JWT + active DB session)
router.post("/logout", protect, logoutUser);

module.exports = router;