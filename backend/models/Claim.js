const { Schema, model } = require("mongoose");

const claimSchema = new Schema(
  {
    listing_id: {
      type: Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },
    claimer_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "picked_up", "cancelled"],
      default: "pending",
    },
    donation_note: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

const Claim = model("Claim", claimSchema);
module.exports = Claim;
