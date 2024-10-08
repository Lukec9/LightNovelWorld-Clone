import express from "express";
import addView from "../controllers/view.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import {
  addChaptersToNovel,
  commentLikeDislike,
  createComment,
  createNovel,
  createReview,
  deleteComment,
  deleteNovel,
  deleteReview,
  getAuthorNovels,
  getChapter,
  getChapterComments,
  getNovel,
  getNovelComments,
  getNovelReviews,
  getRankingPageNovels,
  getRankings,
  getUserProgress,
  listAllNovels,
  removeChaptersFromNovel,
  reviewLikeDislike,
  searchNovels,
  searchNovelsByTag,
  updateChapter,
  updateComment,
  updateNovel,
  updateReview,
  updateUserProgress,
} from "../controllers/novel.controller.js";
import requireRole from "../middleware/requireRole.js";
import { upload } from "../cloudinaryConfig.js";
import validationSchemas from "../validationSchemas.js";
import {
  addBookmark,
  getBookmarkedNovel,
  removeBookmark,
} from "../controllers/bookmark.controller.js";

const router = express.Router();

router.get("/", listAllNovels);
router.get("/novel", getNovel);
router.get("/search", searchNovels);
router.get("/tag", searchNovelsByTag);
router.get("/author", getAuthorNovels);
router.get("/rankings", getRankings);
router.get("/rankingspage", getRankingPageNovels);
router.put("/progress", protectRoute, updateUserProgress);

router.post(
  "/",
  protectRoute,
  requireRole(["Admin"]),
  // upload.single("cover"),
  createNovel
);

router
  .route("/:novelId")
  .put(protectRoute, requireRole(["Admin"]), updateNovel)
  .delete(protectRoute, requireRole(["Admin"]), deleteNovel);

router.post("/:novelId/count", addView);
router.get("/:novelId/progress", protectRoute, getUserProgress);

router
  .route("/:novelId/comments")
  .get(getNovelComments)
  .post(validationSchemas.commentValidation, protectRoute, createComment);

router
  .route("/:novelId/comments/:commentId")
  .put(validationSchemas.commentValidation, protectRoute, updateComment)
  .delete(protectRoute, deleteComment);

router.patch(
  "/:novelId/comments/:commentId/like",
  protectRoute,
  commentLikeDislike
);

router.get("/:novelId/reviews", getNovelReviews);
router.post(
  "/:novelId/reviews",
  validationSchemas.reviewValidation,
  protectRoute,
  createReview
);
router
  .route("/:novelId/reviews/:reviewId")
  .put(protectRoute, updateReview)
  .delete(protectRoute, deleteReview);

router.patch(
  "/:novelId/reviews/:reviewId/like",
  protectRoute,
  reviewLikeDislike
);

router.post(
  "/:novelId/chapters",
  validationSchemas.chapterValidation,
  protectRoute,
  requireRole(["Admin"]),
  upload.array("files"),
  addChaptersToNovel
);
router.post(
  "/:novelId/chapters/delete",
  protectRoute,
  requireRole(["Admin"]),
  removeChaptersFromNovel
);
router.get("/:novelId/chapters/:chapterNumber", getChapter);
router.get("/:novelId/chapters/:chapterNumber/comments", getChapterComments);
router.put(
  "/:novelId/chapters/:chapterNumber",
  protectRoute,
  requireRole(["Admin"]),
  upload.single("textFile"),
  updateChapter
);

router
  .route("/:novelId/bookmarks")
  .get(protectRoute, getBookmarkedNovel)
  .post(protectRoute, addBookmark)
  .delete(protectRoute, removeBookmark);

export default router;
