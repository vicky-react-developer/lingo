const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash"
});


const getPrompt = (payload) => {
  const { mode } = payload.otherInfo;
  console.log("payload", payload)
  switch (mode) {
    case "topic":
      return getTopicPrompt(payload);
    case "passage":
      return getPassagePrompt(payload);
    default:
      return getNormalPrompt(payload);
  }
}

const getNormalPrompt = (payload) => {
  const { text, history } = payload;
  const prompt = `
You are an English tutor helping a student improve their spoken English.

Conversation history:
${history}

User: "${text}"

Instructions:
1. If the sentence has grammar mistakes:
   - Provide correctedText
   - Provide explanation
2. If the sentence is already correct:
   - correctedText MUST be ""
   - explanation MUST be ""
3. Continue the conversation naturally
4. Stay on topic and do NOT change context

Return ONLY JSON:

{
 "correctedText": "",
 "explanation": "",
 "reply": ""
}
`;
  return prompt;
}

const getTopicPrompt = (payload) => {
  const { text, history } = payload;
  const { title, description } = payload.otherInfo;
  const prompt = `
You are an English tutor helping a student practice English.

Topic: "${title}"
Description: "${description}"

Conversation history:
${history}

User: "${text}"

Instructions:

1. Stay STRICTLY within the topic
2. Ask questions related to the topic
3. Keep conversation engaging
4. If grammar mistake:
   - provide correctedText + explanation
5. If correct:
   - correctedText = ""
   - explanation = ""
6. Do NOT change topic

Return ONLY JSON:

{
 "correctedText": "",
 "explanation": "",
 "reply": ""
}
`;
  return prompt;
}

const getPassagePrompt = (payload) => {
  const { text, history } = payload;
  const { tamilText } = payload.otherInfo;
  const prompt = `
You are an English tutor helping a student.

Tamil Passage:
"${tamilText}"

Conversation:
${history}

User answer:
"${text}"

Instructions:

1. Check if answer is correct based on passage
2. If grammar mistake:
   - correctedText
   - explanation
3. If correct grammar:
   - correctedText = ""
   - explanation = ""

4. Improve answer if needed
5. Ask NEXT question from passage
6. Keep conversation flowing
7. If the answer is wrong, tell them that answer is wrong in a polite way and continue the conversation.

Return JSON:
{
 "correctedText": "",
 "explanation": "",
 "reply": ""
}
`;
  return prompt;
}


const generateContent = async (prompt) => {
  const result = await model.generateContent(prompt);

  const text = result.response.text();
  try {
    const clean = text.replace(/```json|```/g, "").trim();
    return JSON.parse(clean);
  } catch {
    return {
      correctedText: "",
      explanation: "",
      reply: text
    };
  }
}

async function askAI(payload) {
  const prompt = getPrompt(payload);

  // console.log("prompt", prompt)
  const response = await generateContent(prompt);

  return response;
}

const getChatInitializationPrompt = () => {
  const prompt = `
You are a friendly English tutor helping a student practice spoken English.

Start a natural and engaging conversation with the student.

Instructions:
1. Greet the student politely
2. Ask a simple and friendly question
3. Keep the sentence short and easy to understand
4. Make the student feel comfortable to reply
5. Do NOT provide corrections yet
6. Do NOT mention grammar or explanation

Return ONLY JSON:

{
  "reply": ""
}
`;
  return prompt;
}

const getTopicInitializationPrompt = (title, description) => {
  const prompt = `
Start a conversation with a student on this topic:

Topic: "${title}"
Description: "${description}"

Ask a simple opening question.

Return ONLY JSON:

{
  "reply": ""
}
`;
  return prompt;
}

const getPassageInitializationPrompt = (passageText) => {
  const prompt = `
You are an English tutor.

A student will read a Tamil passage and answer questions in English.

Tamil Passage:
"${passageText}"

Instructions:
1. Understand the passage
2. Ask the FIRST simple question in English
3. Question should be easy and clear
4. Do NOT translate the passage

Return ONLY JSON:

{
  "reply": ""
}
`;
  return prompt;
}

async function startAI(payload) {
  const { mode } = payload;
  let prompt;
  switch (mode) {
    case "topic":
      prompt = getTopicInitializationPrompt(payload.title, payload.description);
      break;
    case "passage":
      prompt = getPassageInitializationPrompt(payload.tamilText);
      break;
    default:
      prompt = getChatInitializationPrompt();
  }

  const response = await generateContent(prompt);

  return response;
}

module.exports = { askAI, startAI };