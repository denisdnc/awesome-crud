const mocha = require('mocha')
const describe = mocha.describe
const it = mocha.it
const chai = require('chai')
const expect = chai.expect

// Use case dependencies
const userRepository = {}
const validator = require('approvejs')
const validateUser = require('scr/main/usecases/validate-user')(validator)
// Use case to test
const createUser = require('scr/main/usecases/create-user')(validateUser, userRepository)
// Fixtures
const userFixtures = require('scr/test/fixtures/user-fixtures')

describe('create user with success', () => {
  describe('given an valid user', () => {
    const user = userFixtures.valid()
    describe('and user repository returns success', () => {
      userRepository.create = (user, callback) => {
        expect(callback).to.be.a('function')
        expect(user).to.be.a('object')
        expect(user).to.have.property('name').to.be.equal('name')
        expect(user).to.have.property('email').to.be.equal('email@email.com')
        expect(user).to.have.property('password').to.be.equal('123456')
        expect(user).to.not.have.property('errors')
        callback(null, user)
        return
      }
      describe('when create user is executed', () => {
        createUser.execute(user, (errors, result) => {
          it('should return the created user', () => {
            expect(result).to.have.property('name').to.be.equal('name')
            expect(result).to.have.property('email').to.be.equal('email@email.com')
            expect(result).to.have.property('password').to.be.equal('123456')
          })
          it('should have no errors', () => {
            expect(errors).to.be.null
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
          expect(errors).to.have.deep.members([{
            property: 'name',
            messages: ['name is required']
          }, {
            property: 'email',
            messages: ['email is required', 'email must be a valid email address']
          }, {
            property: 'password',
            messages: [
              'password is required',
              'password must be a minimum of 6 and a maximum of 50 characters'
            ]
          }])
        })
        it('should return user', () => {
          expect(user).to.have.property('name').to.be.equal('')
          expect(user).to.have.property('email').to.be.equal('')
          expect(user).to.have.property('password').to.be.equal('')
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
            expect(errors).to.have.deep.members([{
              messages: ['error creating user on database']
            }])
          })
          it('should return user', () => {
            expect(user).to.have.property('name').to.be.equal('name')
            expect(user).to.have.property('email').to.be.equal('email@email.com')
            expect(user).to.have.property('password').to.be.equal('123456')
          })
        })
      })
    })
  })
})
