const db = require("../db/connection");
const format = require("pg-format");

const queryComments = (articleID) => {
  const formatQuery = format(
    `SELECT * FROM comments WHERE article_id = %L ORDER BY created_at DESC;`,
    articleID
  );
  return db.query(formatQuery).then((results) => {
    if (results.rows.length === 0) {
      const err = new Error("Comment not found");
      err.status = 200;
      throw err;
    }
    return results.rows;
  });
};

module.exports = queryComments;
