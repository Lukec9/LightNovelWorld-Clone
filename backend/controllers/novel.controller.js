import Novel from "../models/novel.model.js";
import Comment from "../models/comment.model.js";
import Review from "../models/review.model.js";
import UserProgress from "../models/userProgress.model.js";
import User from "../models/user.model.js";
import Bookmark from "../models/bookmark.model.js";

import slugify from "../utils/slugify.js";
import uploadFileToCloudinary from "../utils/uploadFileToCloudinary.js";
import uploadToCloudinary from "../utils/uploadImage.js";
import handleValidationErrors from "../utils/handleValidationErrors.js";

import { body, check } from "express-validator";
import mongoose from "mongoose";
import { cloudinary } from "../cloudinaryConfig.js";

const createNovel = async (req, res) => {
  const errors = handleValidationErrors(req, res);
  if (errors) return;

  let { cover } = req.body;

  const { title, author, summary, status, categories, tags } = req.body;

  if (
    !title ||
    !author ||
    !summary ||
    !categories ||
    !tags ||
    !status ||
    !cover
  ) {
    return res
      .status(400)
      .json({ message: "All required fields must be provided." });
  }

  if (!Array.isArray(categories) || categories.length === 0) {
    return res
      .status(400)
      .json({ message: "Categories must be a non-empty array." });
  }
  if (!Array.isArray(tags) || tags.length === 0) {
    return res
      .status(400)
      .json({ message: "Categories must be a non-empty array." });
  }

  const allowedStatuses = ["Ongoing", "Completed", "Dropped"];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status value." });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const slugTitle = slugify(title);

    const existingNovel = await Novel.findOne({
      $or: [{ title }, { slugTitle }],
    }).session(session);
    if (existingNovel) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "Novel already exists." });
    }

    const uploadedResponse = await cloudinary.uploader.upload(cover, {
      folder: "lnworld/covers",
    });

    const newNovel = new Novel({
      title,
      slugTitle,
      cover: uploadedResponse.secure_url,
      author,
      summary,
      categories,
      tags,
      status,
    });

    await newNovel.save({ session });

    await session.commitTransaction();
    session.endSession();

    return res
      .status(201)
      .json({ message: "Novel created successfully", novel: newNovel });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("error in createNovel: ", error.message);
    return res.status(500).json({ error: error.message });
  }
};

const getNovel = async (req, res) => {
  let { query } = req.query;

  try {
    let novel;
    if (mongoose.Types.ObjectId.isValid(query)) {
      novel = await Novel.findOne({ _id: query });
    } else {
      query = slugify(query);
      novel = await Novel.findOne({ slugTitle: query });
    }
    if (!novel) return res.status(404).json({ error: "Novel not found" });

    res.status(200).json({ message: "Found novel successfully", novel });
  } catch (error) {
    console.error("error in getNovel", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
const addChaptersToNovel = async (req, res) => {
  const { novelId } = req.params;
  const files = req.files; // Array of uploaded files
  let chapters = req.body.chapters; // Metadata for each chapter

  if (typeof chapters === "string") {
    try {
      chapters = JSON.parse(chapters);
    } catch (error) {
      return res.status(400).json({ error: "Invalid chapter data" });
    }
  }

  if (!Array.isArray(chapters)) {
    chapters = [chapters]; // Convert to array if it's a single object
  }

  if (
    !novelId ||
    !files ||
    files.length === 0 ||
    !chapters ||
    chapters.length === 0
  ) {
    return res
      .status(400)
      .json({ error: "Novel ID, files, and chapter details are required" });
  }

  if (files.length !== chapters.length) {
    return res
      .status(400)
      .json({ error: "Number of files must match the number of chapters" });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Fetch the novel to check for existing chapters
    const novel = await Novel.findById(novelId)
      .select("chapters")
      .session(session);
    if (!novel) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ error: "Novel not found" });
    }

    // Check for existing chapters in the novel
    const existingChapterNumbers = novel.chapters.map(
      chapter => chapter.chapterNumber
    );

    // Ensure incoming chapter numbers are treated as numbers
    const incomingChapterNumbers = chapters.map(chapter =>
      Number(chapter.chapterNumber)
    );

    const conflictingChapters = incomingChapterNumbers.filter(chapterNumber =>
      existingChapterNumbers.includes(chapterNumber)
    );

    if (conflictingChapters.length > 0) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        error: `Chapters with the following numbers already exist: ${conflictingChapters.join(
          ", "
        )}`,
      });
    }

    // Upload files to cloud storage
    const uploadPromises = files.map((file, index) => {
      const fileName = `novel-${novelId}-chapter-${chapters[index].chapterNumber}`;
      return uploadFileToCloudinary(file.buffer, fileName, novelId);
    });
    const urls = await Promise.all(uploadPromises);

    // Prepare chapters data with URLs
    const chapterData = chapters.map((chapter, index) => ({
      title: chapter.title,
      chapterNumber: Number(chapter.chapterNumber), // Convert to number
      textFileUrl: urls[index],
    }));

    // Add new chapters to the novel
    novel.chapters.push(...chapterData);
    const updatedNovel = await novel.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ success: true, novel: updatedNovel });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ error: "Error adding chapters: " + error.message });
  }
};

const removeChaptersFromNovel = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    let { novelId } = req.params;
    const { chapterIds } = req.body;
    novelId = mongoose.Types.ObjectId.createFromHexString(novelId);

    // Validate the input
    if (!Array.isArray(chapterIds) || chapterIds.length === 0) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(400)
        .json({ error: "No chapter IDs provided or invalid format." });
    }

    // Validate that each chapterId is a valid ObjectId
    for (const id of chapterIds) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ error: `Invalid chapter ID: ${id}` });
      }
    }

    const novel = await Novel.findById(novelId).session(session);
    if (!novel) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ error: "Novel not found" });
    }

    // Find the chapters to be removed
    const chaptersToRemove = novel.chapters.filter(chapter =>
      chapterIds.includes(chapter._id.toString())
    );

    // Check if any chapters were found
    if (chaptersToRemove.length === 0) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(404)
        .json({ error: "No chapters found for the provided IDs" });
    }

    const chapterNumbers = chaptersToRemove.map(
      chapter => chapter.chapterNumber
    );

    // Delete files from Cloudinary
    const deleteFilePromises = chaptersToRemove.map(chapter => {
      const rawId = chapter.textFileUrl.split("/").pop().split(".")[0];
      return cloudinary.uploader.destroy(
        `lnworld/${novelId.toString()}/novel_chapters/${rawId}`,
        { resource_type: "raw" }
      );
    });
    await Promise.all(deleteFilePromises);

    // Filter out chapters to be removed
    novel.chapters = novel.chapters.filter(
      chapter => !chapterIds.includes(chapter._id.toString())
    );

    // Save the updated novel
    const updatedNovel = await novel.save({ session });

    // Delete associated comments
    await Comment.deleteMany({
      novelId,
      chapterNumber: { $in: chapterNumbers },
    }).session(session);

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      message: "Chapters and associated comments removed successfully",
      novel: updatedNovel,
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error removing chapters from novel:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const updateNovel = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const validations = [
    body("title").optional().isString().withMessage("Title must be a string"),
    body("author").optional().isString().withMessage("Author must be a string"),
    body("summary")
      .optional()
      .isString()
      .withMessage("Summary must be a string"),
    body("categories")
      .optional()
      .isArray()
      .withMessage("Categories must be an array"),
    body("tags").optional().isArray().withMessage("Tags must be an array"),
    body("status")
      .optional()
      .isIn(["Ongoing", "Completed", "Dropped"])
      .withMessage("Status must be one of the allowed values"),
    body("views")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Views must be a non-negative integer"),
    body("bookmarkCount")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Bookmark count must be a non-negative integer"),
  ];

  await Promise.all(validations.map(validation => validation.run(req)));

  const { novelId } = req.params;
  const { cover, ...updateFields } = req.body;

  const allowedFields = [
    "title",
    "cover",
    "author",
    "summary",
    "categories",
    "tags",
    "status",
    "views",
    "bookmarkCount",
  ];

  const updateData = {};
  const invalidFields = [];

  Object.keys(updateFields).forEach(field => {
    if (allowedFields.includes(field)) {
      updateData[field] = updateFields[field];
    } else {
      invalidFields.push(field);
    }
  });

  if (invalidFields.length > 0) {
    await session.abortTransaction();
    session.endSession();
    return res.status(400).json({
      message: "Invalid fields provided",
      invalidFields,
    });
  }

  // Handle the cover image update
  try {
    if (cover) {
      const novel = await Novel.findById(novelId).session(session);
      if (!novel) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({ message: "Novel not found" });
      }

      // If there's an existing cover, delete it from Cloudinary
      if (novel.cover) {
        const imgId = novel.cover.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`lnworld/covers/${imgId}`);
      }

      // Upload the new cover
      const uploadedResponse = await cloudinary.uploader.upload(cover, {
        folder: "lnworld/covers",
      });

      updateData.cover = uploadedResponse.secure_url;
    }

    const updatedNovel = await Novel.findByIdAndUpdate(novelId, updateData, {
      new: true,
      runValidators: true,
      session,
    });

    if (!updatedNovel) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Novel not found" });
    }

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ updatedNovel });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error in updateNovel", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteNovel = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { novelId } = req.params;

    // Validate novel ID
    if (!mongoose.Types.ObjectId.isValid(novelId)) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "Invalid novel ID" });
    }

    // Find the novel to ensure it exists
    const novel = await Novel.findById(novelId).session(session);
    if (!novel) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Novel not found" });
    }

    // Delete associated data (comments, reviews, user progress, bookmarks)
    await Promise.all([
      Comment.deleteMany({ novelId }).session(session),
      Review.deleteMany({ novelId }).session(session),
      UserProgress.deleteMany({ novelId }).session(session),
      Bookmark.deleteMany({ novelId }).session(session),
    ]);

    // Delete the novel
    await Novel.findByIdAndDelete(novelId).session(session);

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    res
      .status(200)
      .json({ message: "Novel and associated data deleted successfully" });
  } catch (error) {
    // Abort transaction and handle errors
    await session.abortTransaction();
    session.endSession();
    console.error("Error in deleteNovel:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const listAllNovels = async (req, res) => {
  const validateQueryParams = [
    check("page")
      .optional()
      .isInt({ gt: 0 })
      .withMessage("Page must be a positive integer"),
    check("limit")
      .optional()
      .isInt({ lt: 41 })
      .withMessage("Limit must be less than 40"),
    check("sortBy")
      .optional()
      .isIn(["New", "Popular", "Updates", "Rank"])
      .withMessage(
        "SortBy must be one of: title, rating, rank, views, updatedAt"
      ),
    check("order")
      .optional()
      .isIn(["asc", "desc"])
      .withMessage("Order must be either asc or desc"),
    check("status")
      .optional()
      .isIn(["All", "Ongoing", "Completed"])
      .withMessage("Status must be one of: All, Ongoing, Completed"),
    check("category")
      .optional()
      .isString()

      .withMessage("Category must be a string"),
  ];
  try {
    // Validate query parameters
    await Promise.all(
      validateQueryParams.map(validation => validation.run(req))
    );
    const errors = handleValidationErrors(req, res);
    if (errors) return;

    // Pagination parameters
    const page = parseInt(req.query.page) || 1;

    let limit = parseInt(req.query.limit);
    if (limit >= 40) limit = 40;
    const skip = (page - 1) * limit;

    // Sorting parameters
    const sortBy = req.query.sortBy || "New"; // Default to "New"
    const sortOrder = req.query.order === "desc" ? -1 : 1; // Default order is ascending

    // Determine sorting field based on sortBy value
    let sortField;
    switch (sortBy) {
      case "New":
        sortField = { createdAt: -1 };
        break;
      case "Popular":
        sortField = { views: -1 };
        break;
      case "Updates":
        sortField = { updatedAt: -1 };
        break;
      case "Rank":
        sortField = { rank: 1 };
        break;
      default:
        sortField = { createdAt: -1 }; // Default sort by newest
    }

    // Filtering parameters
    const filters = {};
    if (req.query.status && req.query.status !== "All") {
      filters.status = req.query.status;
    }
    if (req.query.category && req.query.category !== "All") {
      filters.categories = req.query.category; // Assumes categories is a single value or array; adjust if needed
    }

    const novels = await Novel.find(filters)
      .sort(sortField)
      .skip(skip)
      .limit(limit);

    const totalNovels = await Novel.countDocuments(filters);
    res.status(200).json({
      novels,
      pagination: {
        total: totalNovels,
        page,
        limit,
        totalPages: Math.ceil(totalNovels / limit),
      },
    });
  } catch (error) {
    console.error("Error in listAllNovels:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getNovelComments = async (req, res) => {
  try {
    const { novelId } = req.params;
    const { filter } = req.query;
    let { page, limit } = req.query;

    page = parseInt(page, 10) || 1; // Defaults to page 1
    limit = parseInt(limit, 10) || 20; // Defaults to limit 20

    if (page <= 0) page = 1; // Ensure page is positive
    if (limit <= 0 || limit > 100) limit = 20; // Ensure limit is within range

    if (!mongoose.Types.ObjectId.isValid(novelId)) {
      return res.status(400).json({ message: "Invalid novel ID" });
    }

    let query = { novelId: novelId };
    let sort = { createdAt: -1 }; // Default sorting: newest

    if (filter === "mostLikedThisWeek") {
      const now = new Date();
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - 7);
      query.createdAt = { $gte: startOfWeek, $lte: now };
      sort = { likeCount: -1 };
    } else if (filter === "mostLikedThisMonth") {
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      query.createdAt = { $gte: startOfMonth, $lte: endOfMonth };
      sort = { likeCount: -1 };
    } else if (filter === "mostLikedAllTime") {
      sort = { likeCount: -1 };
    }

    const skip = (page - 1) * limit;

    // Fetch comments
    const comments = await Comment.find(query)
      .populate("userId", "-hash -salt -about -lastActivity")
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .lean();

    // Calculate likeCount dynamically
    const commentsWithLikeCount = comments.map(comment => ({
      ...comment,
      likeCount: comment.likes.length,
    }));

    // Sort comments by likeCount if required
    if (
      ["mostLikedThisWeek", "mostLikedThisMonth", "mostLikedAllTime"].includes(
        filter
      )
    ) {
      commentsWithLikeCount.sort((a, b) => b.likeCount - a.likeCount);
    }

    // Count total number of comments for this novel
    const totalComments = await Comment.countDocuments(query);

    res.status(200).json({
      comments: commentsWithLikeCount,
      currentPage: page,
      totalPages: Math.ceil(totalComments / limit),
      totalComments,
    });
  } catch (err) {
    console.error("Error fetching comments:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getNovelReviews = async (req, res) => {
  try {
    const { novelId } = req.params;
    let { page, limit } = req.query;

    page = parseInt(page, 10) || 1; // Defaults to page 1
    limit = parseInt(limit, 10) || 20; // Defaults to limit 20

    if (page <= 0) page = 1; // Ensure page is positive
    if (limit <= 0 || limit > 100) limit = 20; // Ensure limit is within range

    if (!mongoose.Types.ObjectId.isValid(novelId)) {
      return res.status(400).json({ message: "Invalid novel ID" });
    }

    const skip = (page - 1) * limit;

    const novelIdObject = mongoose.Types.ObjectId.createFromHexString(novelId);

    // Fetch reviews with user details
    const reviews = await Review.find({
      novelId: novelIdObject,
    })
      .populate({
        path: "userId",
        select: "-hash -salt -lastActivity -about", // Select specific fields from User model
      })
      .sort({ createdAt: -1 }) // Sort by creation date, newest first
      .skip(skip)
      .limit(limit)
      .lean();

    // Calculate likeCount dynamically
    const reviewsWithLikeCount = reviews.map(review => ({
      ...review,
      likeCount: review.likes.length,
    }));

    // Count total number of reviews for this novel
    const totalReviews = await Review.countDocuments({
      novelId: novelIdObject,
    });

    res.status(200).json({
      reviews: reviewsWithLikeCount,
      currentPage: page,
      totalPages: Math.ceil(totalReviews / limit),
      totalReviews,
    });
  } catch (err) {
    console.error("Error fetching reviews:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getChapter = async (req, res) => {
  const { novelId } = req.params;
  let { chapterNumber } = req.params;
  chapterNumber = Number(chapterNumber);

  try {
    // Find the novel by its ID
    const novel = await Novel.findById(novelId);

    if (!novel) {
      return res.status(404).json({ message: "Novel not found" });
    }

    // Find the chapter by chapterNumber
    const chapter = novel.chapters.find(
      ch => parseInt(ch.chapterNumber) === parseInt(chapterNumber)
    );

    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }

    // If chapter is found, return it
    return res.status(200).json(chapter);
  } catch (error) {
    // Handle potential errors
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

const getChapterComments = async (req, res) => {
  try {
    const { novelId, chapterNumber } = req.params;
    let { page, limit } = req.query;

    page = parseInt(page, 10) || 1; // Defaults to page 1
    limit = parseInt(limit, 10) || 20; // Defaults to limit 20

    if (page <= 0) page = 1; // Ensure page is positive
    if (limit <= 0 || limit > 100) limit = 20; // Ensure limit is within range

    if (!mongoose.Types.ObjectId.isValid(novelId)) {
      return res.status(400).json({ message: "Invalid novel ID" });
    }

    const novelObjectId = mongoose.Types.ObjectId.createFromHexString(novelId);

    // Define the query
    const query = {
      novelId: novelObjectId,
      chapterNumber: parseInt(chapterNumber, 10),
    };

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Fetch comments
    const comments = await Comment.find(query)
      .populate("userId", "-hash -salt -about -lastActivity") // Populate userId excluding certain fields
      .sort({ createdAt: -1 }) // Sort by creation date, newest first
      .skip(skip)
      .limit(limit)
      .lean(); // Convert to plain JavaScript objects for easier manipulation

    // Count total number of comments for this chapter
    const totalComments = await Comment.countDocuments(query);

    res.status(200).json({
      comments,
      currentPage: page,
      totalPages: Math.ceil(totalComments / limit),
      totalComments,
    });
  } catch (err) {
    console.error("Error fetching chapter comments:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const createComment = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { novelId } = req.params;
    const { text } = req.body;
    let { chapterNumber } = req.body;
    if (!chapterNumber) chapterNumber = null;
    const userId = req.user._id;

    // Validate novel ID
    if (!mongoose.Types.ObjectId.isValid(novelId)) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "Invalid novel ID" });
    }

    // Check if the novel exists
    const novelExists = await Novel.findById(novelId).session(session);
    if (!novelExists) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Novel not found" });
    }

    // Create the new comment
    const newComment = new Comment({
      novelId,
      userId,
      text,
      chapterNumber,
    });

    await newComment.save({ session });

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    res
      .status(201)
      .json({ message: "Comment created successfully", comment: newComment });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error creating comment:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const updateNovelRating = async (novelId, session = null) => {
  const isTransaction = !!session;

  if (isTransaction && !session) {
    throw new Error("A session must be provided for this operation.");
  }

  const transactionSession = session || (await mongoose.startSession());
  if (!session) transactionSession.startTransaction();

  try {
    const reviews = await Review.find({ novelId }).session(transactionSession);

    const reviewCount = reviews.length;
    let averageRating = 0;

    if (reviewCount > 0) {
      averageRating =
        reviews.reduce((total, review) => total + review.rating, 0) /
        reviewCount;
    }

    // Use $set to only update specific fields and avoid affecting timestamps
    await Novel.findByIdAndUpdate(
      novelId,
      {
        $set: {
          rating: averageRating,
          reviewCount: reviewCount,
        },
      },
      { session: transactionSession, timestamps: false }
    );

    if (!session) await transactionSession.commitTransaction();
  } catch (error) {
    console.error("Transaction error:", error);
    if (!session) await transactionSession.abortTransaction();
    throw error; // Re-throw the error after aborting the transaction
  } finally {
    if (!session) transactionSession.endSession();
  }
};

const createReview = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { novelId } = req.params;
    const { text, rating } = req.body;
    const userId = req.user._id;

    // Validate novel ID
    if (!mongoose.Types.ObjectId.isValid(novelId)) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "Invalid novel ID" });
    }

    // Check if the novel exists
    const novelExists = await Novel.findById(novelId).session(session);
    if (!novelExists) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Novel not found" });
    }

    // Check for duplicate review
    const existingReview = await Review.findOne({
      novelId,
      userId,
      text,
      rating,
    }).session(session);

    if (existingReview) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "Duplicate review detected" });
    }

    // Create the new review
    const newReview = new Review({
      novelId,
      userId,
      text,
      rating,
    });

    await newReview.save({ session });

    // Update novel rating
    await updateNovelRating(novelId, session);

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    res
      .status(201)
      .json({ message: "Review created successfully", review: newReview });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    if (err.code === 11000) {
      return res.status(400).json({
        message:
          "Duplicate review detected, delete your review to add another!",
      });
    }
    console.error("Error creating review:", err.message);
    res.status(500).json({ message: err.message });
  }
};

const updateUserProgress = async (req, res) => {
  // Validation logic
  await Promise.all([
    body("novelId").isMongoId().withMessage("Invalid novel ID").run(req),
    body("chapterNumber")
      .isInt({ min: 1 })
      .withMessage("Chapter number must be a positive integer")
      .run(req),
    body("completed")
      .optional()
      .isBoolean()
      .withMessage("Completed must be a boolean")
      .run(req),
  ]);

  // Check validation result
  const errors = handleValidationErrors(req, res);
  if (errors) return;

  try {
    const { novelId, chapterNumber, completed } = req.body;
    const userId = req.user._id;

    // Find the progress document for the user and novel
    let progress = await UserProgress.findOne({ userId, novelId });

    if (progress) {
      // Check if the progress needs updating
      const isProgressChanged =
        progress.lastReadChapter !== chapterNumber ||
        progress.completed !==
          (completed !== undefined ? completed : progress.completed);

      if (!isProgressChanged) {
        return res.status(200).json({ message: "No changes in progress" });
      }

      // Update the progress only if there are changes
      progress.lastReadChapter = chapterNumber;
      if (completed !== undefined) {
        progress.completed = completed;
      }
    } else {
      // Create new progress if it doesn't exist
      progress = new UserProgress({
        userId,
        novelId,
        lastReadChapter: chapterNumber,
        completed: !!completed,
      });
    }

    progress.lastReadDate = new Date();
    await progress.save();

    // Update the user's last activity
    const user = await User.findById(userId);
    if (user) {
      user.lastActivity = new Date();
      await user.save();
    }

    res
      .status(200)
      .json({ message: "Progress updated successfully", progress });
  } catch (err) {
    console.error("Error in updateUserProgress:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getUserProgress = async (req, res) => {
  try {
    const { novelId } = req.params;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(novelId)) {
      return res.status(400).json({ message: "Invalid novel ID" });
    }

    const progress = await UserProgress.findOne({ userId, novelId });

    if (!progress) {
      return res
        .status(404)
        .json({ message: "No progress found for this novel" });
    }

    res.status(200).json({ progress });
  } catch (err) {
    console.error("Error in getUserProgress:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

const searchNovels = async (req, res) => {
  const validateQueryParams = [
    check("search")
      .isString()
      .withMessage("Search term must be a string")
      .isLength({ min: 3 })
      .withMessage("Search must be atleast 3 characters"),
  ];

  try {
    // Validate query parameters
    await Promise.all(
      validateQueryParams.map(validation => validation.run(req))
    );
    const errors = handleValidationErrors(req, res);
    if (errors) return;

    // Get search term
    const searchTerm = req.query.search || "";

    // Create regex for case-insensitive search
    const searchRegex = new RegExp(searchTerm, "i"); // 'i' flag for case-insensitive search

    // Retrieve novels with search term
    const novels = await Novel.find({
      title: { $regex: searchRegex }, // Search for titles that contain the search term
    });

    res.status(200).json({ novels });
  } catch (error) {
    console.error("Error in searchNovels:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const updateChapter = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Validation
    const validateRequest = [
      check("novelId").notEmpty().isMongoId().withMessage("Invalid novel ID"),
      check("chapterNumber")
        .optional()
        .notEmpty()
        .isInt({ min: 1 })
        .withMessage("Chapter number must be a positive integer"),
      check("title")
        .optional()
        .isString()
        .withMessage("Title must be a string"),
      // No validation for textFileUrl as it will be handled as a file upload
    ];

    await Promise.all(validateRequest.map(validation => validation.run(req)));
    const errors = handleValidationErrors(req, res);
    if (errors) return;

    const { novelId, chapterNumber } = req.params;
    const { title, newChapterNumber } = req.body;

    // Find the novel
    const novel = await Novel.findById(novelId).session(session);
    if (!novel) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Novel not found" });
    }

    // Find the chapter
    const chapter = novel.chapters.find(
      chap => chap.chapterNumber === Number(chapterNumber)
    );

    if (!chapter) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Chapter not found" });
    }

    // Handle file upload if a new file is provided
    if (req.file) {
      // If the chapter already has a file, delete the old one
      if (chapter.textFileUrl) {
        const oldFilePublicId = chapter.textFileUrl
          .split("/")
          .pop()
          .split(".")[0];
        await cloudinary.uploader.destroy(
          `lnworld/${novelId}/novel_chapters/${oldFilePublicId}`
        );
      }

      // Upload the new file
      const uploadedResponse = await uploadFileToCloudinary(
        req.file.buffer,
        `chapter-${chapterNumber}`,
        novelId
      );
      chapter.textFileUrl = uploadedResponse; // Update the chapter with the new file URL
    }

    // Update chapter details
    if (title) chapter.title = title;
    if (newChapterNumber) chapter.chapterNumber = newChapterNumber;

    // Save the updated novel
    await novel.save({ session });

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "Chapter updated successfully", chapter });
  } catch (err) {
    // Abort transaction and handle errors
    await session.abortTransaction();
    session.endSession();
    console.error("Error in updateChapter:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteComment = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { commentId } = req.params;
    const userId = req.user._id;

    // Check if the comment exists
    const commentExists = await Comment.findById(commentId).session(session);
    if (!commentExists) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ error: "Comment not found!" });
    }

    // Check if the user is authorized
    if (userId.toString() !== commentExists.userId.toString()) {
      await session.abortTransaction();
      session.endSession();
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Delete the comment
    await Comment.deleteOne({ _id: commentId }).session(session);

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    // Abort transaction and handle errors
    await session.abortTransaction();
    session.endSession();
    console.error("Error deleting comment:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteReview = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { reviewId, novelId } = req.params;
    const userId = req.user._id;

    // Check if the review exists
    const reviewExists = await Review.findById(reviewId).session(session);
    if (!reviewExists) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ error: "Review not found!" });
    }

    // Check if the user is authorized
    if (userId.toString() !== reviewExists.userId.toString()) {
      await session.abortTransaction();
      session.endSession();
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Delete the review
    await Review.deleteOne({ _id: reviewId }).session(session);

    // Update the novel rating
    await updateNovelRating(novelId, session);

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
    // Abort transaction and handle errors
    await session.abortTransaction();
    session.endSession();
    console.error("Error deleting review:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const updateComment = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const validations = [
    body("rating")
      .optional()
      .isInt({ min: 1, max: 5 })
      .withMessage("Rating must be an integer between 1 and 5"),

    body("text")
      .optional()
      .isString()
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Text is required")
      .isLength({ min: 3 })
      .withMessage("Minimum lenght is 3 characters!"),
  ];

  await Promise.all(validations.map(validation => validation.run(req)));

  try {
    const errors = handleValidationErrors(req, res);
    if (errors) {
      await session.abortTransaction();
      session.endSession();
      return;
    }

    let { commentId } = req.params;
    const { text } = req.body;
    commentId = mongoose.Types.ObjectId.createFromHexString(commentId);
    const userId = req.user._id;

    const comment = await Comment.findById(commentId).session(session);
    if (!comment) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ error: "Comment not found!" });
    }

    // Check if the authenticated user is the owner of the comment
    if (userId.toString() !== comment.userId.toString()) {
      await session.abortTransaction();
      session.endSession();
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Update the comment text
    comment.text = text;
    await comment.save({ session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "Comment updated successfully", comment });
  } catch (err) {
    // Abort transaction and handle errors
    await session.abortTransaction();
    session.endSession();
    console.error("Error updating comment:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const updateReview = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { reviewId, novelId } = req.params;
    const userId = req.user._id;
    const { text, rating } = req.body;

    const errors = handleValidationErrors(req, res);
    if (errors) {
      await session.abortTransaction();
      session.endSession();
      return;
    }

    // Check if the review exists
    const review = await Review.findById(reviewId).session(session);
    if (!review) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ error: "Review not found!" });
    }

    // Check if the authenticated user is the owner of the review
    if (userId.toString() !== review.userId.toString()) {
      await session.abortTransaction();
      session.endSession();
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Update the review text and rating
    if (text) review.text = text;
    if (rating) review.rating = rating;
    await review.save({ session });

    // Update the novel rating
    await updateNovelRating(novelId, session);

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "Review updated successfully", review });
  } catch (err) {
    // Abort transaction and handle errors
    await session.abortTransaction();
    session.endSession();
    console.error("Error updating review:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const commentLikeDislike = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user._id;
    const { type } = req.body;

    // Validate the type of action
    if (!["like", "dislike"].includes(type)) {
      return res
        .status(400)
        .json({ error: "Invalid action type. Must be 'like' or 'dislike'." });
    }

    // Find the comment
    let comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ error: "Comment not found" });

    const update = {};
    if (type === "like") {
      if (comment.likes.includes(userId)) {
        update.$pull = { likes: userId };
      } else {
        update.$pull = { dislikes: userId };
        update.$addToSet = { likes: userId };
      }
    } else if (type === "dislike") {
      if (comment.dislikes.includes(userId)) {
        update.$pull = { dislikes: userId };
      } else {
        update.$pull = { likes: userId };
        update.$addToSet = { dislikes: userId };
      }
    }

    // Ensure that `update` contains the necessary fields before attempting to save
    if (Object.keys(update).length === 0) {
      return res.status(400).json({ error: "No update required" });
    }

    // Perform the update
    comment = await Comment.findOneAndUpdate({ _id: commentId }, update, {
      new: true,
      fields: { likes: 1, dislikes: 1 },
    });

    if (!comment) return res.status(404).json({ error: "Comment not found" });

    res.status(200).json({
      message: `${
        type.charAt(0).toUpperCase() + type.slice(1)
      } action performed successfully`,
      comment: comment,
    });
  } catch (err) {
    console.error("Error toggling like/dislike:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const reviewLikeDislike = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user._id;
    const { type } = req.body;

    // Validate the type of action
    if (!["like", "dislike"].includes(type)) {
      return res
        .status(400)
        .json({ error: "Invalid action type. Must be 'like' or 'dislike'." });
    }

    // Find the review
    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ error: "Review not found" });

    const update = {};
    if (type === "like") {
      if (review.likes.includes(userId)) {
        update.$pull = { likes: userId }; // Remove like
      } else {
        update.$pull = { dislikes: userId }; // Remove dislike if exists
        update.$addToSet = { likes: userId }; // Add like
      }
    } else if (type === "dislike") {
      if (review.dislikes.includes(userId)) {
        update.$pull = { dislikes: userId }; // Remove dislike
      } else {
        update.$pull = { likes: userId }; // Remove like if exists
        update.$addToSet = { dislikes: userId }; // Add dislike
      }
    }

    // Ensure that `update` contains the necessary fields before attempting to save
    if (Object.keys(update).length === 0) {
      return res.status(400).json({ error: "No update required" });
    }

    // Perform the update and get the updated review
    const updatedReview = await Review.findOneAndUpdate(
      { _id: reviewId },
      update,
      {
        new: true, // Return the updated document
        fields: { likes: 1, dislikes: 1 }, // Only return the fields you need
      }
    );

    if (!updatedReview)
      return res.status(404).json({ error: "Review not found" });

    res.status(200).json(updatedReview);
  } catch (err) {
    console.error("Error toggling like/dislike:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getRankingPageNovels = async (req, res) => {
  const validateQueryParams = [
    check("sortBy")
      .optional()
      .isIn([
        "Reads",
        "Ranking",
        "Rating",
        "Collections",
        "Comments",
        "Reviews",
      ])
      .withMessage("SortBy must be one of the allowed"),
  ];

  try {
    // Validate query parameters
    await Promise.all(
      validateQueryParams.map(validation => validation.run(req))
    );
    const errors = handleValidationErrors(req, res);
    if (errors) {
      return res.status(400).json({ errors: errors });
    }

    // Pagination parameters
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 100;
    const skip = (page - 1) * limit;

    // Sorting parameters
    const sortBy = req.query.sortBy || "New"; // Default to "New"

    // Determine sorting field based on sortBy value
    let sortField;
    switch (sortBy) {
      case "Reads":
        sortField = { views: -1 };
        break;
      case "Collections":
        sortField = { bookmarkCount: -1 };
        break;
      case "Ranking":
        sortField = { rank: 1 };
        break;
      case "Rating":
        sortField = { rating: -1 };
        break;
      case "Comments":
        sortField = { commentsCount: -1 };
        break;
      case "Reviews":
        sortField = { reviewCount: -1 };
        break;
      default:
        sortField = { createdAt: -1 }; // Default sort by newest
        break;
    }

    const novels = await Novel.find({})
      .sort(sortField)
      .skip(skip)
      .limit(limit)
      .select("-chapters")
      .exec();

    res.status(200).json({ novels });
  } catch (error) {
    console.error("Error in getRankingPageNovels:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getRankings = async (req, res) => {
  try {
    // Get top novels by comments
    const topByComments = await Novel.find({})
      .sort({ commentsCount: -1 })
      .limit(100)
      .select("-chapters")
      .exec();

    // Get top novels by views
    const topByViews = await Novel.find({})
      .sort({ views: -1 })
      .limit(100)
      .select("-chapters")
      .exec();

    // Get top novels by ratings
    const topByRatings = await Novel.find({})
      .sort({ rating: -1 })
      .limit(100)
      .select("-chapters")
      .exec();

    res.status(200).json({
      topByComments,
      topByViews,
      topByRatings,
    });
  } catch (error) {
    console.error("Error retrieving rankings:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export {
  createNovel,
  getNovel,
  addChaptersToNovel,
  removeChaptersFromNovel,
  updateNovel,
  deleteNovel,
  getNovelComments,
  getChapterComments,
  getNovelReviews,
  createComment,
  createReview,
  updateUserProgress,
  getUserProgress,
  listAllNovels,
  searchNovels,
  updateChapter,
  deleteComment,
  deleteReview,
  updateComment,
  updateReview,
  commentLikeDislike,
  reviewLikeDislike,
  getRankings,
  getRankingPageNovels,
  updateNovelRating,
  getChapter,
};
