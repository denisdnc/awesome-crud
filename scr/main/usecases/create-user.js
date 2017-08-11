module.exports = (logger, userValidator) => {
  const execute = (user, callback) => {
    logger.log('info', 'createUser: Received user data: ', user)
    const result = userValidator.execute(user)
    if (!result.valid) {
      logger.log('warn', 'createUser: Validation error on user: ',
        result.messages)
      callback(result.messages)
    }
    logger.log('info', 'createUser: Created user: ', user)
    callback(null, user)
  }

  return {
    execute: execute
  }
}
