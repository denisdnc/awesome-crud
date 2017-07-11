const request = require('supertest'),
  express = require('express'),
  app = require("app");

describe('GET /user', () => {
  it('respond with json', (done) => {
    request(app)
      .get('/user')
      .set('Accept', 'application/json')
      .expect(200)
      .expect({
        description: 'test'
      })
      .end((err, res) => {
        if (err) return done(err);
        done()
      });
  })
});

describe('POST /user', () => {
  it('respond with json', (done) => {
    request(app)
      .post("/user")
      .set("Content-Type", "application/json")
      .send({
        name: "user name",
        email: "email@email.com",
        password: "123456"
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        done()
      });
  })
});
