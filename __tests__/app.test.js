const request = require("supertest"); //required supertest as it facilitates the testing of the endpoints
const app = require("../app.js"); // my news app
const db = require("../db/connection.js"); // my database file points to connection.js which will choose dev or test respectively
const seed = require("../db/seeds/seed"); // required in my seed file
const data = require("../db/data/test-data/index.js");
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
        const serverResponseMessage = response.body.msg;
        expect(serverResponseMessage).toBe("URL not found");
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
    it("Should respond with an array of article objects with the expected properties", () => {
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
