const db = require("../db/connection");
const format = require("pg-format");

const queryArticlesByID = (articleID, next) => {
  const queryID = format(
    `SELECT * FROM articles WHERE article_id = %L;`,
    articleID
  );
  return db
    .query(queryID)
    .then((results) => {
      
      if (results.rows.length === 0) {
        const err = new Error("Article not found");
        err.status = 404;
        throw err;
      }
      return results.rows;
    })

};

module.exports = queryArticlesByID;
