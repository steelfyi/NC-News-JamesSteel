const insertVote = require("../models/insertVote");

const patchVote = (req, res, next) => {
  const articleID = req.params.article_id;
  const vote = req.body.inc_votes;

  insertVote(articleID, vote)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};
module.exports = patchVote;
