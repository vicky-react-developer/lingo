const db = require("../models");
const { ChatSession } = db;

exports.createSession = async (req, res) => {
    try {
        const { mode } = req.body;
        const session = await ChatSession.create({
            userId: 1,
            mode
        });
        return res.status(200).json({
            success: true,
            session
        });
    } catch (e) {
        console.log("createSession error:", e);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}