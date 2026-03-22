const express = require("express");
const router = express.Router();

const { getAllTopics, getTopicById } = require("../controllers/topicController");

router.get("/get-topics", getAllTopics);
router.get("/get-topic/:id", getTopicById);

module.exports = router;