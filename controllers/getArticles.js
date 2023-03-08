const queryArticles = require("../models/queryArticles");

const getArticles = (req, res, next) => {
  queryArticles(req)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      console.log(err, "here is your error");
      return next(err);
    });
};

module.exports = getArticles;
