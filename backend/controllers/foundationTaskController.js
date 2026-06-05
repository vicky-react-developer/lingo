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
            order: [["id", "ASC"]],
            attributes: ["id", "tamilText", "expectedEnglish"],
            include: [
                {
                    model: Attempt,
                    where: {
                        userId: req.user.id
                    },
                    required: false
                }
            ]
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

        const prompt = getPrompt("tamil_to_english", req.body)

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

exports.getWordTasks = async (req, res) => {

    try {

        const { taskId } = req.params;

        const data = await WordTask.findAll({
            where: {
                taskId
            },
            order: [["id", "ASC"]],
            attributes: ["id", "word"],
            include: [
                {
                    model: Attempt,
                    where: {
                        userId: req.user.id
                    },
                    required: false
                }
            ]
        });

        return res.json({
            success: true,
            data
        });

    } catch (e) {

        console.log("getWords error", e);

        return res.status(500).json({
            success: false
        });

    }
};

exports.submitWordTask = async (req, res) => {

    try {

        const {
            wordTaskId,
            userAnswer,
            taskId
        } = req.body;

        const prompt = getPrompt("own_words", req.body)

        const ai = await askAI(prompt);

        const attempt = await Attempt.create({
            userId: req.user.id,
            taskId,
            wordTaskId,
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

        console.log("submitWordTask error", e);

        return res.status(500).json({
            success: false
        });

    }
};