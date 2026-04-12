const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

const { getOneUser } = require("../controllers/userController");

router.get("/get-one-user", protect, getOneUser);

module.exports = router;