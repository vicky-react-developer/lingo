const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

const { createSession, getSessions } = require("../controllers/sessionController");

router.post("/create-session", protect, createSession);
router.get("/get-sessions", protect, getSessions);

module.exports = router;