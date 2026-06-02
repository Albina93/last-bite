const router = require("express").Router();
const { register, login, getMe } = require("../controllers/authController");
const { authMiddleware } = require("../utils/auth");

// POST /api/users/register
router.post("/register", register);

// POST /api/users/login
router.post("/login", login);

// GET /api/users/me
router.get("/me", authMiddleware, getMe);

module.exports = router;
