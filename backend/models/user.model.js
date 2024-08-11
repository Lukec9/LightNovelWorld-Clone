import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    about: {
      type: String,
      default: "",
    },
    rank: {
      type: String,
      default: "Reader",
      enum: ["Reader", "Admin", "Moderator"],
      required: true,
    },
    lastActivity: {
      type: Date,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

UserSchema.plugin(passportLocalMongoose);

export default mongoose.model("User", UserSchema);
