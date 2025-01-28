import express from "express";
const router = express.router();
import { register, becomeAuthors } from "../Controlleur/userControlleur";

router.post("/register", register);

router.post("/becomeAuthors", becomeAuthors);

export default router;
