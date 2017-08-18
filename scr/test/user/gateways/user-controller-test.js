const mocha = require('mocha')
const describe = mocha.describe
const it = mocha.it

const request = require('supertest')
const app = require('app')

// describe('GET /user', () => {
//   it('respond with json', (done) => {
//     request(app)
//       .get('/user')
//       .set('Accept', 'application/json')
//       .expect(200)
//       .expect({
//         description: 'test'
//       })
//       .end((err, res) => {
//         if (err) return done(err)
//         done()
//       })
//   })
// })

describe('POST /users', () => {
  it('respond with json', (done) => {
    request(app)
      .post('/users')
      .set('Content-Type', 'application/json')
      .send({
        name: 'user name',
        email: 'email@email.com',
        password: '123456'
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })
})
