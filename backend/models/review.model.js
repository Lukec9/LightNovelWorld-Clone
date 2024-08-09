import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    novelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Novel",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: { type: Number, min: 1, max: 5, required: true },
    text: { type: String, required: true },
    likes: { type: Number, default: 0, min: 0 },
    dislikes: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

reviewSchema.index({ novelId: 1 });
reviewSchema.index({ userId: 1 });

export default mongoose.model("Review", reviewSchema);
