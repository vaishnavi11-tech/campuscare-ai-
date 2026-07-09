require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const createCSEAcademicStaff = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const hashedPassword = await bcrypt.hash("123456", 10);

    const subCategories = [
      "Teaching Quality",
      "Attendance",
      "Examinations",
      "Results",
      "Timetable",
      "Projects & Internships",
      "Laboratory Management",
      "Certificates",
    ];

    const users = [];

    for (const subCategory of subCategories) {
      for (let i = 1; i <= 2; i++) {
        users.push({
          name: `${subCategory} Expert ${i}`,
          email: `cse_${subCategory
            .replace(/[^a-zA-Z0-9]/g, "")
            .toLowerCase()}${i}@campuscare.com`,
          password: hashedPassword,
          role: "faculty",
          department: "CSE",
          expertise: "Academic Affairs",
          subExpertise: [subCategory],
        });
      }
    }

    await User.insertMany(users);

    console.log("16 CSE Academic staff created successfully");

    process.exit(0);

  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

createCSEAcademicStaff();