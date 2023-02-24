const db = require("../db/connection");

const insertVote = (articleID, vote) => {
  const insertVoteQuery = `UPDATE articles SET votes = $1 WHERE article_id = $2 RETURNING *;`;
  return db.query(insertVoteQuery, [vote, articleID]).then((results) => {
    if (results.rows.length === 0) {
      const err = new Error("Article not found");
      err.status = 404;
      throw err;
    } else {
      return results.rows[0];
    }
  });
};

module.exports = insertVote;
