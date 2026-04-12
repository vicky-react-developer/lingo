const { Message, Correction, ChatSession, Topic, Passage } = require("../models");
const { askAI, startAI } = require("../services/gemini.service");

exports.saveMessage = async (req, res) => {
    try {
        const { sessionId, text, otherInfo } = req.body;

        const userMessage = await Message.create({
            sessionId,
            sender: "user",
            text
        });

        const previousMessages = await Message.findAll({
            where: { sessionId },
            order: [["createdAt", "ASC"]],
            // limit: 10
        });

        const history = previousMessages.map(msg => {
            return `${msg.sender === "user" ? "User" : "AI"}: ${msg.text}`;
        }).join("\n");

        const payload = {
            text,
            history,
            otherInfo
        }

        const ai = await askAI(payload);

        console.log("ai", ai)
        const aiMessage = await Message.create({
            sessionId,
            sender: "ai",
            text: ai.reply
        });

        let correction = null;

        if (ai.correctedText) {

            correction = {
                wrongText: text,
                correctedText: ai.correctedText,
                explanation: ai.explanation
            };

            await Correction.create({
                messageId: aiMessage.id,
                wrongText: text,
                correctedText: ai.correctedText,
                explanation: ai.explanation
            });
        }

        return res.json({
            aiReply: ai.reply,
            correction
        });

    } catch (e) {
        console.log("save message error:", e);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

exports.initiateCoversation = async (req, res) => {
    try {

        const { sessionId, otherInfo } = req.body;

        const ai = await startAI(otherInfo);

        await Message.create({
            sessionId,
            sender: "ai",
            text: ai.reply
        });

        res.json({ success: true, reply: ai.reply });

    } catch (e) {
        console.log("initiateCoversation err", e)
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

exports.getAllMessages = async (req, res) => {
    try {

        const { sessionId } = req.params;

        let messages = await Message.findAll({
            where: {
                sessionId
            },
            include: [
                {
                    model: Correction
                }
            ],
            order: [["id", "ASC"]]
        });

        messages = messages.map((item) => {
            const itemJSON = item.toJSON();
            console.log("itemJSON", itemJSON)
            const payload = {
                sender: itemJSON.sender,
                text: itemJSON.text,
            }
            if(itemJSON.Correction) {
                const {wrongText, correctedText, explanation} = itemJSON.Correction;
                payload.correction = {
                    wrongText,
                    correctedText,
                    explanation
                }
            }
            return payload;
        })

        return res.json({ success: true, data: messages });

    } catch (e) {
        console.log("getAllMessages err", e)
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};