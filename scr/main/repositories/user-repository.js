const ObjectID = require('mongodb').ObjectID

module.exports = (dbConnection, logger) => {
  const create = (user, callback) => {
    logger.log('debug', 'userRepository: Started creating user: ', user)
    dbConnection.collection('users').insertOne(user, (err, res) => {
      if (err) {
        logger.log('error', 'userRepository: Error creating user: ', err)
        return callback(err)
      }
      logger.log('debug', 'userRepository: Finished creating user: ', res)
      return callback(null, res.ops[0])
    })
  }

  const findById = (id, callback) => {
    if (!ObjectID.isValid(id)) {
      const errObject = {
        status: 422,
        message: 'Invalid _id format'
      }
      return callback(errObject)
    }

    dbConnection.collection('users').find({
      _id: new ObjectID(id)
    }).toArray((err, docs) => {
      if (err) {
        return callback(err)
      }
      return callback(null, docs[0])
    })
  }

  return {
    create: create,
    findById: findById
  }
}
