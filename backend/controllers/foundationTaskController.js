const db = require("../models");
const { askAI, getPrompt } = require("../services/gemini.service");

const { FoundationalTask, TamilSentence, Attempt, WordTask } = db;

exports.getTasks = async (req, res) => {

    try {

        const { type } = req.params;

        const include = [{
            model: Attempt,
            where: {
                userId: req.user.id,
            },
            required: false
        }]

        if (type === "tamil_to_english") {
            include.push({ model: TamilSentence });
        } else if (type === "own_words") {
            include.push({ model: WordTask });
        }

        const tasks = await FoundationalTask.findAll({
            where: {
                type
            },
            include
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

        const {
            sentenceId,
            userAnswer,
            taskId
        } = req.body;

        const prompt = getPrompt("foundationalTOE", req.body)

        const ai = await askAI(prompt);

        const attempt = await Attempt.create({
            userId: req.user.id,
            taskId,
            sentenceId,
            userAnswer,
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