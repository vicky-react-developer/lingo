const userService = require("../../services/user.service");

exports.updateUserStatus = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { isActive } = req.body;

    const student = await userService.updateUserStatus(
      userId,
      isActive
    );

    return res.status(200).json({
      success: true,
      message: `Student ${
        isActive ? "activated" : "deactivated"
      } successfully`,
      data: student,
    });
  } catch (error) {
    next(error);
  }
};