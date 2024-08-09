import express from "express";
import addView from "../controllers/view.controller.js";

const router = express.Router();

router.post("/:novelId/count", addView);

export default router;
