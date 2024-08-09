import mongoose from "mongoose";

const novelSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    slugTitle: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    summary: { type: String, required: true },
    categories: [{ type: String, required: true }],
    tags: [{ type: String }],
    rating: { type: Number, min: 0, max: 5 },
    rank: { type: Number },
    chapters: [{ type: String }],
    views: { type: Number, default: 0 },
    bookmarkCount: { type: Number, default: 0 },
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
