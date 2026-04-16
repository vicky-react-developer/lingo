const db = require("../models");
const bcrypt = require("bcryptjs");
const { User } = db;

exports.getOneUser = async (req, res) => {
    try {
        const { id } = req.user || {};
        if (!id) {
            return res.status(401).json({ success: false, message: "User not authorised!" });
        }

        const user = await User.findOne({
            where: { id },
            attributes: ["name", "fatherName", "gender", "role", "dateOfBirth", "qualification", "organisation", "address", "place", "phoneNumber", "userName"]
        });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found!" });
        }

        return res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error("getOneUser error:", error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
};

exports.updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const payload = req.body;

        for (let key in payload) {
            if (!payload[key]) {
                return res.status(400).json({ success: false, message: "Please fill al the field!" });
            }
        }

        const {
            name,
            fatherName,
            userName,
            gender,
            role,
            dateOfBirth,
            qualification,
            organisation,
            address,
            place,
            phoneNumber,
        } = payload;


        const existingUserName = await User.findOne({
            where: { userName },
            attributes: ["id"],
        });

        if (existingUserName && existingUserName.id !== userId) {
            return res.status(409).json({ success: false, message: "Username is already taken." });
        }

        const existingPhone = await User.findOne({
            where: { phoneNumber },
            attributes: ["id"],
        });

        if (existingPhone && existingPhone.id !== userId) {
            return res.status(409).json({ success: false, message: "Phone number is already in use." });
        }

        // ── Update ────────────────────────────────────
        await User.update(
            {
                name,
                fatherName,
                userName,
                gender,
                role,
                dateOfBirth,
                qualification,
                organisation,
                address,
                place,
                phoneNumber,
            },
            { where: { id: userId } }
        );

        const updatedUser = await User.findByPk(userId, {
            attributes: { exclude: ["password"] },
        });

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            user: updatedUser,
        });
    } catch (error) {
        console.error("updateUserProfile error:", error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
};


exports.changePassword = async (req, res) => {
    try {
        const userId = req.user.id; // set by auth middleware

        const { currentPassword, newPassword } = req.body;

        // ── Validation ──────────────────────────────
        if (!currentPassword)
            return res.status(400).json({ success: false, message: "Current password is required." });

        if (!newPassword)
            return res.status(400).json({ success: false, message: "New password is required." });

        if (newPassword.length < 6)
            return res.status(400).json({ success: false, message: "New password must be at least 6 characters." });

        if (currentPassword === newPassword)
            return res.status(400).json({ success: false, message: "New password must differ from the current password." });

        // ── Fetch user with password ─────────────────
        const user = await User.findByPk(userId);
        if (!user)
            return res.status(404).json({ success: false, message: "User not found." });

        const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
        if (!isMatch)
            return res.status(400).json({ success: false, message: "Current password is incorrect." });

        // ── Hash & save new password ─────────────────
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(newPassword, salt);

        await user.update({ passwordHash });

        return res.status(200).json({
            success: true,
            message: "Password changed successfully.",
        });
    } catch (error) {
        console.error("changePassword error:", error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
};