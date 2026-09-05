const { User } = require("../models");

const updateUserStatus = async (id, isActive) => {
    const student = await User.findOne({
        where: {
            id,
            role: "Student",
        },
    });

    if (!student) {
        const error = new Error("Student not found");
        error.statusCode = 404;
        throw error;
    }

    student.isActive = isActive;

    await student.save();

    return student;
};

module.exports = {
    updateUserStatus,
};