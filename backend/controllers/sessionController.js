const db = require("../models");
const { ChatSession, Topic, Passage, Message } = db;

exports.createSession = async (req, res) => {
    try {
        const { id } = req.user;
        const { payload } = req.body;
        const session = await ChatSession.create({
            userId: id,
            ...payload
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

exports.getSessions = async (req, res) => {
    try {
        const { id } = req.user;
        console.log("id", id)
        const sessions = await ChatSession.findAll({
            where: {
                userId: id
            },
            include: [
                {
                    model: Topic
                },
                {
                    model: Passage
                },
                {
                    model: Message,
                    limit: 1,
                    order: [["createdAt", "DESC"]]
                }
            ]
        });
        return res.status(200).json({
            success: true,
            data: sessions
        });
    } catch (e) {
        console.log("getSessions error:", e);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

exports.getOneSession = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const session = await ChatSession.findOne({
            where: {
                id: sessionId
            }
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