const request = require("supertest"); //required supertest as it facilitates the testing of the endpoints
const app = require("../app.js"); // my news app
const db = require("../db/connection.js"); // my database file points to connection.js which will choose dev or test respectively
const seed = require("../db/seeds/seed"); // required in my seed file
const data = require("../db/data/test-data/index.js");
const sorted = require("jest-sorted");
// // using these to load seed and end DB connection respectively
beforeEach(() => {
  return seed(data); // you need to invoke seed with your SEED DATA inside
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
describe("400 - GET: /api/articles/nickiminaj", () => {
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
        console.log(response.body);
        expect(response.body).toEqual({ comments: [] });
        // expect(response.body).toEqual({ msg: "Comment not found" });
      });
  });
});
