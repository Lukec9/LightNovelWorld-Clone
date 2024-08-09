import Bookmark from "../models/bookmark.model.js";
import Novel from "../models/novel.model.js";

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // Mark operational errors
    Error.captureStackTrace(this, this.constructor);
  }
}

const addBookmark = async (userId, novelId) => {
  const bookmarkCount = await Bookmark.countDocuments({ userId });
  if (bookmarkCount >= 20) {
    throw new AppError(
      "Bookmark limit reached. Please remove a bookmark before adding a new one.",
      400
    );
  }

  const existingBookmark = await Bookmark.findOne({ userId, novelId });
  if (existingBookmark) {
    throw new AppError("Novel already bookmarked by this user", 400);
  }

  await Bookmark.create({ userId, novelId });

  await Novel.findByIdAndUpdate(novelId, { $inc: { bookmarkCount: 1 } });
};

const removeBookmark = async (userId, novelId) => {
  const result = await Bookmark.deleteOne({ userId, novelId });
  if (result.deletedCount === 0) {
    throw new AppError("Bookmark not found", 404);
  }

  await Novel.findByIdAndUpdate(novelId, { $inc: { bookmarkCount: -1 } });
};

const getBookmarkCount = async novelId => {
  const count = await Bookmark.countDocuments({ novelId });
  return count;
};

const getBookmarkedNovels = async userId => {
  const bookmarks = await Bookmark.find({ userId }).populate("novelId").exec();
  return bookmarks.map(bookmark => bookmark.novelId);
};

export { addBookmark, removeBookmark, getBookmarkCount, getBookmarkedNovels };
