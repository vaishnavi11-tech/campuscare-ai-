const User = require("../models/User");

const getAllStaff = async (req, res) => {

  try {

    const staff = await User.find({
      role: "faculty",
    });

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