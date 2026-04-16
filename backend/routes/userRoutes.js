const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

const { getOneUser, updateUserProfile, changePassword } = require("../controllers/userController");

router.get("/get-one-user", protect, getOneUser);
router.put("/update-profile", protect, updateUserProfile);
router.put("/change-password", protect, changePassword);

module.exports = router;