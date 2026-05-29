const express = require("express");

const router = express.Router();

const { getAllStaff } = require("../controllers/userController");

const { auth } = require("../middleware/auth");

const { isAdmin } = require("../middleware/roleMiddleware");

router.get("/staff", auth, isAdmin, getAllStaff);

module.exports = router;