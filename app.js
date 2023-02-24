const express = require("express");
const app = express();
const getTopics = require("./controllers/getTopics.js");
const getArticles = require("./controllers/getArticles.js");
const getArticleByID = require("./controllers/getArticleByID.js");
const getComments = require("./controllers/getComments");
const errorHandling = require("./controllers/errorHandling");
const postComments = require("./controllers/postComments");
const patchVote = require("./controllers/patchVote");

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleByID);

app.get("/api/articles/:article_id/comments", getComments);

app.post("/api/articles/:article_id/comments", postComments);

app.patch("/api/articles/:article_id", patchVote);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "path not found" });
});

app.use(errorHandling);

module.exports = app;
