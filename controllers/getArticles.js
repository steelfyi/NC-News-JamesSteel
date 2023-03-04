const queryArticles = require("../models/queryArticles");

const getArticles = (req, res, next) => {
  const topic = req.query.topic;
  queryArticles(topic)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

module.exports = getArticles;
