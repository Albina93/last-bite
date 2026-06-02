const jwt = require("jsonwebtoken");
const User = require("../models/User");
const secret = process.env.JWT_SECRET;
const expiration = "7d";

const signToken = (id) => {
  return jwt.sign({ id }, secret, { expiresIn: expiration });
};

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secret);
    req.user = await User.findById(decoded.id).select("-password"); // return everything except password
    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

const donorOnly = (req, res, next) => {
  if (req.user.role !== "donor") {
    return res.status(403).json({ message: "Donors only" });
  }
  next();
};

const claimerOnly = (req, res, next) => {
  if (req.user.role !== "claimer") {
    return res.status(403).json({ message: "Claimers only" });
  }
  next();
};

module.exports = { signToken, authMiddleware, donorOnly, claimerOnly };
