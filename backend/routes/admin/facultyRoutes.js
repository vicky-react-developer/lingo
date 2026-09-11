const express = require("express");
const router = express.Router();
const { getFaculties, getFacultyOptions } = require("../../controllers/admin/adminFacultyController")

router.get("/", getFaculties);
router.get("/options", getFacultyOptions);

module.exports = router;