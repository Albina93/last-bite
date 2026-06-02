const router = require("express").Router();
const {
  getMyClaims,
  updateClaim,
  deleteClaim,
} = require("../controllers/claimController");
const { authMiddleware, claimerOnly } = require("../utils/auth");

// GET /api/claims/my-claims
router.get("/my-claims", authMiddleware, claimerOnly, getMyClaims);

// PUT /api/claims/:id
router.put("/:id", authMiddleware, claimerOnly, updateClaim);

// DELETE api/claims/:id
router.delete("/:id", authMiddleware, claimerOnly, deleteClaim);

module.exports = router;
