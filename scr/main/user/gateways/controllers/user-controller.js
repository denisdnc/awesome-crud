const userController = (() => {
  let app
  let logger
  let createUser

  const map = () => {
    app.get('/user', (req, res) => {
      logger.log('debug', 'userController: Received GET on /user with data: ')
      res.status(200).json({
        description: 'test'
      })
    })

    app.post('/user', (req, res) => {
      logger.log('debug', 'userController: Received POST on /user with data: ',
        req.body)
      createUser.execute(req.body, (err, data) => {
        if (err) {
          logger.log('debug', 'userController: error POST on /user with data: ',
            err)
          res.status(422).json({
            errors: err
          })
        }
        logger.log('debug', 'userController: Success POST on /user with data: ',
          data)
        res.status(201).json(data)
      })
    })
  }

  const init = (options) => {
    app = options.app
    logger = options.logger
    createUser = options.createUser

    createUser.init({
      logger: logger,
      validator: require('scr/main/user/usecases/user-validator')
    })
  }

  return {
    init: init,
    map: map
  }
})()

module.exports = userController
