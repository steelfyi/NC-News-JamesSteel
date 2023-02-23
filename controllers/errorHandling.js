const errorHandling = (err, req, res, next) => {
  console.log("U HAVE ARRIVED IN ERROR HANDLING!!");
  if (err.code === "22P02") {
    return res.status(400).send({ msg: "bad request" });
  } else {
    console.log(err);
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

// const handle404s = (err, req, res, next) => {
//   console.log("U HAVE ARRIVED IN ERROR HANDLING!!");
//   return res.status(404).send({ msg: "URL not found" });
// };

// const handleServerErrors = (err, req, res, next) => {
//   console.log("U HAVE ARRIVED IN ERROR HANDLING!!");
//   res.status(500).send({ msg: "hi Internal Server Error" });
// };

module.exports = errorHandling;
