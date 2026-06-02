const { Schema, model } = require("mongoose");

const listingSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    photo_url: {
      type: String,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity must be at least 1"], // the minimum value allowed
    },
    pickup_time: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "closed"], // 'closed' no longer available
      default: "active", // food is still available to claim
    },
    accepts_donations: {
      type: Boolean,
      default: false,
    },
    owner_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const Listing = model("Listing", listingSchema);
module.exports = Listing;
