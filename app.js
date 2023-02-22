const express = require("express");
const app = express(); // initalising express to app variable
const db = require("./db/connection");
const getTopics = require("./controllers/getTopics.js");
const getArticles = require("./controllers/getArticles.js");
const getArticleByID = require("./controllers/getArticleByID.js");

const { handle404s } = require("./controllers/errorHandling");

// app.use(express.json()); // this code uses express to add middleware to parse incoming requests and add the body property to the request object

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleByID);

app.use(handle404s);

module.exports = app;
