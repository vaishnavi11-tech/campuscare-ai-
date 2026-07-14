const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    // =====================================
    // Student Submitted Complaint
    // =====================================

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    // Assigned by AI after complaint analysis
    category: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "in-progress",
        "resolved",
      ],
      default: "pending",
    },

    // Student who submitted the complaint
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // =====================================
    // Complaint Assignment
    // =====================================

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // AI-recommended staff member
    // (Administrator may override)
    recommendedStaff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    recommendationReason: {
      type: String,
      default: null,
    },

    // =====================================
    // Similar Complaints
    // =====================================

    similarComplaints: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Complaint",
      },
    ],

    // =====================================
    // Complaint Activity
    // =====================================

    notes: [
      {
        text: {
          type: String,
          required: true,
        },

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    lastActivityAt: {
      type: Date,
      default: Date.now,
    },

    escalated: {
      type: Boolean,
      default: false,
    },

    // =====================================
    // AI Analysis
    // =====================================

    // Vector embedding used for semantic similarity search
    embedding: {
      type: [Number],
      default: [],
    },

    aiResult: {
      sentiment: {
        label: String,
        score: Number,
      },

      category: String,

      subCategory: String,

      location: String,

      priority: {
        type: String,
        enum: [
          "low",
          "medium",
          "high",
          "critical",
        ],
      },

      summary: String,

      suggestedResolution: String,

      // Confidence score returned by the AI model
      confidence: Number,

      // Future enhancement:
      // Can store AI-selected similar cases if needed.
      similarCases: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Complaint",
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Complaint",
  complaintSchema
);