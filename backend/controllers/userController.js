const db = require("../models");
const { User } = db;

exports.getOneUser = async (req, res) => {
    try {
        const { id } = req.user || {};
        if (!id) {
            return res.status(401).json({ success: false, message: "User not authorised!" });
        }

        const user = await User.findOne({
            where: {
                id
            },
            attributes: ["name", "fatherName", "gender", "role", "dateOfBirth", "qualification", "organisation", "address", "place", "phoneNumber", "userName"]
        });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found!" });
        }

        return res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error("User error:", error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
};