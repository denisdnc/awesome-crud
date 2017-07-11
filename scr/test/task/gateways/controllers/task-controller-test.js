const request = require('supertest'),
  express = require('express'),
  app = require("../../../../../");

describe('GET /task', function() {
  it('respond with json', function(done) {
    request(app)
      .get('/task')
      .set('Accept', 'application/json')
      .expect(200)
      .expect({
        description: 'test'
      })
      .end(function(err, res) {
        if (err) return done(err);
        done()
      });
  })
});
