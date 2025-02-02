// debut code PAUCONNECT-B/Controlleur/userControlleur.js

import User from "../Model/userModel.js";
import Profile from "../Model/userProfileModel.js";

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

// export

export { register, becomeAuthors };
// fin code PAUCONNECT-B/Controlleur/userControlleur.js
