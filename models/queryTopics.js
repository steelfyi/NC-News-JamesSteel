const db = require("../db/connection");

const queryTopics = () => {
  return db.query(`SELECT * FROM topics;`).then((results) => {
    return results.rows;
  });
};

module.exports = queryTopics;
