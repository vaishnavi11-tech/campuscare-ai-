const express = require("express");
const router = express.Router();
const {getMyComplaints,createComplaint,updateComplaintStatus,deleteComplaint,getAllComplaints,assignComplaint,getComplaintStats,getMyStats,getAssignedStats}=require("../controllers/complaintController")
const { auth } = require("../middleware/auth");
const {
    isAdmin,
    isFaculty,
    isStudent
} = require("../middleware/roleMiddleware");
router.post("/create", auth, isStudent, createComplaint);
router.get("/my", auth, isStudent, getMyComplaints);
router.patch("/assign/:id",auth,isAdmin,assignComplaint);
router.patch("/:id", auth, isFaculty, updateComplaintStatus);
router.delete("/delete/:id",auth,isAdmin,deleteComplaint);
router.get("/all", auth, isAdmin, getAllComplaints);
router.get("/stats", auth, isAdmin, getComplaintStats);
router.get("/my-stats", auth,  getMyStats);

router.get("/assigned-stats", auth, isFaculty, getAssignedStats);
module.exports = router;

