const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index.js");
const sorted = require("jest-sorted");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});
describe("Error Handling", () => {
  it("404: responds with a message when sent a valid but non-existent path", () => {
    return request(app)
      .get("/api/not-a-real-path")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("path not found");
      });
  });
});
describe("200 - GET: /api/topics", () => {
  it("Each Array object should match the expected result", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((response) => {
        const arrTest = response.body.topics;

        arrTest.forEach((slugObj) => {
          expect(slugObj).toMatchObject({
            slug: expect.any(String),
            description: expect.any(String),
          });
        });
      });
  });

  describe("200 - GET: /api/articles", () => {
    it("respond with an array of article objects with the expected properties", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then((response) => {
          const articleArr = response.body.articles;

          articleArr.forEach((articleObj) => {
            expect(articleObj).toMatchObject({
              author: expect.any(String),
              article_id: expect.any(Number),
              title: expect.any(String),
              topic: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              article_img_url: expect.any(String),
              comment_count: expect.any(String),
            });
          });
        });
    });
  });
});
it("200 - GET: should order created date descending", () => {
  return request(app)
    .get("/api/articles")
    .expect(200)
    .then((response) => {
      const responseArr = response.body.articles;
      expect(responseArr).toBeSorted({
        key: "created_at",
        descending: "true",
      });
    });
});
describe("200 - GET: /api/articles/:article_id", () => {
  it("respond with an article object with the expected properties", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((response) => {
        const articleArrObj = response.body.article;

        expect(articleArrObj).toMatchObject([
          {
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: "2020-07-09T20:11:00.000Z",
            votes: 100,
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
          },
        ]);
      });
  });
});

describe("404 - GET: /api/articles/999", () => {
  it("Should respond with not found obj if queried with a valid yet non existent id", () => {
    return request(app)
      .get("/api/articles/999")
      .expect(404)
      .then((response) => {
        expect(response.body).toEqual({ msg: "Article not found" });
      });
  });
});
describe("400 - GET: /api/articles/not-a-valid-id", () => {
  it("should respond with bad request when queried with invalid characters", () => {
    return request(app)
      .get("/api/articles/nickiminaj")
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({ msg: "bad request" });
      });
  });
});
describe("200 - GET: /api/articles/:article_id/comments", () => {
  it("should return an array of comments with that comment ID ordered by created date descending", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((response) => {
        const commentsArr = response.body.comments;

        expect(commentsArr).toBeSorted({
          key: "created_at",
          descending: "true",
        });
      });
  });
  it("Should respond with an array of objects matching expected properties", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((response) => {
        const commentsArr = response.body.comments;
        commentsArr.forEach((comment) => {
          expect(comment).toEqual({
            comment_id: expect.any(Number),
            votes: expect.any(Number),
            created_at: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
            article_id: 1,
          });
        });
      });
  });
  it("Should respond with not found obj if queried with a valid yet non existent id", () => {
    return request(app)
      .get("/api/articles/999/comments")
      .expect(404)
      .then((response) => {
        expect(response.body).toEqual({ msg: "Article not found" });
      });
  });
  it("Should respond with a bad request if queried with a invalid id", () => {
    return request(app)
      .get("/api/articles/not-an-id/comments")
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({ msg: "bad request" });
      });
  });
  it("Should respond with an empty array if queried with an existing id with no comments", () => {
    return request(app)
      .get("/api/articles/7/comments")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({ comments: [] });
      });
  });
});

describe("201 - POST: /api/articles/:article_id/comments", () => {
  it("should return posted comment", () => {
    const data = {
      username: "butter_bridge",
      body: "Your article is not very good you shouldnt be a journalist",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(data)
      .expect(201)
      .then((response) => {
        const commentObj = response.body.comment;

        expect(commentObj).toEqual({
          comment_id: expect.any(Number),
          votes: expect.any(Number),
          created_at: expect.any(String),
          author: "butter_bridge",
          body: "Your article is not very good you shouldnt be a journalist",
          article_id: 1,
        });
      });
  });

  it("should respond with bad request when queried with invalid character", () => {
    const data = {
      username: "butter_bridge",
      body: "Your article is not very good you shouldnt be a journalist",
    };
    return request(app)
      .post("/api/articles/not-a-valid-id/comments")
      .send(data)
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({ msg: "bad request" });
      });
  });
  it("Should respond with not found obj if queried with a valid yet non existent id", () => {
    const data = {
      username: "butter_bridge",
      body: "Your article is not very good you shouldnt be a journalist",
    };
    return request(app)
      .post("/api/articles/999999/comments")
      .send(data)
      .expect(404)
      .then((response) => {
        expect(response.body).toEqual({ msg: "resource not found" });
      });
  });
  it("201  - ignores any unnecessary properties if sent on the request", () => {
    const data = {
      username: "butter_bridge",
      body: "Your article is not very good you shouldnt be a journalist",
      secret: "my name is james",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(data)
      .expect(201)
      .then((response) => {
        const commentObj = response.body.comment;

        expect(commentObj).toEqual({
          comment_id: expect.any(Number),
          votes: expect.any(Number),
          created_at: expect.any(String),
          author: "butter_bridge",
          body: "Your article is not very good you shouldnt be a journalist",
          article_id: 1,
        });
      });
  });
  it("404s when username doesn't exist", () => {
    const data = {
      username: "james",
      body: "Your article is not very good you shouldnt be a journalist",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(data)
      .expect(404)
      .then((response) => {
        expect(response.body).toEqual({ msg: "resource not found" });
      });
  });
});
it("400 request does not have a username or body property", () => {
  const data = {
    notusername: "butter_bridge",
    notbody: "Your article is not very good you shouldnt be a journalist",
  };
  return request(app)
    .post("/api/articles/1/comments")
    .send(data)
    .expect(400)
    .then((response) => {
      expect(response.body).toEqual({ msg: "bad request" });
    });
});
