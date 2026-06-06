const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["student", "faculty", "admin"],
      default: "student",
    },

    department: {
      type: String,
      default: null,
    },

    gender: {
      type: String,
      enum: ["male", "female"],
      default: null,
    },

    year: {
      type: Number,
      default: null,
    },

    expertise: {
      type: String,
      default: null,
    },
subExpertise: {
  type: [String],
  default: [],
},
hostelWing: {
  type: String,
  enum: ["boys", "girls"],
  default: null,
},
    studentId: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);