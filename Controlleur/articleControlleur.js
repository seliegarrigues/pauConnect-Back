//debut code PAUCONNECT-B/Controlleur/articleControlleur.js

import Article from "../Model/articleModel.js";

const createArticle = async (req, res) => {
  const { category, title, summary, image, content, author } = req.body;
  try {
    const newArticle = await Article.create({
      category,
      title,
      summary,
      image,
      content,
      author,
    });
    res.json(newArticle);
  } catch (err) {
    console.error("erreur lors de la création de l'article : ",err)
    res.status(500).send("erreur de serveur");
  }
};

const getArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("erreur de serveur");
  }
};
export { getArticles, createArticle };

//fin code PAUCONNECT-B/Controlleur/articleControlleur.js
