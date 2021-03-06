module.exports = () => {
  // DI container
  const diContainer = require('scr/main/config/di-container')

  // TODO register external dependencies

  // Basics
  //  TODO register MongoClient dependency
  // TODO change database to factor
  diContainer.register('database', require('scr/main/config/database')())
  //  TODO register winston dependency
  // TODO change logger to factor
  diContainer.register('logger', require('scr/main/config/logger')())

  // Repositories
  diContainer.factory('userRepository', require('scr/main/repositories/user-repository'))

  // Business
  diContainer.register('validator', require('approvejs'))
  diContainer.factory('validateUser', require('scr/main/usecases/validate-user'))
  diContainer.factory('createUser', require('scr/main/usecases/create-user'))
  diContainer.factory('findUserById', require('scr/main/usecases/find-user-by-id'))

  // Controllers
  diContainer.factory('userController', require('scr/main/controllers/user-controller'))

  return diContainer
}
