const AppSetup = (function() {

  const bodyParser = require('body-parser');

  const init = (app) => {
    app.use(bodyParser.json());
  };

  return {
    init: init
  };

})();

module.exports = AppSetup;
