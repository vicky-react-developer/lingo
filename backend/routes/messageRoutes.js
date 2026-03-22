const express = require("express");
const router = express.Router();
const { saveMessage } = require("../controllers/messagesController");

router.post("/save-message", saveMessage);

module.exports = router;