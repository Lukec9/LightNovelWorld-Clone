import Bookmark from "../models/bookmark.model.js";
import Novel from "../models/novel.model.js";

const addBookmark = async (req, res) => {
  try {
    const userId = req.user._id;
    const { novelId } = req.params;

    // Check if the novel exists (optional, but good practice)
    const novel = await Novel.findById(novelId);
    if (!novel) {
      return res.status(404).json({ message: "Novel not found" });
    }

    const bookmarkCount = await Bookmark.countDocuments({ userId });
    if (bookmarkCount >= 20) {
      return res.status(400).json({
        error:
          "Bookmark limit reached. Please remove a bookmark before adding a new one.",
      });
    }

    const existingBookmark = await Bookmark.findOne({ userId, novelId });
    if (existingBookmark) {
      return res.status(400).json({
        error: "Novel already bookmarked by this user",
      });
    }

    await Bookmark.create({ userId, novelId });
    await Novel.findByIdAndUpdate(novelId, { $inc: { bookmarkCount: 1 } });

    res.status(201).json({ message: "Bookmark added successfully" });
  } catch (error) {
    console.error("Error adding bookmark:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const removeBookmark = async (req, res) => {
  try {
    const userId = req.user._id;
    const { novelId } = req.params;

    const result = await Bookmark.deleteOne({ userId, novelId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Bookmark not found" });
    }

    await Novel.findByIdAndUpdate(novelId, { $inc: { bookmarkCount: -1 } });

    res.status(200).json({ message: "Bookmark removed successfully" });
  } catch (error) {
    console.error("Error removing bookmark:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// const getBookmarkCount = async (req, res) => {
//   try {
//     const { novelId } = req.params;

//     const novel = await Novel.findById(novelId);
//     if (!novel) {
//       return res.status(404).json({ message: "Novel not found" });
//     }

//     const count = await Bookmark.countDocuments({ novelId });

//     res.status(200).json({ count });
//   } catch (error) {
//     console.error("Error fetching bookmark count:", error.message);
//     res.status(500).json({ message: "Server error" });
//   }
// };

const getBookmarkedNovels = async (req, res) => {
  try {
    const userId = req.user._id;

    const bookmarks = await Bookmark.find({ userId })
      .populate("novelId")
      .exec();
    const novels = bookmarks.map(bookmark => bookmark.novelId);

    res.status(200).json({ novels });
  } catch (error) {
    console.error("Error fetching bookmarked novels:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export { addBookmark, removeBookmark, getBookmarkedNovels };
