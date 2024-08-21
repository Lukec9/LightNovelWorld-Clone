import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import passport from "passport";
import LocalStrategy from "passport-local";
import MongoStore from "connect-mongo";
import session from "express-session";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";

import connectDB from "./db/connectDB.js";
import User from "./models/user.model.js";

import updateViews from "./jobs/updateViews.js";
import updateRanking from "./jobs/updateRanking.js";

import userRoutes from "./routes/user.routes.js";
import novelRoutes from "./routes/novel.routes.js";

dotenv.config();

const app = express();

connectDB();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  mongoSanitize({
    replaceWith: "_",
  })
);

const store = MongoStore.create({
  mongoUrl: process.env.DB_URI,
  ttl: 7 * 24 * 60 * 60,
  touchAfter: 24 * 3600,
});

store.on("error", function (e) {
  console.log("SESSION STORE ERROR", e);
});

const sessionConfig = {
  store,
  name: "session",
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    // secure: true,
    sameSite: "None",
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "default-src": ["'self'"], // Default source for all content
        "img-src": ["'self'", "https://res.cloudinary.com/dnjmtuolt"], // Allow images from your Cloudinary account
        "media-src": ["'self'", "https://res.cloudinary.com/dnjmtuolt"], // Allow media files from your Cloudinary account
        "connect-src": ["'self'", "https://res.cloudinary.com/dnjmtuolt"], // Allow connections to your Cloudinary account (for APIs)
        "script-src": ["'self'"], // Allow scripts from your own domain (adjust as needed)
        "style-src": ["'self'", "'unsafe-inline'"], // Allow styles from your own domain and inline styles
        "font-src": ["'self'"], // Allow fonts from your own domain
        "manifest-src": ["'self'"], // Allow manifests from your own domain
        "worker-src": ["'self'"], // Allow web workers from your own domain
        "child-src": ["'self'"], // Allow iframes from your own domain
        "object-src": ["'none'"], // Disallow object embeddings
        "frame-src": ["'none'"], // Disallow framing
      },
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/api/users", userRoutes);
app.use("/api/novels", novelRoutes);

updateViews.start();
updateRanking.start();

app.listen(PORT, (req, res) => {
  console.log("Listening on localhost:5000");
});
