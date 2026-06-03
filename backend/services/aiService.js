require("dotenv").config();
const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function analyzeComplaint(title, description) {

const prompt = `
Analyze this campus complaint.

Title: ${title}

Description: ${description}

Choose ONLY ONE category from:

- IT Services
- Academic Affairs
- Hostel & Accommodation
- Campus Facilities
- Library Services
- Administration
- Safety & Security
- Student Welfare

Category Guidelines:

Academic Affairs:
- Admit card
- Hall ticket
- Exams
- Results
- Attendance
- Faculty teaching issues
- Timetable
- Internal marks
- Academic certificates

IT Services:
- WiFi
- Internet
- Student portal
- Login issues
- Software systems
- Computer labs

Hostel & Accommodation:
- Hostel room
- Mess food
- Water supply in hostel
- Hostel maintenance

Campus Facilities:
- Classroom issues
- Electricity
- Washrooms
- Furniture
- Cleanliness
- Drinking water

Library Services:
- Books
- Library access
- Digital library
- Reading room

Administration:
- ID card
- Fee payment
- Scholarships
- Official documents
- Office delays

Safety & Security:
- Theft
- Harassment
- Violence
- Unsafe conditions
- Security concerns

Student Welfare:
- Mental health
- Counseling
- Student support
- Personal wellbeing

Priority must be ONLY:
- low
- medium
- high

Return ONLY valid JSON.

{
  "category": "",
  "priority": "",
  "summary": "",
  "suggestedResolution": ""
}

Rules:

1. category MUST exactly match one category above.
2. priority MUST be low, medium or high.
3. summary should be one short sentence.
4. suggestedResolution should be practical and concise.
5. Do not return markdown.
6. Do not return explanation outside JSON.
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
async function askGroq(prompt) {

  const response =
    await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

  return response
    .choices[0]
    .message
    .content;

}

module.exports = { analyzeComplaint,askGroq };