const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const db = require("../models");

const User = db.User;

const sha256 = (value) =>
  crypto.createHash("sha256").update(value).digest("hex");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "No token provided. Please log in." });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
      where: { id: decoded.id, tokenHash: sha256(token) },
    });

    if (!user) {
      return res.status(401).json({ success: false, message: "Session expired or logged out. Please log in again." });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Invalid or expired token. Please log in again." });
    }
    console.error("Auth middleware error:", error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    next();
  };
};

module.exports = { protect, authorize };