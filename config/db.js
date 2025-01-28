import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.info("connecté à MongoDb");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
