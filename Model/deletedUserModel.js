import mongoose from "mongoose";

const Schema = mongoose.Schema;

const deletedUserSchema = new Schema({
  originalId: { type: Schema.Types.ObjectId, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["lecteur", "auteur", "admin"],
    default: "lecteur",
  },
  deletedAt: { type: Date, default: Date.now },
});

const DeletedUser = mongoose.model("DeletedUser", deletedUserSchema);
export default DeletedUser;
