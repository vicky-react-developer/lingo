const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
    getTasks,
    getTaskQuestions
} = require("../controllers/foundationTaskController");

router.get("/get-tasks/:type", getTasks);
router.get("/get-task-questions/:taskId", getTaskQuestions);

module.exports = router;