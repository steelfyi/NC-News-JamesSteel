const db = require("../db/connection");

function queryUsers() {
  return db.query(`SELECT * FROM users;`).then((results) => {
    return results.rows;
  });
}

module.exports = queryUsers;
