const express = require("express");
const app = express();
const getTopics = require("./controllers/getTopics.js");
const getArticles = require("./controllers/getArticles.js");
const getArticleByID = require("./controllers/getArticleByID.js");
const getComments = require("./controllers/getComments");
const errorHandling = require("./controllers/errorHandling");

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleByID);

app.get("/api/articles/:article_id/comments", getComments);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "path not found" });
});

app.use(errorHandling);

module.exports = app;
