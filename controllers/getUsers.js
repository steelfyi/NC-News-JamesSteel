const queryUsers = require("../models/queryUsers");
function getUsers() {
  queryUsers(req, res, next)
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch((err) => {
      next(err);
    });
}
module.exports = getUsers;
