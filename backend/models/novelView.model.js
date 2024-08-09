import { Schema, model } from "mongoose";

const NovelViewSchema = new Schema({
  novelId: {
    type: Schema.Types.ObjectId,
    ref: "Novel",
    required: true,
  },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  viewedAt: { type: Date, default: Date.now, index: { expires: "24h" } },
});

NovelViewSchema.index({ novelId: 1, userId: 1 }, { unique: true });
NovelViewSchema.index({ novelId: 1 });

const NovelView = model("NovelView", NovelViewSchema);

export default NovelView;
