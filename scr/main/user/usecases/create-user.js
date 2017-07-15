const createUser = (() => {
  let logger
  let validator

  const execute = (user, callback) => {
    logger.log('info', 'createUser: Received user data: ', user)
    const result = validator.validate(user)
    if (!result.valid) {
      logger.log('warn', 'createUser: Validation error on user: ',
        result.messages)
      callback(result.messages)
    }
    logger.log('info', 'createUser: Created user: ', user)
    callback(null, user)
  }

  const init = (options) => {
    logger = options.logger
    validator = options.validator

    validator.init({
      validateModel: require('validate-model')
    })
  }

  return {
    init: init,
    execute: execute
  }
})()

module.exports = createUser
