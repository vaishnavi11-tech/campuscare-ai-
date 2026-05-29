const Student = require("../models/Student");

const getAllStaff = async (req, res) => {

  try {

    const staff = await Student.find({ role: "staff" });

    res.status(200).json({
      success: true,
      staff,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllStaff,
};