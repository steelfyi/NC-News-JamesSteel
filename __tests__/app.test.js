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

    describe("Error Handling", () => {
      it("404: responds with a message when sent a valid but non-existent path", () => {
        return request(app)
          .get("/api/not-a-real-path")
          .expect(404)
          .then((response) => {
            // console.log(response);
            const serverResponseMessage = response.body.msg;
            expect(serverResponseMessage).toBe("URL not found");
          });
      });
    });
  });
});
