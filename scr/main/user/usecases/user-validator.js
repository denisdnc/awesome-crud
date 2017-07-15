const UserValidator = (() => {
  const ValidateModel = require('validate-model')
  const validateAll = ValidateModel.validateAll

  const UserRules = {
    name: {
      title: 'Name',
      validate: [{
        validator: 'isLength',
        arguments: [1, 255]
      }]
    },
    email: {
      title: 'Email',
      validate: [{
        validator: 'isEmail',
        message: '{TITLE} must be valid'
      }]
    },
    password: {
      title: 'Password',
      validate: [{
        validator: 'isLength',
        arguments: [6, 255],
        message: '{TITLE} is too short'
      }]
    }
  }

  const validate = (user) => {
    return validateAll(UserRules, user)
  }

  return {
    validate: validate
  }
})()

module.exports = UserValidator
