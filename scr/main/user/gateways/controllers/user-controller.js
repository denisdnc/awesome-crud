const UserController = (() => {
  const createUser = require('scr/main/user/usecases/create-user')

  const init = (app) => {
    app.get('/user', (req, res) => {
      res.status(200).json({
        description: 'test'
      })
    })

    app.post('/user', (req, res) => {
      createUser.execute(req.body, (errors, result) => {
        if (errors) {
          res.status(422).json({
            errors: errors
          })
        }
        res.status(201).json(result)
      })
    })
  }

  return {
    init: init
  }
})()

module.exports = UserController
