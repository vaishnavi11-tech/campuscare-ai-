const bcrypt = require("bcryptjs");

const User = require("../models/User");
const Complaint = require("../models/Complaint");

// =====================================
// Get All Staff
// =====================================

const getAllStaff = async (req, res) => {
  try {
    const staff = await User.find({
      role: "faculty",
    })
      .select("-password")
      .select(
        "name email expertise department hostelWing"
      );

    return res.status(200).json({
      success: true,
      staff,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// =====================================
// Create Staff
// =====================================

const createStaff = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      expertise,
      department,
      hostelWing,
      subExpertise,
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
      subExpertise,
      department:
        expertise === "Academic Affairs"
          ? department
          : null,
      hostelWing:
        expertise ===
        "Hostel & Accommodation"
          ? hostelWing
          : null,
    });

    return res.status(201).json({
      success: true,
      staff,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// =====================================
// Delete Staff
// =====================================

const deleteStaff = async (req, res) => {
  try {
    await User.findByIdAndDelete(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message:
        "Staff deleted successfully",
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// =====================================
// Get Staff Workload
// =====================================

const getStaffWorkload = async (
  req,
  res
) => {
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
          status: {
            $ne: "resolved",
          },
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

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// =====================================
// Recommend Staff
// =====================================

const recommendStaff = async (
  req,
  res
) => {
  try {
    const { category } = req.params;

    // Direct authority routing
    if (
      category ===
        "Safety & Security" ||
      category ===
        "Student Welfare"
    ) {

      const authority =
        await User.findOne({
          role: "faculty",
          expertise: category,
        });

      return res.status(200).json({
        success: true,
        recommended: authority,
        allStaff: authority
          ? [authority]
          : [],
        routingType:
          "DIRECT_AUTHORITY",
      });

    }

    // Workload-based routing
    const facultyList =
      await User.find({
        role: "faculty",
        expertise: category,
      });

    const staffWithWorkload =
      [];

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
        expertise:
          faculty.expertise,
        workload,
      });

    }

    staffWithWorkload.sort(
      (a, b) =>
        a.workload - b.workload
    );

    return res.status(200).json({
      success: true,
      recommended:
        staffWithWorkload[0] ||
        null,
      allStaff:
        staffWithWorkload,
      routingType: "WORKLOAD",
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
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