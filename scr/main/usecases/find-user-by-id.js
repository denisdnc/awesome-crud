module.exports = (userRepository) => {
  const execute = (id, callback) => {
    userRepository.findById(id, (err, user) => {
      if (err) {
        const errObject = {
          status: err.status || 500,
          message: err.message || 'Error getting user on database'
        }
        return callback(errObject)
      }
      return callback(null, user)
    })
  }

  return {
    execute: execute
  }
}
