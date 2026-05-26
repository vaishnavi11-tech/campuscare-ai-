const express = require("express");
const router = express.Router();
const {getMyComplaints,createComplaint,updateComplaintStatus,deleteComplaint,getAllComplaints,assignComplaint,getComplaintStats,getMyStats,getAssignedStats}=require("../controllers/complaintController")
const { auth } = require("../middleware/auth");
const { isAdmin,isStaff } = require("../middleware/roleMiddleware");
router.post("/create", auth, createComplaint);
router.get("/my",auth,getMyComplaints);
router.patch("/:id",auth,isStaff,updateComplaintStatus);
router.delete("/delete/:id",auth,isAdmin,deleteComplaint);
router.get("/all",getAllComplaints);
router.get("/stats", auth, isAdmin, getComplaintStats);
router.get("/my-stats", auth,  getMyStats);
router.patch("/assign/:id",auth,isAdmin,assignComplaint);
router.get("/assigned-stats", auth, isStaff, getAssignedStats);
module.exports = router;
