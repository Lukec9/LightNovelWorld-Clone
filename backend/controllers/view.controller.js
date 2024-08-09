import NovelView from "../models/novelView.model.js";

const addView = async (req, res) => {
  const userId = req.user._id;
  const { novelId } = req.params;

  if (!novelId || !userId) {
    return res.status(400).json({ error: "novelId and userId are required" });
  }

  try {
    await NovelView.create({ novelId, userId });
    res.status(200).json({ message: "Successfully viewed page!" });
  } catch (error) {
    if (error.code === 11000) {
      res.status(200).json({ message: "User has already viewed this novel!" });
    } else {
      res.status(500).json({ error: "Error logging view" });
    }
  }
};

export default addView;
