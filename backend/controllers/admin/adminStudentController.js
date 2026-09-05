const studentService = require("../../services/student.service");

const getStudents = async (req, res, next) => {
  try {
    const result = await studentService.getStudents(req.query);
    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.log("err", err)
    next(error);
  }
};

module.exports = {
  getStudents,
};