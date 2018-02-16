module.exports = (validateUser, userRepository) => {
  const execute = (user, callback) => {
    const errors = validateUser.execute(user)
    if (errors.length > 0) {
      callback(errors, user)
      return
    }

    userRepository.create(user, (error, user) => {
      if (error) {
        const errorsResult = [{
          messages: ['error creating user on database']
        }]
        callback(errorsResult, user)
        return
      }
      callback(null, user)
    })
  }

  return {
    execute: execute
  }
}
