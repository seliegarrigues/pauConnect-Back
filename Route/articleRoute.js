// debut code PAUCONNECT-B/Route/articleRoute.js

import express from "express";
const router = express.Router();
import {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../Controlleur/articleControlleur.js";

// Get all articles

router.get("/", getArticles);

router.post("/", createArticle);
router.put("/:id", updateArticle);

router.delete("/:id", deleteArticle);

export default router;

// fin code PAUCONNECT-B/Route/articleRoute.js
