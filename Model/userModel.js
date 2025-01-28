//Model/ userModel.js
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["lecteur", "auteur", "admin"],
    default: "lecteur",
  },
  profile: { type: Schema.Types.ObjectId, ref: "Profile" },
});
const User = mongoose.model("User", userSchema);

export default User;
