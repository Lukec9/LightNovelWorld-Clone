import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
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
    text: { type: String, required: true },
    likes: { type: Number, default: 0, min: 0 },
    dislikes: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

commentSchema.index({ novelId: 1 });
commentSchema.index({ userId: 1 });

export default mongoose.model("Comment", commentSchema);
