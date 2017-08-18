module.exports = (logger, validateUser, userRepository) => {
  const execute = (user, callback) => {
    const result = validateUser.execute(user)
    if (!result.valid) {
      const err = {
        status: 422,
        message: result.messages
      }
      callback(err)
      return
    }

    userRepository.create(user, (err, user) => {
      if (err) {
        const errObject = {
          status: 500,
          message: 'Error creating user on database'
        }
        callback(errObject)
        return
      }
      callback(null, user)
    })
  }

  return {
    execute: execute
  }
}
