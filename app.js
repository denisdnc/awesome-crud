// Express config
const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())

// DI container
const diContainer = require('scr/main/config/di-container')

// Basics
diContainer.register('database', require('scr/main/config/database')())
diContainer.register('logger', require('scr/main/config/logger')())

// Repositories
diContainer.factory('userRepository', require('scr/main/repositories/user-repository'))

// Business
diContainer.register('validateModel', require('validate-model'))
diContainer.factory('validateUser', require('scr/main/usecases/validate-user'))
diContainer.factory('createUser', require('scr/main/usecases/create-user'))
diContainer.factory('findUserById', require('scr/main/usecases/find-user-by-id'))

// Controllers
diContainer.factory('userController', require('scr/main/controllers/user-controller'))

// Routes
const mapRoutes = () => {
  const userController = diContainer.get('userController')
  app.get('/users/:id', userController.findById)
  app.post('/users', userController.create)
}

// Start server
const logger = diContainer.get('logger')
const startServer = () => {
  mapRoutes()
  app.listen(process.env.PORT || 3000, () => {
    logger.log('info', 'Application started and listening on port:', process.env.PORT || '3000')
  })
}

// Connect to database
const database = diContainer.get('database')
database.connect((err, connection) => {
  if (err) throw logger.log('error', 'Error connecting database: ', err)
  logger.log('info', `Connected to database:\
              \n databaseName: ${connection.databaseName}\
              \n host: ${connection.serverConfig.host}\
              \n port: ${connection.serverConfig.port}`)
  diContainer.register('dbConnection', connection)
  startServer()
})

module.exports = app
