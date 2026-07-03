const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
    getTasks,
    getFunctionalExercises,
    submitFunctionalExercise
} = require("../controllers/functionalTaskController");

router.get("/get-tasks",protect, getTasks);
router.get("/get-functional-exercises/:taskId",protect, getFunctionalExercises);
router.post("/submit-functional-exercise",protect, submitFunctionalExercise);

module.exports = router;