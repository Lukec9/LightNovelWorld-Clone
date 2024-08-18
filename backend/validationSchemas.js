import { body, check } from "express-validator";

const chapterValidation = [
  body("title")
    .isString()
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Title is required"),

  body("textFileUrl")
    .isString()
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Text file URL is required"),

  body("chapterNumber")
    .isInt()
    .withMessage("Chapter number must be an integer")
    .notEmpty()
    .withMessage("Chapter number is required"),
];

const novelValidation = [
  body("title")
    .isString()
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Title is required"),

  body("slugTitle")
    .optional()
    .isString()
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Slug title is required"),

  body("cover").isString().notEmpty().withMessage("Cover is required"),

  body("author")
    .isString()
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Author is required"),

  body("summary")
    .isString()
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Summary is required"),

  body("categories")
    .isArray()
    .withMessage("Categories must be an array")
    .custom(value => value.every(v => typeof v === "string"))
    .withMessage("Each category must be a string")
    .custom(value => value.every(v => categories.includes(v)))
    .withMessage("Each category must be one of the allowed values"),

  body("tags")
    .isArray()
    .withMessage("Tags must be an array")
    .custom(value => value.every(v => typeof v === "string"))
    .withMessage("Each tag must be a string"),

  body("rating")
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage("Rating must be between 0 and 5"),

  body("rank").optional().isInt().withMessage("Rank must be an integer"),

  body("chapters")
    .optional()
    .isArray()
    .withMessage("Chapters must be an array")
    .custom(value =>
      value.every(chapter =>
        chapterValidation.every(validation => validation.validator(chapter))
      )
    )
    .withMessage("Invalid chapter data"),

  body("views").optional().isInt().withMessage("Views must be an integer"),

  body("bookmarkCount")
    .optional()
    .isInt()
    .withMessage("Bookmark count must be an integer"),

  body("status")
    .isIn(["Ongoing", "Completed", "Dropped"])
    .withMessage("Status must be one of: Ongoing, Completed, Dropped"),
];

const commentValidation = [
  body("text")
    .isString()
    .trim()
    // .escape()
    .notEmpty()
    .withMessage("Text is required")
    .isLength({ min: 3, max: 1000 })
    .withMessage("Comment should be atleast 3 and a max of 1000 characters"),
  check("likes")
    .optional()
    .isArray()
    .withMessage("Likes must be an array")
    .custom(likes => {
      if (!likes.every(id => mongoose.isValidObjectId(id))) {
        throw new Error("Each like must be a valid ObjectId");
      }
      return true;
    }),

  check("dislikes")
    .optional()
    .isArray()
    .withMessage("Dislikes must be an array")
    .custom(dislikes => {
      if (!dislikes.every(id => mongoose.isValidObjectId(id))) {
        throw new Error("Each dislike must be a valid ObjectId");
      }
      return true;
    }),
  body("chapterNumber")
    .optional({ nullable: true }) // This allows null values
    .isInt()
    .withMessage("Chapter number must be an integer"),
];

const reviewValidation = [
  body("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be an integer between 1 and 5"),

  body("text")
    .isString()
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Text is required")
    .isLength({ min: 100 })
    .withMessage("Minimum lenght is 100 characters!"),

  check("likes")
    .optional()
    .isArray()
    .withMessage("Likes must be an array")
    .custom(likes => {
      if (!likes.every(id => mongoose.isValidObjectId(id))) {
        throw new Error("Each like must be a valid ObjectId");
      }
      return true;
    }),

  check("dislikes")
    .optional()
    .isArray()
    .withMessage("Dislikes must be an array")
    .custom(dislikes => {
      if (!dislikes.every(id => mongoose.isValidObjectId(id))) {
        throw new Error("Each dislike must be a valid ObjectId");
      }
      return true;
    }),
];

const userValidation = [
  body("email")
    .isEmail()
    .withMessage("Email must be a valid email address")
    .normalizeEmail()
    .notEmpty()
    .withMessage("Email is required"),

  body("about")
    .optional()
    .isString()
    .trim()
    .escape()
    .withMessage("About section must be a string"),

  body("rank")
    .optional()
    .default("Reader")
    .isIn(["Reader", "Admin", "Moderator"])
    .withMessage("Rank must be one of: Reader, Admin, Moderator")
    .notEmpty()
    .withMessage("Rank is required"),

  body("lastActivity")
    .optional()
    .isISO8601()
    .withMessage("Last activity must be a valid date"),

  body("profilePic")
    .optional({ nullable: true })

    .isString()
    .withMessage("Profile picture URL must be a string"),
];

const categories = [
  "All",
  "Action",
  "Adventure",
  "Drama",
  "Fantasy",
  "Harem",
  "Martial Arts",
  "Mature",
  "Romance",
  "Tragedy",
  "Xuanhuan",
  "Ecchi",
  "Comedy",
  "Slice of Life",
  "Mystery",
  "Supernatural",
  "Psychological",
  "Sci-fi",
  "Xianxia",
  "School Life",
  "Josei",
  "Wuxia",
  "Shounen",
  "Horror",
  "Mecha",
  "Historical",
  "Shoujo",
  "Adult",
  "Seinen",
  "Sports",
  "Lolicon",
  "Gender Bender",
  "Shounen Ai",
  "Yaoi",
  "Video Games",
  "Smut",
  "Magical Realism",
  "Eastern Fantasy",
  "Contemporary Romance",
  "Fantasy Romance",
  "Shoujo Ai",
  "Yuri",
];

export default {
  chapterValidation,
  novelValidation,
  commentValidation,
  reviewValidation,
  userValidation,
};
