import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  textFileUrl: { type: String, required: true },
  chapterNumber: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const novelSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    slugTitle: { type: String, required: true, unique: true },
    cover: { type: String, required: true },
    author: { type: String, required: true },
    summary: { type: String, required: true },
    categories: [{ type: String, required: true }],
    tags: [{ type: String, required: true }],
    rating: { type: Number, min: 0, max: 5 },
    rank: { type: Number },
    chapters: [chapterSchema],
    views: { type: Number, default: 0 },
    bookmarkCount: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
    status: {
      type: String,
      required: true,
      enum: ["Ongoing", "Completed", "Dropped"],
    },
  },
  { timestamps: true }
);

const Novel = mongoose.model("Novel", novelSchema);

export default Novel;
