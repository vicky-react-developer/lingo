const express = require("express");
const router = express.Router();
const { createSession, getSessions } = require("../controllers/sessionController");
const { protect } = require("../middleware/auth");

router.post("/create-session", protect, createSession);
router.get("/get-sessions", protect, getSessions);

module.exports = router;