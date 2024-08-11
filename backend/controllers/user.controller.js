import User from "../models/user.model.js";
import Review from "../models/review.model.js";
import Comment from "../models/comment.model.js";

import { validationResult, body } from "express-validator";
import mongoose from "mongoose";
import passport from "passport";
import uploadToCloudinary from "../utils/uploadImage.js";
import { cloudinary } from "../cloudinaryConfig.js";

const signupUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let img = req.file;

    const { email, username, password } = req.body;
    const foundUser = await User.findOne({ $or: [{ email }, { username }] });

    if (foundUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    const user = new User({ email, username, role: "Reader" });
    user.lastActivity = new Date();
    if (img) {
      const result = await uploadToCloudinary(img.buffer, "pfps");
      user.profilePic = result.secure_url;
    }

    const registeredUser = await User.register(user, password);
    req.login(registeredUser, err => {
      if (err) return next(err);
    });
    const userResponse = registeredUser.toObject();
    delete userResponse.hash;
    delete userResponse.salt;
    res
      .status(201)
      .json({ message: "User created successfully", userResponse });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in signupUser: ", err.message);
  }
};

const loginUser = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({ error: info.message });
    }

    req.login(user, err => {
      if (err) {
        return next(err);
      }
      const userResponse = user.toObject();
      delete userResponse.hash;
      delete userResponse.salt;
      res.status(200).json({ message: "Logged in successfully", userResponse });
    });
  })(req, res, next);
};

const updateUser = async (req, res, next) => {
  await Promise.all([
    body("email")
      .optional()
      .isEmail()
      .withMessage("Invalid email format")
      .run(req),
    body("username")
      .optional()
      .isString()
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long")
      .run(req),
    body("password")
      .optional()
      .isString()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")
      .run(req),
    body("about")
      .optional()
      .isString()
      .withMessage("About section must be a string")
      .run(req),
  ]);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { id } = req.params;
    const currentUser = req.user._id;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (id !== currentUser.toString())
      return res
        .status(400)
        .json({ error: "You cannot update other user's profile" });

    const { email, username, password, about } = req.body;
    let profilePic = req.file;

    if (email) user.email = email;
    if (username) user.username = username;
    if (about) user.about = about;
    if (password) {
      await user.setPassword(password);
    }
    if (profilePic) {
      if (user.profilePic) {
        const imgId = user.profilePic.split("/").pop().split(".")[0];
        console.log(imgId);
        await cloudinary.uploader.destroy(`lnworld/pfps/${imgId}`);
      }

      const uploadedResponse = await uploadToCloudinary(
        profilePic.buffer,
        "pfps"
      );
      user.profilePic = uploadedResponse.secure_url;
    }
    user.lastActivity = new Date();

    const updatedUser = await user.save();

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (err) {
    console.error("Error in updateUser: ", err.message);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (req.params.id !== id.toString())
      return res.status(401).json({ error: "Unauthorized!" });
    if (user.profilePic) {
      const imgId = user.profilePic.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`lnworld/pfps/${imgId}`);
    }
    User.deleteOne({ id });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error in updateUser: ", error.message);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};

const getUserProfile = async (req, res) => {
  const { query } = req.params;
  try {
    let user;

    if (mongoose.Types.ObjectId.isValid(query)) {
      user = await User.findOne({ _id: query })
        .select("-hash")
        .select("-salt")
        .select("-updatedAt");
    } else {
      user = await User.findOne({ username: query })
        .select("-hash")
        .select("-salt")
        .select("-updatedAt");
    }
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error("Error in getUserProfile: ", err.message);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    req.logout(function (err) {
      if (err) return next(err);
      req.session.destroy(function (err) {
        if (err) return next(err);
        res.status(200).json({ message: "Successfully logged out!" });
      });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error("Error in logoutUser: ", err.message);
  }
};

const getUserReviews = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    if (userId.toString() !== id.toString())
      return res.status(401).json({ error: "Unathorized" });

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ error: "User not found." });
    }

    const reviews = await Review.find({ userId });
    if (!reviews.length) {
      return res
        .status(404)
        .json({ message: "No reviews found for this user" });
    }
    for (const review of reviews) {
      if (userId.toString() !== review.userId.toString())
        return res.status(401).json({ message: "Unathorized" });
    }

    res.status(200).json({ reviews });
  } catch (err) {
    console.error("Error fetching user reviews:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getUserComments = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    if (userId.toString() !== id.toString())
      return res.status(401).json({ error: "Unathorized" });

    // Validate the userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ error: "User not found." });
    }

    // Fetch all comments by the user
    const comments = await Comment.find({ userId });

    if (!comments.length) {
      return res.status(404).json({ error: "No comments found for this user" });
    }

    for (const comment of comments) {
      if (userId.toString() !== comment.userId.toString())
        return res.status(401).json({ message: "Unathorized" });
    }

    res.status(200).json({ comments });
  } catch (err) {
    console.error("Error fetching user comments:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export {
  signupUser,
  loginUser,
  updateUser,
  deleteUser,
  getUserProfile,
  logoutUser,
  getUserComments,
  getUserReviews,
};
