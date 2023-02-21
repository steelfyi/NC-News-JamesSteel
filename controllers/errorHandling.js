const handle404s = (req, res, next) => {
  res.status(404).send({ msg: "URL not found" });
};

const handleServerErrors = (req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "hi Internal Server Error" });
};

module.exports = {
  handle404s,
  handleServerErrors,
};
