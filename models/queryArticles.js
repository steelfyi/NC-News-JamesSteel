const db = require("../db/connection");

const queryArticles = () => {
  return db.query(`SELECT * FROM articles;`).then((results) => {
    return results.rows;
  });
};

module.exports = queryArticles;
