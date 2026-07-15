require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const createExtraStaff = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const hashedPassword = await bcrypt.hash("123456", 10);

    const users = [];

    // ===============================
    // CAMPUS FACILITIES
    // ===============================

    const campusFacilities = [
      "Classroom Infrastructure",
      "Electricity",
      "Drinking Water",
      "Parking",
      "Furniture",
      "Cleanliness",
      "Sports Facilities",
      "Auditorium",
    ];

    for (const subCategory of campusFacilities) {
      for (let i = 1; i <= 2; i++) {
        users.push({
          name: `${subCategory} Expert ${i}`,
          email: `${subCategory
            .replace(/[^a-zA-Z0-9]/g, "")
            .toLowerCase()}${i}@campuscare.com`,
          password: hashedPassword,
          role: "faculty",
          expertise: "Campus Facilities",
          subExpertise: [subCategory],
        });
      }
    }

    // ===============================
    // LIBRARY SERVICES
    // ===============================

    for (let i = 1; i <= 2; i++) {
      users.push({
        name: `Library Officer ${i}`,
        email: `library${i}@campuscare.com`,
        password: hashedPassword,
        role: "faculty",
        expertise: "Library Services",
        subExpertise: [],
      });
    }

    // ===============================
    // ADMINISTRATION
    // ===============================

    for (let i = 1; i <= 2; i++) {
      users.push({
        name: `Administration Officer ${i}`,
        email: `administration${i}@campuscare.com`,
        password: hashedPassword,
        role: "faculty",
        expertise: "Administration",
        subExpertise: [],
      });
    }

    await User.insertMany(users);

    console.log("20 Extra Staff created successfully");

    process.exit(0);

  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

createExtraStaff();