const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

const { getAllPassages, getPassageById, submitPassageTranslation } = require("../controllers/passageController");

router.get("/get-passages", protect, getAllPassages);
router.get("/get-passage/:id", protect, getPassageById);
router.post("/submit-passage-translation",protect, submitPassageTranslation);

module.exports = router;