const mocha = require('mocha')
const describe = mocha.describe
const it = mocha.it
const chai = require('chai')
const expect = chai.expect

// Use case dependencies
const userRepository = {}
const validateModel = require('validate-model')
const validateUser = require('scr/main/usecases/validate-user')(validateModel)
// Use case to test
const createUser = require('scr/main/usecases/create-user')(validateUser, userRepository)
// Fixtures
const userFixtures = require('scr/test/fixtures/user-fixtures')

describe('create user with success', () => {
  describe('given an valid user', () => {
    const user = userFixtures.valid()
    describe('and user repository returns success', () => {
      userRepository.create = (user, callback) => {
        callback(null, user)
        return
      }
      describe('when create user is executed', () => {
        createUser.execute(user, (errors, result) => {
          it('should return the created user', () => {
            expect(result).to.be.a('object')
            expect(result).to.have.property('name').to.be.equal('name')
            expect(result).to.have.property('email').to.be.equal('email@email.com')
            expect(result).to.have.property('password').to.be.equal('123456')
            expect(result).to.not.have.property('errors')
          })
        })
      })
    })
  })
})

describe('validate mandatory parameters', () => {
  describe('given an invalid user', () => {
    const user = userFixtures.invalid()
    describe('when create user is executed', () => {
      createUser.execute(user, (errors, result) => {
        it('should return errors', () => {
          expect(result).to.not.equal(null)
          expect(errors).to.be.a('object')
          expect(errors).to.have.property('status').to.be.equal(422)
          expect(errors).to.have.property('messages').to.have.property('name')
          expect(errors.messages).to.have.property('name').to.include('Name is mandatory')
          expect(errors.messages).to.have.property('email').to.include('Email must be valid')
          expect(errors.messages).to.have.property('password').to.include('Password is too short')
        })
      })
    })
  })
})

describe('fail to save user on repository', () => {
  describe('given an valid user', () => {
    const user = userFixtures.valid()
    describe('and user repository returns error', () => {
      userRepository.create = (user, callback) => {
        callback({})
        return
      }
      describe('when create user is executed', () => {
        createUser.execute(user, (errors, result) => {
          it('should return errors', () => {
            expect(result).to.not.equal(null)
            expect(errors).to.be.a('object')
            expect(errors).to.have.property('status').to.be.equal(500)
            expect(errors).to.have.property('message').to.be.equal('Error creating user on database')
          })
        })
      })
    })
  })
})
