const { where } = require("sequelize");
const { Passage, Attempt } = require("../models");
const { askAI, getPrompt } = require("../services/gemini.service");

// Get all passages
exports.getAllPassages = async (req, res) => {

    try {
        const { type } = req.query;
        const { id: userId } = req.user;

        const passages = await Passage.findAll({
            where: {
                mode: type
            },
            attributes: ["id", "tamilText"],
            order: [["createdAt", "ASC"]],
            ...(type === "Translation" ? {
                include: [
                    {
                        model: Attempt,
                        where: {
                            userId
                        },
                        required: false
                    }
                ]
            } : {})
        });

        res.json({
            success: true,
            data: passages
        });

    } catch (error) {

        console.error("Fetch passages error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch passages"
        });

    }

};


// Get single passage
exports.getPassageById = async (req, res) => {

    try {

        const { id } = req.params;
        const { id: userId } = req.user;

        const passage = await Passage.findOne({
            where: {
                id
            },
            attributes: ["id", "tamilText"],
            include: [
                {
                    model: Attempt,
                    where: {
                        userId
                    },
                    required: false
                }
            ]
        });

        if (!passage) {

            return res.status(404).json({
                success: false,
                message: "Passage not found"
            });

        }

        res.json({
            success: true,
            data: passage
        });

    } catch (error) {

        console.error("Fetch passage error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });

    }

};

exports.submitPassageTranslation = async (req, res) => {
    try {

        const { tamilText, translation, passageId } = req.body;
        const { id: userId } = req.user;

        if (!tamilText || !translation) {
            return res.status(400).json({
                success: false,
                message: "Passage and translation are required"
            });
        }

        const prompt = getPrompt("passageTranslation", req.body)

        const aiResult = await askAI(prompt);

        const attempt = await Attempt.create({
            userId,
            passageId,
            userAnswer: translation,
            correctedAnswer: aiResult.correctedText,
            explanation: aiResult.explanation,
            isCorrect: aiResult.isCorrect,
            score: aiResult.score
        });

        return res.status(200).json({
            success: true,
            data: attempt
        });

    } catch (e) {

        console.log("submitPassageTranslation error:", e);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });

    }
}