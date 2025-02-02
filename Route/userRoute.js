// debut code PAUCONNECT-B/Route/userRoute.js

import express from "express";
const router = express.Router();
import {
  register,
  becomeAuthors,
  updateUser,
  deleteUser,
} from "../Controlleur/userControlleur.js";

router.post("/register", register);

router.post("/becomeAuthors", becomeAuthors);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;
// fin code PAUCONNECT-B/Route/userRoute.js
