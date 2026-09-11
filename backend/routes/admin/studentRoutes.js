const express = require("express");
const router = express.Router();
const { getStudents, assignFaculty } = require("../../controllers/admin/adminStudentController")

router.get("/", getStudents);
router.put("/:studentId/assign-faculty", assignFaculty);

module.exports = router;