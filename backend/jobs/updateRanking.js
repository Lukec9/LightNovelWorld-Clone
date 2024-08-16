import cron from "node-cron";
import Comment from "../models/comment.model.js";
import Novel from "../models/novel.model.js";
import Review from "../models/review.model.js";
import mongoose from "mongoose";

const updateRankings = async () => {
  try {
    console.log("Updating rankings");

    // Get top novels by comments
    const topByComments = await Comment.aggregate([
      {
        $group: {
          _id: "$novelId",
          commentsCount: { $sum: 1 },
        },
      },
      {
        $sort: { commentsCount: -1 },
      },
      {
        $limit: 100,
      },
    ]);

    // Get top novels by ratings
    const topByRatings = await Review.aggregate([
      {
        $group: {
          _id: "$novelId",
          averageRating: { $avg: "$rating" },
          reviewCount: { $sum: 1 },
        },
      },
      {
        $sort: { rating: -1 },
      },
      {
        $limit: 100,
      },
    ]);

    // Update novel documents
    const updatePromises = [];

    topByComments.forEach(({ _id, commentsCount }) => {
      updatePromises.push(
        Novel.updateOne(
          { _id },
          { $set: { commentsCount } },
          { timestamps: false }
        )
      );
    });

    topByRatings.forEach(({ _id, averageRating, reviewCount }) => {
      updatePromises.push(
        Novel.updateOne(
          { _id },
          { $set: { rating: averageRating, reviewCount } },
          { timestamps: false }
        )
      );
    });

    await Promise.all(updatePromises);

    console.log("Rankings updated successfully");
  } catch (error) {
    console.error("Error updating rankings:", error);
  }
};
const novelRanks = async () => {
  try {
    const novels = await Novel.find({});

    const readCounts = novels.map(novel => novel.views);
    const minReadCount = Math.min(...readCounts);
    const maxReadCount = Math.max(...readCounts);

    const normalize = count =>
      maxReadCount - minReadCount === 0
        ? 0
        : (count - minReadCount) / (maxReadCount - minReadCount);

    novels.forEach(novel => {
      const normalizedReadCount = normalize(novel.views);
      novel.score = 0.5 * normalizedReadCount + 0.5 * novel.rating;
    });

    novels.sort((a, b) => b.score - a.score);

    let currentRank = 1;
    let previousScore = null;

    novels.forEach((novel, index) => {
      if (novel.score !== previousScore) {
        currentRank = index + 1;
      }
      novel.rank = currentRank;
      previousScore = novel.score;
    });

    const updatePromises = novels.map(novel =>
      Novel.updateOne(
        { _id: novel._id },
        { $set: { rank: novel.rank } },
        { timestamps: false }
      )
    );

    await Promise.all(updatePromises);

    console.log("Rankings(novel ranks) updated successfully.");
  } catch (error) {
    console.error("Error novel ranks:", error);
  }
};

const start = () => {
  // Schedule the update to run every week (e.g., every Sunday at midnight)
  // cron.schedule("0 0 * * 0", updateRankings);
  cron.schedule("0 * * * *", updateRankings);
  cron.schedule("0 * * * *", novelRanks);

  console.log("Cron job started: Rankings update every Sunday at midnight");
};

export default { start };
