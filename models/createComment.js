const db = require("../db/connection");
const format = require("pg-format");

const createComment = (req, articleID) => {
  const username = req.username;
  const body = req.body;
  const commentQuery = `INSERT INTO comments (author, body, article_id) VALUES ($1, $2, $3) RETURNING *;`;

  return db.query(commentQuery, [username, body, articleID]).then((results) => {
    return results.rows[0];
  });
};

module.exports = createComment;
