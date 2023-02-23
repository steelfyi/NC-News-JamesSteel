const db = require("../db/connection");
const format = require("pg-format");

const queryComments = () => {
  return db.query(`SELECT * FROM articles;`).then((results) => {
    return results.rows;
  });
};

module.exports = queryComments;
