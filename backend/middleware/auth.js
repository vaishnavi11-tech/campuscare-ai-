const jwt = require("jsonwebtoken");

// =====================================
// Authentication Middleware
// =====================================

exports.auth = async (
  req,
  res,
  next
) => {

  try {

    const token = req
      .header("Authorization")
      ?.replace("Bearer ", "");

    if (!token) {

      return res.status(401).json({
        success: false,
        message: "Token missing",
      });

    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    return next();

  } catch (error) {

    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });

  }

};