const express = require("express");
const router = express.Router();
const {getMyComplaints,createComplaint,getComplaintById,addNote, getAssignedComplaints,recommendStaff,updateComplaintStatus,deleteComplaint,getAllComplaints,assignComplaint,getComplaintStats,getMyStats,getAssignedStats}=require("../controllers/complaintController")
const { auth } = require("../middleware/auth");
const {
    isAdmin,
    isFaculty,
    isStudent
} = require("../middleware/roleMiddleware");
const {
  testEmbedding,
} = require("../controllers/complaintController");
router.post("/create", auth, isStudent, createComplaint);
router.get(
  "/test-embedding",
  testEmbedding
);
router.get("/my", auth, isStudent, getMyComplaints);
router.patch("/assign/:id",auth,isAdmin,assignComplaint);
router.post( "/:id/note",auth, addNote);
router.patch("/:id", auth, isFaculty, updateComplaintStatus);
router.delete("/delete/:id",auth,isAdmin,deleteComplaint);
router.get("/all", auth, isAdmin, getAllComplaints);
router.get("/stats", auth, isAdmin, getComplaintStats);
router.get("/my-stats", auth,  getMyStats);
router.get("/assigned", auth,isFaculty, getAssignedComplaints);
router.get("/assigned-stats", auth, isFaculty, getAssignedStats);
router.get( "/:id", auth,getComplaintById);
router.get( "/recommend-staff/:complaintId", auth, isAdmin,  recommendStaff);

module.exports = router;

