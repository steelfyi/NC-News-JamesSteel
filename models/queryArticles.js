const db = require("../db/connection");

const queryArticles = (topic) => {
  const queryParams = [];

  let queryStr = `
    SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id) AS comment_count
    FROM articles
    LEFT JOIN comments
    ON articles.article_id = comments.article_id`;

  if (topic) {
    queryParams.push(topic);
    queryStr += `
    WHERE articles.topic = $1
      GROUP BY articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url
      ORDER BY articles.created_at DESC;`;
  } else {
    queryStr += `
      GROUP BY articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url
      ORDER BY articles.created_at DESC
      ;`;
  }

  return db.query(queryStr, queryParams).then((results) => {
    return results.rows;
  });
};

module.exports = queryArticles;
