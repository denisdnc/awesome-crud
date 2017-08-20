// Get container config
const diContainer = require('scr/main/config/di-container-config')()
const logger = diContainer.get('logger')
const database = diContainer.get('database')

const app = ((logger, database) => {
  // Express config
  const express = require('express')
  const app = express()

  const bodyParser = require('body-parser')
  app.use(bodyParser.json())

  // Routes
  const mapRoutes = () => {
    const userController = diContainer.get('userController')
    app.get('/users/:id', userController.findById)
    app.post('/users', userController.create)
  }

  // Start server
  const startServer = () => {
    mapRoutes()
    app.listen(process.env.PORT || 3000, () => {
      logger.log('info', 'Application started and listening on port:', process.env.PORT || '3000')
    })
  }

  const start = () => {
    // Connect to database
    database.connect((err, connection) => {
      if (err) throw logger.log('error', 'Error connecting database: ', err)
      logger.log('info', `Connected to database:\
                  \n databaseName: ${connection.databaseName}\
                  \n host: ${connection.serverConfig.host}\
                  \n port: ${connection.serverConfig.port}`)
      diContainer.register('dbConnection', connection)
      startServer()
    })
  }

  return {
    start: start
  }
})(logger, database)

module.exports = app
app.start(logger, database)
