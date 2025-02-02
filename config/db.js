// debut PAUCONNECT-B/congig/db.js

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.info("connecté à MongoDb");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
// fin code PAUCONNECT-B/config/db.js
