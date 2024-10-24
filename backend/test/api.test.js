const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index.js"); // Import the app instance directly
const should = chai.should();

chai.use(chaiHttp);

describe("GitHub API Proxy", () => {
  // Test the /api/search endpoint
  describe("/GET /api/search", () => {
    it("it should GET user details from GitHub", (done) => {
      chai
        .request(app)
        .get("/api/search")
        .query({ username: "octocat" })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("login").eql("octocat");
          done();
        });
    });

    it("it should return 404 for a non-existent user", (done) => {
      chai
        .request(app)
        .get("/api/search")
        .query({ username: "nonexistentusername12345" })
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  // Test the /api/repos endpoint
  describe("/GET /api/repos", () => {
    it("it should GET repositories of a user from GitHub", (done) => {
      chai
        .request(app)
        .get("/api/repos")
        .query({ username: "octocat" })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.above(0);
          res.body[0].should.have.property("name");
          res.body[0].should.have.property("commits");
          done();
        });
    });

    it("it should return 404 for repositories of a non-existent user", (done) => {
      chai
        .request(app)
        .get("/api/repos")
        .query({ username: "nonexistentusername12345" })
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});
