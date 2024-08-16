import mongoose from "mongoose";
const Schema = mongoose.Schema;

const rankingSchema = new Schema({
  topByComments: [
    {
      commentsCount: Number,
      reviewCount: Number,
      novelId: { type: Schema.Types.ObjectId, ref: "Novel" },
      title: String,
      slugTitle: String,
      cover: String,
      author: String,
      categories: [String],
      status: String,
    },
  ],
  topByRatings: [
    {
      averageRating: Number,
      reviewCount: Number,
      bookmarkCount: Number,
      novelId: { type: Schema.Types.ObjectId, ref: "Novel" },
      title: String,
      slugTitle: String,
      categories: [String],
      cover: String,
      author: String,
      status: String,
    },
  ],
  topByViews: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "Novel" }, // The novel ID
      title: String,
      slugTitle: String,
      cover: String,
      author: String,
      views: Number,
      bookmarkCount: Number,
      categories: [String],
      status: String,
    },
  ],
});

const Ranking = mongoose.model("Ranking", rankingSchema);

export default Ranking;
