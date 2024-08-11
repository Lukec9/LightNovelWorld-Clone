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
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    chapterNumber: { type: Number, default: null },
  },
  { timestamps: true }
);

commentSchema.index({ novelId: 1 });
commentSchema.index({ userId: 1 });
commentSchema.index({ novelId: 1, userId: 1, chapterNumber: 1 });

export default mongoose.model("Comment", commentSchema);
