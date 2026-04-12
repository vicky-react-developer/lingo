const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

const { getAllPassages, getPassageById } = require("../controllers/passageController");

router.get("/get-passages", protect, getAllPassages);
router.get("/get-passage/:id", protect, getPassageById);

module.exports = router;