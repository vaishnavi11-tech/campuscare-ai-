require("dotenv").config();

const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function testAI() {

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: `
Analyze this complaint:
Water leakage in hostel bathroom since 3 days.

Return category and urgency.
`
      }
    ]
  });

  console.log(response.choices[0].message.content);
}

testAI();