const router = require("express").Router();
const {
  getAllListings,
  getMyListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing,
} = require("../controllers/listingController");

const {
  getClaimsForListing,
  createClaim,
} = require("../controllers/claimController");
const { authMiddleware, donorOnly, claimerOnly } = require("../utils/auth");

router.get("/", getAllListings);
router.get("/my-listings", authMiddleware, donorOnly, getMyListings);
router.get("/:id", getListingById);

// ─── Donor only
router.post("/", authMiddleware, donorOnly, createListing);
router.put("/:id", authMiddleware, donorOnly, updateListing);
router.delete("/:id", authMiddleware, donorOnly, deleteListing);

// ─── Claims nested under listings
router.post("/:id/claims", authMiddleware, claimerOnly, createClaim);
router.get("/:id/claims", authMiddleware, donorOnly, getClaimsForListing);

module.exports = router;
