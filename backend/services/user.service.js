const { User } = require("../models");

const updateUserStatus = async (id, isActive) => {
    const user = await User.findOne({
        where: {
            id
        },
    });

    if (!user) {
        const error = new Error("User not found");
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