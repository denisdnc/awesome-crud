const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())

// DI container
const diContainer = require('scr/main/di-container')

// Factories - Basic
diContainer.factory('logger', require('scr/main/config/logger'))

// Factories - Usecases
diContainer.factory('validateModel', () => {
  return require('validate-model');
})
diContainer.factory('userValidator', require('scr/main/usecases/user-validator'))
diContainer.factory('createUser', require('scr/main/usecases/create-user'))

// Factories - Controllers
diContainer.factory('userController', require('scr/main/gateways/user-controller'))

// Dependencies
const logger = diContainer.get('logger')
const userController = diContainer.get('userController')

// Routes
app.get('/user', userController.get)
app.post('/user', userController.create)

app.listen(process.env.PORT || 3000, () => {
  logger.log('info', 'Application started and listening on port:', process.env.PORT || '3000')
})
