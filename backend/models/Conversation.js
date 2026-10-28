const { Schema, model } = require("mongoose");

const conversationSchema = new Schema(
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
    owner_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

conversationSchema.index({ listing_id: 1, claimer_id: 1 }, { unique: true }); // prevents duplicate conversations if the same claim is submitted twice (double click or slow network)
const Conversation = model("Conversation", conversationSchema);
module.exports = Conversation;
