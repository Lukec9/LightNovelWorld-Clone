import mongoose from "mongoose";
import Novel from "./models/novel.model.js";
import dotenv from "dotenv";

dotenv.config();

const sampleNovels = [
  {
    title: "Omniscient Reader's Viewpoint",
    slugTitle: "omniscient-readers-viewpoint",
    cover: "https://example.com/omniscient-readers-viewpoint-cover.jpg",
    author: "Sing-Shong",
    summary:
      "A novel reader finds himself in a world he only read about. With the power of omniscient knowledge, he aims to survive and thrive in this new reality.",
    categories: ["Action", "Fantasy", "Adventure"],
    tags: ["Isekai", "Survival", "Drama"],
    rating: 4.9,
    rank: 3,
    chapters: [
      {
        title: "Chapter 1: The Beginning",
        textFileUrl:
          "https://example.com/omniscient-readers-viewpoint-chapter-1.txt",
        chapterNumber: 1,
      },
      // Add more chapters as needed
    ],
    views: 1200000,
    bookmarkCount: 60000,
    status: "Ongoing",
  },
  {
    title: "Overgeared",
    slugTitle: "overgeared",
    cover: "https://example.com/overgeared-cover.jpg",
    author: "Park Saenal",
    summary:
      "An unlucky player in a virtual reality game becomes incredibly powerful after finding a legendary item. He starts on a journey to become the strongest.",
    categories: ["Action", "Adventure", "Fantasy"],
    tags: ["Game", "VR", "Power-Up"],
    rating: 4.6,
    rank: 4,
    chapters: [
      {
        title: "Chapter 1: The Legendary Item",
        textFileUrl: "https://example.com/overgeared-chapter-1.txt",
        chapterNumber: 1,
      },
      // Add more chapters as needed
    ],
    views: 950000,
    bookmarkCount: 45000,
    status: "Ongoing",
  },
  {
    title: "Reverend Insanity",
    slugTitle: "reverend-insanity",
    cover: "https://example.com/reverend-insanity-cover.jpg",
    author: "Gu Zhen Ren",
    summary:
      "A scheming immortal cultivator reincarnates into a world of martial arts and uses his vast knowledge to manipulate and ascend to the top.",
    categories: ["Action", "Fantasy", "Adventure"],
    tags: ["Cultivation", "Immortality", "Strategy"],
    rating: 4.8,
    rank: 5,
    chapters: [
      {
        title: "Chapter 1: The Rebirth",
        textFileUrl: "https://example.com/reverend-insanity-chapter-1.txt",
        chapterNumber: 1,
      },
      // Add more chapters as needed
    ],
    views: 800000,
    bookmarkCount: 35000,
    status: "Ongoing",
  },
  {
    title: "The Legendary Mechanic",
    slugTitle: "the-legendary-mechanic",
    cover: "https://example.com/the-legendary-mechanic-cover.jpg",
    author: "Qi Peijia",
    summary:
      "In a futuristic world, a mechanic becomes the ultimate legend through his knowledge of technology and systems in a game-like environment.",
    categories: ["Action", "Sci-Fi", "Adventure"],
    tags: ["Mechanics", "Futuristic", "Game"],
    rating: 4.7,
    rank: 6,
    chapters: [
      {
        title: "Chapter 1: Awakening",
        textFileUrl: "https://example.com/the-legendary-mechanic-chapter-1.txt",
        chapterNumber: 1,
      },
      // Add more chapters as needed
    ],
    views: 900000,
    bookmarkCount: 40000,
    status: "Ongoing",
  },
  {
    title: "Trash of the Count's Family",
    slugTitle: "trash-of-the-counts-family",
    cover: "https://example.com/trash-of-the-counts-family-cover.jpg",
    author: "Yoo Ryeo Han",
    summary:
      "A man reborn as the weak and useless member of a noble family uses his knowledge from his previous life to change his fate and protect his new world.",
    categories: ["Action", "Fantasy", "Drama"],
    tags: ["Noble", "Rebirth", "Strategy"],
    rating: 4.5,
    rank: 7,
    chapters: [
      {
        title: "Chapter 1: The Useless Noble",
        textFileUrl:
          "https://example.com/trash-of-the-counts-family-chapter-1.txt",
        chapterNumber: 1,
      },
      // Add more chapters as needed
    ],
    views: 700000,
    bookmarkCount: 30000,
    status: "Ongoing",
  },
  {
    title: "Second Life Ranker",
    slugTitle: "second-life-ranker",
    cover: "https://example.com/second-life-ranker-cover.jpg",
    author: "Sadoyeon",
    summary:
      "A man who dies and reincarnates into a game world takes revenge and climbs to the top of the rankings with his knowledge from his past life.",
    categories: ["Action", "Adventure", "Fantasy"],
    tags: ["Reincarnation", "Game", "Ranking"],
    rating: 4.6,
    rank: 8,
    chapters: [
      {
        title: "Chapter 1: The Fall",
        textFileUrl: "https://example.com/second-life-ranker-chapter-1.txt",
        chapterNumber: 1,
      },
      // Add more chapters as needed
    ],
    views: 750000,
    bookmarkCount: 32000,
    status: "Ongoing",
  },
  {
    title: "Reincarnation Of The Strongest Sword God",
    slugTitle: "reincarnation-of-the-strongest-sword-god",
    cover:
      "https://example.com/reincarnation-of-the-strongest-sword-god-cover.jpg",
    author: "Lucky Old Cat",
    summary:
      "A legendary swordsman is reincarnated into a new world, retaining all his previous skills and knowledge to achieve new heights of power.",
    categories: ["Action", "Fantasy", "Adventure"],
    tags: ["Swordsmanship", "Reincarnation", "Action"],
    rating: 4.4,
    rank: 9,
    chapters: [
      {
        title: "Chapter 1: New Beginning",
        textFileUrl:
          "https://example.com/reincarnation-of-the-strongest-sword-god-chapter-1.txt",
        chapterNumber: 1,
      },
      // Add more chapters as needed
    ],
    views: 650000,
    bookmarkCount: 28000,
    status: "Ongoing",
  },
  {
    title: "My Vampire System",
    slugTitle: "my-vampire-system",
    cover: "https://example.com/my-vampire-system-cover.jpg",
    author: "Jksmanga",
    summary:
      "A high school student becomes a vampire and discovers a hidden world of supernatural beings, using his new powers to protect himself and those he loves.",
    categories: ["Action", "Fantasy", "Supernatural"],
    tags: ["Vampire", "Supernatural", "High School"],
    rating: 4.5,
    rank: 10,
    chapters: [
      {
        title: "Chapter 1: The Transformation",
        textFileUrl: "https://example.com/my-vampire-system-chapter-1.txt",
        chapterNumber: 1,
      },
      // Add more chapters as needed
    ],
    views: 600000,
    bookmarkCount: 27000,
    status: "Ongoing",
  },
  {
    title: "Lord of the Mysteries",
    slugTitle: "lord-of-the-mysteries",
    cover: "https://example.com/lord-of-the-mysteries-cover.jpg",
    author: "Cuttlefish That Loves Diving",
    summary:
      "A world where mystery and occultism intertwine, following a young man who uncovers hidden secrets and navigates the dangers of a world filled with supernatural occurrences.",
    categories: ["Mystery", "Fantasy", "Adventure"],
    tags: ["Occult", "Mystery", "Supernatural"],
    rating: 4.8,
    rank: 11,
    chapters: [
      {
        title: "Chapter 1: The Enigma Begins",
        textFileUrl: "https://example.com/lord-of-the-mysteries-chapter-1.txt",
        chapterNumber: 1,
      },
      // Add more chapters as needed
    ],
    views: 700000,
    bookmarkCount: 35000,
    status: "Ongoing",
  },
  {
    title: "Supreme Magus",
    slugTitle: "supreme-magus",
    cover: "https://example.com/supreme-magus-cover.jpg",
    author: "Legion20",
    summary:
      "A powerful mage is reincarnated into a world where magic is central to society. Using his vast knowledge and strength, he aims to become the supreme magus.",
    categories: ["Action", "Fantasy", "Magic"],
    tags: ["Magic", "Reincarnation", "Power"],
    rating: 4.7,
    rank: 12,
    chapters: [
      {
        title: "Chapter 1: A New Era of Magic",
        textFileUrl: "https://example.com/supreme-magus-chapter-1.txt",
        chapterNumber: 1,
      },
      // Add more chapters as needed
    ],
    views: 800000,
    bookmarkCount: 33000,
    status: "Ongoing",
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("connected to db");

    // await Novel.deleteMany({});

    await Novel.insertMany(sampleNovels);

    console.log("Novels seeded successfully");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding the database:", error);
    mongoose.connection.close();
  }
};

seedDB();
