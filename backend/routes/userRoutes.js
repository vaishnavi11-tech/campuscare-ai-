const express = require("express");

const router = express.Router();

const {
  getAllStaff,
  createStaff,
  deleteStaff,
  getStaffWorkload,
  recommendStaff
} = require("../controllers/userController");

const { auth } = require("../middleware/auth");

const {
  isAdmin,
} = require("../middleware/roleMiddleware");

router.get(
  "/staff",
  auth,
  isAdmin,
  getAllStaff
);

router.post(
  "/staff",
  auth,
  isAdmin,
  createStaff
);

router.delete(
  "/staff/:id",
  auth,
  isAdmin,
  deleteStaff
);
router.get(
  "/staff-workload/:department",
  auth,
  isAdmin,
  getStaffWorkload
);
router.get(
  "/recommend-staff/:category",
  auth,
  isAdmin,
  recommendStaff
);
module.exports = router;