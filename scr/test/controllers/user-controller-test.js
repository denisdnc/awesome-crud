const mocha = require('mocha')
const describe = mocha.describe
const it = mocha.it
const chai = require('chai')
const expect = chai.expect

const request = require('supertest')
const appFactory = require('app')

const diContainer = require('scr/main/config/di-container-config')()
const logger = diContainer.get('logger')
const database = diContainer.get('database')

const app = appFactory(logger, database)
app.start(() => {})

// Fixtures
const userFixtures = require('scr/test/fixtures/user-fixtures')

describe('do POST with success', () => {
  describe('given an valid user payload', () => {
    const user = userFixtures.valid()
    describe('when POST is executed', () => {
      it('should respond with valid payload', (done) => {
        request(app.get())
          .post('/users')
          .set('Content-Type', 'application/json')
          .send(user)
          .expect(201)
          .end((err, res) => {
            if (err) return done(err)
            expect(res.body).to.have.property('_id').to.be.not.null
            expect(res.body).to.have.property('name').to.be.equal('name')
            expect(res.body).to.have.property('email').to.be.equal('email@email.com')
            expect(res.body).to.have.property('password').to.be.equal('123456')
            done()
          })
      })
    })
  })
})

describe('do GET /users/{id}', () => {
  let userId;
  describe('given an valid user payload', (done) => {
    const user = userFixtures.valid()
    it('should create an valid user', (done) => {
      request(app.get())
        .post('/users')
        .set('Content-Type', 'application/json')
        .send(user)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err)
          userId = res.body._id
          done()
        })
    })
  })
  describe('when GET is executed', () => {
    it('should respond with valid payload', (done) => {
      request(app.get())
        .get(`/users/${userId}`)
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          done()
        })
    })
  })
})
