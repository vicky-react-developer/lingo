const { Message, Correction } = require("../models");
const { askAI } = require("../services/gemini.service");

exports.saveMessage = async (req, res) => {
    try {
        const { sessionId, text } = req.body;

        const userMessage = await Message.create({
            sessionId,
            sender: "user",
            text
        });


        const ai = await askAI(text);


        const aiMessage = await Message.create({
            sessionId,
            sender: "ai",
            text: ai.reply
        });


        if (ai.correctedText) {

            await Correction.create({
                messageId: userMessage.id,
                wrongText: text,
                correctedText: ai.correctedText,
                explanation: ai.explanation
            });

        }

        return res.json({
            aiReply: ai.reply,
            correction: {
                wrongText: text,
                correctedText: ai.correctedText,
                explanation: ai.explanation
            }
        });
    } catch (e) {
        console.log("save message error:", e);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}