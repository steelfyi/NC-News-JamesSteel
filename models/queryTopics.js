const db = require("../db/connection");
const format = require("pg-format"); // I need this to format my postgresqueries

const queryTopics = () => {
  return db.query(`SELECT * FROM topics;`).then((results) => {
    return results.rows;
  });
};

module.exports = queryTopics;
