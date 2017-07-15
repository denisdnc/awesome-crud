const appSetup = (() => {
  let app
  let logger

  const init = (options) => {
    app = options.app
    logger = options.logger

    const bodyParser = require('body-parser')
    app.use(bodyParser.json())

    const mapUrls = require('scr/main/config/mapUrls')
    mapUrls.init({
      app: app,
      logger: logger
    })
  }

  return {
    init: init,
    logger: logger
  }
})()

module.exports = appSetup
