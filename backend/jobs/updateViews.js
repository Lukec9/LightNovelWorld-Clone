import { schedule } from "node-cron";
import Novel from "../models/novel.model.js";
import NovelView from "../models/novelView.model.js";

// Define the cron job function
const start = () => {
  schedule("0 * * * *", async () => {
    // Runs every hour
    try {
      // Aggregate unique views by novelId
      const viewCounts = await NovelView.aggregate([
        { $group: { _id: "$novelId", count: { $sum: 1 } } },
      ]);

      // Update each novel's unique view count
      for (const { _id: novelId, count } of viewCounts) {
        await Novel.findByIdAndUpdate(novelId, { $inc: { views: count } });
      }

      console.log("Views aggregated successfully.");
    } catch (error) {
      console.error("Error aggregating views:", error);
    }
  });
};

// Export the start function
export default { start };
