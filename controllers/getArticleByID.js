const queryArticlesByID = require("../models/queryArticlesByID.js");

const getArticleByID = (req, res, next) => {
  const articleID = req.params.article_id;

  queryArticlesByID(articleID, next)
    .then((article) => {
      return res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

// const getArticleByID = (req, res, next) => {
//   const articleID = req.params.article_id;

//   queryArticlesByID(articleID, next)
//     .then((article) => {
//       return res.status(200).send({ article });
//     })
//     .catch((err) => {
//       console.log(err);

//       next(err);
//       // return res.status(err.status).send({ msg: err.msg });
//     });
// };
module.exports = getArticleByID;
