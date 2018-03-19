module.exports = (logger, createUser, findUserById) => {
  const create = (req, res) => {
    logger.log('info', 'userController: Received POST on /user with data: ', req.body)

    createUser.execute(req.body, (err, data) => {
      if (err) {
        res.status(422).json({
          errors: err
        })
      }

      logger.log('info', 'userController: Success POST on /user with data: ', data)
      res.status(201).json(data)
    })
  }

  const findById = (req, res) => {
    const id = req.params.id
    logger.log('info', 'userController: Received GET on /user with id: ', id)

    findUserById.execute(id, (err, data) => {
      if (err) {
        res.status(err.status).json({
          errors: err
        })
      }
      res.status(200).json(data)
    })
  }

  return {
    create: create,
    findById: findById
  }
}
