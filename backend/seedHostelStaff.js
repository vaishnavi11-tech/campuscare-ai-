require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const createHostelStaff = async () => {
  try {

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    const hashedPassword = await bcrypt.hash(
      "123456",
      10
    );

    const hostelSubCategories = [
      "Room Allocation",
      "Room Maintenance",
      "Mess Food",
      "Water Supply",
      "Electricity",
      "Cleanliness",
      "Hostel Security",
    ];

    const users = [];

    for (const wing of ["boys", "girls"]) {

      for (const subCategory of hostelSubCategories) {

        for (let i = 1; i <= 3; i++) {

          users.push({
            name: `${subCategory} Expert ${i} (${wing})`,

            email: `${wing}_${subCategory
              .replace(/[^a-zA-Z0-9]/g, "")
              .toLowerCase()}${i}@campuscare.com`,

            password: hashedPassword,

            role: "faculty",

            expertise:
              "Hostel & Accommodation",

            subExpertise: [
              subCategory,
            ],

            hostelWing: wing,
          });

        }

      }

    }

    await User.insertMany(users);

    console.log(
      `${users.length} Hostel staff created successfully`
    );

    process.exit(0);

  } catch (error) {

    console.log(error);

    process.exit(1);

  }
};

createHostelStaff();