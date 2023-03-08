const queryArticles = require("../models/queryArticles");

const getArticles = (req, res, next) => {
  const topic = req.query.topic;
  const sort_by = req.query.sort_by;
  queryArticles(req, topic, sort_by)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      console.log(err, "here is your error");
      return next(err);
    });
};

module.exports = getArticles;
