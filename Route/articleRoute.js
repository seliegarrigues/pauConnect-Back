import express from "express";
const router = express.router();
import { getArticles, createArticle } from "../Controlleur/articleControlleur";

// Get all articles

router.get("/", getArticles);

router.post("/", createArticle);
/* router.put("/:id", auth, updateArticle);

router.delete("/:id", auth, deleteArticle);
 */
export default router;
