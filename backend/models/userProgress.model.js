import mongoose from "mongoose";

const userProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    novelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Novel",
      required: true,
    },
    lastReadChapter: {
      type: Number,
      required: true,
      default: 1,
    },
    lastReadDate: {
      type: Date,
      default: Date.now,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Indexes for quick lookup
userProgressSchema.index({ userId: 1, novelId: 1 }, { unique: true });

export default mongoose.model("UserProgress", userProgressSchema);
