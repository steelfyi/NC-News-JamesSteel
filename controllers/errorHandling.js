const errorHandling = (err, req, res, next) => {
  if (err.code === "22P02") {
    return res.status(400).send({ msg: "bad request" });
  } else if (err.code === "23503") {
    return res.status(404).send({ msg: "resource not found" });
  } else if (err.status === 404) {
    return res.status(404).send({ msg: err.message });
  } else if (err.status === 200) {
    return res.status(200).send({ msg: err.message });
  } else return res.status(500).send({ msg: "Internal Server Error" });
};

module.exports = errorHandling;
