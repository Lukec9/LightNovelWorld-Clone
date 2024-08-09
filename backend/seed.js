import mongoose from "mongoose";
import Novel from "./models/novel.model.js";
import dotenv from "dotenv";

dotenv.config();

const novels = [
  {
    title: "The Rising of the Shield Hero",
    slugTitle: "the-rising-of-the-shield-hero",
    author: "Aneko Yusagi",
    summary:
      "Naofumi Iwatani, an ordinary man, is summoned to another world as the Shield Hero. Facing betrayal and adversity, he must rise to protect the world and find his path to redemption.",
    categories: ["Fantasy", "Adventure"],
    tags: ["Isekai", "Action"],
    rating: 4.5,
    rank: 1,
    chapters: ["Chapter 1", "Chapter 2", "Chapter 3"],
    views: 12000,
    bookmarkCount: 5000,
    status: "Ongoing",
  },
  {
    title: "Overlord",
    slugTitle: "overlord",
    author: "Kugane Maruyama",
    summary:
      "In a virtual reality game, a powerful undead overlord remains as the game servers shut down. He embarks on a journey to conquer the new world he finds himself in.",
    categories: ["Fantasy", "Adventure"],
    tags: ["Isekai", "Dark Fantasy"],
    rating: 4.7,
    rank: 2,
    chapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4"],
    views: 15000,
    bookmarkCount: 6000,
    status: "Ongoing",
  },
  {
    title: "No Game No Life",
    slugTitle: "no-game-no-life",
    author: "Yuu Kamiya",
    summary:
      "Siblings Sora and Shiro, unbeatable gamers, are transported to a world where everything is decided by games. They aim to challenge the enigmatic beings ruling this world.",
    categories: ["Fantasy", "Adventure"],
    tags: ["Isekai", "Game"],
    rating: 4.6,
    rank: 3,
    chapters: ["Chapter 1", "Chapter 2"],
    views: 10000,
    bookmarkCount: 4500,
    status: "Ongoing",
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("connected to db");

    await Novel.deleteMany({});

    await Novel.insertMany(novels);

    console.log("Novels seeded successfully");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding the database:", error);
    mongoose.connection.close();
  }
};

seedDB();
