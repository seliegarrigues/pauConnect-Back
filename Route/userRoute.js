// debut code PAUCONNECT-B/Route/userRoute.js

import express from "express";
const router = express.Router();
import { register, becomeAuthors } from "../Controlleur/userControlleur.js";

router.post("/register", register);

router.post("/becomeAuthors", becomeAuthors);

export default router;
// fin code PAUCONNECT-B/Route/userRoute.js
