const queryArticlesByID = require("../models/queryArticlesByID.js");

const getArticleByID = (req, res, next) => {
  const articleID = req.params.article_id;

  queryArticlesByID(articleID, next)
    .then((article) => {
      return res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = getArticleByID;
