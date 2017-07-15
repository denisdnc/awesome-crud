const AppSetup = (() => {
  const init = (app) => {
    const bodyParser = require('body-parser')
    app.use(bodyParser.json())
  }

  return {
    init: init
  }
})()

module.exports = AppSetup
