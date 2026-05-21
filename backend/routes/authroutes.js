const express = require("express");
const router = express.Router();
const { registerStudent, loginStudent } = require("../controllers/authController");
const { profile } = require("../controllers/profile");

const { auth } = require("../middleware/auth");
router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.get("/profile", auth, profile);

module.exports = router;