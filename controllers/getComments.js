const queryComments = require("../models/queryComments");
const getComments = (req, res) => {
  queryComments().then((comments) => {
    res.status(200).send({ comments });
  });
};
module.exports = getComments;
