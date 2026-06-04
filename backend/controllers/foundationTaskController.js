const db = require("../models");
const { askAI, getPrompt } = require("../services/gemini.service");

const { FoundationalTask, TamilSentence, Attempt } = db;

exports.getTasks = async (req, res) => {

    try {

        const { type } = req.params;

        const tasks = await FoundationalTask.findAll({
            where: {
                type
            }
        });

        return res.json({
            success: true,
            data: tasks
        });

    } catch (e) {

        console.log("getTasks error", e);

        return res.status(500).json({
            success: false
        });

    }
};


exports.getTamilSentences = async (req, res) => {

    try {

        const { taskId } = req.params;

        const data = await TamilSentence.findAll({
            where: {
                taskId
            },
            order: [["orderNo", "ASC"]],
            attributes: ["id", "tamilText", "expectedEnglish"]
        });

        return res.json({
            success: true,
            data
        });

    } catch (e) {

        console.log("getTamilSentences error", e);

        return res.status(500).json({
            success: false
        });

    }
};


exports.submitTamilTranslation = async (req, res) => {

    try {

        // const {
        //     tamilText,
        //     expectedEnglish,
        //     userAnswer
        // } = req.body;

        const prompt = getPrompt("foundationalTOE", req.body)

        const ai = await askAI(prompt);

        const attempt = await Attempt.create({
            userId: req.user.id,
            sentenceId: req.body.sentenceId,
            userAnswer: answer,
            correctedAnswer: ai.correctedText,
            explanation: ai.explanation,
            isCorrect: ai.isCorrect
        });

        return res.json({
            success: true,
            data: attempt
        });

    } catch (e) {

        console.log("submitTamilTranslation error", e);

        return res.status(500).json({
            success: false
        });

    }
};