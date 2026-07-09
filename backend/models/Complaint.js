const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    // =========================
    // Student Input
    // =========================

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    // Can be filled  by AI later
    category: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ["pending", "in-progress", "resolved"],
      default: "pending",
    },

    // Complaint Owner
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // =========================
    // Complaint Assignment
    // =========================

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // AI Recommendation (Admin may override)
    recommendedStaff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    recommendationReason: {
      type: String,
      default: null,
    },

    // =========================
    // Related Complaints
    // =========================

    similarComplaints: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Complaint",
      },
    ],

    // =========================
    // Complaint Timeline
    // =========================

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

    // =========================
    // AI Support
    // =========================

    // Semantic embedding used for similarity search
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
        enum: ["low", "medium", "high", "critical"],
      },

      summary: String,

      suggestedResolution: String,

      // Overall confidence of AI analysis
      confidence: Number,

      // Verify whether this field is actually used.
      // Remove it if redundant with similarComplaints.
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

module.exports = mongoose.model("Complaint", complaintSchema);