var chai = require('chai'),
  expect = chai.expect;

const createUser = require('scr/main/user/usecases/create-user');
const userFixtures = require('scr/test/user/fixtures/user-fixtures');

describe('crate user', function() {

  describe('given an valid user', function() {
    const user = userFixtures.valid();

    describe('when the user is received', function() {
      createUser.execute(user, (errors, result) => {
        it('should return the created user', function() {
          expect(result).to.be.a('object');
          expect(result).to.have.property('name').to.equal('name');
          expect(result).to.have.property('email').to.equal('email@email.com');
        });
      });

    });
  });
});
