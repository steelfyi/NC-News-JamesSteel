const createComment = require("../models/createComment");

const postComments = (req, res, next) => {
  const postReq = req.body;
  const articleID = req.params.article_id;

  if (!req.body.username || !req.body.body) {
    res.status(400).send({ msg: "bad request" });
  }

  createComment(postReq, articleID)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = postComments;
