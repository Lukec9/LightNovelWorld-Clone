import cron from "node-cron";
import Ranking from "../models/ranking.model.js";
import Comment from "../models/comment.model.js";
import Novel from "../models/novel.model.js";
import Review from "../models/review.model.js";
import mongoose from "mongoose";

const updateRankings = async () => {
  const getTopNovelsByComments = async () => {
    return await Comment.aggregate([
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
      {
        $lookup: {
          from: "novels",
          localField: "_id",
          foreignField: "_id",
          as: "novelDetails",
        },
      },
      {
        $unwind: "$novelDetails",
      },
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "novelId",
          as: "reviewDetails",
        },
      },
      {
        $addFields: {
          reviewCount: { $size: "$reviewDetails" },
        },
      },
      {
        $project: {
          _id: 0,
          novelId: "$_id",
          commentsCount: 1,
          reviewCount: 1,
          bookmarkCount: 1,
          title: "$novelDetails.title",
          slugTitle: "$novelDetails.slugTitle",
          categories: "$novelDetails.categories",
          cover: "$novelDetails.cover",
          author: "$novelDetails.author",
          status: "$novelDetails.status",
        },
      },
    ]).exec();
  };

  const getTopNovelsByRatings = async () => {
    return await Review.aggregate([
      {
        $group: {
          _id: "$novelId",
          averageRating: { $avg: "$rating" },
          reviewCount: { $sum: 1 },
        },
      },
      {
        $sort: { averageRating: -1 },
      },
      {
        $limit: 100,
      },
      {
        $lookup: {
          from: "novels",
          localField: "_id",
          foreignField: "_id",
          as: "novelDetails",
        },
      },
      {
        $unwind: "$novelDetails",
      },
      {
        $project: {
          _id: 0,
          novelId: "$_id",
          averageRating: 1,
          reviewCount: 1,
          bookmarkCount: 1,
          title: "$novelDetails.title",
          slugTitle: "$novelDetails.slugTitle",
          categories: "$novelDetails.categories",
          cover: "$novelDetails.cover",
          author: "$novelDetails.author",
          status: "$novelDetails.status",
        },
      },
    ]).exec();
  };

  const getTopNovelsByViews = async () => {
    return await Novel.find()
      .sort({ views: -1 })
      .select("-chapters")
      .limit(100)
      .exec();
  };

  try {
    console.log("Updating rankings");

    const topByComments = await getTopNovelsByComments();
    const topByRatings = await getTopNovelsByRatings();
    const topByViews = await getTopNovelsByViews();

    const rankingData = {
      topByComments,
      topByRatings,
      topByViews,
    };

    const result = await Ranking.updateOne(
      {},
      { $set: rankingData },
      { upsert: true, timestamps: false }
    );

    if (result.upsertedCount > 0) {
      console.log("New ranking document created.");
    } else if (result.modifiedCount > 0) {
      console.log("Existing ranking document updated.");
    } else {
      console.log("No changes made to the ranking document.");
    }

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
