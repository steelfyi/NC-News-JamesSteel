const queryComments = require("../models/queryComments");
const getComments = (req, res) => {
  const articleID = req.params.article_id;
  queryComments(articleID).then((comments) => {
    res.status(200).send({ comments });
  });
};
module.exports = getComments;
