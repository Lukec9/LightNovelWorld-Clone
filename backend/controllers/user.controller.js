import User from "../models/user.model.js";

import { validationResult } from "express-validator";
import mongoose from "mongoose";
import passport from "passport";

const signupUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, username, password } = req.body;
    const foundUser = await User.findOne({ $or: [{ email }, { username }] });

    if (foundUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    const user = new User({ email, username });
    user.lastActivity = new Date();
    user.role = "Reader";
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
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { email, username, password, about } = req.body;

    if (email) user.email = email;
    if (username) user.username = username;
    if (about) user.about = about;
    if (password) {
      await user.setPassword(password);
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

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
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

export { signupUser, loginUser, updateUser, deleteUser, getUserProfile };
