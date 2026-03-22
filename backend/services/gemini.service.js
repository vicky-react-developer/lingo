const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function askAI(userText) {

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
  });

  const prompt = `
User sentence: "${userText}"

1. Correct the grammar if needed
2. Explain briefly
3. Continue conversation

Return ONLY JSON format:

{
 "correctedText":"",
 "explanation":"",
 "reply":""
}
`;

  const result = await model.generateContent(prompt);

  const text = result.response.text();

  console.log("Raw response:", text);

  try {

    const clean = text.replace(/```json|```/g, "").trim();

    return JSON.parse(clean);

  } catch (error) {

    console.log("JSON parse error:", error);

    return {
      correctedText: "",
      explanation: "",
      reply: text
    };

  }
}

module.exports = { askAI };