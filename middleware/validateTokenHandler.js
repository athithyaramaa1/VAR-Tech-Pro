const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const UserModel = require('../models/userModel');

const ROLES = {
  ADMIN: 1,
  USER: 0
};

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    console.log("Token:", token);
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next(); 
    } catch (err) {
      console.error("Token Verification Error:", err);
      return res.status(401).json({ error: "Invalid or expired token" });
    }
  } else {
    return res.status(401).json({ error: "Authorization header missing or invalid" });
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  try {
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not set in environment variables.");
      return res.status(500).json({ error: "Server misconfiguration" });
    }
    
    const user = await UserModel.findById(req.user._id);
    if (!user) {
      console.error("User not found:", req.user._id);
      return res.status(404).json({ error: "User not found" });
    }
    
    if (user.role !== ROLES.ADMIN) {
      return res.status(403).json({ error: "You are not authorized to perform this action" });
    }
    
    next(); 
  } catch (err) {
    console.error("isAdmin Middleware Error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = { validateToken, isAdmin };
