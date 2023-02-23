const queryArticles = require("../models/queryArticles");

const getArticles = (req, res) => {
  queryArticles()
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      return next(err);
    });
};

module.exports = getArticles;
