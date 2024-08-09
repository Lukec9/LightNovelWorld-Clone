import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    novelId: { type: mongoose.Schema.Types.ObjectId, ref: "Novel" },
  },
  { timestamps: true }
);

bookmarkSchema.index({ userId: 1, novelId: 1 }, { unique: true });

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

export default Bookmark;
