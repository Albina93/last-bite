const Listing = require("../models/Listing");

const getAllListings = async (req, res) => {
  try {
    // finds ALL active listings
    const listings = await Listing.find({ status: "active" });
    res.status(200).json(listings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMyListings = async (req, res) => {
  try {
    // find only donor's listings
    const listings = await Listing.find({ owner_id: req.user._id });
    res.status(200).json(listings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: "No listing was found" });
    }
    res.status(200).json(listing);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createListing = async (req, res) => {
  try {
    const newListing = await Listing.create({
      ...req.body,
      owner_id: req.user._id,
    });
    res.status(201).json(newListing);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: "No listing was found" });
    }
    if (listing.owner_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }, // returns updated document instaed of the old one
    );
    res.status(200).json(updatedListing);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: "No listing was found" });
    }
    if (listing.owner_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Listing deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllListings,
  getMyListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing,
};
