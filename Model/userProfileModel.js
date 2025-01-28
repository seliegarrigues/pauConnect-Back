//Model/ userProfileModel.js
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  parameters: {
    type: String,
  },
  preferences: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  favorites: [{ type: Schema.Types.ObjectId, ref: "Article" }],
  History: [{ type: Schema.Types.ObjectId, ref: "Article" }],
});
const Profile = mongoose.model("Profile", userProfileSchema);

export default Profile;
