const db = require("../db/connection");
const format = require("pg-format");

const queryArticlesByID = (articleID) => {
  const queryID = format(
    `SELECT * FROM articles WHERE article_id = %L;`,
    articleID
  );
  return db.query(queryID).then((results) => {

    if (results.rows.length === 0) {
      return Promise.reject({
        status: 404,
        msg: "article_id not found",
      });
    }
    return results.rows;
  });
};

module.exports = queryArticlesByID;
