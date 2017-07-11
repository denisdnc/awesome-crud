const TaskController = (function() {

  const createTask = require('../../usecases/create-task');

  const init = (app) => {
    app.get('/task', function(req, res) {
      res.status(200).json({
        description: 'test'
      });
    });

    app.post('/task', function(req, res) {
      console.log(req.body);
      res.status(200).json(createTask.execute(req.body));
    });
  };

  return {
    init: init
  };

})();

module.exports = TaskController;
