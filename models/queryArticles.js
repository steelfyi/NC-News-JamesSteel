const db = require("../db/connection");

const queryArticles = (req) => {
  let queryParams = [];
  const topic = req.query.topic;
  const sort_by = req.query.sort_by;

  let queryStr = `
    SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id) AS comment_count
    FROM articles
    LEFT JOIN comments
    ON articles.article_id = comments.article_id`;

  if (topic) {
    queryParams.push(topic);
    queryStr += `
    WHERE articles.topic = $1;`;
  } else {
    queryStr += `GROUP BY articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url`;
  }

  if (sort_by) {
    console.log("you ar ein sortby ");
    queryStr += ` ORDER BY ${sort_by} DESC;`;
  } else {
    queryStr += `
      ORDER BY created_at DESC;`;
  }
  console.log(queryStr, queryParams);
  return db.query(queryStr, queryParams).then((results) => {
    return results.rows;
  });
};

module.exports = queryArticles;
