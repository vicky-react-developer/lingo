const db = require("../models");
const { askAI } = require("../services/gemini.service");

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


exports.getTaskQuestions = async (req, res) => {

    try {

        const { taskId } = req.params;

        const data = await TamilSentence.findAll({
            where: {
                taskId
            },
            order: [["orderNo", "ASC"]],
            attributes: ["id", "tamilText"]
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
            answer
        } = req.body;

        const ai = await askAI(`
User translated Tamil to English.

Correct grammar if needed.

Sentence:
"${answer}"

Return JSON:
{
 "correctedText":"",
 "explanation":"",
 "isCorrect":true
}
`);

        const attempt = await Attempt.create({

            userId: req.user.id,
            sentenceId,

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