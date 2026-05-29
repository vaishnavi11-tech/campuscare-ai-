const express = require("express");

const router = express.Router();

const { analyzeComplaintController } = require("../controllers/aiController");

router.post("/analyze", analyzeComplaintController);

module.exports = router;