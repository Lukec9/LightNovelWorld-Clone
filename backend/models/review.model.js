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
    text: { type: String, required: true, minlength: 100 },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

reviewSchema.index({ novelId: 1 });
reviewSchema.index({ userId: 1 });
reviewSchema.index({ novelId: 1, userId: 1 }, { unique: true });

export default mongoose.model("Review", reviewSchema);
