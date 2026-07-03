const db = require("../models");
const { askAI, getPrompt } = require("../services/gemini.service");

const { FunctionalTask, FunctionalExercise, TamilSentence, Attempt, WordTask } = db;

exports.getTasks = async (req, res) => {

    try {

        const { category } = req.query;

        const tasks = await FunctionalTask.findAll({
            where: {
                category
            },
            include: [
                {
                    model: Attempt,
                    where: {
                        userId: req.user.id,
                    },
                    required: false
                },
                {
                    model: FunctionalExercise
                }
            ],
            order: [["id", "ASC"]]
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

exports.getFunctionalExercises = async (req, res) => {

    try {

        const { taskId } = req.params;

        const data = await FunctionalExercise.findAll({
            where: {
                taskId
            },
            order: [["id", "ASC"]],
            attributes: ["id", "englishSentence", "tamilSentence"],
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

exports.submitFunctionalExercise = async (req, res) => {

    try {

        const {
            exerciseId,
            userAnswer,
            taskId,
            taskType
        } = req.body;

        const prompt = getPrompt(taskType, req.body)

        const ai = await askAI(prompt);

        const attempt = await Attempt.create({
            userId: req.user.id,
            taskId,
            exerciseId,
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
