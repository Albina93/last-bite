const Claim = require("../models/Claim");
const Listing = require("../models/Listing");

const createClaim = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    if (listing.status === "closed") {
      return res
        .status(400)
        .json({ message: "This listing is no longer available" });
    }
    const alreadyClaimed = await Claim.findOne({
      listing_id: req.params.id,
      claimer_id: req.user._id,
    });
    if (alreadyClaimed) {
      return res
        .status(400)
        .json({ message: "You already claimed this listing" });
    }
    const claim = await Claim.create({
      listing_id: req.params.id,
      claimer_id: req.user._id,
      donation_note: req.body.donation_note,
    });
    res.status(201).json(claim);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getClaimsForListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    if (listing.owner_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }
    const claims = await Claim.find({ listing_id: req.params.id });
    res.status(200).json(claims);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMyClaims = async (req, res) => {
  try {
    const claims = await Claim.find({ claimer_id: req.user._id });
    res.status(200).json(claims);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateClaim = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id);
    if (!claim) {
      return res.status(404).json({ message: "Claim not found" });
    }
    if (claim.claimer_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }
    const updatedClaim = await Claim.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.status(200).json(updatedClaim);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteClaim = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id);
    if (!claim) {
      return res.status(404).json({ message: "Claim not found" });
    }
    if (claim.claimer_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }
    await Claim.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Claim deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createClaim,
  getClaimsForListing,
  getMyClaims,
  updateClaim,
  deleteClaim,
};
