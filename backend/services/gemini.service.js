const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash"
});


const getPrompt = (mode, payload) => {
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
      return getPassageTranslationPrompt(payload);
    default:
      return getNormalPrompt(payload);
  }
}

const getNormalPrompt = (payload) => {
  console.log("Normal Chat reply")
  const { text, history } = payload;

  return `
You are an English tutor.

Conversation History:
${history}

User:
"${text}"

Rules:

- Continue the conversation naturally.
- Stay consistent with the conversation context.
- Correct English ONLY when necessary.
- If correction is needed:
  - provide correctedText
  - explanation under 15 words.
- If no correction is needed:
  - correctedText = ""
  - explanation = ""
- Briefly respond and continue the conversation.
- Keep reply under 30 words.
- Reply in English only.
- The reply field MUST contain strictly two parts:
  1. Feedback
  2. Next question

- Strictly Separate feedback and next question using the literal characters "\\n\\n".

Return ONLY JSON:

{
  "correctedText": "",
  "explanation": "",
  "reply": ""
}
`;
};

const getTopicPrompt = (payload) => {
  console.log("TOpic Chat reply")

  const { text, history } = payload;
  const { title, description } = payload.otherInfo;

  return `
You are an English tutor.

Topic:
${title}

Description:
${description}

Conversation History:
${history}

User:
"${text}"

Rules:

- Stay strictly within the topic.
- Correct English ONLY when necessary.
- If correction is needed:
  - provide correctedText
  - explanation under 15 words.
- If no correction is needed:
  - correctedText = ""
  - explanation = ""
- Briefly respond and ask one follow-up question.
- Keep reply under 30 words.
- Reply in English only.
- The reply field MUST contain exactly two parts:
  1. Feedback
  2. Next question

- Separate feedback and next question using the literal characters "\\n\\n".

Return ONLY JSON:

{
  "correctedText": "",
  "explanation": "",
  "reply": ""
}
`;
};

const getDuolingoChatPrompt = (payload) => {
  console.log("Duo Chat reply")

  const { text, history } = payload;

  return `
You are a Duolingo-style English tutor helping Tamil-speaking students learn spoken English.

Conversation History:
${history}

Student:
"${text}"

Rules:

- Student may use English, Tamil, Tanglish, or mixed language.
- Understand the intended meaning.
- Encourage English communication.
- Correct English ONLY when necessary.
- If correction is needed:
  - provide correctedText
  - explanation under 15 words.
- If no correction is needed:
  - correctedText = ""
  - explanation = ""

- Reply should:
  - briefly respond
  - ask the next question

- Include the question in:
  - English
  - Tamil

- Tamil must use Tamil script.
- Never use Tanglish.
- Keep reply under 30 words.
- reply format:

<brief response>

<English question>

<Tamil question>

Example:

That's great!

What do you usually do after work?

வேலை முடிந்த பிறகு நீங்கள் வழக்கமாக என்ன செய்வீர்கள்?

Return ONLY JSON:

{
  "correctedText": "",
  "explanation": "",
  "reply": ""
}
`;
};

const getDuolingoTopicPrompt = (payload) => {
  console.log("Duo topic reply")

  const { text, history } = payload;
  const { title, description } = payload.otherInfo;

  return `
You are a Duolingo-style English tutor helping Tamil-speaking students learn spoken English.

Topic:
${title}

Description:
${description}

Conversation History:
${history}

Student:
"${text}"

Rules:

- Stay strictly within the topic.
- Student may use English, Tamil, Tanglish, or mixed language.
- Understand the intended meaning.
- Encourage English communication.
- Correct English ONLY when necessary.
- If correction is needed:
  - provide correctedText
  - explanation under 15 words.
- If no correction is needed:
  - correctedText = ""
  - explanation = ""

- Reply should:
  - briefly respond
  - ask one topic-related follow-up question

- Include the question in:
  - English
  - Tamil

- Tamil must use Tamil script.
- Never use Tanglish.
- Keep reply under 30 words.
- reply format:

<brief response>

<English question>

<Tamil question>

Example:

That's great!

What do you usually do after work?

வேலை முடிந்த பிறகு நீங்கள் வழக்கமாக என்ன செய்வீர்கள்?

Return ONLY JSON:

{
  "correctedText": "",
  "explanation": "",
  "reply": ""
}
`;
};

const getPassagePrompt = (payload) => {
  console.log("Passage reply")

  const { text, history } = payload;
  const { tamilText } = payload.otherInfo;

  return `
You are an English tutor.

Tamil Passage:
${tamilText}

Conversation:
${history}

Student Answer:
"${text}"

Rules:

- Check whether the answer matches the passage.
- Correct English ONLY when necessary.
- If correction is needed:
  - provide correctedText
  - explanation under 15 words.
- If no correction is needed:
  - correctedText = ""
  - explanation = ""

- If the answer is wrong:
  - politely indicate it.

- Ask the next question from the passage.
- Keep reply under 30 words.
- Reply in English only.
- The reply field MUST contain exactly two parts:
  1. Feedback
  2. Next question

- Separate feedback and next question using the literal characters "\\n\\n".

Return ONLY JSON:

{
  "correctedText": "",
  "explanation": "",
  "reply": ""
}
`;
};

const getTOEPrompt = (payload) => {
  console.log("TOE reply")

  const { tamilText, expectedEnglish, userAnswer } = payload;

  return `
User translated a Tamil sentence into English.

Tamil Sentence:
"${tamilText}"

Expected Meaning:
"${expectedEnglish}"

User Answer:
"${userAnswer}"

Rules:

- Compare meaning.
- Ignore minor wording differences.
- Check grammar.
- If correct:
  - isCorrect = true
  - correctedText = ""
  - explanation = ""
- Otherwise:
  - isCorrect = false
  - provide correctedText
  - explanation under 15 words.

Return ONLY JSON:

{
  "isCorrect": true,
  "correctedText": "",
  "explanation": ""
}
`;
};

const getWordTaskPrompt = (payload) => {
  console.log("Word task reply")

  const { word, userAnswer } = payload;

  return `
You are an English tutor.

Target Word:
"${word}"

Student Sentence:
"${userAnswer}"

Rules:

- Verify the target word is used.
- Check grammar.
- Check whether the sentence sounds natural.

- If correct:
  - isCorrect = true
  - correctedText = ""
  - explanation = ""

- Otherwise:
  - isCorrect = false
  - provide correctedText
  - explanation under 15 words.

Return ONLY JSON:

{
  "isCorrect": true,
  "correctedText": "",
  "explanation": ""
}
`;
};

const getPassageTranslationPrompt = (payload) => {
  const { tamilText, translation } = payload;

  return `
You are an English teacher.

Tamil Passage:
${tamilText}

Student Translation:
${translation}

Rules:

- Check meaning accuracy.
- Check grammar.
- Assign score from 0-100.

- If excellent:
  - isCorrect = true
  - score = 100
  - correctedText = ""
  - explanation = ""

- Otherwise:
  - isCorrect = false
  - provide score
  - provide correctedText
  - explanation under 20 words.

Return ONLY JSON:

{
  "isCorrect": true,
  "score": 100,
  "correctedText": "",
  "explanation": ""
}
`;
};

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
      responseMimeType: "application/json",
      // responseSchema: {
      //   type: "OBJECT",
      //   properties: {
      //     correctedText: { type: "STRING" },
      //     explanation: { type: "STRING" },
      //     reply: { type: "STRING" }
      //   }
      // }

    }
  });

  console.log("AI Response:", response);

  return response;
}

const getChatInitializationPrompt = () => {
  console.log("Normal initialisation")
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
  console.log("title", title, description)
  console.log("Topic initialisation")

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

const getDuolingoChatInitializationPrompt = () => {
  console.log("duo chat initialisation")

  const prompt = `
You are a Duolingo-style English tutor helping Tamil-speaking students learn spoken English.

Rules:

- Welcome the student.
- Ask one simple conversation question.
- Include English and Tamil versions.
- Tamil must use Tamil script.
- Never use Tanglish.
- Keep under 30 words.
- reply format:

<English question>

<Tamil question>

Example:

What do you usually do after work?

வேலை முடிந்த பிறகு நீங்கள் வழக்கமாக என்ன செய்வீர்கள்?

Return ONLY JSON:

{
  "reply": ""
}
`;
  return prompt;
}

const getDuolingoTopicInitializationPrompt = (title, description) => {
  console.log("duo topic initialisation")

  const prompt = `
You are a Duolingo-style English tutor helping Tamil-speaking students learn spoken English.

Topic:
${title}

Description:
${description}

Rules:

- Briefly introduce the topic.
- Ask one simple opening question.
- Include English and Tamil versions.
- Tamil must use Tamil script.
- Never use Tanglish.
- Keep under 30 words.
- reply format:

<English question>

<Tamil question>

Example:

What do you usually do after work?

வேலை முடிந்த பிறகு நீங்கள் வழக்கமாக என்ன செய்வீர்கள்?

Return ONLY JSON:

{
  "reply": ""
}
`;
  return prompt;
}

const getPassageInitializationPrompt = (passageText) => {
  console.log("passage initialisation")

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
    case "duolingoChat":
      prompt = getDuolingoChatInitializationPrompt();
      break;
    case "duolingoTopic":
      prompt = getDuolingoTopicInitializationPrompt(payload.title, payload.description);
      break;
    default:
      prompt = getChatInitializationPrompt();
  }

  const response = await generateContent(prompt);

  return response;
}

module.exports = { askAI, startAI, getPrompt };