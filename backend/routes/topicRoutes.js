const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

const { getAllTopics, getTopicById } = require("../controllers/topicController");

router.get("/get-topics", protect, getAllTopics);
router.get("/get-topic/:id", protect, getTopicById);

module.exports = router;