const db = require("../db/connection");
const format = require("pg-format");

const queryComments = (articleID) => {
  const formatQuery = format(
    `SELECT * FROM comments WHERE article_id = %L ORDER BY created_at DESC ;`,
    articleID
  );
  return db.query(formatQuery).then((results) => {
    return results.rows;
  });
};

module.exports = queryComments;
