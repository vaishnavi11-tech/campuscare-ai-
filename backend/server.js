require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const userRoutes = require("./routes/userRoutes");
const aiRoutes = require("./routes/aiRoutes");

// =====================================
// Database Connection
// =====================================

connectDB();

const app = express();

// =====================================
// Global Middleware
// =====================================

app.use(cors());

app.use(express.json());

// =====================================
// API Routes
// =====================================

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/complaints",
  complaintRoutes
);

app.use(
  "/api/users",
  userRoutes
);

app.use(
  "/api/ai",
  aiRoutes
);

// =====================================
// Health Check
// =====================================

app.get("/", (req, res) => {

  res.send("API Running");

});

// =====================================
// Start Server
// =====================================

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});