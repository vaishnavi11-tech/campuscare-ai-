const express = require("express");
const router = express.Router();
const {getMyComplaints,createComplaint}=require("../controllers/complaintController")
const { auth } = require("../middleware/auth");
router.post("/create", auth, createComplaint);
router.get("/my",auth,getMyComplaints)
module.exports = router;
