const db = require("../db/connection");
const format = require("pg-format");

const createComment = (req, articleID) => {
  const username = req.username;
  const body = req.body;
  const commentQuery = `INSERT INTO comments (author, body, article_id) VALUES ($1, $2, $3) RETURNING *;`;
  const articleQuery = format(
    `SELECT * FROM articles WHERE article_id = %L;`,
    articleID
  );
  return db.query(articleQuery).then((results) => {
    if (results.rows.length === 0) {
      const err = new Error("Article not found");
      err.status = 404;
      throw err;
    } else {
      return db
        .query(commentQuery, [username, body, articleID])
        .then((results) => {
          console.log(results);
          return results.rows[0];
        });
    }
  });
};
module.exports = createComment;
