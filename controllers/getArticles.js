const queryArticles = require("../models/queryArticles");

const getArticles = (req, res, next) => {
  const topic = req.query.topic;
  const sort_by = req.query.sort_by;
  const order = req.query.order;

  queryArticles(topic, sort_by, order)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      console.log(err, "here is your error");
      return next(err);
    });
};

module.exports = getArticles;
