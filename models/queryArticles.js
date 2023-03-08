const db = require("../db/connection");

const queryArticles = (req, topic, sort_by = "created_at") => {
  let queryParams = [];

  let queryStr = `
    SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id) AS comment_count
    FROM articles
    LEFT JOIN comments
    ON articles.article_id = comments.article_id`;

  if (topic) {
    queryParams.push(topic);
    queryStr += `
    WHERE articles.topic = $1`;
  }

  if (sort_by) {
    queryStr += ` GROUP BY articles.article_id ORDER BY articles.${sort_by};`;
  }

  return db.query(queryStr, queryParams).then((results) => {
    return results.rows;
  });
};

module.exports = queryArticles;
