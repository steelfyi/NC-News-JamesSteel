const queryComments = require("../models/queryComments");

const getComments = (req, res, next) => {
  const articleID = req.params.article_id;
  queryComments(articleID, next)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};
module.exports = getComments;
