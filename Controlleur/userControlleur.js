// debut code PAUCONNECT-B/Controlleur/userControlleur.js

import User from "../Model/userModel.js";
import Profile from "../Model/userProfileModel.js";
import DeletedUser from "../Model/deletedUserModel.js";
import jwtLibrary from "jsonwebtoken";

import bcrypt from "bcryptjs";
// ...
const register = async (req, res) => {
  const { email, name, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Cet utilisateur existe déjà" });
    }
    // Hachage du mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user = await User.create({
      email,
      name,
      password: hashedPassword,
    });
    const payload = { user: { id: user._id } };
    const token = jwtLibrary.sign(payload, "votre_jwt_secret", {
      expiresIn: 360000,
    });
    res.json({ token });
  } catch (err) {
    console.error("Erreur dans l'enregistrement", err.message);
    res.status(500).send("Server Error");
  }
};

const becomeAuthors = async (req, res) => {
  const { userId } = req.body;
  try {
    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    user.role = "auteur";
    await user.save();

    // Create a profile for the author
    await Profile.create({
      user: userId,
      parameters: "",
      preferences: [],
      favorites: [],
      history: [],
    });

    res.json({ msg: "User is now an author" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
const updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, updates, { new: true });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.json(user);
  } catch (err) {
    console.error("Erreur lors de la mise à jour de l'utilisateur :", err);
    res.status(500).send("Erreur de serveur");
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    // Créer un enregistrement dans DeletedUser
    const deletedUserData = {
      originalId: user._id,
      email: user.email,
      name: user.name,
      password: user.password,
      role: user.role,
    };
    await DeletedUser.create(deletedUserData);
    // Supprimer l'utilisateur de la collection principale
    await User.findByIdAndDelete(id);
    res.json({ message: "Utilisateur archivé et supprimé avec succès" });
  } catch (err) {
    console.error("Erreur lors de la suppression de l'utilisateur :", err);
    res.status(500).send("Erreur de serveur");
  }
};

// export

export { register, becomeAuthors, updateUser, deleteUser };
// fin code PAUCONNECT-B/Controlleur/userControlleur.js
