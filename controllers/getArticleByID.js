const queryArticlesByID = require("../models/queryArticlesByID.js");

const getArticleByID = (req, res) => {
  const articleID = req.params.article_id;

  queryArticlesByID(articleID)

  .then((article) => {
      return res.status(200).send({ article });
    })
    .catch((err) => {
      return res.status(err.status).send({ msg: err.msg });
    });
};
module.exports = getArticleByID;
