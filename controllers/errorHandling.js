const errorHandling = (err, req, res, next) => {
  if (err.code === "22P02") {
    return res.status(400).send({ msg: "bad request" });
  } else if (err.status === 404) {
    return res.status(404).send({ msg: "article_id not found" });
  } else return res.status(500).send({ msg: "Internal Server Error" });
};

module.exports = errorHandling;
