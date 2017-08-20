const mocha = require('mocha')
const describe = mocha.describe
const it = mocha.it
const chai = require('chai')
const expect = chai.expect

const createUser = require('scr/main/usecases/create-user')
const userFixtures = require('scr/test/fixtures/user-fixtures')

describe('crate user', () => {
  describe('given an valid user', () => {
    const user = userFixtures.valid()

    describe('when the user is received', () => {
      createUser.execute(user, (errors, result) => {
        it('should return the created user', () => {
          expect(result).to.be.a('object')
          expect(result).to.have.property('name').to.equal('name')
          expect(result).to.have.property('email').to.equal('email@email.com')
        })
      })
    })
  })
})
