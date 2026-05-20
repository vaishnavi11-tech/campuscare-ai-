const express = require("express");
const router = express.Router();
const {getMyComplaints,createComplaint,updateComplaintStatus,deleteComplaint}=require("../controllers/complaintController")
const { auth } = require("../middleware/auth");
const { isAdmin } = require("../middleware/roleMiddleware");
router.post("/create", auth, createComplaint);
router.get("/my",auth,getMyComplaints);
router.patch("/:id",auth,updateComplaintStatus);
router.delete("/delete/:id",auth,isAdmin,deleteComplaint);
module.exports = router;
