import article from "../Model/articleModel";

const createArticle = async (req, res) => {
  const { category, title, summary, image, content, author } = req.body;
  try {
    const newArticle = await article.create({
      category,
      title,
      summary,
      image,
      content,
      author,
    });
    res.json(newArticle);
  } catch (err) {
    res.status(500).send("erreur de serveur");
  }
};

const getArticles = async (req, res) => {
  try {
    const articles = await article.find();
    res.json(articles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("erreur de serveur");
  }
};
export { getArticles, createArticle };
