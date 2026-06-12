const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash"
});


const getPrompt = (mode, payload) => {
  // const { mode } = payload.otherInfo;
  switch (mode) {
    case "topic":
      return getTopicPrompt(payload);
    case "passage":
      return getPassagePrompt(payload);
    case "tamil_to_english":
      return getTOEPrompt(payload);
    case "own_words":
      return getWordTaskPrompt(payload);
    case "duolingoChat":
      return getDuolingoChatPrompt(payload);
    case "duolingoTopic":
      return getDuolingoTopicPrompt(payload);
    case "passageTranslation":
      return getPassageTransaltionPrompt(payload);
    default:
      return getNormalPrompt(payload);
  }
}

const getNormalPrompt = (payload) => {
  const { text, history } = payload;
  const prompt = `
You are an English tutor.

Conversation History:
${history}

User:
"${text}"

Rules:
- Continue the conversation naturally.
- Stay consistent with the conversation context.
- Correct grammar ONLY if needed.
- If correction is needed, provide correctedText and explanation.
- If the sentence is already correct:
  - correctedText = ""
  - explanation = ""
- Reply in English only.
- Keep replies brief.

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
You are an English tutor.

Topic: ${title}
Description: ${description}

Conversation History:
${history}

User:
"${text}"

Rules:
- Stay strictly within the topic.
- Ask relevant follow-up questions.
- Correct grammar ONLY if needed.
- If the sentence is already correct:
  - correctedText = ""
  - explanation = ""
- Keep replies brief.
- Reply in English only.

Return ONLY JSON:

{
  "correctedText": "",
  "explanation": "",
  "reply": ""
}
`;
  return prompt;
}

const getDuolingoChatPrompt = (payload) => {
  console.log("getDuolingoChatPrompt prompt inside");

  const { text, history } = payload;
  const prompt = `
You are a Duolingo-style English tutor.

Conversation History:
${history}

Student:
"${text}"

Rules:
- The student may use English, Tamil, Tanglish, or a mix of them.
- Understand the intended meaning.
- Convert the student's message into natural English when needed.
- If the student's message is not natural English:
  - provide correctedText and explanation.
- If the message is already good English:
  - correctedText = ""
  - explanation = ""
- Continue the conversation naturally.
- Encourage English speaking.
- Reply in English only.
- Keep replies brief.

Return ONLY JSON:

{
  "correctedText": "",
  "explanation": "",
  "reply": ""
}
`;
  return prompt;
}

const getDuolingoTopicPrompt = (payload) => {
  console.log("duolingoTopic prompt inside");

  const { text, history } = payload;
  const { title, description } = payload.otherInfo;
  const prompt = `
You are a Duolingo-style English tutor.

Topic: ${title}
Description: ${description}

Conversation History:
${history}

Student:
"${text}"

Rules:
- Stay strictly within the topic.
- The student may use English, Tamil, Tanglish, or mixed language.
- Understand the intended meaning.
- Convert the student's message into natural English when needed.
- If the student's message is not natural English:
  - provide correctedText and explanation.
- If the message is already good English:
  - correctedText = ""
  - explanation = ""
- Ask one simple follow-up question related to the topic.
- Encourage English speaking.
- Reply in English only.
- Keep replies brief.

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

const getPassageTransaltionPrompt = (payload) => {
  const { tamilText, translation } = payload;
  const prompt = `
You are an English teacher.

Tamil Passage:
${tamilText}

Student Translation:
${translation}

Instructions:

1. Check whether the meaning matches the Tamil passage.
2. Check grammar and sentence structure.
3. Assign a score from 0 to 100.
4. If the translation is excellent:
   - isCorrect = true
   - score = 100
   - correctedText = ""
   - explanation = ""
5. Otherwise:
   - isCorrect = false
   - provide score
   - provide correctedText
   - provide explanation
6. Keep explanation under 50 words.

Return ONLY JSON:

{
    "isCorrect": true,
    "score": 100,
    "correctedText": "",
    "explanation": ""
}
`;
  return prompt;
}

const getTOEPrompt = (payload) => {
  const { tamilText, expectedEnglish, userAnswer } = payload;

  const prompt = `
User translated a Tamil sentence into English.

Tamil Sentence:
"${tamilText}"

Expected Meaning:
"${expectedEnglish}"

User Answer:
"${userAnswer}"

Rules:

1. Compare meaning.
2. Ignore minor wording differences.
3. If correct return isCorrect=true.
4. If incorrect return corrected sentence.
5. Explain briefly.

Return JSON only.

{
    "isCorrect": true,
    "correctedText": "",
    "explanation": ""
}
`;

  return prompt;
}

const getWordTaskPrompt = (payload) => {
  const { word, userAnswer } = payload;

  const prompt = `
You are an English tutor.

Target Word:
"${word}"

Student Sentence:
"${userAnswer}"

Rules:

1. Check whether the target word is used.
2. Check grammar.
3. Check if the sentence sounds natural.
4. If correct return isCorrect=true.
5. If incorrect provide corrected sentence.
6. Keep explanation short.

Return JSON only.

{
    "isCorrect": true,
    "correctedText": "",
    "explanation": ""
}
`;

  return prompt;
}

const generateContent = async (prompt) => {
  const result = await model.generateContent(prompt);

  const text = result.response.text();

  try {
    const clean = text.replace(/```json|```/g, "").trim();

    let parsed = JSON.parse(clean);

    // Handle double-stringified JSON
    if (typeof parsed === "string") {
      parsed = JSON.parse(parsed);
    }

    return parsed;

  } catch (error) {

    console.log("Raw Gemini Response:", text);
    console.log("Parse Error:", error);

    return {
      correctedText: "",
      explanation: "",
      reply: text
    };
  }
};

async function askAI(prompt) {

  const response = await generateContent({
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }]
      }
    ],
    generationConfig: {
      responseMimeType: "application/json"
    }
  });

  console.log("AI Response:", response);

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
    case "duolingoTopic":
      console.log("duolingoTopic inside");
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

module.exports = { askAI, startAI, getPrompt };