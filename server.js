// debut code PAUCONNECT-B/server.js

import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import articleRoute from "./Route/articleRoute.js";
import userRoute from "./Route/userRoute.js";

dotenv.config();

const app = express();

app.use(express.json());

// Routes
app.use("/api/articles", articleRoute);
app.use("/api/users", userRoute);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // On attend que la connexion à MongoDB soit établie
  await connectDB();
  app.listen(PORT, () => {
    console.info(`Le serveur tourne sur le port : ${PORT}`);
  });
};

startServer();

// fin code PAUCONNECT-B/server.js
