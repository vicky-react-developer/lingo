const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
    getTasks,
    getTamilSentences,
    submitTamilTranslation,
    getWordTasks,
    submitWordTask
} = require("../controllers/foundationTaskController");

router.get("/get-tasks/:type",protect, getTasks);
router.get("/get-tamil-sentences/:taskId",protect, getTamilSentences);
router.post("/submit-tamil-translation",protect, submitTamilTranslation);
router.get("/get-word-tasks/:taskId",protect, getWordTasks);
router.post("/submit-word-task",protect, submitWordTask);

module.exports = router;