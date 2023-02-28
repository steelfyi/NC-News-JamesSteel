const queryUsers = require("../models/queryUsers");

function getUsers(req, res, next) {
  queryUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch((err) => {
      next(err);
    });
}
module.exports = getUsers;
