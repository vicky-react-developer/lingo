const userService = require("../../services/user.service");

exports.updateUserStatus = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { isActive, role } = req.body;

    await userService.updateUserStatus(
      userId,
      isActive,
      role
    );

    return res.status(200).json({
      success: true,
      message: `User ${isActive ? "activated" : "deactivated"
        } successfully`,
    });
  } catch (error) {
    next(error);
  }
};