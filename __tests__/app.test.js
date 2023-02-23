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
describe("app", () => {
  describe("/api/topics", () => {
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
  });
  describe("/api/articles", () => {
    it("200 - GET: respond with an array of article objects with the expected properties", () => {
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
  });
  describe("/api/articles/:article_id", () => {
    it("200 - GET: respond with an article object with the expected properties", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then((response) => {
          const articleArrObj = response.body.article;

          articleArrObj.forEach((articleObj) => {
            expect(articleObj).toMatchObject({
              author: expect.any(String),
              article_id: expect.any(Number),
              title: expect.any(String),
              topic: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              article_img_url: expect.any(String),
            });
          });
        });
    });
  });
  describe("/api/articles/999", () => {
    it("404 - GET: Should respond with not found obj if queried with a valid yet non existent id", () => {
      return request(app)
        .get("/api/articles/999")
        .expect(404)
        .then((response) => {
          expect(response.body).toEqual({ msg: "article_id not found" });
        });
    });
  });
  describe("/api/articles/nickiminaj", () => {
    it("400 - GET: should respond with bad request when queried with invalid characters", () => {
      return request(app)
        .get("/api/articles/nickiminaj")
        .expect(400)
        .then((response) => {
          expect(response.body).toEqual({ msg: "bad request" });
        });
    });
  });
});
