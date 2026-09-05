const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../../middleware/auth");
const studentRoutes = require("./studentRoutes")
const userRoutes = require("./userRoutes")

router.use(protect);
router.use(authorize("Admin"));

router.use("/students", studentRoutes);
router.use("/users", userRoutes);

module.exports = router;