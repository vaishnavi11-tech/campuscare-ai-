require("dotenv").config();
const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function analyzeComplaint(title, description) {

  const prompt = `
Analyze this complaint.

Title: ${title}

Description: ${description}

Return ONLY valid JSON in this format:

{
  "category": "",
  "priority": "",
  "summary": "",
  "suggestedResolution": ""
}
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return response.choices[0].message.content;
}

module.exports = { analyzeComplaint };