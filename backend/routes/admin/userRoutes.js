const express = require("express");
const router = express.Router();
const { updateUserStatus } = require("../../controllers/admin/adminUserController")

router.patch("/:userId/update-status", updateUserStatus);

module.exports = router;