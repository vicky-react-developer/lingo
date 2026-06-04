const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
    getTasks,
    getTamilSentences,
    submitTamilTranslation
} = require("../controllers/foundationTaskController");

router.get("/get-tasks/:type",protect, getTasks);
router.get("/get-tamil-sentences/:taskId",protect, getTamilSentences);
router.post("/submit-tamil-translation",protect, submitTamilTranslation);

module.exports = router;