const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    // Optional for now
    // Later AI can fill this
    category: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ["pending", "in-progress", "resolved"],
      default: "pending",
    },

    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // Future RAG support
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

      priority: {
        type: String,
        enum: ["low", "medium", "high", "critical"],
      },

      suggestedResolution: String,

      confidence: Number,

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