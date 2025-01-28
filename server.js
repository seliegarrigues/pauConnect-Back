// configuration de base server.js

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db";
dotenv.config();

const app = express();
connectDB();
app.use(express.json());

// routes

app.use("/api/articles", require("./routes/articleRoute"));
app.use("/api/users", require("./routes/userRoute"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.info(`le serveur tourne sur le port :  ${PORT}`)
);
