const mapUrls = (() => {
  let app
  let logger

  const init = (options) => {
    app = options.app
    logger = options.logger

    const userController =
      require('scr/main/user/gateways/controllers/user-controller')

    userController.init({
      app: app,
      logger: logger,
      createUser: require('scr/main/user/usecases/create-user')
    })
    userController.map()
  }

  return {
    init: init
  }
})()

module.exports = mapUrls
