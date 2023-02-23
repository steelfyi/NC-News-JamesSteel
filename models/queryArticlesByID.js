const db = require("../db/connection");
const format = require("pg-format");

const queryArticlesByID = (articleID, next) => {
  console.log(articleID);
  const queryID = format(
    `SELECT * FROM articles WHERE article_id = %L;`,
    articleID
  );
  return db
    .query(queryID)
    .then((results) => {
      console.log(results);
      if (results.rows.length === 0) {
        console.log("results.rows is 0 catch ");
        const err = new Error("Article not found");
        err.status = 404;
        throw err;
      }
      return results.rows;
    })
    .catch((err) => {
      console.log("end catch block of query");
      return next(err);
    });
};

// const queryArticlesByID = (articleID, next) => {
//   console.log(articleID);
//   const queryID = format(
//     `SELECT * FROM articles WHERE article_id = %L;`,
//     articleID
//   );
//   return db
//     .query(queryID)
//     .then((results) => {
//       console.log(results);
//       if (results.rows.length === 0) {
//         console.log("results.rows is 0 catch ");
//         next(err);
//       }
//       return results.rows;
//     })
//     .catch((err) => {
//       console.log("end catch block of query");
//       next(err);
//     });
// };

module.exports = queryArticlesByID;

// const queryArticlesByID = (articleID) => {
//   const queryID = format(
//     `SELECT * FROM articles WHERE article_id = %L;`,
//     articleID
//   );

//   return db.query(queryID).then((results) => {
//     if (results.rows.length === 0) {
//       return Promise.reject({
//         status: 404,
//         msg: "article_id not found",
//       });
//     }
//     return results.rows;
//   });
// }
