const express = require("express");
const router = express.Router();
const { saveMessage, initiateCoversation, getAllMessages } = require("../controllers/messagesController");
const { protect } = require("../middleware/auth");

router.post("/save-message", protect, saveMessage);
router.post("/initiate-conversation", protect, initiateCoversation);
router.get("/get-all-messages/:sessionId", protect, getAllMessages);

module.exports = router;