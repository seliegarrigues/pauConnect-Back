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
    res.status(500).send("erreur de serveur get");
  }
};

const updateArticle = async (req,res)=>{
  try {
    const { id } = req.params;
    const updateArticle = await Article.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators:true }
    );
    if (!updateArticle) {
      return res.status(400).json({ message : "Article non trouvé"});
    }
    res.json(updateArticle);
  } catch (err) {
    console.error ( "erreur lors de la mise à jour de l'article:",err);
    res.status(500).send("erreur de serveur update")
  }
};

const deleteArticle = async (req,res)=> {
  try {
    const { id } = req.params;
    const deletedArticle = await.Article.findAndDelete(id);
    if (!deletedArticle) {
      return res.status(404).json({message : "Article non trouvé"});
    }
    res.json({message : "Article supprimé avec succès"});
  } catch (err) {
    console.error ("erreur lors de la suppression de l'article:",err);
    res.status(500).send("erreur de serveur");
  }
};
export { getArticles, createArticle, updateArticle, deleteArticle };

//fin code PAUCONNECT-B/Controlleur/articleControlleur.js
