var chai = require('chai'),
  expect = chai.expect;

const createTask = require('../../../main/task/usecases/create-task');
const taskFixtures = require('../../../test/task/fixtures/task-fixtures');

describe('crate task', function() {

  describe('given an valid task', function() {
    const task = taskFixtures.valid();

    describe('when the task is received', function() {
      const result = createTask.execute(task);

      it('should return the created task', function() {
        expect(result).to.be.a('object');
        expect(result).to.have.property('description')
          .to.equal('watch GoT');
      });
    });

  });

});
