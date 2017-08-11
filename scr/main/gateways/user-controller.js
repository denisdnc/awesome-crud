module.exports = (logger, createUser) => {
  const get = (req, res) => {
    logger.log('info', 'userController: Received GET on /user with data: ')
    res.status(200).json({
      name: 'Joker Aces'
    })
  }

  const create = (req, res) => {
    logger.log('info', 'userController: Received POST on /user with data: ', req.body)
    createUser.execute(req.body, (err, data) => {
      if (err) {
        logger.log('error', 'userController: error POST on /user with data: ', err)
        res.status(422).json({
          errors: err
        })
      }
      logger.log('info', 'userController: Success POST on /user with data: ', data)
      res.status(201).json(data)
    })
  }

  return {
    get: get,
    create, create
  }
}
