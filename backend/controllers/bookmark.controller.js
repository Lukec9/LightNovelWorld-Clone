import Bookmark from "../models/bookmark.model.js";
import Novel from "../models/novel.model.js";
import UserProgress from "../models/userProgress.model.js";

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
    await Novel.findByIdAndUpdate(
      novelId,
      { $inc: { bookmarkCount: 1 } },
      { timestamps: false }
    );

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

    await Novel.findByIdAndUpdate(
      novelId,
      { $inc: { bookmarkCount: -1 } },
      { timestamps: false }
    );

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
  const filterCompletedNovels = async (novels, userId) => {
    const completedNovelIds = await UserProgress.find({
      userId,
      completed: true,
    }).select("novelId");
    const completedNovelIdsSet = new Set(
      completedNovelIds.map(progress => progress.novelId.toString())
    );
    return novels.filter(novel =>
      completedNovelIdsSet.has(novel._id.toString())
    );
  };

  const sortByLastUpdated = novels => {
    return novels.sort((a, b) => b.updatedAt - a.updatedAt);
  };

  const sortByLastAdded = (bookmarks, filteredNovels) => {
    const filteredNovelIds = new Set(
      filteredNovels.map(novel => novel._id.toString())
    );
    return bookmarks
      .filter(bookmark => filteredNovelIds.has(bookmark.novelId._id.toString()))
      .sort((a, b) => b.createdAt - a.createdAt)
      .map(bookmark => bookmark.novelId);
  };

  const sortByLastRead = async (novels, userId) => {
    const userProgress = await UserProgress.find({ userId }).select(
      "novelId lastReadDate"
    );
    // Create a map for quick access to lastReadDate by novelId
    const lastReadMap = new Map(
      userProgress.map(progress => [
        progress.novelId.toString(),
        new Date(progress.lastReadDate),
      ])
    );

    return novels.sort((a, b) => {
      const lastReadA = lastReadMap.get(a._id.toString()) || new Date(0);
      const lastReadB = lastReadMap.get(b._id.toString()) || new Date(0);

      if (lastReadA > lastReadB) return -1; // A comes before B
      if (lastReadA < lastReadB) return 1; // B comes before A
      return 0; // Dates are the same, retain original order
    });
  };

  try {
    const userId = req.user._id;
    const { sort, filter } = req.query;

    // Fetch bookmarks
    const bookmarks = await Bookmark.find({ userId })
      .populate("novelId")
      .exec();

    let novels = bookmarks.map(bookmark => bookmark.novelId);

    // Apply filtering
    if (filter === "completed") {
      novels = await filterCompletedNovels(novels, userId);
    }

    // Apply sorting
    if (sort === "last updated") {
      novels = sortByLastUpdated(novels);
    } else if (sort === "last added") {
      novels = sortByLastAdded(bookmarks, novels);
    } else if (sort === "last read") {
      novels = await sortByLastRead(novels, userId);
    }

    res.status(200).json({ novels });
  } catch (error) {
    console.error("Error fetching bookmarked novels:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getBookmarkedNovel = async (req, res) => {
  try {
    const userId = req.user._id;
    const { novelId } = req.params;

    const bookmark = await Bookmark.find({ userId, novelId }).exec();
    if (!bookmark || bookmark.length === 0)
      return res
        .status(404)
        .json({ message: "Novel is not bookmarked/No bookmark found" });

    res.status(200).json({ bookmark });
  } catch (error) {
    console.error("Error fetching bookmarked novels:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export { addBookmark, removeBookmark, getBookmarkedNovels, getBookmarkedNovel };
