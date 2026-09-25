const { User } = require("../models");

const updateUserStatus = async (id, isActive, role) => {
    const user = await User.findOne({
        where: {
            id,
            role
        },
    });

    if (!user) {
        const error = new Error(`${role} not found with this id ${role}`);
        error.statusCode = 404;
        throw error;
    }

    user.isActive = isActive;

    await user.save();

    return user;
};

module.exports = {
    updateUserStatus,
};