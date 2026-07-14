const User = require("../models/User");

// =====================================
// Build Candidate Pool
// =====================================

const getCandidatePool = async (
  complaint,
  student
) => {

  const category =
    complaint.aiResult.category;

  switch (category) {

    case "Academic Affairs":

      return await User.find({
        role: "faculty",
        expertise: "Academic Affairs",
        department:
          student.department,
      });

    case "Safety & Security":

      return await User.find({
        role: "faculty",
        expertise:
          "Safety & Security",
      });

    case "Student Welfare":

      return await User.find({
        role: "faculty",
        expertise:
          "Student Welfare",
      });

    case "Hostel & Accommodation":

      return await User.find({
        role: "faculty",
        expertise:
          "Hostel & Accommodation",
        hostelWing:
          student.gender ===
          "female"
            ? "girls"
            : "boys",
      });

    case "Campus Facilities":

      return await User.find({
        role: "faculty",
        expertise:
          "Campus Facilities",
      });

    case "IT Services":

      return await User.find({
        role: "faculty",
        expertise:
          "IT Services",
      });

    case "Library Services":

      return await User.find({
        role: "faculty",
        expertise:
          "Library Services",
      });

    case "Administration":

      return await User.find({
        role: "faculty",
        expertise:
          "Administration",
      });

    default:

      return [];
  }

};

// =====================================
// Filter by Sub-Expertise
// =====================================

const getSubExpertisePool = (
  pool,
  subCategory
) => {

  console.log(
    "SUBCATEGORY:",
    subCategory
  );

  const matches = pool.filter(
    (staff) =>
      staff.subExpertise?.includes(
        subCategory
      )
  );

  console.log(
    "MATCHES:",
    matches.map(
      (staff) => staff.name
    )
  );

  return matches;

};

module.exports = {
  getCandidatePool,
  getSubExpertisePool,
};