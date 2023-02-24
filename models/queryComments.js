const db = require("../db/connection");
const format = require("pg-format");

const queryComments = (articleID) => {
  const articleQuery = format(
    `SELECT * FROM articles WHERE article_id = %L;`,
    articleID
  );
  const commentQuery = format(
    `SELECT * FROM comments WHERE article_id = %L ORDER BY created_at DESC;`,
    articleID
  );

  return db.query(articleQuery).then((results) => {
    if (results.rows.length === 0) {
      const err = new Error("Article not found");
      err.status = 404;
      throw err;
    } else {
      // Chain another query to fetch comments
      return db.query(commentQuery).then((results) => {
        return results.rows;
      });
    }
  });
};

/// another query to find if the article exists in the article table if it doesnt exist send 404

module.exports = queryComments;
