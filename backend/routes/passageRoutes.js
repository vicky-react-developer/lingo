const express = require("express");
const router = express.Router();

const { getAllPassages, getPassageById } = require("../controllers/passageController");

router.get("/get-passages", getAllPassages);
router.get("/get-passage/:id", getPassageById);

module.exports = router;