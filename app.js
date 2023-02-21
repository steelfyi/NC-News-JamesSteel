const express = require("express");
const app = express(); // initalising express to app variable
const db = require("./db/connection");
const getTopics = require("./controllers/getTopics.js");
const {
  handle404s,
  handleServerErrors,
} = require("./controllers/errorHandling");

// app.use(express.json()); // this code uses express to add middleware to parse incoming requests and add the body property to the request object

app.get("/api/topics", getTopics);

app.use(handle404s);

app.use(handleServerErrors);

module.exports = app;
