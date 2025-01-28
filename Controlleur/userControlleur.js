import User from "../Model/userModel";
import Profile from "../Model/userProfileModel";

import jwtLibrary from "jsonwebtoken";

const register = async (req, res) => {
  const { email, name, password } = req.body;
  try {
    console.log("vérifie si lutilisateur existe deja...");
    let user = await User.findOne({ email });
    if (user) {
      console.log("utilisateur existe deja...");
      return res.status(400).json({ message: "Cet utilisateur existe déjà" });
    }
    console.log("Création de l'utilisateur...");
    user = await User.create({
      email,
      name,
      password, // HashedPassword
    });
    const payload = {
      user: { id: user._id },
    };
    console.log("génération du token...");
    const token = jwtLibrary.sign(payload, "votre_jwt_secret", {
      expiresIn: 360000,
    });
    console.log("utilisateur enregistré avec succès");
    res.json({ token });
  } catch (err) {
    console.error("Erreur dans lenregistrment", err.message);
    res.status(500).send("Server Error");
  }
};

const becomeAuthor = async (req, res) => {
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

export { register, becomeAuthor };
