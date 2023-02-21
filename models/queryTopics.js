const db = require("../db/connection");
const format = require("pg-format"); // I need this to format my postgresqueries

const queryTopics = () => {
  // console.log("u r in query topics");
  return db.query(`SELECT * FROM topics;`).then((results) => {
    return results.rows;
  });
};

// just remembered use format to pass your sql in and then you can sort by check mdn

module.exports = queryTopics;
