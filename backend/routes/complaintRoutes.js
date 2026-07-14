const express = require("express");

const {
  createComplaint,
  getMyComplaints,
  getComplaintById,
  addNote,
  getAssignedComplaints,
  recommendStaff,
  updateComplaintStatus,
  deleteComplaint,
  getAllComplaints,
  assignComplaint,
  getComplaintStats,
  getMyStats,
  getAssignedStats,
  testEmbedding,
} = require("../controllers/complaintController");

const {
  auth,
} = require("../middleware/auth");

const {
  isAdmin,
  isFaculty,
  isStudent,
} = require("../middleware/roleMiddleware");

const router = express.Router();

// =====================================
// Student Routes
// =====================================

router.post(
  "/create",
  auth,
  isStudent,
  createComplaint
);

router.get(
  "/my",
  auth,
  isStudent,
  getMyComplaints
);

router.get(
  "/my-stats",
  auth,
  getMyStats
);

// =====================================
// Faculty Routes
// =====================================

router.get(
  "/assigned",
  auth,
  isFaculty,
  getAssignedComplaints
);

router.get(
  "/assigned-stats",
  auth,
  isFaculty,
  getAssignedStats
);

router.patch(
  "/:id",
  auth,
  isFaculty,
  updateComplaintStatus
);

// =====================================
// Admin Routes
// =====================================

router.get(
  "/all",
  auth,
  isAdmin,
  getAllComplaints
);

router.get(
  "/stats",
  auth,
  isAdmin,
  getComplaintStats
);

router.patch(
  "/assign/:id",
  auth,
  isAdmin,
  assignComplaint
);

router.delete(
  "/delete/:id",
  auth,
  isAdmin,
  deleteComplaint
);

router.get(
  "/recommend-staff/:complaintId",
  auth,
  isAdmin,
  recommendStaff
);

// =====================================
// Shared Routes
// =====================================

router.post(
  "/:id/note",
  auth,
  addNote
);

router.get(
  "/:id",
  auth,
  getComplaintById
);

// =====================================
// Development Route
// =====================================

router.get(
  "/test-embedding",
  testEmbedding
);

module.exports = router;