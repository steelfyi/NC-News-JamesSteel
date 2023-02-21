const queryTopics = require("../models/queryTopics");

const getTopics = (req, res) => {
  queryTopics().then((topics) => {
    res.status(200).send({ topics });
  });
};

module.exports = getTopics;
