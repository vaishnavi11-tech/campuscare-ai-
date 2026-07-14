require("dotenv").config();

const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// =====================================
// AI Complaint Classification
// =====================================

async function analyzeComplaint(
  title,
  description
) {

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

SubCategory Rules:

Academic Affairs:
- Teaching Quality
- Attendance
- Examinations
- Results
- Timetable
- Projects & Internships
- Laboratory Management
- Certificates

IT Services:
- WiFi & Network
- Student Portal
- College Email
- Software Access
- Computer Lab
- Smart Classroom

Hostel & Accommodation:
- Room Allocation
- Room Maintenance
- Mess Food
- Water Supply
- Electricity
- Cleanliness
- Hostel Security

Campus Facilities:
- Classroom Infrastructure
- Furniture
- Electricity
- Cleanliness
- Drinking Water
- Sports Facilities
- Parking
- Auditorium

Library Services:
- Book Availability
- Digital Library
- Reading Room
- Library Infrastructure
- Borrowing & Fine

Administration:
- ID Card
- Fees & Payments
- Scholarships
- Bonafide Certificate
- Official Documents
- Student Records
- Transfers

Safety & Security:
- Harassment
- Ragging
- Theft
- Security Concern
- Emergency Incident

Student Welfare:
- Mental Health
- Counseling
- Financial Assistance
- Career Guidance
- Student Support

Priority must be ONLY:

- low
- medium
- high

Location Rules:

Extract a specific location if mentioned.

Examples:

Lab 5
Lab 2
A-203
Library
Girls Hostel Block B
Parking Area

If no location is mentioned,
return "General".

Return ONLY valid JSON.

{
  "category": "",
  "subCategory": "",
  "priority": "",
  "summary": "",
  "suggestedResolution": ""
}

Rules:

1. category MUST exactly match one category above.
2. subCategory MUST exactly match one subCategory belonging to that category.
3. priority MUST be low, medium or high.
4. summary should be one short sentence.
5. suggestedResolution should be practical and concise.
6. Do not return markdown.
7. Do not return explanation outside JSON.
8. Do NOT output <think>.
9. Do NOT explain your reasoning.
10. The FIRST character of your response MUST be {
`;

  const response =
    await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
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

// =====================================
// Generic AI Utility
// =====================================

async function askGroq(prompt) {

  const response =
    await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
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

module.exports = {
  analyzeComplaint,
  askGroq,
};