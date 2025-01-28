//MOdel/articleModel.js

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const articleSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
  },
  image: {
    type: String,
  },
  publicationDate: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
  },
  likes: {
    Users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    counter: { type: Number },
  },
  savedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
  comments: [
    {
      content: String,
      user: { type: Schema.Types.ObjectId, ref: "User" },
      date: { type: Date, default: Date.now },
    },
  ],
});

const Article = mongoose.model("Article", articleSchema);

export default Article;
