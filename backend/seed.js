import mongoose from "mongoose";
import Novel from "./models/novel.model.js";
import dotenv from "dotenv";

dotenv.config();

const sampleNovels = [
  {
    title: "The Celestial Voyage",
    slugTitle: "the-celestial-voyage",
    cover: "https://example.com/covers/the-celestial-voyage.jpg",
    author: "Luna Star",
    summary:
      "In a world where the stars are the ultimate destination, follow the journey of Captain Liora as she navigates through interstellar adventures, ancient prophecies, and cosmic battles.",
    categories: ["Sci-Fi", "Adventure"],
    tags: ["Space", "Exploration", "Epic"],
    rating: 4.7,
    rank: 1,
    chapters: [
      {
        title: "Chapter 1: The Awakening",
        textFileUrl:
          "https://example.com/chapters/the-celestial-voyage/chapter-1.txt",
        chapterNumber: 1,
      },
      {
        title: "Chapter 2: The First Encounter",
        textFileUrl:
          "https://example.com/chapters/the-celestial-voyage/chapter-2.txt",
        chapterNumber: 2,
      },
      // Add more chapters as needed
    ],
    views: 15000,
    bookmarkCount: 2000,
    status: "Ongoing",
  },
  {
    title: "Mystic Realms",
    slugTitle: "mystic-realms",
    cover: "https://example.com/covers/mystic-realms.jpg",
    author: "Aria Moon",
    summary:
      "When the barriers between worlds begin to break down, a young mage must uncover ancient secrets to save her realm from impending doom.",
    categories: ["Fantasy", "Magic"],
    tags: ["Wizards", "Adventure", "Mystery"],
    rating: 4.5,
    rank: 2,
    chapters: [
      {
        title: "Chapter 1: The Prophecy Revealed",
        textFileUrl: "https://example.com/chapters/mystic-realms/chapter-1.txt",
        chapterNumber: 1,
      },
      {
        title: "Chapter 2: The Forbidden Forest",
        textFileUrl: "https://example.com/chapters/mystic-realms/chapter-2.txt",
        chapterNumber: 2,
      },
      // Add more chapters as needed
    ],
    views: 12000,
    bookmarkCount: 1500,
    status: "Completed",
  },
  {
    title: "Digital Nightmare",
    slugTitle: "digital-nightmare",
    cover: "https://example.com/covers/digital-nightmare.jpg",
    author: "Jake Winters",
    summary:
      "In a near-future society where virtual reality is indistinguishable from the real world, a hacker stumbles upon a digital conspiracy that threatens the very fabric of reality.",
    categories: ["Cyberpunk", "Thriller"],
    tags: ["Hacking", "Virtual Reality", "Conspiracy"],
    rating: 4.8,
    rank: 3,
    chapters: [
      {
        title: "Chapter 1: The Glitch",
        textFileUrl:
          "https://example.com/chapters/digital-nightmare/chapter-1.txt",
        chapterNumber: 1,
      },
      {
        title: "Chapter 2: Into the Void",
        textFileUrl:
          "https://example.com/chapters/digital-nightmare/chapter-2.txt",
        chapterNumber: 2,
      },
      // Add more chapters as needed
    ],
    views: 20000,
    bookmarkCount: 2500,
    status: "Ongoing",
  },
  {
    title: "Echoes of Eternity",
    slugTitle: "echoes-of-eternity",
    cover: "https://example.com/covers/echoes-of-eternity.jpg",
    author: "Ella Frost",
    summary:
      "An ancient evil awakens in a forgotten land. A young hero must rally an unlikely group of allies to prevent the end of all existence.",
    categories: ["Epic", "Adventure"],
    tags: ["Heroic Journey", "Ancient Evils", "Alliances"],
    rating: 4.6,
    rank: 4,
    chapters: [
      {
        title: "Chapter 1: The Awakening",
        textFileUrl:
          "https://example.com/chapters/echoes-of-eternity/chapter-1.txt",
        chapterNumber: 1,
      },
      {
        title: "Chapter 2: The Gathering Storm",
        textFileUrl:
          "https://example.com/chapters/echoes-of-eternity/chapter-2.txt",
        chapterNumber: 2,
      },
      // Add more chapters as needed
    ],
    views: 18000,
    bookmarkCount: 2200,
    status: "Dropped",
  },
  {
    title: "The Alchemist's Daughter",
    slugTitle: "the-alchemists-daughter",
    cover: "https://example.com/covers/the-alchemists-daughter.jpg",
    author: "Sophia Black",
    summary:
      "A young woman discovers her hidden alchemical powers and embarks on a quest to uncover the truth about her family's mysterious past.",
    categories: ["Historical", "Mystery"],
    tags: ["Alchemy", "Family Secrets", "Historical Drama"],
    rating: 4.4,
    rank: 5,
    chapters: [
      {
        title: "Chapter 1: The Secret Laboratory",
        textFileUrl:
          "https://example.com/chapters/the-alchemists-daughter/chapter-1.txt",
        chapterNumber: 1,
      },
      {
        title: "Chapter 2: The Hidden Legacy",
        textFileUrl:
          "https://example.com/chapters/the-alchemists-daughter/chapter-2.txt",
        chapterNumber: 2,
      },
      // Add more chapters as needed
    ],
    views: 10000,
    bookmarkCount: 1200,
    status: "Completed",
  },
  {
    title: "Grand Ancestral Bloodlines",
    slugTitle: "grand-ancestral-bloodlines",
    cover: "https://example.com/covers/grand-ancestral-bloodlines.jpg",
    author: "Unknown Author",
    summary:
      "In a world where bloodlines dictate power and status, a young man with an ordinary lineage embarks on a journey to uncover ancient secrets and forge his own destiny.",
    categories: ["Fantasy", "Adventure"],
    tags: ["Bloodlines", "Cultivation", "Secrets"],
    rating: 4.6,
    rank: 6,
    chapters: [
      {
        title: "Chapter 1: The Awakening",
        textFileUrl:
          "https://example.com/chapters/grand-ancestral-bloodlines/chapter-1.txt",
        chapterNumber: 1,
      },
      {
        title: "Chapter 2: The Hidden Legacy",
        textFileUrl:
          "https://example.com/chapters/grand-ancestral-bloodlines/chapter-2.txt",
        chapterNumber: 2,
      },
      // Add more chapters as needed
    ],
    views: 8000,
    bookmarkCount: 900,
    status: "Ongoing",
  },
  {
    title: "Supreme Lord",
    slugTitle: "supreme-lord",
    cover: "https://example.com/covers/supreme-lord.jpg",
    author: "Unknown Author",
    summary:
      "A mortal man is reborn in a world of gods and demons with the title of 'Supreme Lord.' With unparalleled power, he must navigate divine politics and confront ancient enemies.",
    categories: ["Fantasy", "Action"],
    tags: ["Rebirth", "Power", "Divine"],
    rating: 4.7,
    rank: 7,
    chapters: [
      {
        title: "Chapter 1: The Rebirth",
        textFileUrl: "https://example.com/chapters/supreme-lord/chapter-1.txt",
        chapterNumber: 1,
      },
      {
        title: "Chapter 2: The Divine Trial",
        textFileUrl: "https://example.com/chapters/supreme-lord/chapter-2.txt",
        chapterNumber: 2,
      },
      // Add more chapters as needed
    ],
    views: 9000,
    bookmarkCount: 1200,
    status: "Ongoing",
  },
  {
    title: "True Martial World",
    slugTitle: "true-martial-world",
    cover: "https://example.com/covers/true-martial-world.jpg",
    author: "Unknown Author",
    summary:
      "In the True Martial World, where strength is everything, a young cultivator seeks to rise above his peers, uncovering hidden powers and ancient martial arts techniques along the way.",
    categories: ["Martial Arts", "Adventure"],
    tags: ["Cultivation", "Martial Arts", "Power"],
    rating: 4.8,
    rank: 8,
    chapters: [
      {
        title: "Chapter 1: The Martial Awakening",
        textFileUrl:
          "https://example.com/chapters/true-martial-world/chapter-1.txt",
        chapterNumber: 1,
      },
      {
        title: "Chapter 2: The Hidden Arts",
        textFileUrl:
          "https://example.com/chapters/true-martial-world/chapter-2.txt",
        chapterNumber: 2,
      },
      // Add more chapters as needed
    ],
    views: 11000,
    bookmarkCount: 1400,
    status: "Ongoing",
  },
  {
    title: "Martial World",
    slugTitle: "martial-world",
    cover: "https://example.com/covers/martial-world.jpg",
    author: "Unknown Author",
    summary:
      "In a world where martial arts reign supreme, a young warrior sets out to challenge the established order and uncover the truth about his mysterious origins.",
    categories: ["Martial Arts", "Action"],
    tags: ["Cultivation", "Adventure", "Combat"],
    rating: 4.5,
    rank: 9,
    chapters: [
      {
        title: "Chapter 1: The Martial Path",
        textFileUrl: "https://example.com/chapters/martial-world/chapter-1.txt",
        chapterNumber: 1,
      },
      {
        title: "Chapter 2: The First Battle",
        textFileUrl: "https://example.com/chapters/martial-world/chapter-2.txt",
        chapterNumber: 2,
      },
      // Add more chapters as needed
    ],
    views: 9500,
    bookmarkCount: 1300,
    status: "Completed",
  },
  {
    title: "Infinite Mana in the Apocalypse",
    slugTitle: "infinite-mana-in-the-apocalypse",
    cover: "https://example.com/covers/infinite-mana-in-the-apocalypse.jpg",
    author: "Unknown Author",
    summary:
      "During the apocalypse, where the world has been devastated by monsters and chaos, a young man discovers he has infinite mana, allowing him to change the course of humanity’s fate.",
    categories: ["Apocalypse", "Fantasy"],
    tags: ["Survival", "Mana", "Rebirth"],
    rating: 4.7,
    rank: 10,
    chapters: [
      {
        title: "Chapter 1: The Awakening of Mana",
        textFileUrl:
          "https://example.com/chapters/infinite-mana-in-the-apocalypse/chapter-1.txt",
        chapterNumber: 1,
      },
      {
        title: "Chapter 2: The New World",
        textFileUrl:
          "https://example.com/chapters/infinite-mana-in-the-apocalypse/chapter-2.txt",
        chapterNumber: 2,
      },
      // Add more chapters as needed
    ],
    views: 10500,
    bookmarkCount: 1600,
    status: "Ongoing",
  },
  {
    title: "Supremacy Games",
    slugTitle: "supremacy-games",
    cover: "https://example.com/covers/supremacy-games.jpg",
    author: "Unknown Author",
    summary:
      "In a dystopian future where entertainment is controlled by a powerful corporation, participants in the Supremacy Games must fight for their lives and freedom while uncovering dark secrets about the world.",
    categories: ["Dystopian", "Action"],
    tags: ["Games", "Survival", "Conspiracy"],
    rating: 4.4,
    rank: 11,
    chapters: [
      {
        title: "Chapter 1: The Game Begins",
        textFileUrl:
          "https://example.com/chapters/supremacy-games/chapter-1.txt",
        chapterNumber: 1,
      },
      {
        title: "Chapter 2: The Fight for Survival",
        textFileUrl:
          "https://example.com/chapters/supremacy-games/chapter-2.txt",
        chapterNumber: 2,
      },
      // Add more chapters as needed
    ],
    views: 8500,
    bookmarkCount: 1000,
    status: "Completed",
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
