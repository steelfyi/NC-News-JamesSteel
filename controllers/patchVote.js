const insertVote = require("../models/insertVote");

const patchVote = (req, res, next) => {
  const articleID = req.params.article_id;
  const vote = req.body.inc_votes;
  console.log("you have arrived");
  insertVote(articleID, vote)
    .then((article) => {
      console.log(article);
      res.status(200).send({ article });
    })
    .catch((err) => {
      console.log(err, "<<< ERORR IN controiller");
      next(err);
    });
};
module.exports = patchVote;
