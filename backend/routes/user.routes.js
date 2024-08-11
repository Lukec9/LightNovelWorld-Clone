import express from "express";
import {
  deleteUser,
  getUserComments,
  getUserProfile,
  getUserReviews,
  loginUser,
  logoutUser,
  signupUser,
  updateUser,
} from "../controllers/user.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import { upload } from "../cloudinaryConfig.js";
import validationSchemas from "../validationSchemas.js";
import { getBookmarkedNovels } from "../controllers/bookmark.controller.js";

const router = express.Router();

router.get("/profile/:query", protectRoute, getUserProfile);
router.get("/bookmarks", protectRoute, getBookmarkedNovels);
router.post(
  "/signup",
  validationSchemas.userValidation,
  upload.single("image"),
  signupUser
);
router.post("/login", validationSchemas.userValidation, loginUser);
router.post("/logout", protectRoute, logoutUser);
router.put(
  "/update/:id",
  protectRoute,
  upload.single("profilePic"),
  updateUser
);
router.delete("/:id/", protectRoute, deleteUser);
router.get("/:id/comments", protectRoute, getUserComments);
router.get("/:id/reviews", protectRoute, getUserReviews);

export default router;
