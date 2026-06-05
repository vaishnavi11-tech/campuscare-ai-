const User = require("../models/User");
const bcrypt = require("bcryptjs");
const Complaint = require("../models/Complaint");
const getAllStaff = async (req, res) => {

  try {

    const staff = await User.find({
  role: "faculty",
})
.select("-password")
.select( "name email expertise subExpertise");

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

const createStaff = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      expertise,
      department,
    } = req.body;

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        success: false,
        message: "Staff already exists",
      });

    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const staff = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "faculty",
      expertise,
      department:
        expertise === "Academic Affairs"
          ? department
          : null,
    });

    res.status(201).json({
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

const deleteStaff = async (req, res) => {

  try {

    await User.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message:
        "Staff deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};
const getStaffWorkload = async (req, res) => {

  try {

    const { department } = req.params;

    const staffMembers =
      await User.find({
        role: "faculty",
        department,
      }).select("-password");

    const result = [];

    for (const staff of staffMembers) {

      const workload =
        await Complaint.countDocuments({
          assignedTo: staff._id,
          status: { $ne: "resolved" },
        });

      result.push({
        _id: staff._id,
        name: staff.name,
        email: staff.email,
        department: staff.department,
        workload,
      });

    }

    result.sort(
      (a, b) =>
        a.workload - b.workload
    );

    return res.status(200).json({
      success: true,
      staff: result,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};
const recommendStaff = async (req, res) => {

  try {

    const { category } = req.params;

    // DIRECT AUTHORITY ROUTING

    if (
      category === "Safety & Security" ||
      category === "Student Welfare"
    ) {

      const authority = await User.findOne({
        role: "faculty",
        expertise: category,
      });

      return res.status(200).json({
        success: true,
        recommended: authority,
        allStaff: authority ? [authority] : [],
        routingType: "DIRECT_AUTHORITY",
      });

    }

    // NORMAL FLOW

    const facultyList = await User.find({
      role: "faculty",
      expertise: category,
    });

    const staffWithWorkload = [];

    for (const faculty of facultyList) {

      const workload =
        await Complaint.countDocuments({
          assignedTo: faculty._id,
          status: {
            $ne: "resolved",
          },
        });

      staffWithWorkload.push({
        _id: faculty._id,
        name: faculty.name,
        email: faculty.email,
        expertise: faculty.expertise,
        workload,
      });

    }

    staffWithWorkload.sort(
      (a, b) => a.workload - b.workload
    );

    return res.status(200).json({
      success: true,
      recommended:
        staffWithWorkload[0] || null,
      allStaff:
        staffWithWorkload,
      routingType: "WORKLOAD",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};

      
module.exports = {
  getAllStaff,
  createStaff,
  deleteStaff,
  getStaffWorkload,
  recommendStaff,
};
