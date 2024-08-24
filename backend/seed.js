import mongoose from "mongoose";
import Novel from "./models/novel.model.js";
import dotenv from "dotenv";

dotenv.config();

const sampleNovels = [
  {
    title: "Martial World",
    slugTitle: "martial-world",
    cover: "https://example.com/cover23.jpg", // Replace with actual cover URL
    author: "Cocooned Cow",
    summary:
      "Lin Ming, a young martial artist with exceptional talent, embarks on a journey of cultivation in a world of martial arts. As he overcomes various challenges and battles, he seeks to reach the pinnacle of martial arts and achieve immortality.",
    categories: ["Action", "Adventure", "Fantasy"],
    tags: ["Cultivation", "Martial Arts", "Xianxia"],
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
