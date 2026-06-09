const User = require("../models/User");

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

    case "Hostel & Accommodation":

      return await User.find({
        role: "faculty",
        expertise:
          "Hostel & Accommodation",
        hostelWing:
          student.gender === "female"
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

const getSubExpertisePool = (
  pool,
  subCategory
) => {

  return pool.filter(
    (staff) =>
      staff.subExpertise?.includes(
        subCategory
      )
  );

};

module.exports = {
  getCandidatePool,
  getSubExpertisePool,
};