const express = require("express");
const router = express.Router();
const { getStudents } = require("../../controllers/admin/adminStudentController")

router.get("/get-students", getStudents);

module.exports = router;