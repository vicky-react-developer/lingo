const studentService = require("../../services/student.service");

exports.getStudents = async (req, res, next) => {
  try {
    const result = await studentService.getStudents(req.query);
    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

exports.assignFaculty = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const { facultyId } = req.body;

    if (!facultyId) {
      return res.status(400).json({
        success: false,
        message: "Faculty ID is required",
      });
    }

    const assignment = await studentService.assignFaculty(
      studentId,
      facultyId
    );

    return res.status(200).json({
      success: true,
      message: "Faculty assigned successfully",
      data: assignment,
    });
  } catch (error) {
    next(error);
  }
};
