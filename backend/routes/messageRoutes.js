const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

const { saveMessage, initiateCoversation, getAllMessages } = require("../controllers/messagesController");

router.post("/save-message", protect, saveMessage);
router.post("/initiate-conversation", protect, initiateCoversation);
router.get("/get-all-messages/:sessionId", protect, getAllMessages);

module.exports = router;